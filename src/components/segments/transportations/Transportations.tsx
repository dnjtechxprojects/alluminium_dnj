import React from 'react'
import SectionHeader from '@/components/common/SectionHeader'
import Image from 'next/image'
const Transportations = () => {
  return (
    <div>
      <SectionHeader title="Transportations" maintitle="segments"/>
   <div className="w-full py-10 px-4 md:px-12 lg:px-20 bg-white">
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center mb-10">
   
      <Image
        src="/images/trans1.png"
        width={250}
        height={250}
         className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0"
         alt="Business Partnership"
         />
        <div className='lg:px-6 xl:px-9 '>
          <div className="flex justify-center sm:justify-start">
  <span className="inline-block tracking-widest md:tracking-normal text-center py-1  text-[#F39E00]  text-md lg:text-2xl xl:text-2xl  normal-case">
   About Our Transportation Offering
  </span>
</div>

          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg    leading-relaxed text-center md:text-start max-sm:mt-5 max-sm:px-6 ">
              In today’s mobility-led world, lighter, stronger, and more efficient materials are essential. At Natraj Aluform, we specialize in aluminium extrusion profiles and fabricated components designed specifically for the transportation sector, including rail coaches, commercial vehicles, trailers, modular transport units and more.    </p>
              <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg  leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
              Our manufacturing systems are optimized for high-volume, high-precision production of aluminium profiles tailored to demanding transport-industry requirements: durability, safety, corrosion resistance, and long lifecycle performance. </p>
              </div>
      </div>
      
<div className="flex justify-center max-sm:mt-3">
  <span className="inline-block  text-center text-[#F39E00] text-md lg:text-2xl xl:text-2xl  normal-case tracking-widest md:tracking-normal">
   Solution Highlights
  </span>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-10 md:mt-7">
       
        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">Rail & Mass Transit Systems</h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           We deliver profiles for frames, body panels, roof and floor modules of trains, metros and light-rail systems, designed to reduce vehicle weight, improve energy efficiency and enhance durability.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb] ">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
           Commercial Vehicle & Trailer Profiles
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           Our aluminium sections are used in lighter truck bodies, trailers, refrigerated units, tankers and specialty transport vehicles, enabling increased payload, reduced fuel/energy consumption and extended service life.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
           Modular & Specialty Mobility Platforms
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           For modular transport pods, electric shuttles, mobility units and chassis systems, we supply custom aluminium extrusion solutions that support complex geometries, integrated fastening systems and assembly-ready fabrication.
          </p>
        </div>
      </div>
<div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ">
<Image
                              src="/images/trans2.png"
                               width={250}
                               height={250}
                                className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:hidden max-sm:mt-5"
                                alt="Business Partnership"
                                />
          <div className=''>
            <div className="flex justify-center items-center  sm:justify-start">
  <span className="inline-block px-2 text-[#F39E00] text-md lg:text-2xl xl:text-2xl  normal-case text-center  tracking-widest md:tracking-normal ">
  Why Use Aluminium from Natraj Aluform
  </span>
</div>

            <div className="mt-3 md:mt-6 space-y-6 max-sm:text-sm max-sm:text-center lg:text-lg md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3">
              <p>
                <strong>Weight Reduction = Improved Efficiency:</strong><br />
                Aluminium’s high strength-to-weight ratio enables lighter vehicle systems, crucial for fuel economy and extended range in EVs.
              </p>

              <p>
                <strong>Structural Performance & Safety:</strong><br />
                Extruded aluminium sections can be designed for crash-management, intrusion beams and rigid frames, meeting rigorous safety requirements.
              </p>

              <p>
                <strong>Design & Manufacturing Flexibility:</strong><br />
               Complex shapes, long spans and integrated profiles are possible with custom extrusion, supporting modern automotive design demands.
              </p>

              <p>
                <strong>Sustainability & Recyclability: </strong><br />
                Aluminium supports circular economy goals and contributes to those OEMs prioritising eco-friendly materials.
              </p>

            </div>
          </div>
        <div className='flex items-center'>
         <Image
                              src="/images/trans2.png"
                               width={250}
                               height={250}
                                className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 hidden md:block"
                                alt="Business Partnership"
                                />
                                </div>
        </div>
    </div>
    </div>
  )
}

export default Transportations
