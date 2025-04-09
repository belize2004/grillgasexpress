// components/Hero.tsx
import Image from 'next/image';

export default function AboutUs() {
    return (
      <div className="w-[90vW] rounded-2xl items-center mx-auto border-4 border-[#d2e0d0] p-1 aspect-[16/9] md:aspect-[2/1] relative overflow-hidden">
      <Image
        src="/about_us_new.JPG"
        alt="About Us"
        fill
        priority
        className="object-cover object-center rounded-[16px]"
        sizes="100vw"
      />
    </div>
    
    );
  }
  