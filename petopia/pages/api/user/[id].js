import User from "@/models/User";
import dbConnect from '@/lib/mongodb';

dbConnect();
export default async function handler(req, res) {
  const { id } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(id);

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the coordinates as a JSON response
    return res.status(200).json(user);
  } catch (error) {
    // Handle errors (e.g., database connection issues)
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
