import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {

    const { user_id, prod_name, prod_price, prod_description, prod_category, prod_image } = req.body;

    try {
      const newProduct = new Product({

        name: prod_name,
        price: prod_price,
        description: prod_description,
        category: prod_category,
        imageUrll: prod_image,
        user: user_id, // Associate product with logged-in user
      });

      await newProduct.save();
      res.status(200).json({ message: "Product added successfully", data: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Error adding product", error });
    }
  } else if (req.method === "GET") {
    try {
      const products = await Product.find({}).populate("user", "name email"); // Optionally populate user info
      res.status(200).json({ products, message: "Products retrieved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving products", error });
    }
  }
}
