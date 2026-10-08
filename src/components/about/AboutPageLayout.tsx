"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import PageHeader from "@/components/common/PageHeader";
import PaperBackground from "@/components/common/PaperBackground";
import { inView } from "@/components/common/Reveal";

interface AboutPageLayoutProps {
  title: string;
  /** Site section shown as the eyebrow and in the breadcrumb. */
  section?: string;
  children: ReactNode;
}

/** Shared shell for the About Us pages: paper background, title and breadcrumb. */
export default function AboutPageLayout({
  title,
  section = "About Us",
  children,
}: AboutPageLayoutProps) {
  return (
    <PaperBackground className="text-[#212121]">
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 md:pt-40 lg:px-12 lg:pb-32">
        <PageHeader title={title} section={section} />

        {children}
      </div>
    </PaperBackground>
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
