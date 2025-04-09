// components/Cart.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { urlFor } from '@/sanity/lib/image';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQtyChange = (id: string, diff: number) => {
    const item = cartItems.find(i => i._id === id);
    if (item) {
      const newQty = item.quantity + diff;
      if (newQty <= 0) {
        removeFromCart(id);
      } else {
        updateQuantity(id, newQty);
      }
    }
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
  
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
  
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }
  
      const data = await response.json();
      if (data?.checkoutUrl) {
        toast.success('Redirecting to payment...');
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Checkout URL not found');
      }
    } catch (err: any) {
      toast.error(`Checkout failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
  

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const salesTax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + salesTax).toFixed(2);

  return (
    <section id='#cart' className="px-6 py-10 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Cart ({cartItems.length} items)</h2>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item._id} className="flex items-start justify-between border-b pb-4">
            <div className="flex items-start space-x-4">
              <Image
                src={urlFor(item.image).url()}
                alt={item.title}
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => handleQtyChange(item._id, -1)} className="px-2">−</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQtyChange(item._id, 1)} className="px-2">+</button>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-sm ml-2"
              >
                Remove
              </button>
            </div>

            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 space-y-2 text-right">
        <p>Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span></p>
        <p>Sales Tax: <span className="font-medium">${salesTax}</span></p>
        <p className="text-lg font-bold">Total: ${total}</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          onClick={handleOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Order Now'}
        </button>
      </div>
    </section>
  );
};

export default Cart;
