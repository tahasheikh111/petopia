import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Find all PetSitters associated with the given user ID and populate user details
      const petSitters = await PetSitter.find({ user: id }).populate('user');
      
      if (!petSitters || petSitters.length === 0) {
        return res.status(404).json({ error: 'No PetSitters found for this user' });
      }

      res.status(200).json(petSitters);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
        const updatedPetSitter = await PetSitter.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedPetSitter) return res.status(404).json({ error: 'PetSitter not found' });
      
        res.status(200).json(updatedPetSitter);
        }catch (error) {
        res.status(400).json({ error: error.message });
        }
    }
    else if (req.method === 'DELETE') {
        try {
          const deletedPetSitter = await PetSitter.findByIdAndDelete(id);
          if (!deletedPetSitter) return res.status(404).json({ error: 'PetSitter not found' });
      
          res.status(200).json({ message: 'PetSitter deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
    }
  
}
