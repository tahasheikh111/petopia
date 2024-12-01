import dbConnect from "@/lib/mongodb";
import PetSitter from "@/models/PetSitter";

export default async function handler(req, res) {
    await dbConnect();
  if (req.method === 'DELETE') {
    // Delete Pet Sitter
    try {
      const { id } = req.body; // ID is passed in the body
      console.log(id);

      // Delete pet sitter by ID
      const result = await PetSitter.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'PetSitter not found' });
      }

      return res.status(200).json({ message: 'PetSitter deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete PetSitter' });
    }
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
