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
    description: "Elevate your coding style with our premium Code & Coffee T-Shirt. Made from 100% premium cotton, this shirt features a unique design that every developer can relate to. Perfect for coding sessions, tech meetups, or just casual wear.",
    features: [
      "100% Premium Cotton",
      "Machine Wash Safe",
      "Premium Print Quality",
      "Regular Fit",
      "Unisex Design"
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'black', value: 'bg-gray-900' },
      { name: 'navy', value: 'bg-blue-900' },
      { name: 'gray', value: 'bg-gray-500' },
      { name: 'white', value: 'bg-white border border-gray-300' }
    ],
    images: [
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600',
      '/api/placeholder/600/600'
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Debugging Hoodie",
      price: 2499,
      image: '/api/placeholder/300/300',
      rating: 4.8
    },
    {
      id: 3,
      name: "Git Commit Mug",
      price: 499,
      image: '/api/placeholder/300/300',
      rating: 4.9
    },
    {
      id: 4,
      name: "Python Lover T-Shirt",
      price: 1299,
      image: '/api/placeholder/300/300',
      rating: 4.6
    },
    {
      id: 5,
      name: "JavaScript Hoodie",
      price: 2599,
      image: '/api/placeholder/300/300',
      rating: 4.7
    }
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders above ₹999"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure and encrypted payments"
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500">
                Home / T-Shirts / {product.name}
              </div>

              {/* Product Title and Rating */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>
                <p className="text-green-600 font-semibold">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full ${color.value} border-2 ${
                        selectedColor === color.name ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-semibold ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-900">Quantity:</span>
                  <div className="flex items-center space-x-3 border border-gray-300 rounded-lg px-3 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                    Buy Now
                  </button>
                </div>

                {/* Secondary Actions */}
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Heart className="w-5 h-5" />
                    <span>Add to Wishlist</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center text-blue-600 mb-2">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
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