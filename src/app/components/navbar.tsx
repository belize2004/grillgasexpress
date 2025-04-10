"use client";
// components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="GrillGasExpress Logo" width={110} height={90} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2 p-2 bg-white rounded-[50px] shadow-md">
                          {/* <div className="flex items-center px-4 py-2 rounded-full bg-gray-300 shadow-inner max-w-md">
                              <FaSearch className="text-white text-lg mr-3" />
                              <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent outline-none text-white placeholder-white w-full"
                              />
                            </div> */}
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
                        className="hover:text-blue-500 transition px-6 py-2 rounded-[50px] hover:bg-white"
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
          <Link href="#home" className="hover:text-blue-500 transition">Home</Link>
          <Link href="#product" className="hover:text-blue-500 transition">Products</Link>
          <Link href="/cart" className="hover:text-blue-500 transition">Cart</Link>
        </nav>
      )}
    </header>
  );
}
