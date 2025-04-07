import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { GoArrowUpRight } from "react-icons/go";
import { Profile } from "@/types/profile";

export default async function ProfileCard() {
  const profiles = await client.fetch(groq`*[_type=="profileCard"]`);

  return (
    <div className="px-4 pb-6">
      <div
        className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:flex lg:gap-4 lg:overflow-x-auto lg:scrollbar-hide
        "
      >
        {profiles.map((item: Profile, index: number) => (
          <div
            key={item._id || index}
            className="
              w-full lg:w-[250px]
              bg-white rounded-2xl overflow-hidden 
              relative flex-shrink-0
            "
          >
            {/* Image with arrow icon */}
            <div className="relative">
              <img
                src={urlFor(item.image).url()}
                alt={item.name}
                className="w-full h-auto object-fit rounded-t-2xl text-center"
              />
              {item.externalLink || (
                <a
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute top-4 right-6
                  sm:top-4 sm:right-5
                  bg-white rounded-full 
                  p-2 sm:p-2 md:p-2 
                  shadow-sm hover:bg-gray-100 transition
                "
              >
                <GoArrowUpRight 
                  className="w-6 h-6 sm:w-5 sm:h-5 md:w-5 md:h-5 text-gray-600" 
                />
              </a>
              
              )}
            </div>

            {/* Name and Role */}
            <div className="px-4 py-3 text-left">
              <h3 className="text-md font-semibold text-gray-900">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
