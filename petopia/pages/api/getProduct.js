import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
 
      await dbConnect();

    if (req.method === "POST") {
      const { id, status } = req.body;

      if (status === "id" && id) {
        // Fetch product by ID
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({ product });
      } else {
        return res.status(400).json({ error: "Invalid request" });
      }
    } else if (req.method === "GET") {
      // Fetch all products
      const products = await Product.find();
      return res.status(200).json({ prod: products });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}