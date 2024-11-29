import mongoose from "mongoose";
import dbConnect from '@/lib/mongodb';

dbConnect();
const CartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1, required: true},
    status: { type: String, default: "Pending", required: true},
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
