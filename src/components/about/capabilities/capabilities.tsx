"use client";

import type { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Check, Diameter, LucideIcon, Ruler } from "lucide-react";

import { cn } from "@/lib/utils";
import AboutPageLayout, {
  AboutIntro,
  HighlightStrip,
  inView,
} from "@/components/about/AboutPageLayout";
import extrusionLine from "@/assets/images/capabilities/extrusion-line.webp";
import dieManufacturing from "@/assets/images/capabilities/die-manufacturing.webp";

interface Showcase {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  spec: string;
  specIcon: LucideIcon;
  image: StaticImageData;
  alt: string;
}

const EXTRUSION_LINE: Showcase = {
  eyebrow: "India's Largest",
  title: "Extrusion Line",
  subtitle: "7500 MT hydraulic press",
  description:
    "Our 7500 MT press is the largest extrusion line in India. Running alongside our 1100 MT press, it lets us produce large, heavy sections as well as everyday profiles under one roof.",
  spec: "Profiles from 100 mm up to 720 mm",
  specIcon: Ruler,
  image: extrusionLine,
  alt: "7500 MT aluminium extrusion line",
};

const DIE_MANUFACTURING: Showcase = {
  eyebrow: "In-House",
  title: "Die Manufacturing",
  subtitle: "Designed and machined on site",
  description:
    "We make our own extrusion dies, up to 1000 mm in diameter. Keeping die making in our facility means new profiles move from drawing to production without waiting on outside toolmakers.",
  spec: "Up to 1000 mm diameter",
  specIcon: Diameter,
  image: dieManufacturing,
  alt: "Two aluminium extrusion dies made in-house",
};

// Figures from the company introduction and the two showcases below.
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
        <ShowcaseRow showcase={EXTRUSION_LINE} imageFirst />

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-16">
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
        <ShowcaseRow showcase={DIE_MANUFACTURING} imageFirst={false} />

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-16">
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

interface ShowcaseRowProps {
  showcase: Showcase;
  imageFirst: boolean;
}

// Mirrors the director rows on the Leadership page. The machines are wide, so
// the image takes the larger share of the row instead of the text.
function ShowcaseRow({ showcase, imageFirst }: ShowcaseRowProps) {
  const SpecIcon = showcase.specIcon;

  return (
    <article className="grid items-center gap-10 md:grid-cols-12 lg:gap-16">
      <motion.div
        {...inView}
        className={cn("md:col-span-7", !imageFirst && "md:order-2")}
      >
        <div className="relative px-[7%]">
          {/* Arch backdrop: wider than the cut-out so it frames the sides, while
              the top of the machinery breaks out of it. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-[18%] rounded-t-full bg-gradient-to-b from-[#FFDB8A] via-[#FFEBC0] to-[#FFF7E6]"
          />
          <Image
            src={showcase.image}
            alt={showcase.alt}
            quality={90}
            sizes="(min-width: 1280px) 680px, (min-width: 768px) 56vw, calc(100vw - 2.5rem)"
            placeholder="blur"
            className="relative h-auto w-full"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 bg-[#FFB600]"
          />
        </div>
      </motion.div>

      <motion.div
        {...inView}
        className={cn(
          "text-center md:col-span-5",
          imageFirst ? "md:text-right" : "md:order-1 md:text-left",
        )}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          {showcase.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-extrabold italic tracking-tight lg:text-5xl">
          {showcase.title}
        </h2>
        <p className="mt-3 text-lg font-semibold italic text-[#9C6200] lg:text-xl">
          {showcase.subtitle}
        </p>
        <div
          className={cn(
            "mx-auto my-7 h-1 w-16 rounded-full bg-[#FFB600]",
            imageFirst ? "md:ml-auto md:mr-0" : "md:ml-0",
          )}
        />
        <p className="text-lg leading-[1.8] text-[#4a5565] lg:text-xl lg:leading-[1.8]">
          {showcase.description}
        </p>
        <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#FFB600]/60 bg-white/60 px-4 py-2 text-base font-semibold text-[#212121]">
          <SpecIcon aria-hidden className="size-5 shrink-0 text-[#9C6200]" />
          {showcase.spec}
        </p>
      </motion.div>
    </article>
  );
}
