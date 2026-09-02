"use client";

import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";
const Capabilities = () => {
  return (
    <section className="w-full bg-white pb-16">
      <SectionHeader title="Capabilities" maintitle="about us"  />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="relative w-full h-full mx-auto flex items-center justify-center ">
                     <Image
                       src="/images/cap1.png"
                       width={600}
                       height={350}
                       alt="Leader 1"
                       className="sm:object-cover sm:object-center "
                     />
                   </div>

          <div className="flex flex-col justify-center items-center text-center md:text-start lg:px-6 xl:px-9">
            <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg    leading-relaxed text-center md:text-start max-sm:mt-5 max-sm:px-6">
              At Natraj Aluform Pvt. Ltd., our capabilities are driven by innovation, precision, and a deep understanding of aluminium manufacturing. We have built strong infrastructure and streamlined processes that allow us to deliver consistent quality, high performance, and customized solutions for diverse industry needs.
            </p>
            <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg  leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
              Our facility is designed to handle complex production requirements with efficiency and accuracy. From raw material processing to finished product delivery, every stage is controlled with advanced technology and strict quality standards.
            </p>
            <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg  leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
              We focus on continuous improvement, adopting modern techniques and upgrading our systems to ensure reliability, scalability, and long-term value for our customers.
            </p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
 <Image
                       src="/images/cap2.png"
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
          <div className="lg:px-6 xl:px-9">
             <span className=" px-2 py-2 md:border md:border-[#F39E00] text-[#F39E00] md:font-normal rounded-full md:bg-[#fffbf2] hover:bg-yellow-50 duration-300 text-md md:text-sm tracking-widest md:tracking-normal  md:hidden w-[80%] flex justify-center mx-auto ">
              What We Do Best
            </span>
            <button className="px-2 py-2 normal-case text-[#F39E00]  text-md hidden md:block text-md lg:text-2xl xl:text-2xl">
              What We Do Best
            </button>

            <div className="mt-6 space-y-6 text-[#524F4B] leading-relaxed max-sm:text-center text-start px-3 max-sm:text-sm  lg:text-lg ">
              <p>
                <strong>Aluminium Extrusion:</strong><br />
                We manufacture high-quality aluminium profiles with excellent dimensional accuracy, strength, and surface finish.
              </p>

              <p>
                <strong>Custom Profile Manufacturing:</strong><br />
                We develop specialized aluminium sections based on customer drawings, technical needs, and application requirements.
              </p>

              <p>
                <strong>Surface Treatment Solutions:</strong><br />
                We offer premium finishing solutions such as anodizing and powder coating to enhance durability, corrosion resistance, and aesthetics.
              </p>

              <p>
                <strong>Precision Fabrication:</strong><br />
                Our advanced cutting, drilling, punching, and machining capabilities deliver ready-to-assemble aluminium components.
              </p>

              
            </div>
          </div>

         <div className="relative w-full h-full mx-auto flex items-center justify-center ">
                     <Image
                       src="/images/cap2.png"
                       width={600}
                       height={350}
                       alt="Leader 1"
                        className=" md:block hidden " 
                     />
                   </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div className="relative w-full h-full mx-auto flex items-center justify-center">
                    <Image
                      src="/images/cap3.png"
                      width={350}
                      height={350}
                     className="
    
    
    w-full
    object-contain
  "
                      alt="Business Partnership"
                    />
                  </div>

          <div>
            <span className=" w-full tracking-widest md:tracking-normal py-2 md:border md:border-[#F39E00] text-[#F39E00] md:font-normal rounded-full md:bg-[#fffbf2] hover:bg-yellow-50 duration-300 text-md md:text-sm   md:hidden w-[60%] flex justify-center mx-auto">
             Manufacturing Strength
            </span>
           <button className="px-2 py-2  text-[#F39E00]  text-md hidden md:block lg:px-6 xl:px-9 text-md lg:text-2xl xl:text-2xl">
              Manufacturing Strength
            </button>

            <ul className="mt-6 text-[#524F4B] leading-relaxed md:list-disc pl-3 space-y-4 max-sm:text-center md:space-y-4 max-sm:text-sm  lg:text-lg lg:px-6 xl:px-9">
                <h3 className="text-md font-bold">Our modern facility includes:</h3>
              <li>High-capacity extrusion presses</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>CNC-operated cutting and machining equipment</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Advanced surface treatment lines</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>In-house testing and inspection laboratories</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
               <li>in house Die Manufacturing (Die Manufacturing upto 1000 MM diameter)</li>
               
            </ul>
          </div>
          <div className="relative w-full h-full mx-auto flex items-center justify-center">
                   
                  </div>
        </div>

      </div>
    </section>
  );
};

export default Capabilities;
