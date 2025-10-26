import React, { useState, useEffect } from "react";
import Link from "next/link";

const Tshirt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getproducts'); // Replace with your actual API route
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

  if (loading) {
    return (
      <div className="container mx-auto px-5 py-24">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 py-24">
        <div className="text-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((product) => (
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
                  <p className="mt-1">
                    Sizes: {product.size.join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Colors: {product.color.join(", ")}
                  </p>
          
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tshirt;