import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Base colour of the paper surface; use it for anything that must blend into the page. */
export const PAPER_COLOR = "#F8F7F3";

// Grayscale fractal noise, tiled over the page to give it the paper grain
// of the reference design without shipping a texture image.
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface PaperBackgroundProps {
  className?: string;
  children: ReactNode;
}

/**
 * Warm off-white page surface with paper grain and soft amber glows.
 * The decoration sits on -z-10 inside an isolated stacking context, so
 * children lay out directly in this element and need no positioning.
 */
export default function PaperBackground({
  className,
  children,
}: PaperBackgroundProps) {
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundColor: PAPER_COLOR }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] mix-blend-multiply"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-[#FFB600]/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-[55%] -z-10 h-[380px] w-[380px] rounded-full bg-[#F39E00]/15 blur-[120px]"
      />
      {children}
    </div>
  );
}
