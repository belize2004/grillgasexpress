// components/Cart.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from '@/types/cart';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    client
      .fetch(`*[_type == "cartItem"]`)
      .then(setCartItems)
      .catch(console.error);
  }, []);

  const handleQtyChange = (id: string, diff: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity + diff, 1) }
          : item
      )
    );
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
                {item.note && <p className="text-sm text-orange-500">{item.note}</p>}
                <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => handleQtyChange(item._id, -1)} className="px-2">−</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQtyChange(item._id, 1)} className="px-2">+</button>
            </div>

            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 space-y-2 text-right">
        <p>Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span></p>
        <p>Sales Tax: <span className="font-medium">${salesTax}</span></p>
        <p className="text-lg font-bold">Total: ${total}</p>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
          Check out
        </button>
      </div>
    </section>
  );
};

export default Cart;
