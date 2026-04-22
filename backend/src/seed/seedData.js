import dotenv from "dotenv";
import connectDB from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    await User.create({
      name: "System Administrator",
      email: "admin@moh.gov.et",
      employeeId: "MOH-ADMIN-001",
      password: "123456",
      userType: "EMPLOYEE",
      role: "ADMIN",
    });

    console.log("✅ Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();