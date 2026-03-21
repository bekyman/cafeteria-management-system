import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
        quantity: Number
      }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);