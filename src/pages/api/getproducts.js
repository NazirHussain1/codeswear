import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export default async function handler(req, res) {
  try {
    const { category } = req.query; // Query parameter for specific category
    
    await connectDB();
    const products = await Product.find();

    // Agar specific category ka request hai
    if (category) {
      const categoryProducts = products.filter((p) => 
        p.category.toLowerCase() === category.toLowerCase()
      );
      
      if (category.toLowerCase() === 'tshirt') {
        // Tshirts ke liye existing logic
        let tshirts = {};
        for (let item of categoryProducts) {
          if (tshirts[item.title]) {
            if (
              !tshirts[item.title].color.includes(item.color) &&
              item.availableQty > 0
            ) {
              tshirts[item.title].color.push(item.color);
            }
            if (
              !tshirts[item.title].size.includes(item.size) &&
              item.availableQty > 0
            ) {
              tshirts[item.title].size.push(item.size);
            }
          } else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
              tshirts[item.title].color = [item.color];
              tshirts[item.title].size = [item.size];
            } else {
              tshirts[item.title].color = [];
              tshirts[item.title].size = [];
            }
          }
        }
        return res.status(200).json({ success: true, data: Object.values(tshirts) });
      } else {
        // Hoodies, mugs, stickers ke liye simple filter
        return res.status(200).json({ success: true, data: categoryProducts });
      }
    }

    // All products ke liye existing logic
    const tshirtProducts = products.filter((p) => p.category.toLowerCase() === "tshirt");
    const otherProducts = products.filter((p) => p.category.toLowerCase() !== "tshirt");

    let tshirts = {};
    for (let item of tshirtProducts) {
      if (tshirts[item.title]) {
        if (
          !tshirts[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          tshirts[item.title].color.push(item.color);
        }
        if (
          !tshirts[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          tshirts[item.title].size.push(item.size);
        }
      } else {
        tshirts[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          tshirts[item.title].color = [item.color];
          tshirts[item.title].size = [item.size];
        } else {
          tshirts[item.title].color = [];
          tshirts[item.title].size = [];
        }
      }
    }

    const finalProducts = [...Object.values(tshirts), ...otherProducts];
    return res.status(200).json({ success: true, data: finalProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}