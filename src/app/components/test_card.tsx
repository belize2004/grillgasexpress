import React from "react";
import Link from "next/link";
import { groq } from "next-sanity";
import {client} from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; // Sanity's image URL builder
import { product } from "@/sanity/schemas/product-schema";
import { GoArrowUpRight } from "react-icons/go";

export default async function TestCard() {
    
  const products = await client.fetch(groq `*[_type=="product"]`);
  return (
    <div className="pl-8">
    <div className="flex flex-row gap-6 overflow-x-auto pb-4">
    {products.map(
        (product:any,index:number)=>(
     <div key={product.id ||index} className="w-64 rounded-2xl bg-[#F1F1F1] pt-2 shadow-md">
      {/* Product Title */}
            <h2 className="text-base font-normal pl-2 text-gray-800 mb-3">
                {product.name}
            </h2>

      {/* Inner curved container with image + buttons */}
      <div className="relative rounded-2xl  overflow-hidden">
        {/* Product Image */}
        {product.image && (
          <img
            src={urlFor(product.image).url()}
            alt={product.name || "Product image"}
            className="h-60 w-full object-fill"
          />
        )}
        {/* Price & Button Overlay */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-center items-center">
          {/* Price Tag */}
          <span className="bg-[#E4E4E4] px-3 py-1 mx-3 rounded-full text-sm font-medium text-black shadow-sm">
          ${product.price}
          </span>

          {/* CTA Button */}
          <button className="bg-[#027BFB] hover:bg-[#0066d6] text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            Order Now
            <div className="rounded-full  bg-gray-100 hover:bg-gray-300 transition-colors">
                <GoArrowUpRight className="text-blue-500 w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
        )

    )}
    </div>
    </div>
  );
}