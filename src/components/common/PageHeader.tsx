import Link from "next/link";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  /** Site section shown as the eyebrow and in the breadcrumb. */
  section: string;
  className?: string;
}

/**
 * Page title for the paper-themed pages: section eyebrow, large title,
 * gold rule, and the breadcrumb on the right from lg up.
 */
export default function PageHeader({
  title,
  section,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col-reverse gap-6 text-[#212121] lg:flex-row lg:items-start lg:justify-between",
        className,
      )}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
          {section}
        </p>
        {/* Phone size scales with the viewport so the longest word,
            "Transportations", still fits a 320px screen. */}
        <h1 className="mt-3 text-[clamp(2.25rem,12vw,3.75rem)] font-extrabold leading-none tracking-tight sm:text-7xl xl:text-8xl">
          {title}
        </h1>
        <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
      </div>

      <nav
        aria-label="Breadcrumb"
        className="flex shrink-0 items-center gap-2 text-sm text-[#6b6b6b] lg:pt-2"
      >
        <Link href="/" className="transition hover:text-[#212121]">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span>{section}</span>
        <span aria-hidden>/</span>
        <span className="font-medium text-[#212121]">{title}</span>
      </nav>
    </header>
  );
}
