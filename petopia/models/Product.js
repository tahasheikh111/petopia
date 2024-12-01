import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

dbConnect();

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrll: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
