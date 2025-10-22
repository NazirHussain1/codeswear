import React from "react";

const Description = () => {
  const product = {
    name: "Apple AirPods Pro (2nd Gen)",
    price: "Rs. 59,999",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
    shortDesc: "Active Noise Cancellation, Transparency Mode, and Adaptive EQ.",
    fullDesc:
      "The Apple AirPods Pro (2nd Gen) offer a truly immersive listening experience with advanced Active Noise Cancellation and Adaptive Transparency. Designed for all-day comfort, they come with a customizable fit and up to 6 hours of listening time on a single charge. Powered by the H2 chip for superior sound quality and seamless connectivity.",
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-80 h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-2">{product.shortDesc}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">{product.price}</p>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.fullDesc}</p>
      </div>
    </div>
  );
};

export default Description;
