import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("FoodItem", foodSchema);