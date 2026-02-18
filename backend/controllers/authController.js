const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const { createToken, setAuthCookie, clearAuthCookie } = require("../utils");

const normalizeEmail = (email = "") => email.toLowerCase().trim();

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail });

  if (existing) {
    return res.status(409).json({ message: "Account already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "student",
  });

  const token = createToken(user);
  setAuthCookie(res, token);

  return res.status(201).json({ user: sanitizeUser(user) });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: normalizeEmail(email) });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(user);
  setAuthCookie(res, token);

  return res.status(200).json({ user: sanitizeUser(user) });
};

const logoutUser = async (_req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logged out" });
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) {
    return res.status(200).json({ message: "If account exists, reset instructions were generated" });
  }

  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

  await PasswordReset.create({ user: user._id, token, expiresAt });

  return res.status(200).json({
    message: "Reset token generated. Use this token in reset password form.",
    resetToken: token,
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const resetDoc = await PasswordReset.findOne({ token, used: false, expiresAt: { $gt: new Date() } });

  if (!resetDoc) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(resetDoc.user, { password: hashed });
  resetDoc.used = true;
  await resetDoc.save();

  return res.status(200).json({ message: "Password reset successful" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
