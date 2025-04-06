// components/Hero.tsx
import Image from 'next/image';

export default function Banner() {
    return (
        <div className=" w-full aspect-[16/9] md:aspect-[3/1] relative">
  <Image
    src="/banner.png"
    alt="Free delivery banner image"
    fill
    priority
    className="object-contain object-center"
    sizes="100vw"
  />
</div>  
// mx-4 my-8 sm:mx-8 sm:my-12 md:mx-12 md:my-16
    );
  }
  