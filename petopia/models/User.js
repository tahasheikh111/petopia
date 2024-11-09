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
  profile_picture: { type: String, default: "" },
  location: {
    address: { type: String, default: "" },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    }
  },
  pet_sitter: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PetSitter', 
    default: null  // Set to null by default
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
