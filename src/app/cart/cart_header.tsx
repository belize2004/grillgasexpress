"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function CartHeader() {
  const { totalItems } = useCart();
  
  return (
    <header className="bg-[#F1F1F1] relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GrillGasExpress Logo" width={110} height={90} />
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <FaShoppingCart className="text-xl mr-2" />
            <span className="text-xl md:text-2xl font-bold text-gray-700">Your Shopping Cart</span>
            {totalItems > 0 && (
              <span className="ml-2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 
