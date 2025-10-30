"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Stickers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Stickers ke liye specific API call
        const response = await fetch("/api/getproducts?category=stickers");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        console.log(result);

        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch stickers");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto px-5 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-5 py-24 text-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-4"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="block relative rounded overflow-hidden">
                  <img
                    alt={product.title}
                    className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block object-contain"
                    src={product.img}
                  />
                </div>
              </Link>
              <div className="mt-4 text-center">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.title}
                </h2>
                <p className="mt-1">Rs. {product.price}</p>
                
                {/* Stickers ke liye colors show karein */}
                <div className="mt-2 flex justify-center items-center">
                  {product.color && product.color.includes("White") && (
                    <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Black") && (
                    <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Red") && (
                    <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Blue") && (
                    <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Green") && (
                    <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Yellow") && (
                    <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {product.color && product.color.includes("Pink") && (
                    <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* No products message */}
          {products.length === 0 && !loading && (
            <div className="container mx-auto px-5 py-24 text-center">
              No stickers found
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Stickers;