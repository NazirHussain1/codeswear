'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Tshirt = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getproducts');
        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error:', err);
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
          {Object.keys(products).map((key) => {
            const product = products[key];
            return (
              <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-4">
                <Link href={`/product/${product.slug}`}>
                  <div className="block relative rounded overflow-hidden">
                    <img
                      alt={product.title}
                      className="m-auto md:mx-0 h-[30vh] md:h-[46vh] block object-cover w-full"
                      src={product.img}
                    />
                  </div>
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">Rs. {product.price}</p>

                  {/* Sizes */}
                  <div className="mt-2">
                    {product.size.includes('S') && <span className="border border-gray-300 px-1 mx-1">S</span>}
                    {product.size.includes('M') && <span className="border border-gray-300 px-1 mx-1">M</span>}
                    {product.size.includes('L') && <span className="border border-gray-300 px-1 mx-1">L</span>}
                    {product.size.includes('XL') && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                    {product.size.includes('XXL') && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                  </div>

                  {/* Colors */}
                  <div className="mt-2 flex items-center">
                    {product.color.includes('red') && (
                      <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {product.color.includes('blue') && (
                      <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {product.color.includes('green') && (
                      <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {product.color.includes('black') && (
                      <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tshirt;
