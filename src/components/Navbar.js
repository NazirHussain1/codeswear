import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { IoCartOutline } from "react-icons/io5";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
 import { IoBagCheckSharp } from "react-icons/io5";
const Navbar = ({cart,addToCart, removeFromCart,clearCart,subTotal}) => {
  console.log({cart,addToCart, removeFromCart,clearCart,subTotal})
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

 
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md top-0 bg-white sticky z-10 ">
      <div className="logo mx-5">
        <Link href="/">
          <Image src="/code.png" alt="logo Image" width={100} height={20} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex space-x-6 font-bold items-center md:text-xl">
          <li>
            <Link href="/tshirt">T-Shirts</Link>
          </li>
          <li>
            <Link href="/mugs">Mugs</Link>
          </li>
          <li>
            <Link href="/stickers">Stickers</Link>
          </li>
          <li>
            <Link href="/hoodies">Hoodies</Link>
          </li>
        </ul>
      </div>
      <div
        onClick={toggleCart}
        className="cursor-pointer cart right-0 absolute mx-5 mt-4"
      >
        <IoCartOutline className=" text-xl md:text-3xl " />
      </div>
      <div
        ref={ref}
       className={`w-64 h-[100] sideCart absolute top-0 right-0 bg-pink-100 
       px-8 py-10 transform transition-transform duration-300 ${Object.keys(cart).length!==0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>

        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
       
        <ol className="list-decimal font-semibold">
        {Object.keys(cart).length === 0 && (
    <div className="my-3 font-bold">No item in the cart</div>
  )}
        {Object.keys(cart).map((k) => {
  return (
    <li key={k}>
      <div className="item flex my-5">
        <div className="w-2/3 font-semibold">{cart[k].name}</div>
        <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
          <AiFillMinusCircle
            onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient)}
            className="cursor-pointer text-pink-500"
          />
          <span className="mx-2 text-sm">{cart[k].qty}</span>
          <AiFillPlusCircle
            onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient)}
            className="cursor-pointer text-pink-500"
          />
        </div>
      </div>
    </li>
  );
})}
                   
        </ol>
         <div className="font-bold mt-2">SubTotal:Rs.{subTotal}</div>
       <div className="flex">
         <Link href="/checkout"><button className="flex mr-1 mt-1 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
        <IoBagCheckSharp  className="m-1"/>                   
        CheckOut</button></Link> 
         <button className="flex mr-2 mt-1 text-white bg-pink-500 border-0 py-2 px-4 focus:outline-none hover:bg-pink-600 rounded text-lg">
                         
        AddtoCart</button>
       </div>
      </div>
    </div>
  );
};

export default Navbar;
