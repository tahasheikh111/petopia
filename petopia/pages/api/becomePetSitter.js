// pages/api/becomePetSitter.js
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';
import User from '@/models/User';

dbConnect();

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { userId, petType, hourlyRate, experience, availability, address,coordinates } = req.body;

            // Log request data for debugging
            console.log("Request body:", req.body);

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Log user data for debugging
            console.log("User found:", user);

            // Create a new PetSitter entry
            const newPetSitter = new PetSitter({
                user: userId,
                pet_type: petType.split(','), // Assumes petType is a comma-separated string
                hourly_rate: hourlyRate,
                experience,
                availability,
                location: {
                    address: address,
                    coordinates: { 
                        lat: coordinates['lat'], 
                        lng: coordinates['lng'] 
                    },
                },
            });

            // Log new PetSitter data for debugging
            console.log("New PetSitter data:", newPetSitter);

            // Save the new pet sitter to the database
            const savedPetSitter = await newPetSitter.save();

            // Update the user with the pet_sitter ID reference
            await User.findByIdAndUpdate(userId, { pet_sitter: savedPetSitter._id });

            // Send a success response
            res.status(200).json({ success: true, petSitter: savedPetSitter });
        } catch (error) {
            console.error('Error creating pet sitter:', error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        // Handle unsupported request methods
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
