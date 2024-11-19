import dbConnect from '@/lib/mongodb'; // Your MongoDB connection utility
import PetSitter from '@/models/PetSitter';

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection

  if (req.method === 'GET') {
    try {
      const petSitters = await PetSitter.find(); // Fetch all pet sitters
      res.status(200).json(petSitters); // Return as JSON response
    } catch (error) {
      console.error('Error fetching pet sitters:', error.message);
      res.status(500).json({ error: 'Failed to fetch pet sitters' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
