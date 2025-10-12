import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart,setCart]=useState({})
  const [subTotal,setSubTotal]=useState(0)
useEffect(() => {
 
  console.log('I run on every render!');
  try{
if(localStorage.getItem("cart")){
setCart(JSON.parse(localStorage.getItem("cart")))
}
  }
  catch(error){
    console.error(error);
    localStorage.clear()

  }
},[]);
  
  const saveCart =(mycart)=>{
localStorage.setItem("cart",mycart);
let subt=0;
let Keys=Object.keys(cart);
for(i=0;keys.length;i++){
  subt +=mycart[keys[i]].price * mycart[keys[i]].qty
}
setSubTotal(subt)
  }
  const addToCart=(itemCode,qty,name,price,size,varient)=>{
    let newCart=cart;
if(itemCode in cart){
  newCart[itemCode].qty=cart[itemCode].qty+qty
} else{
  newCart[itemCode].qty={qty:1,name,price,size,varient}
}
setCart(newCart)
savecart(newCart)
  }
  const clearCart=()=>{
    setCart({})
  saveCart({})
  }
  const removeFromCart=(itemCode,qty,name,price,size,varient)=>{
    let newCart=cart;
if(itemCode in cart){
  newCart[itemCode].qty=cart[itemCode].qty-qty
}  if(newCart[itemCode].qty<=0){
  delete newCart[itemCode]
}
setCart(newCart)
savecart(newCart)
  }

  return <>
    <Navbar  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={setSubTotal}/>
    <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={setSubTotal} {...pageProps} />
       <Footer />
  </>;
}
