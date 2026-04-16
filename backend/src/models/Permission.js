import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);
