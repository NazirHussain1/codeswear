import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { IoBagCheckSharp } from "react-icons/io5";

const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  logoutUser,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setDropdown(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md top-0 bg-white sticky z-10">
      <div className="logo mx-5">
        <Link href="/">
          <Image src="/code.png" alt="logo Image" width={100} height={20} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex space-x-6 font-bold items-center md:text-xl">
          <li className="text-gray-600 hover:text-pink-700">
            <Link href="/tshirt">T-Shirts</Link>
          </li>
          <li className="text-gray-600 hover:text-pink-700">
            <Link href="/mugs">Mugs</Link>
          </li>
          <li className="text-gray-600 hover:text-pink-700">
            <Link href="/stickers">Stickers</Link>
          </li>
          <li className="text-gray-600 hover:text-pink-700">
            <Link href="/hoodies">Hoodies</Link>
          </li>
        </ul>
      </div>

      {/* Updated User Account Section */}
      <div className="cursor-pointer items-center cart absolute right-0 mt-6 top-4 mx-5 flex">
        {/* User Dropdown */}
        {user && (
          <div
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className="relative"
          >
            <div className="cursor-pointer flex items-center">
              <MdAccountCircle className="text-xl md:text-3xl mx-2 text-pink-600" />
            </div>

            {dropdown && (
              <div
                onMouseOver={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                className="absolute right-0 bg-white top-7 py-2 rounded-md px-4 w-40 shadow-lg border border-gray-200 z-50"
              >
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/myaccount"
                      className="block py-1 hover:text-pink-700 text-sm text-gray-700 transition-colors"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/orders"
                      className="block py-1 hover:text-pink-700 text-sm text-gray-700 transition-colors"
                    >
                      Orders
                    </Link>
                  </li>
                  <li
                    onClick={logout}
                    className=" block py-1 hover:text-pink-700 text-sm text-gray-700 transition-colors cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Login Button (when no user) */}
        {!user && (
          <Link
            href="/login"
            className="bg-pink-600 px-3 py-1 rounded-md text-sm text-white mx-2 hover:bg-pink-700 transition-colors"
          >
            Login
          </Link>
        )}

        {/* Cart Icon */}
        <IoCartOutline
          onClick={toggleCart}
          className="text-xl md:text-3xl text-gray-700 hover:text-pink-600 cursor-pointer transition-colors"
        />
      </div>

      {/* Shopping Cart Sidebar - RESPONSIVE FIXED */}
      <div
        ref={ref}
        className={`w-80 sm:w-82 h-screen sideCart overflow-y-auto absolute top-0 right-0 bg-pink-100 px-6 py-8 transform transition-transform duration-300 ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="cursor-pointer text-2xl text-pink-500 hover:text-pink-700"
          >
            <AiFillCloseCircle />
          </span>
        </div>

        {/* Cart Items Section - Proper Scroll Area */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          <ol className="list-decimal font-semibold space-y-4">
            {Object.keys(cart).length === 0 && (
              <div className="my-3 font-bold text-center text-gray-600">
                No items in the cart
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k} className="pb-3 border-b border-pink-200">
                  <div className="item flex justify-between items-center">
                    <div className="w-2/3 font-semibold text-sm sm:text-base">
                      {cart[k].name}
                      {cart[k].size && (
                        <span className="text-xs text-gray-500 ml-2">
                          ({cart[k].size})
                        </span>
                      )}
                    </div>
                    <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                      <AiFillMinusCircle
                        onClick={() =>
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].varient
                          )
                        }
                        className="cursor-pointer text-pink-500 hover:text-pink-700 text-xl"
                      />
                      <span className="mx-2 text-sm sm:text-base">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() =>
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].varient
                          )
                        }
                        className="cursor-pointer text-pink-500 hover:text-pink-700 text-xl"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Rs. {cart[k].price} x {cart[k].qty} = Rs. {cart[k].price * cart[k].qty}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Fixed Bottom Section */}
        <div className="border-t border-pink-300 pt-4 mt-4">
          <div className="font-bold text-lg mb-4 flex justify-between">
            <span>SubTotal:</span>
            <span>Rs.{subTotal}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/checkout" className="flex-1">
              <button className="w-full flex justify-center items-center text-white bg-pink-500 border-0 py-3 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm sm:text-base transition-colors">
                <IoBagCheckSharp className="mr-2" />
                Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex-1 text-white bg-pink-500 border-0 py-3 px-4 focus:outline-none hover:bg-pink-600 rounded text-sm sm:text-base transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;