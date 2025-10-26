'use client';
import React from "react";

const Description = () => {
  const product = {
    name: "CodeWear Developer Hoodie",
    price: "Rs. 3,499",
    image: "https://images.unsplash.com/photo-1618354691373-d851c4bfbf1c?auto=format&fit=crop&w=800&q=80",
    shortDesc: "Soft cotton hoodie with a minimalist 'Eat, Sleep, Code, Repeat' print.",
    fullDesc:
      "Stay warm and stylish with the CodeWear Developer Hoodie — crafted from premium cotton for all-day comfort. Designed especially for programmers and tech lovers, this hoodie blends comfort with creativity. Perfect for work, hackathons, or casual wear. Available in multiple colors and sizes for the perfect fit.",
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
            className="w-80 h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-gray-700 mb-2">{product.shortDesc}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">{product.price}</p>

          <button className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">{product.fullDesc}</p>
      </div>

      {/* More Products Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Explore More from CodeWear</h3>
        <p className="text-gray-700">
          Discover our exclusive range of <span className="font-medium text-gray-900">T-Shirts, Mugs, Hoodies, Stickers, and Tech Accessories</span> — all crafted for developers and creators who live and breathe code.
        </p>
      </div>
    </div>
  );
};

export default Description;
