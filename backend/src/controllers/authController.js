import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

const ORG_EMAIL_DOMAIN = (
  process.env.ORG_EMAIL_DOMAIN || "organization.com"
).toLowerCase();

const isOrgEmail = (email) =>
  email.toLowerCase().endsWith(`@${ORG_EMAIL_DOMAIN}`);

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, password } = req.body;

    if (!name || !email || !employeeId || !password) {
      return res.status(400).json({
        message: "name, email, employeeId and password are required",
      });
    }

    if (!isOrgEmail(email)) {
      return res.status(400).json({
        message: `Only ${ORG_EMAIL_DOMAIN} email addresses can register as employees`,
      });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { employeeId }],
    }).select("_id");

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email or employeeId already exists" });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      employeeId,
      password: hashPassword(password),
      userType: "EMPLOYEE",
      role: "EMPLOYEE",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        userType: user.userType,
        employeeId: user.employeeId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Employee registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        userType: user.userType,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const user = await User.findOne({
      $or: [{ email: username }, { name: username }],
    }).select("_id role userType employeeId name email password");

    if (!user || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        userType: user.userType,
        employeeId: user.employeeId,
        username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        employeeId: user.employeeId,
        userType: user.userType,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};