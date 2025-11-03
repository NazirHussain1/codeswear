import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  // JazzCash Payment Function
  const initiateJazzCashPayment = async () => {
    // Form validation
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address || !userDetails.city || !userDetails.state || !userDetails.pinCode) {
      alert('Please fill all required fields');
      return;
    }

    if (subTotal < 1) {
      alert('Cart cannot be empty');
      return;
    }

    setLoading(true);

    try {
      console.log('Initiating JazzCash payment for amount:', subTotal);
      
      // JazzCash pre-transaction API call
      const response = await fetch('/api/pretransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: subTotal,
          email: userDetails.email,
          phone: userDetails.phone
        }),
      });

      const data = await response.json();
      console.log('Pre-transaction response:', data);

      if (data.success) {
        // JazzCash form submit karein
        submitToJazzCash(data.payload, data.jazzcashUrl);
      } else {
        alert(data.message || 'Payment initialization failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  // JazzCash ko form submit karein
  const submitToJazzCash = (payload, jazzcashUrl) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = jazzcashUrl;
    form.style.display = 'none';

    Object.keys(payload).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = payload[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    console.log('Submitting to JazzCash:', payload);
    form.submit();
  };

  return (
    <div className="container px-2 mx-auto">
      <h1 className="font-bold text-3xl my-8 text-center">CheckOut</h1>
      
      {/* Delivery Details Form */}
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            cols="30"
            rows="2"
            value={userDetails.address}
            onChange={handleInputChange}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            required
          ></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={userDetails.state}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pinCode" className="leading-7 text-sm text-gray-600">
              PinCode *
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={userDetails.pinCode}
              onChange={handleInputChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <h2 className="font-bold text-xl mt-8">2. Payment Method</h2>
      <div className="bg-white p-6 m-2 rounded-lg shadow">
        <div className="mb-4">
          <label className="flex items-center">
            <input type="radio" name="payment" defaultChecked className="mr-2" />
            <span className="font-semibold">JazzCash Payment Gateway</span>
          </label>
          <p className="text-sm text-gray-600 ml-6 mt-1">
            Secure payment via JazzCash
          </p>
        </div>

        <div className="mt-3 p-4 bg-blue-50 rounded border border-blue-200">
          <h4 className="font-bold text-sm mb-2">JazzCash Payment Info:</h4>
          <p className="text-sm">You will be redirected to JazzCash secure payment page</p>
          <p className="text-sm mt-2">✅ Secure Payment</p>
          <p className="text-sm">✅ Instant Confirmation</p>
        </div>
      </div>

      {/* Cart Items */}
      <h2 className="font-bold text-xl mt-8">3. Item Details</h2>
      <div className="sideCart bg-pink-100 p-6 m-2 rounded-lg">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-3 font-bold">No item in the cart</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5 justify-between">
                  <div className="font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant}) - Rs.{cart[k].price} x {cart[k].qty}
                  </div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}
                      className="cursor-pointer text-pink-500 text-2xl"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}
                      className="cursor-pointer text-pink-500 text-2xl"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="border-t border-pink-200 mt-4 pt-4">
          <span className="font-bold text-lg">SubTotal: Rs.{subTotal}</span>
        </div>
      </div>

      {/* Pay Button */}
      <div className="mx-4 mt-6">
        <button 
          onClick={initiateJazzCashPayment} 
          disabled={Object.keys(cart).length === 0 || loading}
          className="flex mr-1 mt-1 text-white bg-green-600 border-0 py-3 px-6 focus:outline-none hover:bg-green-700 rounded text-lg font-bold w-full justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Redirecting to JazzCash...
            </span>
          ) : (
            `Pay Rs.${subTotal} via JazzCash`
          )}
        </button>
        
        <p className="text-center text-sm text-gray-600 mt-2">
          Secure payment processed by JazzCash
        </p>
      </div>
    </div>
  );
};

export default Checkout;