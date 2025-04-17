'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { urlFor } from '@/sanity/lib/image';
import { toast } from 'react-hot-toast';
import DeliveryFormModal from './form'; // 👈 Import Modal
import { CustomerInfo } from '@/types/customer';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false); // 👈 Control modal

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const salesTax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + salesTax).toFixed(2);
  console.log(cartItems);
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

  const handleConfirmDelivery = async (formData: CustomerInfo) => {
    const { firstName, lastName, email, address, phone } = formData;
    setIsProcessing(true);
    console.log(cartItems);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          customer: { firstName, lastName, email, address, phone }  // 👈 include delivery form data
        }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();

      if (data?.checkoutUrl) {
        toast.success('Redirecting to payment...');
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      toast.error('Checkout failed: ' + err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    
    <section id="#cart" className="px-6 py-10 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Your Cart ({cartItems.length} items)</h2>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div key={item._id} className="flex items-start justify-between border-b pb-4">
            <div className="flex items-start space-x-4">
              <Image src={urlFor(item.image).url()} alt={item.name} width={64} height={64} className="rounded" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button onClick={() => handleQtyChange(item._id, -1)} className="px-2">−</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQtyChange(item._id, 1)} className="px-2">+</button>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 text-sm ml-2">Remove</button>
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
          onClick={() => setShowDeliveryForm(true)}
          disabled={isProcessing || cartItems.length === 0}
        >
          {isProcessing ? 'Processing...' : 'Order Now'}
        </button>
      </div>

      {/* Delivery Modal 👇 */}
      <DeliveryFormModal
        isOpen={showDeliveryForm}
        onClose={() => setShowDeliveryForm(false)}
        onConfirm={handleConfirmDelivery}
        isProcessing={isProcessing}
        total={total}
      />
    </section>
  );
};

export default Cart;
