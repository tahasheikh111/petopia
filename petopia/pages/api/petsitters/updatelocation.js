import dbConnect from '@/lib/mongodb'; // Replace with your DB connection utility
import PetSitter from '@/models/PetSitter';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { id, address, coordinates } = req.body;

    try {
      const petSitter = await PetSitter.findByIdAndUpdate(
        id,
        {
          'location.address': address,
          'location.coordinates': coordinates,
        },
        { new: true }
      );
      return res.status(200).json(petSitter);
    } catch (error) {
      console.error('Error updating pet sitter:', error);
      return res.status(500).json({ error: 'Failed to update pet sitter' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
