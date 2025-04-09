'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';


const ThankYouPage = () => {
  const { clearCart } = useCart(); // assuming you have a clearCart method

  useEffect(() => {
    clearCart();
    localStorage.removeItem('cart'); // if you persist cart in localStorage too
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Thank You! 🎉</h1>
      <p className="text-lg text-gray-600">
            Your order was successfully placed.
      </p>
    </div>
  );
};

export default ThankYouPage;
