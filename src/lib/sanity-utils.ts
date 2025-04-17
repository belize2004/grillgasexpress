// sanity-utils.ts
import { createClient } from 'next-sanity';
import { groq } from 'next-sanity';
import { Product} from '@/types/product'; // adjust path if needed
import { Profile } from '@/types/profile';
import { Testimonial} from '@/types/testimonial';
import { client } from "@/sanity/lib/client";


// ✅ Get products
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(groq`*[_type == "product"]`);
}

// ✅ Get profiles
export async function getProfiles(): Promise<Profile[]> {
  return await client.fetch(groq`*[_type=="profileCard"]`);
}

// ✅ Get testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(groq`*[_type=="testimonial"]`);
}
