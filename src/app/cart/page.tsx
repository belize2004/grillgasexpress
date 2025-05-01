// app/cart/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // ✅ Using react-icons
import { createClient } from '@supabase/supabase-js';

const Cart = dynamic(() => import('../components/cart'), { ssr: false });

// Initialize Supabase client
const supabaseUrl = 'https://mexvjgivsfadabaakqfk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leHZqZ2l2c2ZhZGFiYWFrcWZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjA5MDY2OCwiZXhwIjoyMDYxNjY2NjY4fQ.UE9ufO2xI4NfO3gnonUsOA0Ln6_xIide0EAftIRbwi0';
const supabase = createClient(supabaseUrl, supabaseKey);

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
