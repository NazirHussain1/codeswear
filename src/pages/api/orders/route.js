import connectDB from "@/utils/db";
import Order from "@/models/order";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ error: "Order not found" });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  }

  else if (req.method === "PUT") {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update order" });
    }
  }

  else if (req.method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: "Failed to delete order" });
    }
  }

  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
