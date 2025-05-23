import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Testimonial } from "@/types/testimonial";

export default async function TestimonialCard() {
  const testimonials = await client.fetch(groq`*[_type=="testimonial"]`);
    console.log(testimonials);
  const renderStars = (ratingString: string) => {
    const numericRating = parseInt(ratingString.split('/')[0]);

    return (
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${i < numericRating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        {/* <span className="ml-2 text-sm text-gray-600">{ratingString}</span> */}
      </div>
    );
  };

  return (
    <section className="px-4 py-8 md:px-8">
     <div className="overflow-x-auto pb-4 scrollbar-hide">
  <div className="flex space-x-6 snap-x snap-mandatory px-4 touch-pan-x">
    {testimonials.map((testimonial: Testimonial, index: number) => (
      <div
        key={testimonial._id || index}
        className="flex flex-col sm:flex-row bg-white rounded-xl border border-gray-200 shadow-sm p-4 min-h-[250px] w-[52vw] flex-shrink-0 snap-center"
      >
        {/* Image */}
        {testimonial.image && (
          <div className="sm:w-1/3 h-full flex justify-center items-center">
            <img
              src={urlFor(testimonial.image).url()}
              alt={testimonial.clientName || "Testimonial image"}
              className="h-full w-auto object-fit rounded-2xl"
            />
          </div>
        )}

        {/* Content */}
        <div className="sm:w-2/3 sm:pl-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {testimonial.clientName || "John Davis"}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {testimonial.content}
            </p>
          </div>
          {renderStars(testimonial.rating)}
        </div>
      </div>
    ))}
  </div>
</div>


    </section>
  );
}
