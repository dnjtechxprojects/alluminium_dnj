"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import PaperBackground from "@/components/common/PaperBackground";
import { HighlightStrip } from "@/components/about/AboutPageLayout";
import { HIGHLIGHTS } from "@/components/about/capabilities/capabilities";
import plantDesktop from "@/assets/images/capabilities-desktop.jpg";
import plantMobile from "@/assets/images/capabilities-mobile.jpg";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" as const },
});

export default function HomeHero() {
  // Panorama for wide screens, the 3:4 crop for phones; <picture> fetches one.
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({
    src: plantDesktop,
    alt: "",
    fill: true,
    sizes: "(min-width: 1280px) 1200px, 94vw",
  });
  const {
    props: { alt, ...mobileImgProps },
  } = getImageProps({
    src: plantMobile,
    alt: "Operators at the extrusion press in the Natraj Aluform plant",
    fill: true,
    sizes: "94vw",
    // Above the fold: load straight away rather than lazily.
    loading: "eager",
    fetchPriority: "high",
  });

  const scrollToProcess = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("process");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PaperBackground className="pb-16 pt-32 text-[#212121] md:pb-24 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.p
          {...rise(0.1)}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]"
        >
          Natraj Aluform · Surat, India
        </motion.p>

        <motion.h1
          {...rise(0.2)}
          className="mt-5 max-w-5xl text-balance text-[clamp(2.6rem,7vw,6.25rem)] font-extrabold leading-[0.98] tracking-tight"
        >
          Engineering <span className="italic text-[#9C6200]">premium aluminium</span>{" "}
          for modern industries
        </motion.h1>

        <motion.div {...rise(0.3)} className="mt-8 h-1.5 w-24 rounded-full bg-[#FFB600]" />

        <motion.div
          {...rise(0.4)}
          className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <p className="text-lg leading-[1.7] text-[#4a5565] lg:col-span-6 lg:text-xl">
            From melting scrap to shipping finished profiles, every step
            happens in our own plant, built around India&apos;s largest 7500 MT
            extrusion press.
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <Link
              href="/product/extrudedproducts"
              className="inline-flex items-center gap-2 rounded-full bg-[#212121] px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#9C6200]"
            >
              Explore products <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="#process"
              onClick={scrollToProcess}
              className="inline-flex items-center gap-2 rounded-full border border-[#212121]/20 bg-white/50 px-7 py-3.5 text-[15px] font-semibold transition hover:border-[#FFB600]"
            >
              See how it&apos;s made <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>
        </motion.div>

        <motion.figure
          {...rise(0.5)}
          className="relative mt-14 aspect-[3/4] overflow-hidden rounded-[28px] bg-neutral-800 bg-cover bg-center sm:aspect-[16/9] lg:aspect-[2000/837]"
          style={{ backgroundImage: `url("${plantDesktop.blurDataURL}")` }}
        >
          <picture>
            <source media="(min-width: 640px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
            <img {...mobileImgProps} alt={alt} className="object-cover" />
          </picture>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#F8F7F3]/90 px-4 py-2 text-sm font-semibold text-[#212121] sm:bottom-6 sm:left-6">
            Our extrusion plant, Sevni · Surat
          </figcaption>
        </motion.figure>

        <HighlightStrip items={HIGHLIGHTS} />
      </div>
    </PaperBackground>
  );
}
