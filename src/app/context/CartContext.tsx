// context/CartContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types/cart';
import toast from 'react-hot-toast';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => boolean;
  updateQuantity: (id: string, quantity: number) => void; 
  removeFromCart: (id: string) => void;
  clearCart:() => void;
  setCartItems: (items: CartItem[]) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // ✅ Persist cart to localStorage on change and update total items
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Calculate total items
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    console.log('Adding to cart:', newItem);
    
    const existing = cartItems.find(item => item._id === newItem._id);
    
    if (existing) {
      // Item already exists in cart, show error toast
      toast.error("This item is already in your cart!");
      return false;
    } else {
      // Add new item to cart
      setCartItems(prev => [...prev, newItem]);
      return true;
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };
  
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      setCartItems, 
      clearCart,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

