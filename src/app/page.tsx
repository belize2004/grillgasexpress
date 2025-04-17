import Header from "./components/navbar";
import Hero from "./components/hero";
import Banner from "./components/banner";
import ProductSection from "./components/products";
import FoodTruck from "./components/food_truck";
import TestimonialSection from "./components/testimonial_header";
import TestimonialCard from "./components/testimonial_card";
import AboutUs from "./components/about_us";
import TeamSection from "./components/team_header";
import ProfileCard from "./components/Profile_card";
import Footer from "./components/footer";
import ProductList from "./components/ProductList";
import { getProducts, getProfiles, getTestimonials } from "@/lib/sanity-utils";

export default async function Home() {
  const products = await getProducts();
  const profiles = await getProfiles();
  const testimonials = await getTestimonials();
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <div className="bg-[#f1f1f1]">
      <Header />
      <Hero />
      <Banner/>
      {/* Conditional Rendering */}
      {products.length > 0 && (
        <>
          <ProductSection />
          <ProductList />
        </>
      )}
      
      <FoodTruck/>
      {testimonials.length > 0 && (
        <>
          <TestimonialSection />
          <TestimonialCard />
        </>
      )}
      <AboutUs/>
      {profiles.length > 0 && (
        <>
           <div className="p-2"></div>
           <TeamSection/>
           <div className="p-2"></div>
           <ProfileCard />
        </>
      )}
      <Footer/>
      </div>
    </main>
  );
}
