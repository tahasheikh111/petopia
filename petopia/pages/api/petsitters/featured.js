// pages/api/petsitters/featured.js
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get 4 random pet sitters with the highest experience
    const petsitters = await PetSitter.aggregate([
      { $sort: { experience: -1 } }, // Sort by experience in descending order
      { $limit: 4 },  // Get the top 4 pet sitters
      {
        $lookup: {
          from: 'users',  // Reference to the 'users' collection in the 'test' database
          localField: 'user',  // The field in 'petsitters' containing the user reference (ObjectId)
          foreignField: '_id',  // The '_id' field in the 'users' collection
          as: 'user'  // Alias for the joined user data
        }
      },
      { $unwind: '$user' },  // Flatten the user data into the pet sitter document
      {
        $project: {
          'user.password': 0,  // Exclude the password field
          'user.__v': 0  // Exclude the __v versioning field
        }
      }
    ]);

    res.status(200).json(petsitters);
  } catch (error) {
    console.error('Featured petsitters error:', error);
    res.status(500).json({ message: 'Error fetching featured pet sitters' });
  }
}
