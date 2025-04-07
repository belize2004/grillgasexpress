// components/Hero.tsx


export default function Hero() {
    return (
        
          <section id="home" className="py-20 bg-[#F1F1F1]">
  <div className="mx-auto px-4 max-w-7xl">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Text Content - Takes 50% width on desktop */}
      <div className="md:w-[50%]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
        <span className="font-light --font-lato">Tired of Running Out of Gas?</span><br />
        <span className="font-light">We&apos;ve Got You</span><span className="font-bold --font-lato"> Covered!</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 font-medium">
          Fast & Reliable Propane Supply – Because Every Drop<br />Counts!
        </p>
      </div>

      {/* Image Container - Takes 45% width on desktop */}
      <div className="md:w-[45%] flex justify-end">
        <img 
          src="/right_hero.png" 
          alt="Propane gas cylinder"
          className="w-full max-w-[500px] md:max-w-none rounded-lg"
        />
      </div>
    </div>
  </div>

        {/* <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
            <span className="font-light --font-lato">Tired of Running Out of Gas?</span><br />
            <span className="font-light">We've Got You</span><span className="font-bold --font-lato"> Covered!</span>
          </h1>
          <span className="text-lg text-left md:text-xl mb-8 max-w-xl mx-auto font-light">
            Fast & Reliable Propane Supply – Because Every Drop Counts!
          </span>
          <div className="md:w-1/2">  
          <Image
                src="/right_hero.png"
                alt="right section image"
                width={200}  // Set your desired dimensions
                height={400}
                className="w-full h-auto max-w-md mx-auto rounded-lg shadow-xl transition-transform hover:scale-105"
                priority // Optional for above-the-fold images
                />
             </div> 
        </div> */}
      </section>
    );
  }
  