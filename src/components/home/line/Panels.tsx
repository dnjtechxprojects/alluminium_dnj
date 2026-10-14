"use client";

import { memo, useContext, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MoveRight } from "lucide-react";

import AuthContext from "@/context/AuthProvider";
import { getImageSrc } from "@/lib/image";
import { CATALOGUE_PAGE, CATALOGUE_SECTION_ID } from "@/lib/catalogue";
import { HIGHLIGHTS } from "@/components/about/capabilities/capabilities";
import { contacts, footerLinks, socialLinks } from "@/components/ui/Footer";
import { EndDrawing, StartDrawing } from "../process/drawings";
import { PanelFloor } from "./Scenery";
import {
  CHAPTERS,
  CONNECT,
  HERO,
  PRODUCTS,
  SEGMENTS,
  SUMMARY,
  pad2,
  type ProductCategory,
} from "./content";

/*
 * The panels around the machines: the opening, the end-of-line summary,
 * products, industries and contact. Each lays its content out as a row of
 * columns no wider than the screen, so phones scroll through them sideways
 * just like the machines instead of squeezing them into one view.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Every panel's outer element; `data-panel` is what the line measures. */
function Panel({
  id,
  label,
  className,
  style,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      data-panel
      id={`line-${id}`}
      aria-label={label}
      className={`relative h-full flex-none ${className ?? ""}`}
      style={style}
    >
      {children}
    </section>
  );
}

/** Row of columns between the rail and the floor line. */
function Columns({ children, bottom = "1.25rem" }: { children: ReactNode; bottom?: string }) {
  return (
    <div
      className="relative z-10 flex h-full gap-[clamp(1.5rem,3.2vw,4rem)] px-[var(--gutter)] pt-[var(--top)]"
      style={{ paddingBottom: `calc(var(--band) + var(--stage-h) * 0.07 + ${bottom})` }}
    >
      {children}
    </div>
  );
}

function Intro({
  eyebrow,
  title,
  width = 440,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  width?: number;
  children?: ReactNode;
}) {
  return (
    <div className="nl-col" style={{ "--col": `${width}px` } as CSSProperties}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200] lg:text-sm">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-[clamp(1.9rem,min(4vw,7svh),3.6rem)] font-extrabold leading-[1.04] tracking-tight text-[#212121]">
        {title}
      </h2>
      <div className="mt-5 h-1.5 w-20 rounded-full bg-[#FFB600]" />
      {children && (
        <div className="mt-5 text-[15px] leading-relaxed text-[#4a5565] lg:text-[17px] lg:leading-[1.7]">
          {children}
        </div>
      )}
    </div>
  );
}

const darkButton =
  "inline-flex items-center gap-2 rounded-full bg-[#212121] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#9C6200]";
const lightButton =
  "inline-flex items-center gap-2 rounded-full border border-[#212121]/20 bg-white/60 px-6 py-3 text-[15px] font-semibold text-[#212121] transition hover:border-[#FFB600]";

/* ---------------- opening ---------------- */

interface HeroPanelProps {
  pos: MotionValue<number>;
  viewport: MotionValue<number>;
  /** 0 for visitors who ask for reduced motion: the text then just fades. */
  depth: number;
  onChapter: (index: number) => void;
}

export const HeroPanel = memo(function HeroPanel({ pos, viewport, depth, onChapter }: HeroPanelProps) {
  // The opening text drifts off a little faster than the line and fades.
  const x = useTransform(pos, (p) => -p * 0.3 * depth);
  const opacity = useTransform([pos, viewport], ([p, vw]: number[]) =>
    vw ? 1 - clamp01(p / (vw * 0.55)) : 1,
  );

  return (
    <Panel
      id="start"
      label="Natraj Aluform"
      style={{ width: "max(100vw, calc(var(--u) * 640 + var(--gutter)))" }}
    >
      <PanelFloor right="calc(var(--u) * 640)" />
      <div
        className="absolute bottom-[var(--band)] right-0"
        style={{ width: "calc(var(--u) * 640)", height: "var(--stage-h)" }}
      >
        <StartDrawing />
      </div>

      <motion.div
        style={{
          x,
          opacity,
          paddingBottom: "calc(var(--band) + var(--stage-h) * 0.07 + 1.5rem)",
          justifyContent: "safe center",
        }}
        className="relative z-10 flex h-full max-w-[min(1040px,100vw)] flex-col px-[var(--gutter)] pt-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200] sm:text-sm">
          {HERO.eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2.3rem,min(5.8vw,9.5svh),5.9rem)] font-extrabold leading-[0.98] tracking-tight text-[#212121]">
          Engineering <span className="italic text-[#9C6200]">premium aluminium</span> for modern
          industries
        </h1>
        <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
        <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-[#4a5565] sm:text-lg sm:leading-[1.7]">
          {HERO.lede}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/product/extrudedproducts" className={darkButton}>
            Explore products <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/connect/contactus" className={lightButton}>
            Talk to us
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 [@media(max-height:740px)]:hidden">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#212121]/60">
            <span className="flex h-9 w-14 items-center justify-center rounded-full border border-[#212121]/20">
              <MoveRight className="nl-nudge-x size-4" aria-hidden />
            </span>
            Scroll to walk the line
          </p>
          <ol className="hidden items-center gap-1 lg:flex" aria-label="Chapters">
            {CHAPTERS.map((chapter, i) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => onChapter(i)}
                  className="cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#212121]/50 transition hover:bg-[#FFB600]/20 hover:text-[#212121]"
                >
                  <span className="tabular-nums text-[#9C6200]">{pad2(i + 1)}</span> {chapter.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </Panel>
  );
});

/* ---------------- end of the line ---------------- */

export const SummaryPanel = memo(function SummaryPanel() {
  return (
    <Panel id="summary" label={SUMMARY.title} className="w-max" style={{ minWidth: "calc(var(--u) * 640)" }}>
      <div
        className="absolute bottom-[var(--band)] left-0"
        style={{ width: "calc(var(--u) * 640)", height: "var(--stage-h)" }}
      >
        <EndDrawing />
      </div>
      <PanelFloor left="calc(var(--u) * 640)" />

      {/* Kept above the finish flag on the quay. */}
      <Columns bottom="calc(var(--stage-h) * 0.43)">
        <Intro eyebrow={SUMMARY.eyebrow} title={SUMMARY.title} width={460}>
          <p>{SUMMARY.body}</p>
          <Link href="/about/capabilities" className={`${darkButton} mt-6`}>
            Our capabilities <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Intro>
        <dl
          className="nl-col grid grid-cols-2 content-start gap-px self-start overflow-hidden rounded-[22px] border border-[#212121]/10 bg-[#212121]/10"
          style={{ "--col": "460px" } as CSSProperties}
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse justify-end gap-1.5 bg-[#F8F7F3]/90 p-4 lg:p-6"
            >
              <dt className="text-xs leading-snug text-[#6b6b6b] lg:text-sm">{item.label}</dt>
              <dd className="whitespace-nowrap text-xl font-extrabold tracking-tight tabular-nums text-[#212121] lg:text-[2rem]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Columns>
    </Panel>
  );
});

/* ---------------- products ---------------- */

const ink = { stroke: "#2B2B2B", strokeWidth: 2.5, strokeLinejoin: "round" as const };

// Line drawings shown until a product image is uploaded for the category.
const FALLBACKS: Record<string, ReactNode> = {
  EXTRUDEDPRODUCTS: (
    <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" fill="#D7DBE0" {...ink}>
      <path d="M20 40V120H80V40H68V108H32V40Z" />
      <path d="M100 40H160V52H136V108H160V120H100V108H124V52H100Z" />
      <rect x="180" y="40" width="44" height="80" rx="4" />
      <rect x="190" y="50" width="24" height="60" rx="2" fill="#FFF7E6" />
    </svg>
  ),
  NEWALLOY: (
    <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" {...ink}>
      {(["Al", "Mg", "Sc"] as const).map((symbol, i) => (
        <g key={symbol}>
          <rect x={20 + i * 70} y="40" width="60" height="72" rx="6" fill="#FFFDF8" />
          <text
            x={50 + i * 70}
            y="88"
            textAnchor="middle"
            fill="#2B2B2B"
            stroke="none"
            style={{ font: "800 26px var(--font-sans), sans-serif" }}
          >
            {symbol}
          </text>
        </g>
      ))}
    </svg>
  ),
  DIEMANUFACTURING: (
    <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" {...ink}>
      <circle cx="120" cy="80" r="64" fill="#D7DBE0" />
      <circle cx="120" cy="80" r="50" fill="#EEF0F2" />
      <path d="M96 62V100H144V62H134V90H106V62Z" fill="#2B2B2B" />
    </svg>
  ),
};

function ProductCard({ category, index, image, alt }: {
  category: ProductCategory;
  index: number;
  image?: string;
  alt?: string;
}) {
  return (
    <Link
      href={category.href}
      className="nl-card group flex flex-none flex-col self-end rounded-[24px] border border-[#212121]/10 bg-white/65 p-2.5 shadow-[0_24px_40px_-30px_rgba(33,33,33,0.45)] transition duration-300 hover:-translate-y-1 hover:border-[#FFB600]/70"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-b from-[#FFE2A0] via-[#FFF0CF] to-[#F7F2E8]">
        {image ? (
          <Image
            src={getImageSrc(image)}
            alt={alt || category.label}
            fill
            sizes="330px"
            className="object-contain p-5 drop-shadow-[0_18px_22px_rgba(33,33,33,0.18)] transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          FALLBACKS[category.pageKey]
        )}
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]">{pad2(index + 1)}</p>
        <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#212121] lg:text-2xl">
          {category.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4a5565] lg:text-[15px]">{category.blurb}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#212121] transition-colors group-hover:text-[#9C6200]">
          Explore
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export const ProductsPanel = memo(function ProductsPanel() {
  const { products } = useContext(AuthContext)!;

  return (
    <Panel id="products" label="Our products" className="w-max">
      <PanelFloor />
      <Columns>
        <Intro eyebrow="What we make" title="Our products" width={400}>
          <p>Profiles, alloys and the dies that shape them, all developed and produced at our plant.</p>
          <Link
            href={`${CATALOGUE_PAGE}#${CATALOGUE_SECTION_ID}`}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-[#212121] underline decoration-[#FFB600] decoration-2 underline-offset-4 transition hover:text-[#9C6200]"
          >
            <Download className="size-4" aria-hidden /> Download catalogue
          </Link>
        </Intro>
        {PRODUCTS.map((category, i) => {
          // The API returns newest first, so this is the latest upload.
          const product = products.find((p) => p.page === category.pageKey);
          return (
            <ProductCard
              key={category.pageKey}
              category={category}
              index={i}
              image={product?.image}
              alt={product?.title}
            />
          );
        })}
      </Columns>
    </Panel>
  );
});

/* ---------------- industries ---------------- */

export const IndustriesPanel = memo(function IndustriesPanel() {
  return (
    <Panel id="industries" label="Industries we serve" className="w-max">
      <PanelFloor />
      <Columns>
        <Intro eyebrow="Where it goes" title="Industries we serve" width={400}>
          <p>
            Our profiles go into buildings, vehicles, aircraft, machinery, defence equipment and
            renewable energy projects.
          </p>
        </Intro>
        <ul className="grid flex-none grid-flow-col grid-rows-2 gap-2.5 self-end lg:gap-4">
          {SEGMENTS.map((segment, i) => (
            <li key={segment.href} className="nl-tile">
              <Link
                href={segment.href}
                className="group relative block aspect-[5/6] overflow-hidden rounded-[20px] bg-neutral-800"
              >
                <Image
                  src={segment.image}
                  alt=""
                  fill
                  sizes="230px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 lg:p-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFB600] lg:text-xs">
                      {pad2(i + 1)}
                    </p>
                    <h3 className="mt-1 text-sm font-bold leading-tight text-white lg:text-lg">{segment.title}</h3>
                  </div>
                  <span className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-[#FFB600] group-hover:text-[#212121] sm:flex">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
          <li className="nl-tile">
            <Link
              href="/connect/contactus"
              className="group flex aspect-[5/6] flex-col justify-between rounded-[20px] border border-[#212121]/10 bg-gradient-to-b from-[#FFE2A0] via-[#FFF0CF] to-[#F7F2E8] p-3 transition hover:border-[#FFB600] lg:p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9C6200] lg:text-xs">
                Something else?
              </p>
              <div>
                <h3 className="text-base font-extrabold leading-tight tracking-tight text-[#212121] lg:text-xl">
                  Tell us what you&apos;re building
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#212121] group-hover:text-[#9C6200]">
                  Contact us <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </Columns>
    </Panel>
  );
});

/* ---------------- contact, closing the page ---------------- */

export const ConnectPanel = memo(function ConnectPanel() {
  return (
    // Last panel: exactly one screen wide on desktop so the page ends on all
    // of it; phones scroll through its columns like the rest.
    <Panel id="contact" label="Contact us" className="w-max min-w-[100vw] lg:w-screen">
      <PanelFloor />
      {/* Oversized faint wordmark standing on the floor line. */}
      <p
        aria-hidden
        className="pointer-events-none absolute left-[var(--gutter)] select-none whitespace-nowrap text-[clamp(4rem,12vw,11rem)] font-extrabold leading-[0.8] tracking-tighter text-[#212121]/[0.05]"
        style={{ bottom: "calc(var(--band) + var(--u) * 29)" }}
      >
        NATRAJ ALUFORM
      </p>

      <Columns bottom="2.5rem">
        <div className="nl-col lg:min-w-0 lg:max-w-[540px] lg:flex-1" style={{ "--col": "520px" } as CSSProperties}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200] lg:text-sm">
            {CONNECT.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-[clamp(1.9rem,min(4vw,7svh),3.6rem)] font-extrabold leading-[1.04] tracking-tight text-[#212121]">
            {CONNECT.title}
          </h2>
          <div className="mt-5 h-1.5 w-20 rounded-full bg-[#FFB600]" />
          <p className="mt-5 text-[15px] leading-relaxed text-[#4a5565] lg:text-[17px] lg:leading-[1.7]">
            {CONNECT.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/connect/contactus" className={darkButton}>
              Contact us <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href={`${CATALOGUE_PAGE}#${CATALOGUE_SECTION_ID}`} className={lightButton}>
              <Download className="size-4" aria-hidden /> Catalogue
            </Link>
          </div>
        </div>

        <div className="nl-col" style={{ "--col": "310px" } as CSSProperties}>
          <ul className="space-y-5">
            {contacts.map((item) => {
              const body = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#FFB600]/60 bg-white/60 text-[#9C6200]">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6b6b6b]">
                      {item.label}
                    </span>
                    <span className="mt-1 block font-semibold leading-snug text-[#212121]">{item.text}</span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="flex items-start gap-4 transition hover:text-[#9C6200]">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-7 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex size-10 items-center justify-center rounded-full border border-[#212121]/15 bg-white/50 text-[#212121] transition hover:border-[#FFB600] hover:bg-[#FFB600]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Site" className="nl-col flex flex-col" style={{ "--col": "420px" } as CSSProperties}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
                  {section.title}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm lg:text-[15px]">
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-[#212121]/70 transition hover:text-[#212121]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#6b6b6b] lg:text-sm">
            © {new Date().getFullYear()} Natraj Aluform Private Limited. All rights reserved.
          </p>
        </nav>
      </Columns>
    </Panel>
  );
});
