"use client";
 import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
export default function LeadershipSection() {
  return (
    <div>
      <SectionHeader title="Leaderships" maintitle="about us" />
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="relative w-full h-full mx-auto flex items-center justify-center">
  <Image
    src="/images/directors.png"
    width={600}
    height={350}
    alt="Leader 1"
    className="
     sm:object-cover
      sm:object-center 
      
    "
  />
</div>
  <div className=" text-center md:text-start max-sm:text-sm  lg:text-lg lg:px-6 xl:px-3 "> 
          <p className="text-[#4a5565] leading-relaxed">
            Founded in 2024 and located in Sevni Village of Kamrej Taluka of Dist. Surat, Gujarat. Natraj Aluform Pvt. Ltd. has swiftly become one of the leading aluminium extrusion manufacturers in Surat, Gujarat. With a dedication to precision, innovation, and superior quality, we cater to a broad spectrum of industries, from construction to automotive and beyond.
 
        Our modern infrastructure spread over 32,000 Sq. Meters area boasts an annual melting capacity of 45,000 metric tons and extrusion capacity of 36,000 metric tons. Equipped with advanced hydraulic extrusion presses (1100 MT and 7500 MT), we ensure efficient production under one roof, meeting the dynamic demands of our clients. Our robust manufacturing capabilities, combined with stringent quality control and research initiatives, set us apart as a trusted name in the aluminium extrusion industry. </p>

          <p className="mt-5 lg:mt-3 text-[#4a5565] leading-relaxed">
            At Natraj Aluform Pvt. Ltd., we are more than a manufacturer. We are a team committed to driving excellence, sustainability, and customer satisfaction. Our relentless pursuit of innovation enables us to provide tailored solutions that empower industries to achieve new milestones. As your partner in growth, Natraj Aluform Private Limited stands as a symbol of trust and reliability in the aluminium extrusion industry. </p>
            <p className="text-[#4a5565] leading-relaxed mt-5 lg:mt-3">
              Let us build the future together.
            </p>
        </div>
      </div>

      <hr className="my-14 border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10  items-center ">
      
       <Image
        src="/images/mukeshpatel.png"
        width={600}
        height={350}
        alt="Leader 1"
        className="
          md:hidden
          mx-auto
          block
          object-contain
        "
      />

          <div className="lg:px-6 xl:px-9">
          <h3 className="text-black text-xl font-bold mb-2 text-center md:text-start">Mr. Mukesh Patel</h3>
          <p className="text-[#4a5565] leading-relaxed text-center max-sm:text-sm  lg:text-lg md:text-start ">
          Mr. Mukesh Patel is the pioneer who has been involved as a crucial persona since the inception in construction material manufacturing. He has matured from family business to a more organised corporate structured business model. He has a repute for his inspiring leadership and bold decision-making. </p>
        </div>

       <div className="relative w-full h-full mx-auto flex items-center justify-center">
  <Image
    src="/images/mukeshpatel.png"
    width={600}
    height={350}
    alt="Leader 1"
    className="
      
     md:block hidden
      h-full
    "
  />
</div>
  </div>
      <hr className="my-14 border-gray-300" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
  <div className="relative w-full h-full mx-auto flex items-center justify-center">
  <Image
    src="/images/Dishank.jpeg"
    width={600}
    height={350}
    alt="Leader 1"
    className="
     
      sm:object-cover
      sm:object-center 
    
      h-full
    "
  />
</div>



        <div className=" text-center md:text-start max-sm:text-sm  lg:text-lg lg:px-6 xl:px-9 "> 
           <h3 className="text-black text-xl font-bold mb-2 text-center md:text-start">Mr. Dishank Vekariya</h3>
          <p className="text-[#4a5565] leading-relaxed">
            Mr. Dishank Vekariya is the 2nd generation entrepreneur. Academically, he has completed B.E in Mechanical Engineering and has further done masters i.e. MSC in Food Technology. He has superior knowledge of the manufacturing processes and is technically proficient. He is currently looking after entire production and manufacturing in Natraj Aluform Private Limited and has been working diligently for the growth of the company. He always believes to put everything for the growth and sustainable development of the company.</p>

          
        </div>
      </div>
      <hr className="my-14 border-gray-300" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10  items-center ">
      
       <Image
    src="/images/priyank2.png"
    width={600}
    height={350}
    alt="Leader 1"
    className="
      md:hidden
      h-full w-full  
    "
  />
        <div className="lg:px-6 xl:px-9">
          <h3 className="text-black text-xl font-bold mb-2 text-center md:text-start">Mr. Priyank Vekariya</h3>
          <p className="text-[#4a5565] leading-relaxed text-center max-sm:text-sm  lg:text-lg md:text-start ">
           Mr Priyank Vekariya is a practising chartered accountant since 2018. He is currently looking after the entire finance of Natraj group. He has joined the Natraj Aluform Pvt Ltd as non-executive director and would be talking care of entire finance and accounting of the company. Role in Proposed business – Finance and Accounting. </p>
        </div>

       <div className="relative w-full h-full mx-auto flex items-center justify-center">
  <Image
    src="/images/priyank2.png"
    width={600}
    height={350}
    alt="Leader 1"
    className="
      md:block hidden
      h-full w-[80%]  
    "
  />
</div>

      </div>
    </div>
    </div>
  );
}
