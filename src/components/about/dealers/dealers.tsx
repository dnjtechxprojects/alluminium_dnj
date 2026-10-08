"use client";

import type { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import AboutPageLayout, {
  AboutIntro,
} from "@/components/about/AboutPageLayout";
import { inView } from "@/components/common/Reveal";
import warehouse from "@/assets/images/dealers/warehouse.png";
import handshake from "@/assets/images/dealers/handshake.png";

const BENEFITS = [
  "Consistent product quality",
  "Reliable supply chain support",
  "Competitive margins",
  "Marketing and branding assistance",
  "Technical support and training",
];

export default function Dealers() {
  return (
    <AboutPageLayout title="Dealers">
      <section className="mt-14 md:mt-20">
        <AboutIntro
          lead={
            <>
              At Natraj Aluform Pvt. Ltd., our dealer network plays a vital
              role in delivering high-quality aluminium products to customers
              across regions. We believe in building strong, long-term
              partnerships based on trust, transparency, and mutual growth.
            </>
          }
        >
          <p>
            Our dealers are more than just distributors, they are strategic
            partners who help us expand our reach while maintaining the highest
            standards of service and product quality.
          </p>
        </AboutIntro>
      </section>

      <div className="mt-24 space-y-24 md:mt-32 md:space-y-32">
        <DealerRow
          image={warehouse}
          alt="Dealers inspecting a pallet of aluminium sheets in a warehouse"
          eyebrow="Supply & Support"
          title="What We Offer"
          subtitle="A partner you can grow with"
          imageFirst
        >
          <p className="text-lg leading-[1.8] text-[#4a5565] lg:text-xl lg:leading-[1.8]">
            We offer our dealers a strong product portfolio, consistent supply,
            competitive pricing, and full technical and marketing support to
            help them grow their business with confidence.
          </p>
        </DealerRow>

        <DealerRow
          image={handshake}
          alt="Business partners shaking hands across a meeting table"
          eyebrow="Partnership"
          title="Why Partner With Us"
          subtitle="We provide our dealers with:"
          imageFirst={false}
        >
          <ul className="mx-auto max-w-md text-left md:mx-0">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 border-t border-[#212121]/10 py-4 text-lg font-semibold"
              >
                <Check
                  aria-hidden
                  className="mt-1 size-5 shrink-0 text-[#9C6200]"
                />
                {benefit}
              </li>
            ))}
          </ul>
        </DealerRow>
      </div>
    </AboutPageLayout>
  );
}

interface DealerRowProps {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageFirst: boolean;
  children: ReactNode;
}

// Mirrors the director rows on the Leadership page. These are full photos
// rather than cut-outs, so the photo sits inside the arch like a window.
function DealerRow({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  imageFirst,
  children,
}: DealerRowProps) {
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 lg:gap-16">
      <motion.div
        {...inView}
        className={cn("md:col-span-5", !imageFirst && "md:order-2")}
      >
        <div className="relative mx-auto w-full max-w-[340px] md:max-w-[400px]">
          {/* Equal side and top padding keeps the two arches concentric. */}
          <div className="rounded-t-full bg-gradient-to-b from-[#FFDB8A] via-[#FFEBC0] to-[#FFF7E6] px-[7%] pt-[7%]">
            <Image
              src={image}
              alt={alt}
              sizes="(min-width: 768px) 344px, 292px"
              placeholder="blur"
              className="aspect-square w-full rounded-t-full object-cover"
            />
          </div>
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
          {eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-extrabold italic tracking-tight lg:text-5xl">
          {title}
        </h2>
        <p className="mt-3 text-lg font-semibold italic text-[#9C6200] lg:text-xl">
          {subtitle}
        </p>
        <div
          className={cn(
            "mx-auto my-7 h-1 w-16 rounded-full bg-[#FFB600]",
            imageFirst ? "md:ml-auto md:mr-0" : "md:ml-0",
          )}
        />
        {children}
      </motion.div>
    </article>
  );
}
