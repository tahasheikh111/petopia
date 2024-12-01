import dbConnect from "@/lib/mongodb"; // Assuming you have a MongoDB utility
import PetSitter from "@/models/PetSitter";

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { _id, ...updatedFields } = req.body;

      if (!_id) {
        return res.status(400).json({ error: "Missing pet sitter ID" });
      }

      // Connect to DB
      await dbConnect();

      // Update the specified fields only
      const result = await PetSitter.updateOne(
        { _id }, // Find by ID
        { $set: updatedFields } // Only update the provided fields
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "PetSitter not found or no changes made" });
      }

      return res.status(200).json({ message: "PetSitter updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update PetSitter" });
    }
  }

  // If method is not PUT
  res.status(405).json({ error: "Method Not Allowed" });
}
