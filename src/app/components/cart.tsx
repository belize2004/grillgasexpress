'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { urlFor } from '@/sanity/lib/image';
import { toast } from 'react-hot-toast';
import DeliveryFormModal from './form'; // 👈 Import Modal
import { CustomerInfo } from '@/types/customer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://mexvjgivsfadabaakqfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leHZqZ2l2c2ZhZGFiYWFrcWZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjA5MDY2OCwiZXhwIjoyMDYxNjY2NjY4fQ.UE9ufO2xI4NfO3gnonUsOA0Ln6_xIide0EAftIRbwi0';
const supabase = createClient(supabaseUrl, supabaseKey);
interface Address {
  addressLine1: string;
  addressLine2: string;
  locality: string;                     // City
  administrativeDistrictLevel1: string; // State
  postalCode: string;
  county:string;                   // ZIP code
}

interface DeliveryFormData {
  firstName: string;
  lastName: string;
  address: Address;
  phone: string;
  email: string;
  deliveryOption: string;
  message: string;
}
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false); // 👈 Control modal
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const salesTax = +(subtotal * 0.1).toFixed(2);
  // const total = +(subtotal + salesTax).toFixed(2);
  
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

  // Function to save order data to Supabase
  const saveOrderToSupabase = async (formData: CustomerInfo) => {
    try {
      // Prepare cart items for JSON storage - simplified to only name, quantity, and total
      const cartItemsForDB = cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        total: item.price * item.quantity
      }));

      // Create order object
      const orderData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phone,
        address: formData.address,
        delivery_option: formData.deliveryOption || 'Standard Delivery (2-5 Days)',
        message: formData.message || null,
        total_amount: subtotal,
        cart_items: JSON.stringify(cartItemsForDB),
        status: 'pending' // Add payment status field
      };

      console.log('Saving order to Supabase:', orderData);

      // Insert order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select('id')
        .single();

      if (error) {
        console.error('Error saving order to Supabase:', error);
        throw error;
      }

      console.log('Order saved successfully:', data);
      
      // Return the order ID
      return data.id;
    } catch (error) {
      console.error('Failed to save order to Supabase:', error);
      throw error;
    }
  };

  // For production - call after successful payment
  const handleConfirmDelivery = async (formData: CustomerInfo) => {
    const { firstName, lastName, email, address, phone } = formData;
    setIsProcessing(true);
    
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
          customer: { firstName, lastName, email, address, phone },
       
        }),
      });
    
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      const newOrderId = await saveOrderToSupabase(formData);
      console.log('Created order with ID:', newOrderId);
      
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      toast.error('Checkout failed: ' + err);
    } finally {
      setIsProcessing(false);
    }
  };

  
  
  // Show order success message if order was placed
  if (orderSuccess && orderId) {
    return (
      <section className="px-6 py-10 max-w-4xl mx-auto bg-white rounded-xl shadow">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Order Placed Successfully!</h2>
          <p className="mb-2">Your order ID is: <span className="font-bold">{orderId}</span></p>
          <p className="mb-6">We've received your order and will process it shortly.</p>
          <button
            onClick={() => {
              setOrderSuccess(false);
              setOrderId(null);
            }}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }
  
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
        {/* <p>Sales Tax: <span className="font-medium">${salesTax}</span></p> */}
        {/* <p className="text-lg font-bold">Total: ${total}</p> */}
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
        onConfirm={handleConfirmDelivery} // This handler gets checkout URL then saves order
        isProcessing={isProcessing}
        total={subtotal}
      />
    </section>
  );
};

export default Cart;
