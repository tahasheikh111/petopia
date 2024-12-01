import dbConnect from '@/lib/mongodb';  // Ensure you have your dbConnect function properly set up
import PetSitter from '@/models/PetSitter';  // PetSitter model

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      // Connect to the MongoDB database

      // Fetch all pet sitters, populating the user information
      const result = await PetSitter.find({})
        .populate('user', 'name email')
        .lean();

      // Return the result as a JSON response
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching pet sitters' });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
