"use client";

import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";

const Dealers = () => {
  return (
    <section className="w-full bg-white pb-10">
      <SectionHeader title="Dealers" maintitle="about us"  />
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 items-center">

          <div className="relative w-full h-full mx-auto flex items-center justify-center">
            <Image
              src="/images/dealer1.png"
              
             width={600}
    height={350}
    alt="Leader 1"
    className="
     
      sm:object-cover
      sm:object-center 
    
      
    "
            />
          </div>

          <div className=" lg:px-6 xl:px-9 flex justify-center flex-col items-center text-[#4a5565] leading-relaxed text-[15px] md:text-[16px] text-center md:text-start">
            <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg   leading-relaxed text-center md:text-start max-sm:mt-5 max-sm:px-6">
              At Natraj Aluform Pvt. Ltd., our dealer network plays a vital role in
              delivering high-quality aluminium products to customers across
              regions. We believe in building strong, long-term partnerships
              based on trust, transparency, and mutual growth.
            </p>

            <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
              Our dealers are more than just distributors, they are strategic
              partners who help us expand our reach while maintaining the
              highest standards of service and product quality.
            </p>

            <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
              We offer our dealers a strong product portfolio, consistent
              supply, competitive pricing, and full technical and marketing
              support to help them grow their business with confidence.
            </p>

            
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10 items-center mt-6 md:mt-10">
          
<Image
              src="/images/dealer2.png"
                      width={600}
                   height={350}
                  alt="Leader 1"
                    className="
    md:hidden
    mx-auto
    block
    object-contain max-sm:mt-5
  "
            />
            <button className="px-2 py-3 md:border md:border-[#F39E00] text-[#F39E00]  md:font-normal rounded-full md:bg-[#fffbf2] hover:bg-yellow-50 duration-300 text-md md:text-sm  tracking-widest md:tracking-normal md:hidden w-[70%] flex justify-center mx-auto">
              Why Partner With Us
            </button>
          <div>
            <button className="px-2 normal-case text-[#F39E00] duration-300 text-md lg:text-2xl xl:text-2xl hidden md:block lg:px-6 xl:px-9  ">
              Why Partner With Us
            </button>

            <div className=" md:mt-8 text-gray-800 text-[15px] leading-6 lg:px-6 xl:px-9 ">
              <p className=" mb-3 text-xl text-center md:text-start">
                We provide our dealers with:
              </p>
              <ul className=" md:list-disc max-sm:text-center ml-6 space-y-4 md:space-y-4 text-[#524F4B] max-sm:text-sm  lg:text-lg">
                <li>Consistent product quality</li>
                   <hr className="flex items-center  border-[#e5e7eb]" />
                <li>Reliable supply chain support</li>
                   <hr className="flex items-center  border-[#e5e7eb]" />
                <li>Competitive margins</li>
                   <hr className="flex items-center  border-[#e5e7eb]" />
                <li>Marketing and branding assistance</li>
                   <hr className="flex items-center  border-[#e5e7eb]" />
                <li>Technical support and training</li>
              </ul>
            </div>
          </div> 

          <div className="relative w-full h-full mx-auto flex items-center justify-center">
            <Image
              src="/images/dealer2.png"
                      width={600}
                   height={350}
                  alt="Leader 1"
                  className=" md:block hidden h-full"  
      
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dealers;
