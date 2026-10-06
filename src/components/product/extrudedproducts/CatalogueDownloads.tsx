"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";
import {
  CATALOGUE_HEADING,
  CATALOGUE_SECTION_ID,
  CATALOGUES,
} from "@/lib/catalogue";

/**
 * Jumps to the section and keeps it in view while the products above it are
 * still loading and pushing it down. Stops as soon as the user scrolls.
 */
function keepInView(section: HTMLElement) {
  const jump = () => section.scrollIntoView({ block: "start" });
  const observer = new ResizeObserver(jump);
  const events = ["wheel", "touchstart", "keydown"] as const;

  const stop = () => {
    observer.disconnect();
    clearTimeout(timer);
    events.forEach((e) => window.removeEventListener(e, stop));
  };
  const timer = setTimeout(stop, 3000);

  jump();
  observer.observe(document.body);
  events.forEach((e) => window.addEventListener(e, stop, { passive: true }));
  return stop;
}

export default function CatalogueDownloads() {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  // Read on mount: the product list rewrites the URL to ?page=… which drops the hash
  const scrollOnLoad = useRef(false);

  useEffect(() => {
    scrollOnLoad.current = window.location.hash === `#${CATALOGUE_SECTION_ID}`;

    const fetchCatalogues = async () => {
      try {
        const res = await axios.get("/api/catalogue");
        setAvailableSlots(
          (res.data.data || []).map((item: { slot: string }) => item.slot),
        );
      } catch (error) {
        console.error("Catalogue fetch error", error);
      }
    };
    fetchCatalogues();
  }, []);

  const catalogues = CATALOGUES.filter((c) => availableSlots.includes(c.slot));

  useEffect(() => {
    if (!scrollOnLoad.current || !sectionRef.current) return;
    scrollOnLoad.current = false;
    return keepInView(sectionRef.current);
  }, [catalogues.length]);

  if (catalogues.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id={CATALOGUE_SECTION_ID}
      className="w-full pb-16 scroll-mt-28"
    >
      <h3 className="max-w-7xl mx-auto px-4 mb-8 text-lg lg:text-2xl text-center text-[#524F4B]">
        {CATALOGUE_HEADING}
      </h3>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {catalogues.map(({ slot, title }) => (
          <a
            key={slot}
            href={`/api/catalogue/${slot}`}
            className="inline-flex items-center gap-2 border border-[#FFB600] px-6 py-3
              text-black tracking-wider hover:bg-[#FFB600] transition"
          >
            <Download size={18} />
            {title}
          </a>
        ))}
      </div>
    </section>
  );
}
