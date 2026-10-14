"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { inView } from "@/components/common/Reveal";
import { CATALOGUE_PAGE, CATALOGUE_SECTION_ID } from "@/lib/catalogue";

export default function HomeCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32 lg:px-12">
      <motion.div
        {...inView}
        className="relative isolate overflow-hidden rounded-[32px] border border-[#FFB600]/40 bg-gradient-to-b from-[#FFDB8A] via-[#FFEBC0] to-[#FFF7E6] px-6 py-16 text-center sm:px-12 md:py-24"
      >
        {/* Outline of a channel section, the shape from the process journey. */}
        <svg
          aria-hidden
          viewBox="0 0 120 80"
          className="pointer-events-none absolute -right-10 -top-8 -z-10 w-72 opacity-[0.08] md:w-96"
          fill="none"
          stroke="#2B2B2B"
          strokeWidth={1.5}
        >
          <path d="M10 10V70H110V10H98V58H22V10Z" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 120 80"
          className="pointer-events-none absolute -bottom-12 -left-10 -z-10 w-60 opacity-[0.07] md:w-80"
          fill="none"
          stroke="#2B2B2B"
          strokeWidth={1.5}
        >
          <path d="M10 10H110V22H66V58H110V70H10V58H54V22H10Z" />
        </svg>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          Start a project
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#212121] sm:text-5xl lg:text-6xl">
          Have a profile in mind? Let&apos;s extrude it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.7] text-[#4a5565]">
          Send us your drawing or requirement and our team will get back to
          you. Or browse the catalogues to see the profiles we already make.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/connect/contactus"
            className="inline-flex items-center gap-2 rounded-full bg-[#212121] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#9C6200]"
          >
            Contact us <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={`${CATALOGUE_PAGE}#${CATALOGUE_SECTION_ID}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#212121]/20 bg-white/60 px-7 py-3.5 text-[15px] font-semibold text-[#212121] transition hover:border-[#212121]/50"
          >
            <Download className="size-4" aria-hidden /> Download catalogue
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
