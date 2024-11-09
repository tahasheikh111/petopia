import mongoose from 'mongoose';

const PetSitterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet_type: { type: [String], required: true }, // Array of pet types
  hourly_rate: { type: Number, required: true },
  experience: { type: Number, required: true }, // Changed to Number
  location: {
    address: { type: String, required: true }, // Address is required
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  availability: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
});

export default mongoose.models.PetSitter || mongoose.model('PetSitter', PetSitterSchema);
