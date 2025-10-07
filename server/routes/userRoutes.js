import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

// ✅ Fixed: Changed from "/api/login" to "/login"
router.post("/login", async (req, res) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/page", verifyToken, (req, res) => {
  res.status(200).json({ 
    message: "Welcome! You are logged in ✅",
    user: req.user // This comes from the verifyToken middleware
  });
});
// Replace your existing /event route with this:
router.get("/event", verifyToken, (req, res) => {
  res.status(200).json({ 
    message: "Welcome to event planning! ✈️",
    user: req.user 
  });
});

router.post("/event", verifyToken, (req, res) => {
  const { action, userId, timestamp } = req.body;
  const tripId = `trip_${Date.now()}_${req.user.id}`;
  
  res.status(200).json({ 
    message: "Trip planning started successfully",
    tripId: tripId,
    user: req.user 
  });
});
export default router;