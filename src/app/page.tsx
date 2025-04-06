import Image from "next/image";
import { groq } from "next-sanity";
import {client} from "@/sanity/lib/client";
import Header from "./components/navbar";
import Hero from "./components/hero";
import Banner from "./components/banner";
import ProductSection from "./components/products";
import ProductCard from "./components/product_card";
import TestCard from "./components/test_card";

export default async function Home() {
  
  const products = await client.fetch(groq `*[_type=="product"]`);
  console.log(products);
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Header />
      <Hero />
      <Banner/>
      <ProductSection/>
      <TestCard/>
    </main>
  );
}
