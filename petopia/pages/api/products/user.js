import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const products = await Product.find({ user: userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
