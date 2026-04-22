import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

const ORG_EMAIL_DOMAIN =
  (process.env.ORG_EMAIL_DOMAIN || "organization.com").toLowerCase();

const isOrgEmail = (email) =>
  email.toLowerCase().endsWith(`@${ORG_EMAIL_DOMAIN}`);

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, password } = req.body;

    if (!name || !email || !employeeId || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!isOrgEmail(email)) {
      return res.status(400).json({
        message: `Use organization email (@${ORG_EMAIL_DOMAIN})`,
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be ≥ 8 characters" });
    }

    const exists = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { employeeId }],
    });

    if (exists)
      return res.status(409).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      employeeId,
      password: hashPassword(password),
      userType: "EMPLOYEE",
      role: "EMPLOYEE",
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Employee registered",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Credentials required" });

    const user = await User.findOne({
      $or: [
        { email: username.toLowerCase() },
        { employeeId: username },
      ],
    }).select("+password");

    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      role: user.role,
      userType: user.userType,
      employeeId: user.employeeId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  employeeId: user.employeeId,
  role: user.role,
  userType: user.userType,
});