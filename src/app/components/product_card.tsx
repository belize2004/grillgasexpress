import React from "react";
import Link from "next/link";

export default function ProductCard() {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src="/propane-tank-201b.png" // Replace with your image path
          alt="201b Propane Tank"
          className="h-40 object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">201b Propane Tank</h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-semibold text-orange-500">$21.99</span>
          <span className="text-sm text-gray-500">2 in stock</span>
        </div>

        <Link href="/order" legacyBehavior>
          <a className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors duration-300">
            Order Now
          </a>
        </Link>
      </div>
    </div>
  );
}