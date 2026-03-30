import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    // Unique permission key used by RBAC (ex: "sell_food")
    key: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);
