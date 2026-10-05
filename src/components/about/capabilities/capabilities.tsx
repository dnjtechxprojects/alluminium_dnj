"use client";

import type { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import AboutPageLayout, {
  AboutIntro,
  HighlightStrip,
  inView,
} from "@/components/about/AboutPageLayout";
import extrusionLine from "@/assets/images/capabilities/extrusion-line-7500mt.webp";
import dieManufacturing from "@/assets/images/capabilities/die-manufacturing-1000mm.webp";

// Figures from the company introduction and the two showcase images below.
const HIGHLIGHTS = [
  { value: "7500 MT", label: "Extrusion press capacity" },
  { value: "45,000 MT", label: "Annual melting capacity" },
  { value: "36,000 MT", label: "Annual extrusion capacity" },
  { value: "1000 mm", label: "In-house mould diameter" },
];

const SERVICES = [
  {
    title: "Aluminium Extrusion",
    description:
      "We manufacture high-quality aluminium profiles with excellent dimensional accuracy, strength, and surface finish.",
  },
  {
    title: "Custom Profile Manufacturing",
    description:
      "We develop specialized aluminium sections based on customer drawings, technical needs, and application requirements.",
  },
  {
    title: "Surface Treatment Solutions",
    description:
      "We offer premium finishing solutions such as anodizing and powder coating to enhance durability, corrosion resistance, and aesthetics.",
  },
  {
    title: "Precision Fabrication",
    description:
      "Our advanced cutting, drilling, punching, and machining capabilities deliver ready-to-assemble aluminium components.",
  },
];

const FACILITY = [
  "High-capacity extrusion presses",
  "CNC-operated cutting and machining equipment",
  "Advanced surface treatment lines",
  "In-house testing and inspection laboratories",
  "In-house mould manufacturing (up to 1000 mm diameter)",
];

export default function Capabilities() {
  return (
    <AboutPageLayout title="Capabilities">
      <section className="mt-14 md:mt-20">
        <AboutIntro
          lead={
            <>
              At Natraj Aluform Pvt. Ltd., our capabilities are driven by
              innovation, precision, and a deep understanding of aluminium
              manufacturing. We have built strong infrastructure and streamlined
              processes that allow us to deliver consistent quality, high
              performance, and customized solutions for diverse industry needs.
            </>
          }
        >
          <p>
            Our facility is designed to handle complex production requirements
            with efficiency and accuracy. From raw material processing to
            finished product delivery, every stage is controlled with advanced
            technology and strict quality standards.
          </p>
          <p>
            We focus on continuous improvement, adopting modern techniques and
            upgrading our systems to ensure reliability, scalability, and
            long-term value for our customers.
          </p>
        </AboutIntro>

        <HighlightStrip items={HIGHLIGHTS} />
      </section>

      <section className="mt-24 md:mt-32">
        <Showcase
          image={extrusionLine}
          alt="India's largest extrusion line, 7500 MT, can extrude profiles from 100 mm up to 720 mm"
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <motion.div {...inView} className="lg:col-span-4">
            <SectionTitle>What We Do Best</SectionTitle>
          </motion.div>

          <motion.dl
            {...inView}
            className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8"
          >
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border-t border-[#212121]/10 pt-6"
              >
                <dt className="text-xl font-bold">{service.title}</dt>
                <dd className="mt-2 text-lg leading-[1.7] text-[#4a5565]">
                  {service.description}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <Showcase
          image={dieManufacturing}
          alt="In-house die manufacturing up to 1000 mm diameter"
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <motion.div {...inView} className="lg:col-span-4">
            <SectionTitle>Manufacturing Strength</SectionTitle>
            <p className="mt-6 text-lg text-[#4a5565] lg:text-xl">
              Our modern facility includes:
            </p>
          </motion.div>

          <motion.ul
            {...inView}
            className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8"
          >
            {FACILITY.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-t border-[#212121]/10 py-5 text-lg font-semibold"
              >
                <Check
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-[#9C6200]"
                />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>
    </AboutPageLayout>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <h2 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
        {children}
      </h2>
      <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
    </>
  );
}

interface ShowcaseProps {
  image: StaticImageData;
  alt: string;
}

// The showcase artwork carries its own headline text, so it always runs the
// full content width to keep that text legible.
function Showcase({ image, alt }: ShowcaseProps) {
  return (
    <motion.figure
      {...inView}
      className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-35px_rgba(33,33,33,0.45)] ring-1 ring-[#212121]/5 md:rounded-3xl"
    >
      <Image
        src={image}
        alt={alt}
        quality={90}
        placeholder="blur"
        sizes="(min-width: 1280px) 1184px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
        className="h-auto w-full"
      />
    </motion.figure>
  );
}
