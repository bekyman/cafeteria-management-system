import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["EMPLOYEE", "GUEST"],
      default: "EMPLOYEE",
    },
    role: {
      type: String,
      enum: ["EMPLOYEE", "ADMIN", "MANAGER", "CASHIER", "INVENTORY"],
      default: "EMPLOYEE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);