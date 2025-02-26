import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ token, message: "Login successful", user: { userId: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Fetch user from database
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }
    res.status(200).json({ user }); // Return user data
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};