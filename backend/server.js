const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "users.json";
const COURSES_FILE = "courses.json";
const JOBS_FILE = "jobs.json";
const SECRET_KEY = "your_secret_key"; // Change this for security

// Read users from JSON file
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

// Write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Add resume field to all users
const addResumeField = () => {
  const users = readUsers(); // Read users from the file
  const updatedUsers = users.map((user) => {
    if (!user.resume) {
      user.resume = null; // Add the resume field if it doesn't exist
    }
    return user;
  });
  writeUsers(updatedUsers); // Write the updated users back to the file
};

// Call this function once to add the resume field
addResumeField();

// Rest of your server.js code...

// Read courses from JSON file
const readCourses = () => {
  if (!fs.existsSync(COURSES_FILE)) return [];
  return JSON.parse(fs.readFileSync(COURSES_FILE, "utf8"));
};

// 🔹 **Signup Route**
app.post("/signup", async (req, res) => {
  const { name, age, field, email, password, role } = req.body;
  if (!name || !age || !field || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = readUsers();
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, age, field, email, password: hashedPassword, role, completedCourses: [] });
  writeUsers(users);

  res.json({ message: "Signup successful" });
});

// 🔹 **Login Route**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // Generate JWT Token with role
  const token = jwt.sign({ email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ success: true, message: "Login successful", token });
});

// 🔹 **Protected Route (Dashboard)**
app.get("/dashboard", authenticateToken, (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.email === req.user.email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Return user data (excluding password)
  const userData = { name: user.name, age: user.age, field: user.field, email: user.email, completedCourses: user.completedCourses };
  res.json(userData);
});

// 🔹 **Courses Route**
app.get("/courses", authenticateToken, (req, res) => {
  const courses = readCourses();
  res.json(courses);
});

// 🔹 **Complete Course Route (Fixed)**
app.post("/complete-course", authenticateToken, (req, res) => {
  console.log("✅ Incoming request:", req.body);
  console.log("✅ User from token:", req.user); // Debugging

  const { courseId } = req.body;
  let users = readUsers();
  const userIndex = users.findIndex((u) => u.email === req.user?.email);

  if (userIndex === -1) {
    console.log("❌ User not found in database");
    return res.status(404).json({ message: "User not found" });
  }

  let user = users[userIndex];

  // ✅ Ensure completedCourses is initialized
  if (!user.completedCourses) {
    user.completedCourses = [];
  }

  // ✅ Check before adding to completedCourses
  if (!user.completedCourses.includes(courseId)) {
    user.completedCourses.push(courseId);
    writeUsers(users);
  }

  console.log("✅ Course completed:", user.completedCourses);
  res.json({ message: "Course completed successfully", completedCourses: user.completedCourses });
});

// 🔹 **Middleware to authenticate JWT token**
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log("❌ Invalid token:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    console.log("✅ Token verified:", user);
    req.user = user; // { email, role }
    next();
  });
}
// jobs





// Read jobs from JSON file
const readJobs = () => {
  if (!fs.existsSync(JOBS_FILE)) return [];
  return JSON.parse(fs.readFileSync(JOBS_FILE, "utf8"));
};

// Write jobs to JSON file
const writeJobs = (jobs) => {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
};

// 🔹 **Post Job Route**
app.post("/post-job", authenticateToken, (req, res) => {
  const { title, description, location, salary } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === req.user.email);

  if (!user || user.field !== "Recruiter") {
    return res.status(403).json({ message: "Only recruiters can post jobs" });
  }

  const jobs = readJobs();
  const newJob = {
    id: Date.now().toString(),
    title,
    description,
    location,
    salary,
    postedBy: user.email,
    applicants: []
  };

  jobs.push(newJob);
  writeJobs(jobs);

  res.json({ message: "Job posted successfully", job: newJob });
});

// 🔹 **Get Jobs Route**
// 🔹 **Get Jobs Route (Filtered by Recruiter)**
app.get("/jobs", authenticateToken, (req, res) => {
  const jobs = readJobs();
  // Filter jobs to show only those posted by the logged-in recruiter
  const recruiterJobs = jobs.filter((job) => job.postedBy === req.user.email);
  res.json(recruiterJobs);
});

// 🔹 **Get Job Applicants Route**
app.get("/job-applicants/:jobId", authenticateToken, (req, res) => {
  const { jobId } = req.params;
  const jobs = readJobs();
  const job = jobs.find((j) => j.id === jobId);

  // Ensure only the recruiter who posted the job can view applicants
  if (!job || job.postedBy !== req.user.email) {
    return res.status(404).json({ message: "Job not found or unauthorized" });
  }

  res.json({ applicants: job.applicants });
});
//resumee

app.get("/check-resume/:email", authenticateToken, (req, res) => {
  const { email } = req.params;
  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the user has a resume
  const hasResume = !!user.resume; // Assuming `resume` is a field in the user object
  res.json({ hasResume });
});






//apply job
// 🔹 **Apply for Job Route**
app.post("/apply-job", authenticateToken, (req, res) => {
  const { jobId } = req.body;
  const users = readUsers();
  const jobs = readJobs();

  const userIndex = users.findIndex((u) => u.email === req.user.email);
  const jobIndex = jobs.findIndex((j) => j.id === jobId);

  if (userIndex === -1 || jobIndex === -1) {
    return res.status(404).json({ message: "User or job not found" });
  }

  const user = users[userIndex];
  const job = jobs[jobIndex];

  // Ensure appliedJobs array exists
  if (!user.appliedJobs) {
    user.appliedJobs = [];
  }

  // Ensure applicants array exists
  if (!job.applicants) {
    job.applicants = [];
  }

  // Check if the user has already applied for the job
  if (!job.applicants.includes(user.email)) {
    job.applicants.push(user.email); // Add user email to job applicants
    user.appliedJobs.push(jobId); // Add job ID to user's applied jobs
    writeUsers(users); // Update users.json
    writeJobs(jobs); // Update jobs.json
  }

  res.json({ message: "Applied for job successfully", job });
});





// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
