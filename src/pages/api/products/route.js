import connectDB from "@/utils/db";
import Product from "@/models/product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  } 
  
  else if (req.method === "POST") {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: "Error creating product" });
    }
  } 
  
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
