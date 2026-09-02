import React from 'react'
import Image from 'next/image'
import SectionHeader from '@/components/common/SectionHeader'
const Automobile = () => {
  return (
    <div>
      <SectionHeader title="Automobile" maintitle="segments"/>
     <div className="w-full py-10  px-4 md:px-12 lg:px-20 bg-white">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center mb-10">
   
         <Image
                   src="/images/auto1.png"
                    width={250}
                    height={250}
                    className=" w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0"

                     alt="Business Partnership"
                     />
       <div className='lg:px-6 xl:px-9'>
          <button className="rounded-full tracking-widest md:tracking-normal  md:mt-0  text-[#F39E00] text-md lg:text-2xl xl:text-2xl  mb-3 flex mx-auto md:mx-0 normal-case ">
            Introduction
          </button>

          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg   leading-relaxed text-center md:text-start max-sm:mt-5 max-sm:px-6 " >
In the dynamic world of automotive manufacturing, performance, weight reduction, durability and design flexibility are key. At Natraj Aluform, we leverage our advanced aluminium extrusion and fabrication capabilities to deliver solutions tailored to the automotive sector, including conventional vehicles, electric vehicles (EVs) and commercial transport.          </p>
<p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg leading-relaxed text-center md:text-start max-sm:mt-7 max-sm:px-6">
Drawing on best practices from global leaders, our composites address   stringent standards of strength, structural integrity and aesthetic finish. Our aluminium components help manufacturers achieve lighter, stronger, and more energy-efficient vehicles, directly contributing to improved fuel efficiency, extended EV range, and lower emissions. </p>
        </div>
      </div>
      <div className="lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center">

          <Image
                    src="/images/auto2.png"
                     width={250}
                     height={250}
                    className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:hidden max-sm:mt-5"

                      alt="Business Partnership"
                      />
          <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
  <span className="inline-block px-2 tracking-widest md:tracking-normal text-center  text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case ">
    Why Aluminium Matters in Automotive
  </span>
</div>


            <div className="mt-3 md:mt-6 max-sm:text-sm max-sm:text-center lg:text-lg space-y-6 md:space-y-4 text-[#524F4B] leading-relaxed text-start px-2">
              <p>
                <strong>Weight Reduction = Improved Efficiency:</strong><br />
                Aluminium offers an exceptional strength-to-weight ratio, allowing vehicle structures to be significantly lighter without compromising durability or safety. 
              </p>

              <p>
                <strong>Structural Performance & Safety:</strong><br />
Extruded aluminium profiles can be precisely engineered for crash-management zones, intrusion beams, subframes, and rigid body structures.             </p>

              <p>
                <strong>Design & Manufacturing Flexibility:</strong><br />
With aluminium extrusion technology, complex cross-sections, long-span components, and multi-functional profiles can be produced in a single piece.             </p>

              <p>
                <strong>Sustainability & Recyclability: </strong><br />
Aluminium is 100% recyclable without loss of performance, making it a cornerstone of the circular economy.  </p>

            </div>
          </div>

          <Image
                    src="/images/auto2.png"
                     width={250}
                     height={250}
                    className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:block hidden"

                      alt="Business Partnership"
                      />
         
        </div>

<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center">
 <Image
           src="/images/auto3.png"
            width={250}
            height={250}
           className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 max-sm:mt-5"

             alt="Business Partnership"
             />

          <div className='lg:px-6 xl:px-9'>
            <div className="flex justify-center md:justify-start">
  <span className="inline-block  tracking-widest md:tracking-normal text-md lg:text-2xl xl:text-2xl px-2 text-[#F39E00] normal-case">
    Our Automotive Solutions
  </span>
</div> 

            <div className="mt-3 md:mt-6 max-sm:text-sm  max-sm:text-center lg:text-lg space-y-6 md:space-y-4 text-[#524F4B] leading-relaxed text-start px-2">
              <p>
                <strong>Structural & Safety Profiles:</strong><br />
                We supply extrusions suited for chassis components, roof rails, anti-intrusion beams and sub-frames, with alloys and temper grades optimized for performance and fatigue life.
              </p>

              <p>
                <strong>Battery Tray & EV Housing Systems:</strong><br />
                With the growth of EVs, we provide aluminium trays, housings and frames designed for thermal management, rigidity and lightweight packaging.
              </p>

              <p>
                <strong>Body & Trim Systems:</strong><br />
               Extruded profiles for door frames, roof headers, running boards, trims and interior structural supports, ensuring dimensional precision and surface finish.
              </p>

              <p>
                <strong>Commercial Transport & Specialty Vehicles: </strong><br />
                Heavy-duty aluminium profiles for trailers, truck bodies, railway carriages and electric mobility platforms, designed for durability and modularity.
              </p>

            </div>
          </div>

          
        </div>
 <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
<Image
                     src="/images/auto4.png"
                      width={250}
                      height={250}
                      className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:hidden max-sm:mt-5"

                       alt="Business Partnership "
                       />

          <div className='lg:px-6 xl:px-9'>
            <div className="flex justify-center sm:justify-start">
  <span className="inline-block px-2 tracking-widest md:tracking-normal  text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case">
    Our Automotive Capabilities
  </span>
</div>

            <ul className="mt-3 md:mt-6 max-sm:text-sm max-sm:text-center lg:text-lg text-[#524F4B] leading-relaxed md:list-disc  space-y-4 md:space-y-4 pl-3 text-start px-2">
                
              <li>Use of 6xxx and 7xxx series aluminium alloys that meet vehicle‐industry norms and strength demands.</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Advanced extrusion process controls, heat treatment and finishing to meet automotive material specifications.</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Secondary fabrication services such as CNC machining, bending, welding and assembly to deliver ready-to-install components.</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Stringent quality systems to support automotive certifications including traceability, PPAP, IMDS and other OEM demands.</li>
             
            </ul>
          </div>
           <Image
                     src="/images/auto4.png"
                      width={250}
                      height={250}
                      className="w-full h-auto object-contain mx-auto md:block hidden"

                       alt="Business Partnership"
                       />
          
        </div>

    </div>
    </div>
  )
}

export default Automobile
