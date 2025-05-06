// components/Hero.tsx

export default function Hero() {
    return (
      <section id="home" className="py-16 bg-[#F1F1F1]">
        <div className="mx-auto px-5 md:px-8 max-w-7xl">
          <div className="">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
              {/* Text Content - Takes 60% width on desktop */}
              <div className="w-full md:w-[60%]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-100 p-2 rounded-md">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-600 text-xl">✓</span>
                    <h3 className="text-xl font-semibold text-gray-800">Convenience Redefined</h3>
                  </div>
                  <ul className="space-y-3 pl-6">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">No need to be home for delivery.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Always have a <span className="font-medium">full backup tank</span> on hand.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Keep more propane for <span className="font-medium">less cost</span> — better value, every time.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Order online for <span className="font-medium">food trucks, RVs, forklifts, patio heaters, BBQ grills</span>, and more.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-gray-50 p-4 md:p-5 rounded-md">
                    <h3 className="font-medium text-lg mb-3 text-gray-800">Forget driving around to:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Home Depot</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Lowe's</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Walmart</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Gas stations</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 md:p-5 rounded-md">
                    <h3 className="font-medium text-lg mb-3 text-gray-800">No more:</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Waiting for a clerk with the key</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Dirty or greasy bottles staining your car</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Wasted time and gas</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Image Container - Takes 40% width on desktop */}
              <div className="w-full md:w-[40%] flex justify-center items-center mt-8 md:mt-0">
                <img 
                  src="/right_hero.png" 
                  alt="Propane delivery service"
                  className="w-full h-full "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  