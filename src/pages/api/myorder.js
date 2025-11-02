import { connectDB } from "@/lib/db";
import Order from "@/models/order";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required"
      });
    }

    // Find orders for this user, sorted by latest first
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 }) // Latest first
      .lean();

    return res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("Orders fetch error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}