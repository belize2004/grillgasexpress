// components/AboutUs.tsx
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="mx-auto px-4 md:px-8 max-w-7xl my-12">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Column */}
          <div className="relative h-72 md:h-full">
            <Image
              src="/about_us_new.JPG"
              alt="About Jason Jordan"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Content Column */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-lg">👨</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About Jason Jordan</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                Jason founded Grill Gas Express in 2014 in Memphis, TN after experiencing the 
                pain of running out of propane mid-cookout and hauling heavy tanks around town. 
                He ran the business for 7 years before selling it and launching a second location in 
                Pensacola, FL.
              </p>
              
              <p>
                Now with 300+ happy customers and expanding, Jason leads a 2-man team 
                (growing to 3 this summer), providing safe, convenient propane delivery with 
                friendly customer service and a smile. He lives in Pensacola with his wife Caroline 
                and their two kids, Larkin and Birdie.
              </p>
            </div>
            
          
          </div>
        </div>
      </div>
    </div>
  );
}
  