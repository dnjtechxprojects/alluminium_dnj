import React from 'react'
import SectionHeader from '@/components/common/SectionHeader'
import Image from 'next/image'
const Industrial = () => {
  return (
    <div>
      <SectionHeader title="Industrial" maintitle="segments"/>
    <div className="w-full py-10 px-4 md:px-12 lg:px-20 bg-white">
       
         
      <Image
       src="/images/ind1.png"
       width={250}
       height={250}
       className=" object-cover w-full h-[39vh]  md:h-[60vh]"
       alt="Business Partnership"
       />
       <div className="w-full flex justify-center md:mb-7 ">
        <button className="tracking-widest md:tracking-normal px-2 py-3 mt-5 md:mt-10  text-md lg:text-2xl xl:text-2xl   text-[#F39E00] normal-case">
          Industrial Performance Overview
        </button>
      </div>
    <div className="max-w-6xl mx-auto text-[#524F4B]">
        <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg text-center   leading-relaxed  max-sm:mt-5 max-sm:px-6">
          At Natraj Aluform Pvt. Ltd., we develop industrial-grade aluminium solutions that support high-load, high-precision and high-durability applications. Our extrusion, fabrication and finishing capabilities are designed to meet the rigorous demands of modern manufacturing, automation and heavy industry.        </p>
          <p className="text-[#524F4B]  max-sm:text-sm  lg:text-lg text-center leading-relaxed  max-sm:mt-7 max-sm:px-6">
           Our industrial products are engineered to deliver structural stability, dimensional accuracy and long-term operational reliability, even in challenging working environments. </p>
         
       
      </div>
     
      <div className="flex justify-center mt-8 md:mt-10">
        <span className="inline-block px-2 text-[#F39E00]  text-md lg:text-2xl xl:text-2xl normal-case tracking-widest md:tracking-normal">
            Key Strengths
            </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 md:mt-10">
       
        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl text-black mb-2">High Load Capacity</h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
          Our aluminium profiles are engineered to support heavy-duty structural and mechanical loads, making them ideal for industrial machinery, framing systems, and high-stress applications where strength and stability are essential.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb] ">
          <h3 className="text-md lg:text-2xl xl:text-2xl text-black mb-2">
            Precision Profiles
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
         Manufactured with tight dimensional tolerances and consistent geometry, our extrusions ensure seamless integration with automation systems, robotics, and precision machinery, enabling smooth assembly and reliable operation.
          </p>
        </div>

        <div className=" p-6  border border-[#e5e7eb]">
          <h3 className="text-md lg:text-2xl xl:text-2xl text-black mb-2">
           Corrosion Resistance
          </h3>
          <p className="text-[#524F4B] max-sm:text-sm  lg:text-lg leading-relaxed">
           Aluminium’s natural resistance to rust, moisture, and chemical exposure makes our profiles perfectly suited for harsh industrial environments, ensuring long service life and minimal maintenance even under continuous use.
          </p>
        </div>
      </div>
     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center">
                    <Image
                           src="/images/ind2.png"
                            width={250}
                            height={250}
                            className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 max-sm:mt-5"
                             alt="Business Partnership"
                             />
          <div className='lg:px-6 xl:px-9'>
           <div className="flex justify-center sm:justify-start">
  <span className="inline-block px-2 py-3  text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case tracking-widest md:tracking-normal">
  Industrial Application
  </span>
</div>
            <div className="mt-3 max-sm:text-center md:mt-6 max-sm:text-sm  lg:text-lg space-y-6 md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3">
              <p>
                <strong>Heavy Machinery & Equipment:</strong><br />
               We supply aluminium profiles for machine frames, guarding systems, ensuring strength and vibration stability.
              </p>

              <p>
                <strong>Automation & Production Lines:</strong><br />
                Profiles designed for robotic frames,sensor mounting structures and modular automation platforms.
              </p>

              <p>
                <strong>Electrical & Control Systems:</strong><br />
               Aluminium solutions used for electrical enclosures, panel frames, control cabinets and thermal management structures.
              </p>

              <p>
                <strong>Material Handling Systems:</strong><br />
                Lightweight yet strong aluminium sections for conveyors, gantries, lifting systems and transport frameworks.
              </p>
              

            </div>
          </div>

          
        </div>
         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
 <Image
                           src="/images/ind3.png"
                            width={250}
                            height={250}
                            className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:hidden max-sm:mt-5"
                             alt="Business Partnership"
                             />

          <div className='lg:px-6 xl:px-9'>
            <div className="flex justify-center sm:justify-start">
  <span className="inline-block px-2 py-3  text-[#F39E00]  text-md lg:text-2xl xl:text-2xl normal-case tracking-widest md:tracking-normal">
  Technical Advantage
  </span>
</div>

            <ul className="mt-3 md:mt-6 text-[#524F4B] max-sm:text-sm  max-sm:text-center lg:text-lg leading-relaxed md:list-disc pl-3 space-y-4 md:space-y-4 text-start px-3">
                
              <li>High strength-to-weight ratio alloys</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Long service life even under continuous operation</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Low maintenance surfaces</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>High dimensional stability</li>
                 <hr className="flex items-center  border-[#e5e7eb]" />
              <li>Suitable for modular and scalable industrial designs</li>
              
              
            </ul>
          </div>
                <Image
                           src="/images/ind3.png"
                            width={250}
                            height={250}
                            className="w-full h-[250px] md:h-auto md:w-full  mx-auto lg:mx-0 md:block hidden"
                             alt="Business Partnership"
                             />
        </div>
    </div>
    </div>
  )
}

export default Industrial
