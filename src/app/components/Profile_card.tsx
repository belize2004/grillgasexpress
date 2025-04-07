import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { GoArrowUpRight } from "react-icons/go";
import { Profile } from "@/types/profile"; 

export default async function ProfileCard() {
  const profiles = await client.fetch(groq`*[_type=="profileCard"]`) as any;
  console.log(profiles);

  return (
    <div className="flex flex-wrap gap-4 pl-8 pb-6">
      {profiles.map((item: Profile, index: number) => (
        <div
          key={item._id || index}
          className="max-w-[200px] bg-white rounded-2xl  overflow-hidden relative"
        >
          {/* Image with arrow icon */}
          <div className="relative">
            <img
              src={urlFor(item.image).url()}
              alt={item.name}
              className="w-full h-auto object-cover rounded-t-2xl"
            />
            {item.externalLink || (
              <a
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 bg-white rounded-full p-1 m-1 shadow-sm hover:bg-gray-100 transition"
              >
                 <GoArrowUpRight className="text-white-500  md:w-4 md:h-4" />
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
  );
}
