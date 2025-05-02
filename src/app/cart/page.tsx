// app/cart/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // ✅ Using react-icons

const Cart = dynamic(() => import('../components/cart'), { ssr: false });


export default function CartPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-100 pt-10 px-4 max-w-4xl mx-auto">
      {/* ✅ Back Button with react-icons */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex  items-center text-sm text-gray-700 hover:text-black"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <Cart />
    </main>
  );
}
