import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { location } = req.body;
    const { lat, lng } = location;
    console.log("location:", location);
    console.log(lat, lng);

    try {


      const userId = location.userId;

      // Update user's location in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'location.coordinates': [lat, lng],
            'location.address': 'Unknown', // Optionally, use a geocoding API to convert lat/lng to an address
          },
        },
        { new: true }
      );

      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Error updating user location:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
