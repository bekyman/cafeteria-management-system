import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/database.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/password.js";

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  await User.deleteMany({ email: "admin@moh.gov.et" });

  const admin = await User.create({
    name: "System Administrator",
    email: "admin@moh.gov.et",
    employeeId: "MOH-ADMIN-001",
    password: hashPassword("12345678"),
    role: "ADMIN",
    userType: "EMPLOYEE",
  });

  console.log("✅ Admin Created:", admin.email);

  process.exit();
};

seedAdmin();