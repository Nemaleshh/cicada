const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "users.json";
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

// 🔹 **Signup Route (Updated)**
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
  users.push({ name, age, field, email, password: hashedPassword });
  writeUsers(users);

  res.json({ message: "Signup successful" });
});

// 🔹 **Login Route (Updated)**
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

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
