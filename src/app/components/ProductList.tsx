// app/components/ProductList.tsx (Server Component)
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import TestCard from "./test_card";
import { Product } from "@/types/product";


export default async function ProductList() {
  const products: Product[] = await client.fetch(groq`*[_type == "product"]`);
  return <TestCard products={products} />;
}
