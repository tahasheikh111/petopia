import mongoose from 'mongoose';

const PetSitterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet_type: { type: [String], required: true },
  hourly_rate: { type: Number, required: true },
  experience: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  availability: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  imageUrl: { type: String, required: false }, // Add imageUrl field
});


export default mongoose.models.PetSitter || mongoose.model('PetSitter', PetSitterSchema);
