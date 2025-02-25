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

// Read courses from JSON file
const readCourses = () => {
  if (!fs.existsSync(COURSES_FILE)) return [];
  return JSON.parse(fs.readFileSync(COURSES_FILE, "utf8"));
};

// 🔹 **Signup Route**
app.post("/signup", async (req, res) => {
  const { name, age, field, email, password } = req.body;
  if (!name || !age || !field || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = readUsers();
  if (users.some((u) => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, age, field, email, password: hashedPassword, completedCourses: [] });
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

  // Generate JWT Token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

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
    req.user = user;
    next();
  });
}

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
