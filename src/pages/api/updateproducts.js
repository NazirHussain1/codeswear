import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(400).json({ success: false, error: error.message });
  }
}
