import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

await connectDB();

await User.deleteMany();

await User.create([
  {
    name: "System Admin",
    email: "admin@moh.gov.et",
    password: "123456",
    role: "admin",
  },
]);

console.log("✅ Database seeded");

process.exit();