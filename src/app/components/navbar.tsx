"use client";
// components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile,setIsMobile] = useState(false);
  const { totalItems } = useCart();

  
  
  // Check if window width is mobile on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);  
    };
    
    // Check on initial load
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <header className="bg-[#F1F1F1] relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GrillGasExpress Logo" width={110} height={90} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2 p-2 bg-white rounded-[50px] shadow-md">
          <Link href="#home" className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] font-lato hover:bg-white">
            Home
          </Link> 
          <Link 
            href="#product" 
            className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] hover:bg-white font-lato"
          >
            Products
          </Link>
          <Link 
            href="#products" 
            className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] hover:bg-white font-lato"
          >
            Offers
          </Link>
          <Link 
            href="#products" 
            className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] hover:bg-white font-lato"
          >
            Login / Signup
          </Link>
          <Link 
            href="/cart" 
            className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] hover:bg-white relative"
          >
            <div className="flex items-center">
              <FaShoppingCart className="mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </nav>

        {/* Hamburger Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <button
            className="flex items-center justify-center w-10 h-10 text-2xl z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-black absolute ${isMobile?'transition-all':'transition-all'} duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}></div>
            <div className={`w-6 h-0.5 bg-black absolute transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-0.5 bg-black absolute transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Nav Sliding Panel */}
      <nav 
        className={`fixed top-0 right-0 h-full bg-white w-64 z-40 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-4 h-full">
          <div className="pb-4 border-b border-gray-200">
            <Image src="/logo.png" alt="GrillGasExpress Logo" width={110} height={90} />
          </div>
          <div className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link href="#home" className="px-2 py-3 hover:bg-gray-100 rounded-md transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#product" className="px-2 py-3 hover:bg-gray-100 rounded-md transition" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="#products" className="px-2 py-3 hover:bg-gray-100 rounded-md transition" onClick={() => setIsOpen(false)}>Offers</Link>
            <Link href="#products" className="px-2 py-3 hover:bg-gray-100 rounded-md transition" onClick={() => setIsOpen(false)}>Login / Signup</Link>
            <Link href="/cart" className="px-2 py-3 hover:bg-gray-100 rounded-md transition flex items-center" onClick={() => setIsOpen(false)}>
              <FaShoppingCart className="mr-2" />
              Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
