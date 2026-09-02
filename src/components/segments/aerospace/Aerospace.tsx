import React from 'react'
import SectionHeader from '@/components/common/SectionHeader'
import Image from 'next/image'
const Aerospace = () => {
  return (
    <div>
      <SectionHeader title="Aerospace" maintitle="segments" />
    <div className="w-full py-10 px-4 md:px-12 lg:px-20 bg-white">
                      <Image
                                 src="/images/aero3.png"
                                  width={250}
                                  height={250}
                                  className=" object-cover w-full h-[39vh] md:h-[60vh]"
                                   alt="Business Partnership"
                                   />
                                    <div className="w-full flex justify-center mb-2 md:mb-8">
        <button className=" py-3 mt-6 md:mt-10 text-md lg:text-2xl xl:text-2xl   md:font-normal   text-[#F39E00] md:normal-case tracking-widest md:tracking-normal">
          Our Aerospace Capabilities
        </button>
      </div>

      <div className="max-w-5xl mx-auto text-[#524F4B] max-sm:text-sm  lg:text-lg">
        <p className="text-[#524F4B] max-sm:text-sm   leading-relaxed text-center md:text-start max-sm:mt-5 max-sm:px-6 ">
         We provide end-to-end aluminium extrusion solutions for the aerospace sector: from alloy selection, billet casting, extrusion, heat-treatment, precision machining to final inspection. Our capabilities include:
        </p>

        <ul className="md:list-disc md:ml-6 max-sm:mt-8 mt-6 max-sm:text-center space-y-4 md:space-y-4 max-sm:text-sm  lg:text-lg text-start pb-10">
          <li>
            Custom profile development for fuselage frames, wing spars, hardware supports and interior structural systems.
          </li>
             <hr className="flex items-center  border-[#e5e7eb]" />
          <li>
           Fabrication readiness with CNC machining, drilling, punching and assembly to deliver components ready for integration.
          </li>
             <hr className="flex items-center  border-[#e5e7eb]" />
          <li>
           Surface and finishing options tailored for aerospace needs: corrosion resistance, fatigue control, aesthetic surface integrity.
          </li>
          
        </ul>
      </div>
      <div className="flex justify-center max-sm:mb-8 max-sm:mt-7 mb-4 md:mb-10 ">
        <span className="inline-block px-2 text-[#F39E00]  text-md lg:text-2xl xl:text-2xl  md:normal-case tracking-widest md:tracking-normal">
             Quick Facts
            </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
       
        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">Ultra-Lightweight Components</h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           Our extruded aluminium profiles enable significant weight reduction in aerospace applications, a key driver for fuel efficiency.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb] ">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
            Aerospace-Grade Alloys
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           We work with high-performance alloys (e.g., 2024, 7075) that withstand demanding fatigue, strength and thermal environments.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl  text-black mb-2">
           High Precision Tooling
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
            Die and extrusion systems optimized for tight tolerances, complex geometries and consistent quality.
          </p>
        </div>
      </div>
     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
 <Image
                           src="/images/aero2.png"
                            width={250}
                            height={250}
                             className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 max-sm:mt-5"
                             alt="Business Partnership"
                             />
          <div className='lg:px-6 xl:px-9'>
            <div className="flex justify-center sm:justify-start">
  <span className="inline-block px-2 py-3 text-[#F39E00] text-md lg:text-2xl xl:text-2xl  normal-case tracking-widest md:tracking-normal">
  Why Choose Us
  </span>
</div>

            <div className=" mt-2 md:mt-6 max-sm:text-sm  lg:text-lg  max-sm:text-center space-y-6 md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3">
              <p>
                <strong>Strength-to-Weight Optimized:</strong><br />
               Natraj Aluform’s aluminium extrusions are engineered to deliver maximum structural strength with minimal weight,  payload capacity, and aircraft performance.
              </p>

              <p>
                <strong>Stringent Quality & Traceability:</strong><br />
                We operate with rigorous quality systems that ensure full traceability of alloys, billets, and finished profiles.
              </p>

              <p>
                <strong>Customization & Flexibility:</strong><br />
               From complex cross-section designs and tight tolerances to specific alloy selection and tempering, we provide fully customized aluminium solutions tailored to the unique structural and functional needs of each aerospace project.
              </p>

              <p>
                <strong>Lifecycle & Sustainability:</strong><br />
                Aluminium’s long service life, corrosion resistance, and 100% recyclability make it ideal for sustainable aviation.    
              </p>

            </div>
          </div>

          
        </div>
    </div>
    </div>
  )
}

export default Aerospace
