"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="absolute top-[18%] md:top-[14%] lg:top-[7.5%] z-10 w-full text-center px-5 xl:mt-24 md:-mt-">
        <h1 className="text-[#0a0a0a] text-3xl sm:text-4xl lg:text-7xl xl:text-7xl  leading-tight md:text-4xl lg:font-normal">
          Engineering
        </h1>

        <div className="flex justify-center">
          
          <Image
            src="/images/premium.png"
            alt="Natraj Aluform Logo"
            width={680}
            height={300}
            className="mt-2 w-[80%] sm:w-[400px] md:w-[400px] lg:w-[680px] xl:w-[630px] xl:h-[120px]  lg:h-[130px]  2xl:mt-4"
          />
        </div>

        <h1 className="text-[#0a0a0a] text-3xl sm:text-4xl lg:text-7xl xl:text-7xl leading-tight mt-1 md:text-4xl lg:font-normal ">
          for Modern Industries
        </h1>

        <p className="text-[#4a5565] text-sm sm:text-base lg:text-lg md:mt-1 max-w-xl mx-auto px-4 sm:px-0  xl:text-xl  2xl:px-1">
          Transform your vision with precision-engineered aluminium
          extrusions. Sustainable manufacturing meets cutting-edge
          technology for architectural and industrial excellence.
        </p>
      </div>

      <div className="max-w-full mx-auto xl:-mt-20">
        <div className="relative w-full overflow-hidden">

          <video
            className="w-full h-auto hidden md:block"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/Web.mp4" type="video/mp4" />
          </video>

          <video
            className="w-full h-auto md:hidden block mt-[14%] "
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/Mobile.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
