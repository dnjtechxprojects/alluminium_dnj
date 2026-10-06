"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MotionConfig, motion, Variants } from "framer-motion";

import PaperBackground from "@/components/common/PaperBackground";

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/** Spread onto a motion element to fade it up once it scrolls into view. */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
  variants: reveal,
} as const;

interface AboutPageLayoutProps {
  title: string;
  children: ReactNode;
}

/** Shared shell for the About Us pages: paper background, title and breadcrumb. */
export default function AboutPageLayout({
  title,
  children,
}: AboutPageLayoutProps) {
  return (
    <MotionConfig reducedMotion="user">
      <PaperBackground className="text-[#212121]">
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 md:pt-40 lg:px-12 lg:pb-32">
          <header className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
                About Us
              </p>
              <h1 className="mt-3 text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                {title}
              </h1>
              <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
            </div>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-[#6b6b6b] md:pt-2"
            >
              <Link href="/" className="transition hover:text-[#212121]">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span>About Us</span>
              <span aria-hidden>/</span>
              <span className="font-medium text-[#212121]">{title}</span>
            </nav>
          </header>

          {children}
        </div>
      </PaperBackground>
    </MotionConfig>
  );
}

interface AboutIntroProps {
  lead: ReactNode;
  children: ReactNode;
}

/** Opening paragraph set as a lead on the left, the rest of the copy beside it. */
export function AboutIntro({ lead, children }: AboutIntroProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
      <motion.p
        {...inView}
        className="text-2xl font-semibold leading-[1.55] text-[#212121] lg:col-span-5 lg:text-[1.7rem]"
      >
        {lead}
      </motion.p>

      <motion.div
        {...inView}
        className="space-y-6 text-lg leading-[1.8] text-[#4a5565] lg:col-span-7 lg:text-xl lg:leading-[1.8]"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface Highlight {
  value: string;
  label: string;
}

export function HighlightStrip({ items }: { items: Highlight[] }) {
  return (
    <motion.dl
      {...inView}
      className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[#212121]/10 py-10 md:mt-20 lg:grid-cols-4"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col-reverse justify-end gap-2 border-l-2 border-[#FFB600] pl-3 sm:pl-6"
        >
          <dt className="text-sm text-[#6b6b6b] sm:text-base">{item.label}</dt>
          <dd className="whitespace-nowrap text-2xl font-extrabold tracking-tight tabular-nums sm:text-4xl">
            {item.value}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
