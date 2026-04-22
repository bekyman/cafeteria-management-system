import dotenv from "dotenv";
import connectDB from "../config/database.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    await User.create({
      name: "System Admin",
      email: "admin@moh.gov.et",
      password: "123456",
      role: "admin",
    });

    console.log("✅ Database Seeded");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();