import mongoose from "mongoose";

export const ORDER_STATUSES = ["Pending", "Preparing", "Ready", "Served"];

const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one item is required",
      },
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("validate", function updateTotalAmount(next) {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
  next();
});

export default mongoose.model("Order", orderSchema);
