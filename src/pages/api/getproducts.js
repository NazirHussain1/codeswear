import product from '@/models/product'; // adjust your path as needed
import connectDB from '@/middleware/mongoose';

const handler = async (req, res) => {
  try {
    // Get all products from the database
    let products = await Product.find();

    // Step 1: Separate t-shirts from other categories
    let tshirtProducts = products.filter((p) => p.category === 'tshirt');
    let otherProducts = products.filter((p) => p.category !== 'tshirt');

    // Step 2: Apply your tshirt merging logic
    let tshirts = {};

    for (let item of tshirtProducts) {
      if (item.title in tshirts) {
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

    // Step 3: Merge tshirts and other products back together
    // Convert tshirts object into an array before merging
    const finalProducts = [
      ...Object.values(tshirts),
      ...otherProducts,
    ];

    res.status(200).json({
      success: true,
      data: finalProducts,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export default connectDB(handler);
