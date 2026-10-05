"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import AboutPageLayout, {
  AboutIntro,
  HighlightStrip,
  inView,
} from "@/components/about/AboutPageLayout";
import mukeshPatel from "@/assets/images/leadership/mukesh-patel.webp";
import dishankVekariya from "@/assets/images/leadership/dishank-vekariya.webp";
import priyankVekariya from "@/assets/images/leadership/priyank-vekariya.webp";

interface Leader {
  name: string;
  designation: string;
  role: string;
  qualification: string;
  bio: string;
  image: StaticImageData;
}

const LEADERS: Leader[] = [
  {
    name: "Mr. Mukesh Patel",
    designation: "Director",
    role: "Extrusion & Overall Business Decisions",
    qualification: "Bachelor in Mechanical Engineering",
    image: mukeshPatel,
    bio: "Mr. Mukesh Patel is the pioneer who has been involved as a crucial persona since the inception in construction material manufacturing. He has matured from family business to a more organised corporate structured business model. He has a repute for his inspiring leadership and bold decision-making.",
  },
  {
    name: "Mr. Dishank Vekariya",
    designation: "Director",
    role: "Extrusion & Mould Manufacturing",
    qualification: "Masters in Mechanical Engineering",
    image: dishankVekariya,
    bio: "Mr. Dishank Vekariya is the 2nd generation entrepreneur. Academically, he has completed his Masters in Mechanical Engineering. He has superior knowledge of the manufacturing processes and is technically proficient. He is currently looking after extrusion and mould manufacturing in Natraj Aluform Private Limited and has been working diligently for the growth of the company. He always believes to put everything for the growth and sustainable development of the company.",
  },
  {
    name: "Mr. Priyank Vekariya",
    designation: "Director (CFO)",
    role: "Raw Material Sourcing & Finance",
    qualification: "Chartered Accountant",
    image: priyankVekariya,
    bio: "Mr. Priyank Vekariya is a practising chartered accountant since 2018. He is currently looking after the entire finance of Natraj group. As Director and CFO of Natraj Aluform Pvt. Ltd., he takes care of raw material sourcing and the entire finance of the company.",
  },
];

// Figures taken from the company introduction copy below.
const HIGHLIGHTS = [
  { value: "2024", label: "Founded in Sevni, Surat" },
  { value: "32,000 m²", label: "Manufacturing infrastructure" },
  { value: "45,000 MT", label: "Annual melting capacity" },
  { value: "36,000 MT", label: "Annual extrusion capacity" },
];

export default function LeadershipSection() {
  return (
    <AboutPageLayout title="Leadership">
      <section className="mt-14 md:mt-20">
        <AboutIntro
          lead={
            <>
              Founded in 2024 and located in Sevni Village of Kamrej Taluka of
              Dist. Surat, Gujarat. Natraj Aluform Pvt. Ltd. has swiftly become
              one of the leading aluminium extrusion manufacturers in Surat,
              Gujarat. With a dedication to precision, innovation, and superior
              quality, we cater to a broad spectrum of industries, from
              construction to automotive and beyond.
            </>
          }
        >
          <p>
            Our modern infrastructure spread over 32,000 Sq. Meters area boasts
            an annual melting capacity of 45,000 metric tons and extrusion
            capacity of 36,000 metric tons. Equipped with advanced hydraulic
            extrusion presses (1100 MT and 7500 MT), we ensure efficient
            production under one roof, meeting the dynamic demands of our
            clients. Our robust manufacturing capabilities, combined with
            stringent quality control and research initiatives, set us apart as
            a trusted name in the aluminium extrusion industry.
          </p>
          <p>
            At Natraj Aluform Pvt. Ltd., we are more than a manufacturer. We are
            a team committed to driving excellence, sustainability, and customer
            satisfaction. Our relentless pursuit of innovation enables us to
            provide tailored solutions that empower industries to achieve new
            milestones. As your partner in growth, Natraj Aluform Private
            Limited stands as a symbol of trust and reliability in the aluminium
            extrusion industry.
          </p>
          <p className="font-semibold italic text-[#212121]">
            Let us build the future together.
          </p>
        </AboutIntro>

        <HighlightStrip items={HIGHLIGHTS} />
      </section>

      <motion.header {...inView} className="mt-24 text-center md:mt-32">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          Our Directors
        </p>
        <h2 className="mt-3 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          The people behind Natraj Aluform
        </h2>
        <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
      </motion.header>

      <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
        {LEADERS.map((leader, index) => (
          <LeaderRow
            key={leader.name}
            leader={leader}
            imageFirst={index % 2 === 0}
          />
        ))}
      </div>
    </AboutPageLayout>
  );
}

interface LeaderRowProps {
  leader: Leader;
  imageFirst: boolean;
}

function LeaderRow({ leader, imageFirst }: LeaderRowProps) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 lg:gap-16">
      <motion.div
        {...inView}
        className={cn("md:col-span-5", !imageFirst && "md:order-2")}
      >
        <div className="relative mx-auto w-full max-w-[340px] md:max-w-[440px]">
          {/* Arch backdrop: the cut-out's head and crossed arms break out of it. */}
          <div
            aria-hidden
            className="absolute inset-x-[7%] bottom-0 top-[13%] rounded-t-full bg-gradient-to-b from-[#FFDB8A] via-[#FFEBC0] to-[#FFF7E6]"
          />
          <Image
            src={leader.image}
            alt={leader.name}
            sizes="(min-width: 768px) 440px, 340px"
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
          "text-center md:col-span-7",
          imageFirst ? "md:text-right" : "md:order-1 md:text-left",
        )}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          {leader.designation}
        </p>
        <h3 className="mt-3 text-4xl font-extrabold italic tracking-tight lg:text-5xl">
          {leader.name}
        </h3>
        <p className="mt-3 text-lg font-semibold italic text-[#9C6200] lg:text-xl">
          {leader.role}
        </p>
        <div
          className={cn(
            "mx-auto my-7 h-1 w-16 rounded-full bg-[#FFB600]",
            imageFirst ? "md:ml-auto md:mr-0" : "md:ml-0",
          )}
        />
        <p className="text-lg leading-[1.8] text-[#4a5565] lg:text-xl lg:leading-[1.8]">
          {leader.bio}
        </p>
        <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#FFB600]/60 bg-white/60 px-4 py-2 text-base font-semibold text-[#212121]">
          <GraduationCap
            aria-hidden
            className="size-5 shrink-0 text-[#9C6200]"
          />
          {leader.qualification}
        </p>
      </motion.div>
    </article>
  );
}
