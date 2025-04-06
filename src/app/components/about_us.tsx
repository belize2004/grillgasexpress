// components/Hero.tsx
import Image from 'next/image';

export default function AboutUs() {
    return (
        <div className=" w-full  aspect-[16/9] md:aspect-[2/1] relative">
  <Image
    src="/aboutus.png"
    alt="About Us"
    fill
    priority
    className="object-contain pl-8  object-center"
    sizes="100vw"
  />
</div>
    );
  }
  