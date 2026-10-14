"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { inView } from "@/components/common/Reveal";
import SectionIntro from "./SectionIntro";

// Same order and labels as the Segments menu; each card uses the opening
// photo of its page.
const SEGMENTS = [
  { title: "Building Construction", href: "/segments/buildingconstruction", image: "/images/buil1.png" },
  { title: "Automobile", href: "/segments/automobile", image: "/images/auto1.png" },
  { title: "Transportations", href: "/segments/transportations", image: "/images/trans1.png" },
  { title: "Aerospace", href: "/segments/aerospace", image: "/images/aero3.png" },
  { title: "Industrial", href: "/segments/industrial", image: "/images/ind1.png" },
  { title: "Defense", href: "/segments/defense", image: "/images/def1.png" },
  { title: "Renewable Energy", href: "/segments/renewableenergy", image: "/images/renew1.png" },
];

export default function HomeSegments() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionIntro eyebrow="Segments" title="Industries we serve">
          Our profiles go into buildings, vehicles, aircraft, machinery,
          defence equipment and renewable energy projects.
        </SectionIntro>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SEGMENTS.map((segment, i) => (
            <motion.div key={segment.href} {...inView}>
              <Link
                href={segment.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-800"
              >
                <Image
                  src={segment.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFB600]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1.5 text-xl font-bold leading-tight text-white">
                      {segment.title}
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-[#FFB600] group-hover:text-[#212121]">
                    <ArrowUpRight className="size-5" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Eighth tile closes the grid with a way in for other industries. */}
          <motion.div {...inView}>
            <Link
              href="/connect/contactus"
              className="group flex aspect-[4/5] flex-col justify-between rounded-[24px] border border-[#212121]/10 bg-gradient-to-b from-[#FFE2A0] via-[#FFF0CF] to-[#F7F2E8] p-6 transition hover:border-[#FFB600]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
                Something else?
              </p>
              <div>
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[#212121]">
                  Tell us what you&apos;re building
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#212121] transition-colors group-hover:text-[#9C6200]">
                  Contact us
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
