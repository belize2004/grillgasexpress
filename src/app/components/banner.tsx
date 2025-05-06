// components/Banner.tsx
import Image from 'next/image';

export default function Banner() {
    return (
      <>
        <div className="w-full aspect-[16/9] md:aspect-[3/1] relative">
          <Image
            src="/banner.png"
            alt="Free delivery banner image"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>

        {/* Delivery Info Section */}
        <div className="mx-auto px-4 md:px-8 max-w-7xl my-8">
          <div className="grid md:grid-cols-2 gap-8 bg-gray-50 rounded-lg overflow-hidden shadow-sm">
            {/* Hassle-Free Delivery Section */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Hassle-Free Propane Delivery</h2>
              <p className="text-gray-700 mb-4">
                No more running out of gas or dragging propane tanks to refill stations. We deliver 
                straight to your doorstep — and <span className="font-semibold">always bring an extra cylinder</span>, so you're never 
                caught without propane. You <span className="font-semibold">only pay for propane</span> through our <span className="font-semibold">cylinder 
                exchange program</span>.
              </p>
            
            </div>

            {/* Areas We Serve Section */}
            <div className="bg-white p-6 md:p-8 border-l border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl">🌎</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Areas We Serve</h2>
              </div>
              <p className="mb-3 text-gray-700">Also delivering to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Cantonment, Perdido Key, Gulf Breeze, Pensacola Beach,</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Navarre, Sand Destin</span>
                </li>
              </ul>
         
            </div>
          </div>
        </div>
      </>
    );
}
  