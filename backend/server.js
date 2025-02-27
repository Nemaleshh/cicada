const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer"); // For handling file uploads
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

const USERS_FILE = "users.json";
const COURSES_FILE = "courses.json"; // Path to the courses.json file
const SECRET_KEY = "your_secret_key";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Read users from JSON file
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

// Write users to JSON file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Read courses from JSON file
const readCourses = () => {
  if (!fs.existsSync(COURSES_FILE)) return [];
  return JSON.parse(fs.readFileSync(COURSES_FILE, "utf8"));
};

// Signup Route with Resume Upload
app.post("/signup", upload.single("resume"), async (req, res) => {
  const { name, age, field, email, password } = req.body;
  if (!name || !age || !field || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = readUsers();
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    age,
    field,
    email,
    password: hashedPassword,
    completedCourses: [],
    resume: field === "Fresher" && req.file ? req.file.path : null, // Store resume path if applicable
    userStats: {
      skillsCompleted: 0,
      learningHours: 0,
      mentorSessions: 0,
      jobApplications: 0,
      activeProjects: 0,
    },
    recentActivities: [],
    skillProgress: [],
    activeProjects: [], // Initialize activeProjects as an empty array
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ message: "Signup successful" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ email, field: user.field }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ success: true, message: "Login successful", token });
});

// Endpoint to get user statistics
app.get("/api/user-stats", (req, res) => {
  const email = req.query.email; // Assume email is passed as a query parameter
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.userStats);
});

// Endpoint to get recent activities
app.get("/api/recent-activities", (req, res) => {
  const email = req.query.email; // Assume email is passed as a query parameter
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.recentActivities);
});

// Endpoint to get skill progress
app.get("/api/skill-progress", (req, res) => {
  const email = req.query.email; // Assume email is passed as a query parameter
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user.skillProgress);
});

// Endpoint to add a new active project
app.post("/api/active-projects", (req, res) => {
  const { email, project } = req.body; // Expecting email and project details in the request body
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Add the new project to the user's active projects
  user.activeProjects.push(project);

  // Update the userStats.activeProjects count
  user.userStats.activeProjects += 1;

  writeUsers(users); // Save the updated users list

  res.json({ message: "Project added successfully", project });
});

// Endpoint to update user fields
app.put("/api/update-user", (req, res) => {
  const { email, updates } = req.body; // Expecting email and updates in the request body
  let users = readUsers();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  users[userIndex] = { ...users[userIndex], ...updates };
  writeUsers(users); // Save the updated users list

  res.json({ message: "User updated successfully", user: users[userIndex] });
});

// Endpoint to delete an active project
app.delete("/api/active-projects", (req, res) => {
  const { email, projectTitle } = req.body; // Expecting email and project title in the request body
  let users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Find the index of the project to delete
  const projectIndex = user.activeProjects.findIndex((p) => p.title === projectTitle);

  if (projectIndex === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Remove the project from the activeProjects array
  user.activeProjects.splice(projectIndex, 1);

  // Update the userStats.activeProjects count
  user.userStats.activeProjects -= 1;

  writeUsers(users); // Save the updated users list

  res.json({ message: "Project deleted successfully" });
});

// Endpoint to get user details
app.get("/api/user", (req, res) => {
  const email = req.query.email; // Assume email is passed as a query parameter
  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ name: user.name }); // Return only the username
});

// Endpoint to get courses
app.get("/api/courses", (req, res) => {
  const courses = readCourses(); // Call the readCourses function
  res.json(courses);
});

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));