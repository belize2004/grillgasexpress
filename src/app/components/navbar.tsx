"use client";
// components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GrillGasExpress Logo" width={50} height={50} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2 p-2 bg-white rounded-[50px] shadow-md">
            <Link href="#home" className="hover:text-orange-500 transition px-6 py-2 rounded-[50px] font-lato hover:bg-white">
                        Home
                    </Link>
                    <Link 
                        href="#product" 
                        className="hover:text-orange-500 transition px-6 py-2 rounded-[50px] hover:bg-white font-lato"
                    >
                        Products
                    </Link>
                    <Link 
                        href="#products" 
                        className="hover:text-orange-500 transition px-6 py-2 rounded-[50px] hover:bg-white font-lato"
                    >
                        Offers
                    </Link>
                    <Link 
                        href="#cart" 
                        className="hover:text-orange-500 transition px-6 py-2 rounded-[50px] hover:bg-white"
                    >
                        Cart
                    </Link>
                    </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3 text-gray-700 font-medium">
          <Link href="#home" className="hover:text-orange-500 transition">Home</Link>
          <Link href="#products" className="hover:text-orange-500 transition">Products</Link>
          <Link href="#cart" className="hover:text-orange-500 transition">Cart</Link>
        </nav>
      )}
    </header>
  );
}
