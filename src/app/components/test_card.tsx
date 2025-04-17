// app/components/TestCard.tsx
'use client';

import { Product } from "@/types/product";
import { urlFor } from "@/sanity/lib/image";
import { GoArrowUpRight } from "react-icons/go";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

type Props = {
  products: Product[];
};

export default function TestCard({ products }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="lg:pl-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-6 overflow-x-auto scrollbar-hide pb-5 px-4 lg:px-0 justify-center">
        {products.map((product, index) => (
          <div
            key={product._id || index}
            className="min-w-[260px] w-full max-w-xs bg-[#F1F1F1] rounded-2xl shadow-lg pt-2 flex-shrink-0"
          >
            <h2 className="text-base font-medium text-gray-800 px-3 mb-3">{product.name}</h2>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mx-3 mb-3">
              {product.image && (
                <img
                  src={urlFor(product.image).url()}
                  alt={product.name || "Product image"}
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}

              <div className="absolute bottom-2 left-2 right-2 flex justify-center items-center">
                <span className="bg-[#E4E4E4] px-3 py-1 rounded-full text-sm font-medium text-black shadow-sm">
                  ${product.price}
                </span>

                <button
                  className="bg-[#027BFB] hover:bg-[#0066d6] lg:ml-2 ml-2 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-md"
                  onClick={() => {
                    addToCart({
                      _id: product._id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      quantity: 1,
                    });
                    toast.success(`${product.name} added to cart!`);
                  }}
                >
                  Order Now
                  <div className="rounded-full bg-white hover:bg-gray-200 p-1 transition-colors">
                    <GoArrowUpRight className="text-blue-500 w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
