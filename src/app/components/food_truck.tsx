import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
export default function FoodTruck() {
  return (
      <div className="pt-8">
        <h3 className="text-1xl uppercase text-center md:text-2xl lg:text-2xl mb-6 leading-tight">
        <span className="font-bold ">What Sets Us Apart?</span><br />
        <span className="font-bold"> Gas Delivered Straight to Your Food Truck!</span>
        </h3>
        <div className="relative  aspect-[16/9] md:aspect-[3/1] overflow-hidden rounded-2xl">
  {/* <div className="overflow-hidden"> */}
    <Image
      src="/truck.png"
      alt="Free delivery to food truck"
      fill
      priority
      className="object-cover"
      sizes="100vw"
    />
  {/* </div> */}

  <div className="absolute bottom-4 right-4 text-white text-right space-y-2 px-4 z-10">
    <span className="text-sm md:text-base">We Also Offer!</span>
    <div className="flex items-center space-x-3">
      <div className="bg-white rounded-full p-2 hover:bg-gray-300 transition">
        <GoArrowUpRight className="text-black w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
      </div>
      <span className="text-lg md:text-2xl lg:text-3xl font-semibold uppercase">
        Food Truck Gas Delivery
      </span>
    </div>
  </div>
</div>

      </div>
      
    );
}