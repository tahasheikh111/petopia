// pages/api/becomePetSitter.js
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';
import User from '@/models/User';

dbConnect();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { userId, petType, hourlyRate, experience, availability, address, coordinates, imageUrl } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const newPetSitter = new PetSitter({
        user: userId,
        pet_type: petType.split(','),
        hourly_rate: hourlyRate,
        experience,
        availability,
        location: {
          address: address,
          coordinates: { lat: coordinates.lat, lng: coordinates.lng },
        },
        imageUrl, // Include image URL
      });

      const savedPetSitter = await newPetSitter.save();
      await User.findByIdAndUpdate(userId, { pet_sitter: savedPetSitter._id });

      res.status(200).json({ success: true, petSitter: savedPetSitter });
    } catch (error) {
      console.error('Error creating pet sitter:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
};

