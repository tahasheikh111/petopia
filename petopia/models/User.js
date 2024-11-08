// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: [String], 
    enum: ["user", "pet_sitter", "store_owner"], 
    default: ["user"] 
  },
  profile_picture: { type: String },
  location: {
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    }
  },
  services: { type: Array, default: [] }, // Only for pet sitters
  store_info: {
    store_name: { type: String },
    description: { type: String },
  }, // Only for store owners
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
