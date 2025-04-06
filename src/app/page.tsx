import Image from "next/image";
import { groq } from "next-sanity";
import {client} from "@/sanity/lib/client";
import Header from "./components/navbar";
import Hero from "./components/hero";
import Banner from "./components/banner";
import ProductSection from "./components/products";
import ProductCard from "./components/food_truck";
import TestCard from "./components/test_card";
import FoodTruck from "./components/food_truck";
import TestimonialSection from "./components/testimonial_header";
import TestimonialCard from "./components/testimonial_card";
import AboutUs from "./components/about_us";
import TeamSection from "./components/team_header";
import ProfileCard from "./components/Profile_card";
import Footer from "./components/footer";

export default async function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <Header />
      <Hero />
      <Banner/>
      <ProductSection/>
      <TestCard/>
      <FoodTruck/>
      <TestimonialSection/>
      <TestimonialCard/>
      <AboutUs/>
      <TeamSection/>
      <ProfileCard/>
      <Footer/>
    </main>
  );
}
