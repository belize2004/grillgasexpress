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
      <div className= "relative inline-block w-full aspect-[16/9] md:aspect-[3/1] relative">
        <Image
          src="/truck.png"
          alt="Free delivery to food truck"
          fill
          priority
          className="w-full object-fit"
          sizes="100vw"
        />
        <div className="text-overlay flex flex-col items-end absolute bottom-2 right-2  text-white px-2 py-1 rounded">  
          <span className="px-4">We Also Offer!</span>
          <div className="flex items-center justify-center h-screenflex flex row ">
               <div className="rounded-full text-center bg-white hover:bg-gray-300 transition-colors">
                              <button className="p-3">
                              <GoArrowUpRight className="text-black md:items-center w-2 h-2 md:w-4 md:h-4 lg:w-6 lg:h-6  " />
                              </button>
                          </div>
              <span className="text-3xl md:text-4xl px-4 py-4">Food Truck Gas Delivery</span>
          </div>     
        </div>
      </div>  
      
      </div>
      
    );
}