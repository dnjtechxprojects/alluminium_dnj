"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { inView } from "@/components/common/Reveal";

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** Shown on the right of the title from lg up, e.g. a "view all" link. */
  aside?: ReactNode;
}

/** Eyebrow, large title and gold rule, matching the inner page headers. */
export default function SectionIntro({ eyebrow, title, children, aside }: SectionIntroProps) {
  return (
    <motion.div
      {...inView}
      className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-[#212121] sm:text-5xl">
          {title}
        </h2>
        <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
        {children && (
          <p className="mt-6 text-lg leading-[1.7] text-[#4a5565]">{children}</p>
        )}
      </div>
      {aside}
    </motion.div>
  );
}
