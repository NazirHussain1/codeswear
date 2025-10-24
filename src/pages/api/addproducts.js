import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
}
