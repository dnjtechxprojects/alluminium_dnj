import React from 'react'
import SectionHeader from '@/components/common/SectionHeader'
import PaperBackground from '@/components/common/PaperBackground'
import Image from 'next/image'
const Renewableenergy = () => {
  return (
    <div>
      <SectionHeader title="Renewable Energy" maintitle="segments"/>
   <PaperBackground className="w-full py-10 px-4 md:px-12 lg:px-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center">
        <Image
          src="/images/renew1.png"
          width={784}
          height={527}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          preload
          className="object-cover w-full h-[250px] md:h-auto md:w-full mx-auto lg:mx-0"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center md:justify-start">
            <span className="inline-block px-2 tracking-widest md:tracking-normal normal-case text-[#F39E00] text-md lg:text-2xl xl:text-2xl">
              Introduction
            </span>
          </div>
          <p className="text-[#524F4B] max-sm:text-sm lg:text-lg leading-relaxed text-center md:text-start mt-3 md:mt-6 max-sm:mt-5 max-sm:px-6">
            Renewable energy is reshaping the future of power, infrastructure, and sustainability. At Natraj Aluform Pvt. Ltd., we design and manufacture aluminium solutions that support the backbone of green energy systems, making them stronger, lighter, more durable, and easier to deploy. </p>
          <p className="text-[#524F4B] max-sm:text-sm lg:text-lg leading-relaxed text-center md:text-start mt-4 max-sm:mt-7 max-sm:px-6">
            Our aluminium extrusion and fabrication capabilities help build resilient renewable energy structures that perform reliably under harsh environmental and long operational lifecycles. From solar panel frames and wind turbine components to supporting energy storage and transmission infrastructure, our aluminium products are designed to enhance efficiency, reduce weight, and simplify installation. </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <Image
          src="/images/renew2.png"
          width={1200}
          height={800}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover w-full h-[250px] md:h-auto md:w-full mx-auto lg:mx-0 md:order-last max-sm:mt-5"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
            <span className="tracking-widest md:tracking-normal inline-block px-2 py-3 normal-case text-[#F39E00] text-md lg:text-2xl xl:text-2xl">
              Renewable Energy
            </span>
          </div>

          <div className="mt-3 md:mt-6 max-sm:text-center space-y-6 md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3 max-sm:text-sm lg:text-lg">
            <p>
              <strong>Solar Energy Systems:</strong><br />
           Our aluminium frames and structural profiles are designed for rooftop solar, ground-mounted plants, and large-scale solar farms. </p>
            <p>
              <strong>Wind Energy Infrastructure:</strong><br />
              We manufacture precision aluminium components for wind turbine structures, including access platforms, internal supports, and maintenance systems. </p>

            <p>
              <strong>Energy Storage Systems:</strong><br />
            Our engineered aluminium profiles are ideal for housing battery storage units, power cabinets, and modular energy storage containers.</p>

            <p>
              <strong>Green Hydrogen & Emerging Tech:</strong><br />
              We provide custom aluminium parts and structures for hydrogen energy systems and next-generation renewable infrastructure.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <Image
          src="/images/renew3.png"
          width={1200}
          height={800}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover w-full h-[250px] md:h-auto md:w-full mx-auto lg:mx-0 max-sm:mt-5"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
            <span className="tracking-widest md:tracking-normal inline-block px-2 text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case text-center">
              Why Aluminium for Renewable Energy
            </span>
          </div>
          <ul className="mt-3 md:mt-6 text-[#524F4B] leading-relaxed max-sm:text-center md:list-disc pl-3 space-y-4 md:space-y-4 text-start px-3 max-sm:text-sm lg:text-lg">
            <li>Excellent corrosion resistance for outdoor environments </li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Lightweight structures for faster installation and reduced logistics cost</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>High structural performance for long service life</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Recyclable and eco-friendly material properties</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Customizable designs for evolving green technologies</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Durability under Extreme Conditions</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
          </ul>
        </div>
      </div>
         <div className="flex justify-center mt-6 md:mt-10">
        <span className="tracking-widest md:tracking-normal inline-block px-2 text-center py-3  text-[#F39E00] text-md lg:text-2xl xl:text-2xl  normal-case ">
             Technology & Manufacturing Focus
            </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
       
        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">Advanced Extrusion Technology</h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           Our cutting-edge extrusion processes allow us to manufacture complex aluminium profiles that support easy mounting, efficient cable management, modular assembly, and structural stability. These precision-engineered profiles are ideal for solar, wind, and energy storage applications, ensuring reliability and performance in mission-critical renewable energy systems.</p>
        </div>

        <div className=" p-6  border border-[#e5e7eb] ">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
            Fabrication-Ready Solutions
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           We provide pre-machined, cut-to-length, and ready-to-install aluminium components, streamlining the installation process and significantly reducing project timelines. This approach enhances efficiency, minimizes errors on-site, and supports scalable renewable energy infrastructure deployment.</p>
        </div>
        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
           Surface Treatment for Harsh Environments
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
            Our aluminium products feature specialized coatings, anodizing, and protective finishes, designed to resist UV exposure, humidity, corrosion, and extreme climatic conditions. This ensures long-term durability, low maintenance, and consistent performance across diverse renewable energy projects. </p>
        </div>
      </div>
    </PaperBackground>
    </div>
  )
}

export default Renewableenergy
