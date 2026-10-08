import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import PaperBackground from '@/components/common/PaperBackground'
import Reveal from '@/components/common/Reveal'
import Image from 'next/image'
const Defense = () => {
  return (
    <div>
    <PaperBackground className="w-full pb-10 pt-32 md:pt-40 px-4 md:px-12 lg:px-20">
      <PageHeader title="Defense" section="Segments" className="mb-14 md:mb-20" />

      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 items-center">
        <Image
          src="/images/def1.png"
          width={1199}
          height={880}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          preload
          className="object-cover w-full h-[250px] md:h-auto md:w-full mx-auto lg:mx-0"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center md:justify-start">
            <span className="inline-block px-2 tracking-widest md:tracking-normal text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case">
              Introduction
            </span>
          </div>
          <p className="text-[#524F4B] max-sm:text-sm lg:text-lg leading-relaxed text-center md:text-start mt-3 md:mt-6 max-sm:mt-5 max-sm:px-6">
            At Natraj Aluform Pvt. Ltd., we support defense and security applications with high-strength aluminium extrusion solutions engineered for extreme reliability, durability and mission-critical performance. </p>
          <p className="text-[#524F4B] max-sm:text-sm lg:text-lg leading-relaxed text-center md:text-start mt-4 max-sm:mt-7 max-sm:px-6">
            We understand the importance of confidentiality, consistency and performance in defense supply chains, and we build every product with those values at the core. We leverage advanced manufacturing techniques, precision engineering, and rigorous quality control to ensure every component meets the highest defense standards. </p>
        </div>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <Image
          src="/images/def3.png"
          width={1200}
          height={866}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover mx-auto w-full h-[250px] md:h-auto md:w-full md:order-last max-sm:mt-5"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
            <span className="inline-block px-2 py-3 tracking-widest md:tracking-normal text-[#F39E00] normal-case text-md lg:text-2xl xl:text-2xl">
              Core Defense Capabilities
            </span>
          </div>

          <div className="mt-3 md:mt-6 space-y-6 max-sm:text-center max-sm:text-sm lg:text-lg md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3">
            <p>
              <strong>High-Strength Alloys:</strong><br />
            Our engineered aluminium alloys provide exceptional load-bearing capacity, fatigue resistance, and impact tolerance, making them ideal for demanding defense applications.          </p>

            <p>
              <strong>Custom Military Profiles:</strong><br />
              We deliver precision extrusions tailored to defense-specific geometries and operational requirements. </p>

            <p>
              <strong>Tight-Tolerance Manufacturing:</strong><br />
            Our controlled manufacturing processes ensure dimensional accuracy and repeatability, critical for mechanical systems and structural components in defense equipment. </p>

            <p>
              <strong>Secure Manufacturing Process:</strong><br />
              We follow rigorous process discipline, restricted handling protocols, and quality traceability to meet strict defense standards. Confidentiality, documentation.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-6 items-center">
        <Image
          src="/images/def2.png"
          width={1199}
          height={799}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover mx-auto w-full h-[250px] md:h-auto md:w-full max-sm:mt-5"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
            <span className="inline-block tracking-widest md:tracking-normal px-2 py-3 text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case">
              Application
            </span>
          </div>

          <div className="mt-3 md:mt-6 space-y-6 max-sm:text-center max-sm:text-sm lg:text-lg md:space-y-4 text-[#524F4B] leading-relaxed text-start px-3">
            <p>
              <strong>Armored & Tactical Vehicles:</strong><br />
            Aluminium solutions for lightweight structural frames, support beams, reinforcement systems and protective assemblies used in military ground vehicles.
            </p>

            <p>
              <strong>Defense Infrastructure Systems:</strong><br />
              Profiles used in mobile shelters, command units, observation towers, security enclosures and rapid-deployment structures.
            </p>

            <p>
              <strong>Naval & Marine Defense:</strong><br />
             Corrosion-resistant aluminium sections for patrol boats, deck structures, housing systems and marine-grade defense applications.
            </p>

            <p>
              <strong>Aerospace Defense Systems:</strong><br />
              Lightweight, high-precision aluminium components for military aircraft interiors, framework structures, and defense aviation ground support systems.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        <Image
          src="/images/def4.png"
          width={1200}
          height={750}
          sizes="(min-width: 768px) 50vw, 100vw"
          quality={90}
          className="object-cover mx-auto w-full h-[250px] md:h-auto md:w-full md:order-last max-sm:mt-5"
          alt="Business Partnership"
        />
        <div className='lg:px-6 xl:px-9'>
          <div className="flex justify-center sm:justify-start">
            <span className="tracking-widest md:tracking-normal inline-block px-2 py-3 text-[#F39E00] text-md lg:text-2xl xl:text-2xl normal-case">
              Performance & Standards
            </span>
          </div>

          <ul className="mt-3 md:mt-6 text-[#524F4B] leading-relaxed md:list-disc list-inside max-sm:text-center space-y-4 md:space-y-4 text-start mx-3 max-sm:text-sm lg:text-lg">
              <h3 className="text-md font-bold max-sm:text-center">Our defense manufacturing processes are built around:</h3>
            <li>High structural integrity</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Fatigue and impact resistance</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Corrosion and environmental durability</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Batch traceability and process consistency</li>
               <hr className="flex items-center  border-[#e5e7eb]" />
            <li>Custom engineering under controlled conditions</li>
          </ul>
        </div>
      </Reveal>
    </PaperBackground>
    </div>
  )
}

export default Defense
