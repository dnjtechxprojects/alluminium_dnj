"use client";

import { useContext, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import AuthContext from "@/context/AuthProvider";
import { inView } from "@/components/common/Reveal";
import { getImageSrc } from "@/lib/image";
import SectionIntro from "./SectionIntro";

interface Category {
  /** `page` value the admin stores on products for this category. */
  pageKey: string;
  label: string;
  href: string;
  blurb: string;
  /** Line drawing shown until a product image is uploaded for the category. */
  fallback: ReactNode;
}

const ink = { stroke: "#2B2B2B", strokeWidth: 2.5, strokeLinejoin: "round" as const };

const CATEGORIES: Category[] = [
  {
    pageKey: "EXTRUDEDPRODUCTS",
    label: "Extruded Products",
    href: "/product/extrudedproducts",
    blurb:
      "Precision aluminium profiles for architectural, industrial and formwork use, from 100 mm up to 720 mm.",
    fallback: (
      <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" fill="#D7DBE0" {...ink}>
        <path d="M20 40V120H80V40H68V108H32V40Z" />
        <path d="M100 40H160V52H136V108H160V120H100V108H124V52H100Z" />
        <rect x="180" y="40" width="44" height="80" rx="4" />
        <rect x="190" y="50" width="24" height="60" rx="2" fill="#FFF7E6" />
      </svg>
    ),
  },
  {
    pageKey: "NEWALLOY",
    label: "New Alloy",
    href: "/product/newalloy",
    blurb:
      "Low-scandium Al-Mg-Sc alloys developed for high-stress structural parts in electric vehicles and aerospace.",
    fallback: (
      <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" {...ink}>
        {[
          ["Al", 20],
          ["Mg", 90],
          ["Sc", 160],
        ].map(([symbol, x]) => (
          <g key={symbol}>
            <rect x={x as number} y="40" width="60" height="72" rx="6" fill="#FFFDF8" />
            <text
              x={(x as number) + 30}
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
  },
  {
    pageKey: "DIEMANUFACTURING",
    label: "Mould Manufacturing",
    href: "/product/mouldmanufacturing",
    blurb:
      "Extrusion dies made in-house, up to 1000 mm in diameter, with capacity for over 700 moulds a month.",
    fallback: (
      <svg viewBox="0 0 240 160" className="h-2/3 w-2/3" {...ink}>
        <circle cx="120" cy="80" r="64" fill="#D7DBE0" />
        <circle cx="120" cy="80" r="50" fill="#EEF0F2" />
        <path d="M96 62V100H144V62H134V90H106V62Z" fill="#2B2B2B" />
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={120 + 57 * Math.cos((deg * Math.PI) / 180 + Math.PI / 4)}
            cy={80 + 57 * Math.sin((deg * Math.PI) / 180 + Math.PI / 4)}
            r="4"
            fill="#FFFDF8"
          />
        ))}
      </svg>
    ),
  },
];

export default function HomeProducts() {
  const { products } = useContext(AuthContext)!;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionIntro eyebrow="What we make" title="Our products">
          Profiles, alloys and the dies that shape them, all developed and
          produced at our plant.
        </SectionIntro>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((category, i) => {
            // The API returns newest first, so this is the latest upload.
            const product = products.find((p) => p.page === category.pageKey);

            return (
              <motion.article key={category.pageKey} {...inView} className="h-full">
                <Link
                  href={category.href}
                  className="group flex h-full flex-col rounded-[28px] border border-[#212121]/10 bg-white/55 p-3 transition duration-300 hover:border-[#FFB600]/70 hover:shadow-[0_24px_60px_-34px_rgba(156,98,0,0.55)]"
                >
                  {/* Warm panel behind the image: transparent PNG cut-outs sit
                      straight on it, photos are shown whole with no cropping. */}
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-b from-[#FFE2A0] via-[#FFF0CF] to-[#F7F2E8]">
                    {product?.image ? (
                      <Image
                        src={getImageSrc(product.image)}
                        alt={product.title || category.label}
                        fill
                        sizes="(min-width: 1280px) 400px, (min-width: 768px) 31vw, 92vw"
                        className="object-contain p-6 drop-shadow-[0_18px_22px_rgba(33,33,33,0.18)] transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      category.fallback
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#212121]">
                      {category.label}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#4a5565]">{category.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-[#212121] transition-colors group-hover:text-[#9C6200]">
                      Explore
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
