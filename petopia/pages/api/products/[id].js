import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PUT":
      try {
        // No authentication required, just update the product based on the id
        const product = await Product.findOneAndUpdate(
          { _id: id },
          req.body,
          { new: true }
        );
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "DELETE":
      try {
        // No authentication required, just delete the product based on the id
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
