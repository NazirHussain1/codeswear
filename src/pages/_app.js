import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import LoadingBar from "react-top-loading-bar";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // ✅ Correct LoadingBar events
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    });
    
    router.events.on('routeChangeComplete', () => { // ✅ routeChangeComplete use karo
      setProgress(100);
    });
    
    router.events.on('routeChangeError', () => { // ✅ Error case ke liye bhi
      setProgress(100);
    });

    console.log("I run on every render!");
    try {
      // Cart load karna
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
      
      // User load karna
      if (localStorage.getItem("user")) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    // ✅ Cleanup function
    return () => {
      router.events.off('routeChangeStart', () => {
        setProgress(40);
      });
      router.events.off('routeChangeComplete', () => {
        setProgress(100);
      });
      router.events.off('routeChangeError', () => {
        setProgress(100);
      });
    };
  }, [router]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { slug: { qty: 1, price, name, size, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // ✅ User login/logout functions
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <>
      <LoadingBar
        color="#db2777"
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar 
        key={subTotal}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        user={user}
        logoutUser={logoutUser}
      />
      <Component
        cart={cart}
        buyNow={buyNow}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        user={user}
        loginUser={loginUser}
        logoutUser={logoutUser}
        {...pageProps}
      />
      
      <Footer />
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}