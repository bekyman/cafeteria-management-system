import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String
});

export default mongoose.overwriteMiddlewareResult("Customer", customerSchema);