"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

import { NOISE_TEXTURE, PAPER_COLOR } from "@/components/common/PaperBackground";
import { CHAPTERS, STATIONS, chapterOf, pad2, type Station } from "./content";
import { Hall, ShopFloor } from "./Scenery";
import {
  ConnectPanel,
  HeroPanel,
  IndustriesPanel,
  ProductsPanel,
  SummaryPanel,
} from "./Panels";

/*
 * The whole home page as one walk down the production line, Jindal-style:
 * the page pins to the screen and scrolling moves the plant sideways. The
 * machines run as they pass the middle of the screen, each step's caption
 * holds still while you read it and is pushed off by the next one, and the
 * company sections (products, industries, contact) sit on the same floor
 * at the end of the line.
 */

type PanelKind = "hero" | "station" | "summary" | "products" | "industries" | "contact";

interface PanelDef {
  kind: PanelKind;
  label: string;
  station?: Station;
  /** Index into STATIONS for station panels. */
  step?: number;
}

const PANELS: PanelDef[] = [
  { kind: "hero", label: "Start" },
  ...STATIONS.map((station, step) => ({ kind: "station" as const, label: station.title, station, step })),
  { kind: "summary", label: "Made under one roof" },
  { kind: "products", label: "Our products" },
  { kind: "industries", label: "Industries we serve" },
  { kind: "contact", label: "Contact us" },
];

const STATION_PANEL = (step: number) => step + 1;

// Smooths mouse-wheel steps into a glide; touch scrolling is already smooth,
// so it gets a much stiffer spring that keeps the plant under the finger.
const SPRING = { stiffness: 170, damping: 34, mass: 0.5, restDelta: 0.5 };
const TOUCH_SPRING = { stiffness: 600, damping: 60, mass: 0.3, restDelta: 0.5 };

/** Horizontal pixels per pixel of vertical scroll. */
const speedFor = (vw: number) => (vw >= 1024 ? 1.4 : 1);

const noSubscribe = () => () => {};
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);

interface Bounds {
  left: number;
  width: number;
  /** Caption offset and width, for the hold-then-push captions. */
  gutter: number;
  captionW: number;
}

/**
 * A machine's progress from the track position under the middle of the
 * screen: 0 while its left edge is still a quarter of its width right of
 * centre, 1 once about 70% of it has passed the middle.
 */
const stageProgress = (center: number, b: Bounds | undefined) =>
  b && b.width ? clamp01(((center - b.left) / b.width + 0.25) / 0.95) : 0;

/** Where the track should stop to show a panel: stations centred, the rest from their left edge. */
function targetFor(i: number, b: Bounds | undefined, vw: number) {
  if (!b) return 0;
  return PANELS[i].kind === "station" ? b.left + b.width / 2 - vw / 2 : b.left;
}

export default function HomeLine() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bounds = useRef<Bounds[]>([]);
  const speedRef = useRef(1);
  const reduce = useReducedMotion() ?? false;
  const depth = reduce ? 0 : 1;

  const [geom, setGeom] = useState({ distance: 0, speed: 1 });
  const [active, setActive] = useState(0);
  const coarse = useSyncExternalStore(noSubscribe, isCoarsePointer, () => false);

  const distanceMV = useMotionValue(0);
  const viewportMV = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // How far along the track the left edge of the screen is, in pixels.
  const rawPos = useTransform([scrollYProgress, distanceMV], ([p, d]: number[]) => p * d);
  const pos = useSpring(rawPos, coarse ? TOUCH_SPRING : SPRING);
  const trackX = useTransform(pos, (p) => -p);
  const center = useTransform([pos, viewportMV], ([p, vw]: number[]) => p + vw / 2);
  const progress = useTransform([pos, distanceMV], ([p, d]: number[]) => (d ? clamp01(p / d) : 0));

  const updateActive = useCallback((c: number) => {
    let idx = 0;
    bounds.current.forEach((b, i) => {
      if (c >= b.left) idx = i;
    });
    setActive(idx);
  }, []);

  useMotionValueEvent(center, "change", updateActive);

  // At the very end the next button turns into "back to the start".
  const [ended, setEnded] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setEnded(p > 0.995));

  /* ---- measuring ---- */

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const panels = track.querySelectorAll<HTMLElement>("[data-panel]");
      bounds.current = Array.from(panels, (el) => {
        const caption = el.querySelector<HTMLElement>("[data-caption]");
        return {
          left: el.offsetLeft,
          width: el.offsetWidth,
          gutter: caption?.offsetLeft ?? 0,
          captionW: caption?.offsetWidth ?? 0,
        };
      });
      const vw = window.innerWidth;
      const d = Math.max(0, track.offsetWidth - vw);
      speedRef.current = speedFor(vw);
      distanceMV.set(d);
      viewportMV.set(vw);
      setGeom({ distance: d, speed: speedRef.current });
      // Land on the current spot after a resize or a restored scroll
      // instead of gliding there through every machine.
      pos.jump(scrollYProgress.get() * d);
      updateActive(pos.get() + vw / 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distanceMV, viewportMV, pos, scrollYProgress, updateActive]);

  /* ---- moving around ---- */

  // Jumps (rail, buttons, arrow keys) animate the page scroll themselves
  // rather than relying on native smooth scrolling, so they glide the same
  // in every browser; any wheel or touch from the visitor cancels them.
  const glide = useRef<AnimationPlaybackControls | null>(null);
  /** Track position the running glide is heading for. */
  const glideTo = useRef(0);

  /** Track position for the page's actual scroll, read from the layout. */
  const currentPos = useCallback(() => {
    const section = sectionRef.current;
    const d = distanceMV.get();
    if (!section || !d) return 0;
    const range = section.offsetHeight - window.innerHeight;
    return range > 0 ? clamp01(-section.getBoundingClientRect().top / range) * d : 0;
  }, [distanceMV]);

  const scrollToPos = useCallback(
    (target: number, behavior: "smooth" | "instant" = "smooth") => {
      const section = sectionRef.current;
      const d = distanceMV.get();
      if (!section || !d) return;
      const range = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const to = top + clamp01(target / d) * range;
      glide.current?.stop();
      if (behavior === "instant" || reduce) {
        window.scrollTo(0, to);
        return;
      }
      const from = window.scrollY;
      glideTo.current = clamp(target, 0, d);
      glide.current = animate(from, to, {
        duration: clamp(Math.abs(to - from) / 3500, 0.45, 1.6),
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          glide.current = null;
        },
      });
    },
    [distanceMV, reduce],
  );

  useEffect(() => {
    const cancel = () => {
      glide.current?.stop();
      glide.current = null;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, []);

  const goToPanel = useCallback(
    (i: number) => scrollToPos(targetFor(i, bounds.current[i], window.innerWidth)),
    [scrollToPos],
  );

  const goToChapter = useCallback(
    (c: number) => goToPanel(STATION_PANEL(STATIONS.findIndex((s) => s.chapter === CHAPTERS[c].id))),
    [goToPanel],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      // Pressed again mid-glide: carry on from where that glide is going.
      const p = glide.current ? glideTo.current : currentPos();
      const vw = window.innerWidth;
      const targets = bounds.current.map((b, i) => clamp(targetFor(i, b, vw), 0, distanceMV.get()));
      const next =
        dir > 0
          ? targets.findIndex((t) => t > p + 8)
          : targets.findLastIndex((t) => t < p - 8);
      if (next >= 0) scrollToPos(targets[next]);
      // Past the last stop: the rest of the closing panel.
      else if (dir > 0) scrollToPos(distanceMV.get());
    },
    [currentPos, distanceMV, scrollToPos],
  );

  // Arrow keys walk the line one stop at a time.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const el = e.target;
      if (el instanceof Element && el.closest("input, textarea, select, [contenteditable='true']")) return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // The page looks sideways, so sideways gestures should move it too.
  useHorizontalGestures(sectionRef, speedRef);

  // Tabbing to a link in a panel off to the side brings that panel in.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onFocus = (e: FocusEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const vw = window.innerWidth;
      if (rect.left >= 0 && rect.right <= vw) return;
      scrollToPos(pos.get() + rect.left + rect.width / 2 - vw / 2, "instant");
    };
    track.addEventListener("focusin", onFocus);
    return () => track.removeEventListener("focusin", onFocus);
  }, [pos, scrollToPos]);

  /* ---- what's on screen ---- */

  const activeDef = PANELS[active];
  const activeStep = activeDef?.step ?? (active > STATIONS.length ? STATIONS.length - 1 : -1);
  const current = activeStep >= 0 ? STATIONS[activeStep] : null;
  const nextDef = PANELS[active + 1];

  return (
    <section
      ref={sectionRef}
      aria-label="Natraj Aluform: from scrap to shipment"
      className="relative"
      style={{
        height: geom.distance ? `calc(${geom.distance / geom.speed}px + 100svh)` : "100svh",
        backgroundColor: PAPER_COLOR,
      }}
    >
      <div
        className="nl-viewport sticky top-0 h-svh overflow-clip"
        style={{ backgroundColor: PAPER_COLOR }}
      >
        {/* warm light, as on the rest of the site */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 h-[460px] w-[460px] rounded-full bg-[#FFB600]/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -left-48 top-1/2 h-[380px] w-[380px] rounded-full bg-[#F39E00]/10 blur-[120px]" />

        <Hall pos={pos} depth={0.45 * depth + (1 - depth)} />
        <ShopFloor pos={pos} depth={depth} />

        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="absolute inset-y-0 left-0 flex w-max will-change-transform"
        >
          {PANELS.map((def, i) => {
            switch (def.kind) {
              case "hero":
                return (
                  <HeroPanel
                    key="hero"
                    pos={pos}
                    viewport={viewportMV}
                    depth={depth}
                    onChapter={goToChapter}
                  />
                );
              case "station":
                return (
                  <StationPanel
                    key={def.station!.id}
                    station={def.station!}
                    step={def.step!}
                    panel={i}
                    pos={pos}
                    center={center}
                    boundsRef={bounds}
                    live={Math.abs(i - active) <= 1}
                    reduce={reduce}
                    depth={depth}
                  />
                );
              case "summary":
                return <SummaryPanel key="summary" />;
              case "products":
                return <ProductsPanel key="products" />;
              case "industries":
                return <IndustriesPanel key="industries" />;
              case "contact":
                return <ConnectPanel key="contact" />;
            }
          })}
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />

        <PhoneCaption step={activeDef?.kind === "station" ? activeStep : -1} panel={active} />

        <BottomBar
          progress={progress}
          atStart={active === 0}
          atEnd={ended}
          nextLabel={nextDef?.label}
          onStep={step}
          onRestart={() => scrollToPos(0)}
        />

        <p className="sr-only" aria-live="polite">
          {current && activeDef?.kind === "station"
            ? `Step ${activeStep + 1} of ${STATIONS.length}: ${current.title}`
            : activeDef?.label}
        </p>
      </div>
    </section>
  );
}

/* ---------------- a machine and its caption ---------------- */

interface StationPanelProps {
  station: Station;
  step: number;
  panel: number;
  pos: MotionValue<number>;
  center: MotionValue<number>;
  boundsRef: RefObject<Bounds[]>;
  live: boolean;
  reduce: boolean;
  depth: number;
}

// Memoised, like the other panels: the line re-renders whenever the active
// stop changes, and only the panels whose `live` flips need to follow.
const StationPanel = memo(function StationPanel({
  station,
  step,
  panel,
  pos,
  center,
  boundsRef,
  live,
  reduce,
  depth,
}: StationPanelProps) {
  const { Drawing } = station;
  const chapter = chapterOf(station.chapter);
  const headingId = `line-station-${station.id}`;
  const opensChapter = STATIONS.findIndex((s) => s.chapter === station.chapter) === step;

  const scrolled = useTransform(center, (c) => stageProgress(c, boundsRef.current?.[panel]));
  const finished = useMotionValue(1);
  // Visitors who ask for reduced motion see each machine in its finished state.
  const t = reduce ? finished : scrolled;

  // Hold the caption at the left of the screen while its machine passes,
  // until it reaches the end of its own panel and the next caption takes over.
  const captionX = useTransform(pos, (p) => {
    const b = boundsRef.current?.[panel];
    if (!b) return 0;
    return clamp(p - b.left, 0, Math.max(0, b.width - b.captionW - 2 * b.gutter));
  });
  const captionOpacity = useTransform(t, [0, 0.14], [0, 1]);
  const captionY = useTransform(t, [0, 0.14], [24, 0]);

  // The big step number drifts against the machine for depth.
  const numberX = useTransform(t, [0, 1], [140 * depth, -140 * depth]);
  // The chapter name sits behind the machines and lags behind them.
  const wordX = useTransform(center, (c) => {
    const b = boundsRef.current?.[panel];
    return b ? Math.max(0, c - b.left) * 0.42 * depth : 0;
  });

  return (
    <article
      data-panel
      data-live={live}
      aria-labelledby={headingId}
      className="relative h-full flex-none"
      style={{ width: `calc(var(--u) * ${station.width})` }}
    >
      {opensChapter && (
        <motion.p
          aria-hidden
          style={{ x: wordX, bottom: "calc(var(--band) + var(--stage-h) * 0.5)" }}
          className="nl-outline pointer-events-none absolute left-[var(--gutter)] select-none whitespace-nowrap text-[clamp(5rem,min(22svh,18vw),15rem)] font-extrabold uppercase leading-none tracking-tight"
        >
          {chapter.label}
        </motion.p>
      )}

      <motion.span
        aria-hidden
        style={{ x: numberX, top: "calc(var(--top) + 0.5rem)" }}
        className="pointer-events-none absolute right-[6%] hidden select-none text-[clamp(6rem,15svh,10rem)] font-extrabold leading-none tracking-tighter text-[#212121]/[0.045] lg:block"
      >
        {pad2(step + 1)}
      </motion.span>

      <div className="absolute inset-x-0 bottom-[var(--band)]" style={{ height: "var(--stage-h)" }}>
        <Drawing t={t} />
      </div>

      {/* Phones show one fixed caption instead (see PhoneCaption): their
          machines are narrower than a caption, so two would always overlap. */}
      <motion.div
        data-caption
        style={{ x: captionX, top: "var(--top)" }}
        className="nl-caption absolute left-[var(--gutter)] z-10 hidden lg:block"
      >
        <motion.div style={{ opacity: captionOpacity, y: captionY }}>
          <StepCard station={station} step={step} headingId={headingId} />
        </motion.div>
      </motion.div>
    </article>
  );
});

/** A step's caption: what happens at this machine, and its key figures. */
function StepCard({ station, step, headingId }: { station: Station; step: number; headingId?: string }) {
  return (
    <div className="rounded-[22px] border border-[#212121]/10 bg-[#F8F7F3]/90 p-4 shadow-[0_24px_48px_-32px_rgba(33,33,33,0.45)] sm:p-5 lg:bg-[#F8F7F3]/80 lg:p-6 lg:backdrop-blur-md">
      <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9C6200]">
        <span className="tabular-nums">Step {pad2(step + 1)}</span>
        <span aria-hidden className="h-px w-5 bg-[#9C6200]/40" />
        <span>{chapterOf(station.chapter).label}</span>
      </p>
      <h3
        id={headingId}
        className="mt-2 text-[clamp(1.35rem,min(2.6vw,4.6svh),2.15rem)] font-extrabold leading-[1.1] tracking-tight text-[#212121]"
      >
        {station.title}
      </h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-[#4a5565] sm:text-[15px] lg:text-base">
        {station.body}
      </p>
      <dl className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#212121]/10 pt-3 [@media(max-height:600px)]:hidden">
        {station.specs.map((spec) => (
          <div key={spec.label} className={station.specs.length === 1 ? "col-span-2" : undefined}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6b6b]">
              {spec.label}
            </dt>
            <dd className="mt-0.5 text-[15px] font-bold text-[#212121] lg:text-base">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Phones: one caption held at the top of the screen, swapping as each
 * machine reaches the middle. It slides in from the side you are heading.
 */
function PhoneCaption({ step, panel }: { step: number; panel: number }) {
  // Direction of travel, updated whenever the panel changes.
  const [shown, setShown] = useState(panel);
  const [dir, setDir] = useState(1);
  if (panel !== shown) {
    setShown(panel);
    setDir(panel > shown ? 1 : -1);
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[var(--gutter)] right-[var(--gutter)] z-10 max-w-[520px] lg:hidden"
      style={{ top: "var(--top)" }}
    >
      <AnimatePresence initial={false} custom={dir}>
        {step >= 0 && (
          <motion.div
            key={STATIONS[step].id}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: 40 * d }),
              show: { opacity: 1, x: 0 },
              leave: (d: number) => ({ opacity: 0, x: -40 * d }),
            }}
            initial="enter"
            animate="show"
            exit="leave"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-x-0 top-0"
          >
            <StepCard station={STATIONS[step]} step={step} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- bottom: next/previous and overall progress ---------------- */

interface BottomBarProps {
  progress: MotionValue<number>;
  atStart: boolean;
  atEnd: boolean;
  nextLabel?: string;
  onStep: (dir: 1 | -1) => void;
  onRestart: () => void;
}

function BottomBar({ progress, atStart, atEnd, nextLabel, onStep, onRestart }: BottomBarProps) {
  // The bar is drawn as a profile leaving the press, hot at its tip.
  const tipX = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <div className="absolute inset-x-0 bottom-0 z-20" style={{ height: "var(--band)" }}>
      <div className="flex h-full items-center gap-2.5 px-4 pb-1.5 lg:gap-3 lg:px-[var(--gutter)]">
        <button
          type="button"
          onClick={() => onStep(-1)}
          disabled={atStart}
          aria-label="Previous stop"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#212121]/20 bg-[#F8F7F3]/80 text-[#212121] backdrop-blur-sm transition hover:border-[#212121]/50 disabled:cursor-default disabled:opacity-30 lg:size-10"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => (atEnd ? onRestart() : onStep(1))}
          aria-label={atEnd ? "Back to the start" : nextLabel ? `Next: ${nextLabel}` : "Next stop"}
          className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-[#212121] pl-3.5 pr-3 text-[13px] font-semibold text-white transition hover:bg-[#9C6200] lg:h-10 lg:pl-5 lg:pr-4 lg:text-sm"
        >
          {atEnd ? (
            <>
              <RotateCcw className="size-4 shrink-0" aria-hidden />
              Back to the start
            </>
          ) : (
            <>
              <span className="max-w-[46vw] truncate">
                {atStart ? (
                  "Start the tour"
                ) : nextLabel ? (
                  <>
                    <span className="font-normal text-white/60">Next: </span>
                    {nextLabel}
                  </>
                ) : (
                  "Next"
                )}
              </span>
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </>
          )}
        </button>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[5px] bg-[#212121]/[0.06]">
        <motion.div
          className="h-full origin-left bg-gradient-to-b from-[#F2F4F6] via-[#C9CED4] to-[#AEB4BB]"
          style={{ scaleX: progress }}
        />
        <motion.span
          className="absolute top-1/2 h-[7px] w-5 -translate-x-full -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FFCB55] to-[#FFB600] shadow-[0_0_12px_2px_rgba(255,182,0,0.55)]"
          style={{ left: tipX }}
        />
      </div>
    </div>
  );
}

/* ---------------- sideways wheel and swipe ---------------- */

/**
 * Trackpad swipes and touch drags to the side move the line as well, with a
 * little momentum on release. Vertical scrolling is left to the browser.
 */
function useHorizontalGestures(
  sectionRef: RefObject<HTMLElement | null>,
  speedRef: RefObject<number>,
) {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      window.scrollBy(0, e.deltaX / speedRef.current);
    };

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let axis: "x" | "y" | null = null;
    let frame = 0;

    const onStart = (e: TouchEvent) => {
      cancelAnimationFrame(frame);
      const touch = e.touches[0];
      startX = lastX = touch.clientX;
      startY = touch.clientY;
      lastT = e.timeStamp;
      velocity = 0;
      axis = null;
    };

    const onMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      if (!axis) {
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.hypot(dx, dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis !== "x") return;
      e.preventDefault();
      const delta = lastX - touch.clientX;
      const dt = Math.max(1, e.timeStamp - lastT);
      velocity = 0.8 * (delta / dt) + 0.2 * velocity;
      window.scrollBy(0, delta / speedRef.current);
      lastX = touch.clientX;
      lastT = e.timeStamp;
    };

    const onEnd = () => {
      if (axis !== "x") return;
      let v = velocity * 16;
      const glide = () => {
        if (Math.abs(v) < 0.5) return;
        window.scrollBy(0, v / speedRef.current);
        v *= 0.94;
        frame = requestAnimationFrame(glide);
      };
      frame = requestAnimationFrame(glide);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);

    // Stop a sideways trackpad swipe from turning into browser back/forward.
    const root = document.documentElement;
    const previous = root.style.overscrollBehaviorX;
    root.style.overscrollBehaviorX = "none";

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
      root.style.overscrollBehaviorX = previous;
    };
  }, [sectionRef, speedRef]);
}

