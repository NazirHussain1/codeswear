'use client';
import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDescription = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    id: 1,
    name: "Code & Coffee T-Shirt",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.5,
    reviews: 128,
    description:
      "Elevate your coding style with our premium Code & Coffee T-Shirt. Made from soft 100% cotton, featuring a crisp developer-friendly print. Ideal for everyday use, meetups, or long coding sessions.",
    features: [
      "100% Premium Cotton",
      "Machine Wash Safe",
      "Premium Print Quality",
      "Regular Fit",
      "Unisex Design",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "black", value: "bg-gray-900" },
      { name: "navy", value: "bg-blue-900" },
      { name: "gray", value: "bg-gray-500" },
      { name: "white", value: "bg-white border border-gray-300" },
    ],
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Debugging Hoodie",
      price: 2499,
      image: "/api/placeholder/300/300",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Git Commit Mug",
      price: 499,
      image: "/api/placeholder/300/300",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Python Lover T-Shirt",
      price: 1299,
      image: "/api/placeholder/300/300",
      rating: 4.6,
    },
    {
      id: 5,
      name: "JavaScript Hoodie",
      price: 2599,
      image: "/api/placeholder/300/300",
      rating: 4.7,
    },
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Orders above ₹999 ship free",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% encrypted transactions",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "30-Day Returns",
      description: "Easy no-questions return",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* PRODUCT CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT - IMAGES */}
            <div className="space-y-5">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                      activeImage === index
                        ? "border-blue-600"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - PRODUCT INFO */}
            <div className="space-y-6">

              <div className="text-sm text-gray-500">
                Home / Clothing / T-Shirts / {product.name}
              </div>

              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* RATING */}
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} • {product.reviews} Reviews
                </span>
              </div>

              {/* PRICE */}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>
                <p className="text-green-600 font-semibold">
                  Inclusive of all taxes
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <h3 className="font-semibold text-lg">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* FEATURES */}
              <div>
                <h3 className="font-semibold text-lg">Features</h3>
                <ul className="grid grid-cols-2 gap-2 mt-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLOR */}
              <div>
                <h3 className="font-semibold text-lg">Color</h3>
                <div className="flex space-x-4 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full ${color.value} border ${
                        selectedColor === color.name
                          ? "border-blue-500 ring-2 ring-blue-300"
                          : "border-gray-300"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* SIZES */}
              <div>
                <h3 className="font-semibold text-lg">Size</h3>
                <div className="flex gap-3 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition font-semibold ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY + BUTTONS */}
              <div className="space-y-4">

                {/* QUANTITY */}
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">Quantity</span>
                  <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 text-xl font-bold hover:text-blue-600"
                    >
                      –
                    </button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 text-xl font-bold hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ADD TO CART + BUY */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center space-x-2 transition">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 rounded-lg transition">
                    Buy Now
                  </button>
                </div>

                {/* WISHLIST + SHARE */}
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>

                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* SHIPPING FEATURES */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                {features.map((f, i) => (
                  <div key={i} className="text-center">
                    <div className="text-blue-600 flex justify-center">{f.icon}</div>
                    <h4 className="font-semibold mt-1 text-sm">{f.title}</h4>
                    <p className="text-gray-600 text-xs">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
