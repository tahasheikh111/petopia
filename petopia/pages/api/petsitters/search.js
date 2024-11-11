// pages/api/petsitters/search.js
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { petType, location } = req.query;
    let query = {};

    if (petType) {
      query.pet_type = petType;
    }

    if (location) {
      query['location.address'] = new RegExp(location, 'i');
    }

    const petsitters = await PetSitter.find(query)
      .populate('user', 'name email')
      .lean();

    res.status(200).json(petsitters);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching pet sitters' });
  }
}