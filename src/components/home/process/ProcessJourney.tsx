"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { NOISE_TEXTURE, PAPER_COLOR } from "@/components/common/PaperBackground";
import { inView } from "@/components/common/Reveal";
import { EndDrawing, StartDrawing, VB_H } from "./drawings";
import {
  CHAPTERS,
  STATIONS,
  chapterLabel,
  pad2,
  type Station,
} from "./stations";

// Drawing-sheet grid: fine 32px squares with a heavier line every 160px.
const GRID: CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(33,33,33,0.045) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(33,33,33,0.045) 1px, transparent 1px)",
    "linear-gradient(rgba(33,33,33,0.06) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(33,33,33,0.06) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: "32px 32px, 32px 32px, 160px 160px, 160px 160px",
};

// Width (in viewBox units) of the intro and outro panels.
const END_W = 640;

const INTRO = {
  eyebrow: "How it's made",
  title: "From scrap to shipment",
  body: "Follow the metal through our plant, one machine at a time: melted, cast, extruded, cut, aged, packed and sent on its way.",
};

const OUTRO = {
  eyebrow: "End of the line",
  title: "Made under one roof",
  body: "Melting, casting, extrusion, ageing and packing all happen in our own plant, so every profile is made to the same standard.",
};

/** Height of a drawing on desktop, and the panel width that keeps its ratio. */
const panelWidth = (w: number) => `calc(var(--stage-h) * ${w / VB_H})`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

interface Bounds {
  left: number;
  width: number;
}

/**
 * A stage's progress from the track position under the middle of the screen:
 * 0 while its left edge is still a quarter of its width right of centre,
 * 1 once about 70% of it has passed the middle.
 */
const stageProgress = (center: number, b: Bounds | undefined) =>
  b && b.width ? clamp01(((center - b.left) / b.width + 0.25) / 0.95) : 0;

/** Fade-and-rise for one line of a stage card, starting at `delay`. */
function useEnter(t: MotionValue<number>, delay: number) {
  const opacity = useTransform(t, [delay, delay + 0.16], [0, 1]);
  const y = useTransform(t, [delay, delay + 0.16], [28, 0]);
  return { opacity, y };
}

/**
 * Visitors who ask for reduced motion see every machine in its finished
 * state instead of animating with the scroll.
 */
function useStageProgress(scrolled: MotionValue<number>) {
  const reduce = useReducedMotion();
  const finished = useMotionValue(1);
  return reduce ? finished : scrolled;
}

export default function ProcessJourney() {
  return (
    <div id="process">
      <DesktopJourney />
      <MobileJourney />
    </div>
  );
}

/* ---------------- desktop: pinned, scroll moves the line sideways ---------------- */

function DesktopJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stationBounds = useRef<Bounds[]>([]);
  const chapterBounds = useRef<{ start: number; end: number }[]>([]);

  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(-1);

  const distanceMV = useMotionValue(0);
  const viewportMV = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The section is exactly `distance` taller than the screen, so one pixel of
  // vertical scroll moves the line one pixel sideways.
  const x = useTransform(
    [scrollYProgress, distanceMV],
    ([p, d]: number[]) => -p * d,
  );
  // Track position under the middle of the screen.
  const center = useTransform(
    [scrollYProgress, distanceMV, viewportMV],
    ([p, d, vw]: number[]) => p * d + vw / 2,
  );
  // The intro slides away a little faster than the track and fades out.
  const introX = useTransform([center, viewportMV], ([c, vw]: number[]) => -(c - vw / 2) * 0.35);
  const introOpacity = useTransform([center, viewportMV], ([c, vw]: number[]) =>
    vw ? 1 - clamp01((c - vw / 2) / (vw * 0.45)) : 1,
  );

  const updateActive = useCallback((c: number) => {
    let idx = -1;
    stationBounds.current.forEach((b, i) => {
      if (c >= b.left) idx = i;
    });
    setActive(idx);
  }, []);

  useMotionValueEvent(center, "change", updateActive);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const panels = track.querySelectorAll<HTMLElement>("[data-station]");
      stationBounds.current = Array.from(panels, (el) => ({
        left: el.offsetLeft,
        width: el.offsetWidth,
      }));
      chapterBounds.current = CHAPTERS.map((chapter) => {
        const idx = STATIONS.flatMap((s, i) => (s.chapter === chapter.id ? [i] : []));
        const first = stationBounds.current[idx[0]];
        const last = stationBounds.current[idx[idx.length - 1]];
        return first && last
          ? { start: first.left, end: last.left + last.width }
          : { start: 0, end: 1 };
      });

      const d = Math.max(0, track.offsetWidth - window.innerWidth);
      distanceMV.set(d);
      viewportMV.set(window.innerWidth);
      setDistance(d);
      updateActive(center.get());
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [center, distanceMV, viewportMV, updateActive]);

  const jumpTo = (stationIndex: number) => {
    const section = sectionRef.current;
    const b = stationBounds.current[stationIndex];
    if (!section || !b) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const offset = clamp01(
      (b.left + b.width / 2 - window.innerWidth / 2) / (distanceMV.get() || 1),
    );
    window.scrollTo({ top: top + offset * distanceMV.get(), behavior: "smooth" });
  };

  const current = active >= 0 ? STATIONS[active] : null;

  return (
    <section
      ref={sectionRef}
      aria-label="How our aluminium profiles are made"
      className="relative hidden lg:block"
      style={{ height: distance ? `calc(${distance}px + 100vh)` : "100vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={
          {
            backgroundColor: PAPER_COLOR,
            "--stage-h": "clamp(260px, calc(100vh - 430px), 500px)",
          } as CSSProperties
        }
      >
        <motion.div
          ref={trackRef}
          style={{ x, ...GRID }}
          className="absolute inset-y-0 left-0 flex w-max will-change-transform"
        >
          {/* Shop floor under every machine, so the line reads as one plant. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 bg-[#ECE6DA]/60"
            style={{ height: "calc(3rem + var(--stage-h) * 0.07)" }}
          />

          <EndPanel
            width={END_W}
            Drawing={StartDrawing}
            eyebrow={INTRO.eyebrow}
            title={INTRO.title}
            body={INTRO.body}
            contentStyle={{ x: introX, opacity: introOpacity }}
          >
            <p className="mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#212121]/60">
              <span className="flex size-9 items-center justify-center rounded-full border border-[#212121]/20">
                <ArrowDown className="np-nudge size-4" aria-hidden />
              </span>
              Scroll to run the line
            </p>
          </EndPanel>

          {STATIONS.map((station, i) => (
            <StationPanel
              key={station.id}
              station={station}
              index={i}
              center={center}
              boundsRef={stationBounds}
              live={Math.abs(i - active) <= 1}
            />
          ))}

          <EndPanel
            width={END_W}
            Drawing={EndDrawing}
            eyebrow={OUTRO.eyebrow}
            title={OUTRO.title}
            body={OUTRO.body}
            reveal
          >
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about/capabilities"
                className="inline-flex items-center gap-2 rounded-full bg-[#212121] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#9C6200]"
              >
                Our capabilities <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/connect/contactus"
                className="inline-flex items-center gap-2 rounded-full border border-[#212121]/20 bg-white/60 px-6 py-3 text-[15px] font-semibold text-[#212121] transition hover:border-[#FFB600]"
              >
                Talk to us
              </Link>
            </div>
          </EndPanel>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />

        {/* Chapter rail and status readout */}
        <div className="absolute inset-x-0 top-[92px] z-10">
          <div className="mx-auto flex max-w-7xl items-end gap-10 px-8 xl:px-12">
            <ol className="flex flex-1 gap-3">
              {CHAPTERS.map((chapter, i) => (
                <ChapterTick
                  key={chapter.id}
                  index={i}
                  label={chapter.label}
                  center={center}
                  boundsRef={chapterBounds}
                  isActive={current?.chapter === chapter.id}
                  onSelect={() =>
                    jumpTo(STATIONS.findIndex((s) => s.chapter === chapter.id))
                  }
                />
              ))}
            </ol>

            <div className="w-56 shrink-0 text-right" aria-live="polite">
              <p className="text-2xl font-extrabold tabular-nums tracking-tight text-[#212121]">
                {pad2(active + 1)}
                <span className="text-[#212121]/25"> / {pad2(STATIONS.length)}</span>
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-[#9C6200]">
                <span className="font-medium text-[#6b6b6b]">Metal: </span>
                {current?.material ?? "Not yet melted"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ChapterTickProps {
  index: number;
  label: string;
  center: MotionValue<number>;
  boundsRef: RefObject<{ start: number; end: number }[]>;
  isActive: boolean;
  onSelect: () => void;
}

function ChapterTick({ index, label, center, boundsRef, isActive, onSelect }: ChapterTickProps) {
  const fill = useTransform(center, (c) => {
    const b = boundsRef.current?.[index];
    return b ? clamp01((c - b.start) / (b.end - b.start)) : 0;
  });

  return (
    <li className="flex-1">
      <button
        type="button"
        onClick={onSelect}
        aria-current={isActive ? "step" : undefined}
        className="group block w-full cursor-pointer text-left"
      >
        <span
          className={cn(
            "block text-xs font-semibold uppercase tracking-[0.25em] transition-colors",
            isActive ? "text-[#212121]" : "text-[#212121]/40 group-hover:text-[#212121]/70",
          )}
        >
          <span className="tabular-nums text-[#9C6200]">{pad2(index + 1)}</span> {label}
        </span>
        <span className="mt-2.5 block h-[3px] overflow-hidden rounded-full bg-[#212121]/10">
          <motion.span
            className="block h-full origin-left rounded-full bg-[#FFB600]"
            style={{ scaleX: fill }}
          />
        </span>
      </button>
    </li>
  );
}

interface EndPanelProps {
  width: number;
  Drawing: ComponentType;
  eyebrow: string;
  title: string;
  body: string;
  /** Scroll-linked motion for the text block (the intro uses it to exit). */
  contentStyle?: { x: MotionValue<number>; opacity: MotionValue<number> };
  /** Fade the text in when the panel arrives (the outro). */
  reveal?: boolean;
  children?: ReactNode;
}

function EndPanel({ width, Drawing, eyebrow, title, body, contentStyle, reveal, children }: EndPanelProps) {
  return (
    <article className="relative h-full flex-none" style={{ width: panelWidth(width) }}>
      <div className="absolute inset-x-0 bottom-12" style={{ height: "var(--stage-h)" }}>
        <Drawing />
      </div>
      <motion.div
        {...(reveal ? inView : {})}
        style={contentStyle}
        className="relative z-10 ml-[clamp(2rem,6vw,6rem)] mr-8 max-w-[540px] pt-[170px]"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">{eyebrow}</p>
        <h2 className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-tight text-[#212121] xl:text-6xl">
          {title}
        </h2>
        <div className="mt-6 h-1.5 w-24 rounded-full bg-[#FFB600]" />
        <p className="mt-6 text-lg leading-[1.7] text-[#4a5565]">{body}</p>
        {children}
      </motion.div>
    </article>
  );
}

interface StationPanelProps {
  station: Station;
  index: number;
  center: MotionValue<number>;
  boundsRef: RefObject<Bounds[]>;
  live: boolean;
}

function StationPanel({ station, index, center, boundsRef, live }: StationPanelProps) {
  const { Drawing } = station;
  const headingId = `station-${station.id}`;

  const scrolled = useTransform(center, (c) => stageProgress(c, boundsRef.current?.[index]));
  const t = useStageProgress(scrolled);

  // The card and the big stage number drift against the drawing for depth.
  const cardX = useTransform(t, [0, 1], [56, -56]);
  const numberX = useTransform(t, [0, 1], [150, -150]);
  const numberOpacity = useTransform(t, [0, 0.2], [0, 1]);
  const eyebrow = useEnter(t, 0);
  const title = useEnter(t, 0.04);
  const body = useEnter(t, 0.08);
  const chips = useEnter(t, 0.12);

  return (
    <article
      data-station
      data-live={live}
      aria-labelledby={headingId}
      className="relative h-full flex-none"
      style={{ width: panelWidth(station.width) }}
    >
      <motion.span
        aria-hidden
        style={{ x: numberX, opacity: numberOpacity }}
        className="pointer-events-none absolute right-[6%] top-[150px] select-none text-[9rem] font-extrabold leading-none tracking-tighter text-[#212121]/[0.045]"
      >
        {pad2(index + 1)}
      </motion.span>

      <div className="absolute inset-x-0 bottom-12" style={{ height: "var(--stage-h)" }}>
        <Drawing t={t} />
      </div>

      <motion.div
        style={{ x: cardX }}
        className="relative z-10 ml-[7%] mr-[8%] max-w-[440px] pt-[170px]"
      >
        <motion.p
          style={eyebrow}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]"
        >
          Stage {pad2(index + 1)} · {chapterLabel(station.chapter)}
        </motion.p>
        <motion.h3
          id={headingId}
          style={title}
          className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#212121] xl:text-4xl"
        >
          {station.title}
        </motion.h3>
        <motion.div style={title} className="mt-4 h-1 w-12 rounded-full bg-[#FFB600]" />
        <motion.p style={body} className="mt-4 text-base leading-relaxed text-[#4a5565] xl:text-[17px]">
          {station.body}
        </motion.p>
        <motion.div style={chips}>
          <Chips items={station.chips} className="mt-5" />
        </motion.div>
      </motion.div>
    </article>
  );
}

function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-[#FFB600]/60 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-[#212121]"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- phones and tablets: a vertical timeline ---------------- */

function MobileJourney() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 70%"],
  });

  return (
    <section
      aria-label="How our aluminium profiles are made"
      className="relative isolate lg:hidden"
      style={{ backgroundColor: PAPER_COLOR, ...GRID }}
    >
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <motion.div {...inView}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
            {INTRO.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(2.25rem,10vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#212121]">
            {INTRO.title}
          </h2>
          <div className="mt-5 h-1.5 w-20 rounded-full bg-[#FFB600]" />
          <p className="mt-5 text-base leading-relaxed text-[#4a5565] sm:text-lg">{INTRO.body}</p>
        </motion.div>

        <ol ref={listRef} className="np-mobile relative mt-14 space-y-16">
          <li aria-hidden className="absolute bottom-2 left-[15px] top-2 w-[2px] bg-[#212121]/10">
            <motion.span
              className="block h-full w-full origin-top bg-[#FFB600]"
              style={{ scaleY: scrollYProgress }}
            />
          </li>

          {STATIONS.map((station, i) => (
            <MobileStation key={station.id} station={station} index={i} />
          ))}
        </ol>

        <motion.div {...inView} className="mt-16 border-t border-[#212121]/10 pt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
            {OUTRO.eyebrow}
          </p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-[#212121]">{OUTRO.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-[#4a5565]">{OUTRO.body}</p>
          <Link
            href="/about/capabilities"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#212121] px-6 py-3 text-[15px] font-semibold text-white"
          >
            Our capabilities <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Phone drawings keep a readable height and pan across the machine instead
// of shrinking to the screen width.
const MOBILE_STAGE_H = "clamp(190px, 56vw, 300px)";

function MobileStation({ station, index }: { station: Station; index: number }) {
  const { Drawing } = station;
  const frameRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const overflow = useMotionValue(0);

  // The machine runs while its drawing travels from the bottom of the screen
  // to just above the middle, so it plays out under the reader's thumb.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start 92%", "end 40%"],
  });
  const t = useStageProgress(scrollYProgress);
  const panX = useTransform([t, overflow], ([v, o]: number[]) => -o * v);

  useEffect(() => {
    const frame = frameRef.current;
    const sheet = sheetRef.current;
    if (!frame || !sheet) return;
    const measure = () => overflow.set(Math.max(0, sheet.offsetWidth - frame.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(sheet);
    return () => observer.disconnect();
  }, [overflow]);

  return (
    <motion.li {...inView} className="relative pl-12">
      <span className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border-2 border-[#FFB600] bg-[#F8F7F3] text-xs font-bold tabular-nums text-[#212121]">
        {pad2(index + 1)}
      </span>
      <p className="pt-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#9C6200]">
        {chapterLabel(station.chapter)} · {station.material}
      </p>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#212121] sm:text-3xl">
        {station.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[#4a5565]">{station.body}</p>
      <Chips items={station.chips} className="mt-4" />
      <div
        ref={frameRef}
        className="-ml-12 mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        style={{ height: MOBILE_STAGE_H }}
      >
        <motion.div
          ref={sheetRef}
          className="h-full min-w-full"
          style={{ x: panX, width: `calc(${MOBILE_STAGE_H} * ${station.width / VB_H})` }}
        >
          <Drawing t={t} />
        </motion.div>
      </div>
    </motion.li>
  );
}
