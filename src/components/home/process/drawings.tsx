"use client";

import type { ReactNode } from "react";
import { easeInOut, motion, useTransform, type MotionValue } from "framer-motion";

/*
 * Flat line drawings of the plant, one per stage of the home page journey.
 *
 * Every sheet shares a 400-unit-high viewBox with the floor at y=372 and the
 * profile running at y=258–278, so neighbouring sheets line up into one
 * continuous production line when they are laid side by side.
 *
 * Each drawing is driven by `t`, its stage's scroll progress from 0 to 1:
 * scrolling forward runs the machine (the truck drives in, the ram pushes,
 * the saw cuts) and scrolling back rewinds it. Only small ambient effects
 * (flames, smoke, spray) loop on their own, via the np-* classes in
 * globals.css. The sheets use no <defs>, so two copies of a drawing on one
 * page never clash over ids.
 */

export const VB_H = 400;
const FLOOR = 372;

const C = {
  ink: "#2B2B2B",
  body: "#FFFDF8",
  panel: "#EFEAE0",
  steel: "#D7DBE0",
  steelHi: "#F2F4F6",
  gold: "#FFB600",
  amber: "#F39E00",
  hot: "#FFCB55",
  deep: "#9C6200",
  water: "#8FB3C6",
  muted: "#8A8478",
  paper: "#F8F7F3",
  glass: "#E6EBED",
  crate: "#FFE3A3",
  warm: "#FFF1D2",
  lit: "#FFF0C7",
  sea: "#E8EFF2",
};

type Progress = MotionValue<number>;

export interface DrawingProps {
  /** Scroll progress of this stage, 0 → 1. */
  t: Progress;
}

/* ---------- motion helpers ---------- */

/** Eases from `from` to `to` while t runs from a to b, holding either side. */
function useSeg(t: Progress, a: number, b: number, from: number, to: number) {
  return useTransform(t, [a, b], [from, to], { ease: easeInOut });
}

/** 0 before a, 1 after b: for fading parts in. */
function useShow(t: Progress, a: number, b = a + 0.04) {
  return useTransform(t, [a, b], [0, 1]);
}

/** Wheel rotation (degrees) that matches a horizontal travel. */
function useRoll(x: MotionValue<number>, r: number) {
  return useTransform(x, (v) => (v / r) * (180 / Math.PI));
}

/** Readout text that counts with the scroll. */
function useCount(t: Progress, a: number, b: number, from: number, to: number, unit: string) {
  return useTransform(t, (v) => {
    const k = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return `${Math.round(from + (to - from) * k)}${unit}`;
  });
}

/* ---------- path helpers ---------- */

/** 45° hatching clipped to a rectangle. */
function hatch(x1: number, y1: number, x2: number, y2: number, step = 10) {
  const h = y2 - y1;
  let d = "";
  for (let x = x1 - h; x < x2; x += step) {
    let sx = x;
    let sy = y2;
    let ex = x + h;
    let ey = y1;
    if (sx < x1) {
      sy = y2 - (x1 - sx);
      sx = x1;
    }
    if (ex > x2) {
      ey = y1 + (ex - x2);
      ex = x2;
    }
    if (ex > sx) d += `M${sx} ${sy}L${ex} ${ey}`;
  }
  return d;
}

/** Running-bond brick joints for the furnace lining. */
function bricks(x1: number, y1: number, x2: number, y2: number, h = 18, w = 36) {
  let d = "";
  let row = 0;
  for (let y = y1; y < y2; y += h, row++) {
    if (y > y1) d += `M${x1} ${y}H${x2}`;
    for (let x = x1 + (row % 2 ? w / 2 : w); x < x2; x += w) {
      d += `M${x} ${y}V${Math.min(y + h, y2)}`;
    }
  }
  return d;
}

function vlines(x1: number, x2: number, step: number, y1: number, y2: number) {
  let d = "";
  for (let x = x1; x < x2; x += step) d += `M${x} ${y1}V${y2}`;
  return d;
}

function flame(x: number, y: number, s = 1) {
  return `M${x} ${y}c${-7 * s} ${-6 * s} ${-6 * s} ${-16 * s} 0 ${-24 * s}c${6 * s} ${8 * s} ${7 * s} ${18 * s} 0 ${24 * s}z`;
}

function range(from: number, to: number, step: number) {
  const out: number[] = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
}

function waves(from: number, to: number, y: number) {
  return range(from, to - 40, 40)
    .map((x) => `M${x} ${y}q10-6 20 0q10 6 20 0`)
    .join("");
}

/* ---------- shared parts ---------- */

interface SheetProps {
  w: number;
  label: string;
  /** Stretch of floor to draw; the shipping sheets swap part of it for water. */
  floorFrom?: number;
  floorTo?: number;
  children?: ReactNode;
}

export function Sheet({ w, label, floorFrom = 0, floorTo = w, children }: SheetProps) {
  return (
    <svg
      viewBox={`0 0 ${w} ${VB_H}`}
      role="img"
      aria-label={label}
      className="block h-full w-full overflow-visible"
      fill="none"
      stroke={C.ink}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {floorTo > floorFrom && (
        <g>
          <path d={`M${floorFrom} ${FLOOR}H${floorTo}`} />
          <path
            d={range(floorFrom + 8, floorTo - 2, 16)
              .map((x) => `M${x} ${FLOOR + 3}l-10 13`)
              .join("")}
            strokeWidth={1}
            opacity={0.25}
          />
        </g>
      )}
      {children}
    </svg>
  );
}

interface CalloutProps {
  /** Point on the machine the leader starts from. */
  x: number;
  y: number;
  /** Elbow of the leader; the label sits just past it. */
  tx: number;
  ty: number;
  end?: boolean;
  children: ReactNode;
}

function Callout({ x, y, tx, ty, end = false, children }: CalloutProps) {
  return (
    <g className="np-callout">
      <circle cx={x} cy={y} r={3} fill={C.ink} stroke="none" />
      <path
        d={`M${x} ${y}L${tx} ${ty - 4}H${end ? tx - 8 : tx + 8}`}
        stroke={C.muted}
        strokeWidth={1.25}
      />
      <text
        x={end ? tx - 12 : tx + 12}
        y={ty}
        textAnchor={end ? "end" : "start"}
        className="np-label"
      >
        {children}
      </text>
    </g>
  );
}

function Dim({ x1, x2, y, children }: { x1: number; x2: number; y: number; children: string }) {
  const mid = (x1 + x2) / 2;
  const tw = children.length * 7.4 + 18;
  return (
    <g stroke={C.deep} strokeWidth={1.25}>
      <path d={`M${x1} ${y - 9}V${y + 9}M${x2} ${y - 9}V${y + 9}M${x1} ${y}H${x2}`} />
      <path d={`M${x1} ${y}l9 -4v8zM${x2} ${y}l-9 -4v8z`} fill={C.deep} />
      <rect x={mid - tw / 2} y={y - 10} width={tw} height={20} rx={10} fill={C.paper} />
      <text x={mid} y={y + 4.5} textAnchor="middle" className="np-dim-text">
        {children}
      </text>
    </g>
  );
}

function DimV({ x, y1, y2, children }: { x: number; y1: number; y2: number; children: string }) {
  return (
    <g stroke={C.deep} strokeWidth={1.25}>
      <path d={`M${x - 9} ${y1}H${x + 9}M${x - 9} ${y2}H${x + 9}M${x} ${y1}V${y2}`} />
      <path d={`M${x} ${y1}l-4 9h8zM${x} ${y2}l-4 -9h8z`} fill={C.deep} />
      <text x={x + 12} y={(y1 + y2) / 2 + 4.5} className="np-dim-text">
        {children}
      </text>
    </g>
  );
}

function Wheel({ cx, cy, r = 24, roll }: { cx: number; cy: number; r?: number; roll?: MotionValue<number> }) {
  const s = r * 0.5;
  const k = s * 0.7;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.ink} />
      <circle cx={cx} cy={cy} r={r * 0.55} fill={C.body} />
      <motion.path
        style={{ rotate: roll }}
        d={`M${cx - s} ${cy}H${cx + s}M${cx} ${cy - s}V${cy + s}M${cx - k} ${cy - k}L${cx + k} ${cy + k}M${cx - k} ${cy + k}L${cx + k} ${cy - k}`}
        strokeWidth={1.5}
      />
      <circle cx={cx} cy={cy} r={3} fill={C.ink} />
    </g>
  );
}

/** Run-out table: rollers under the profile line, a rail and legs. */
function RollerTable({ from, to, legs }: { from: number; to: number; legs: number[] }) {
  return (
    <g>
      <path d={`M${from} 292H${to}`} />
      {range(from + 18, to - 10, 36).map((x) => (
        <circle key={x} cx={x} cy={285} r={7} fill={C.body} />
      ))}
      {legs.map((x) => (
        <rect key={x} x={x} y={292} width={10} height={FLOOR - 292} fill={C.panel} />
      ))}
    </g>
  );
}

/** Saw blade with teeth, turned by `spin` about its own centre. */
function Blade({ cx, cy, r, spin }: { cx: number; cy: number; r: number; spin: MotionValue<number> }) {
  const teeth = range(0, 330, 30)
    .map((deg) => {
      const a = (deg * Math.PI) / 180;
      const b = ((deg + 15) * Math.PI) / 180;
      return `M${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}L${cx + (r + 6) * Math.cos(b)} ${cy + (r + 6) * Math.sin(b)}`;
    })
    .join("");
  return (
    <motion.g style={{ rotate: spin }}>
      <circle cx={cx} cy={cy} r={r} fill={C.body} />
      <path d={teeth} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r * 0.3} fill={C.panel} />
    </motion.g>
  );
}

/** Cab facing right; `x` is the left edge of the load bed it pulls. */
function Cab({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x + 290} 330V252Q${x + 290} 238 ${x + 304} 238H${x + 344}L${x + 374} 280V330Z`} fill={C.body} />
      <path d={`M${x + 304} 252H${x + 340}L${x + 360} 280H${x + 304}Z`} fill={C.glass} />
      <path d={`M${x + 330} 286V326`} strokeWidth={1.25} />
      <rect x={x + 366} y={294} width={10} height={8} rx={2} fill={C.gold} />
    </g>
  );
}

/** Striped gate boom, hinged at its left end; `lift` is the angle in degrees. */
function Boom({ x1, x2, y, lift }: { x1: number; x2: number; y: number; lift: MotionValue<number> }) {
  return (
    <motion.g style={{ rotate: lift, originX: 0, originY: 0.5 }}>
      <path d={`M${x1} ${y}H${x2}`} strokeWidth={8} />
      <path d={`M${x1} ${y}H${x2}`} stroke={C.gold} strokeWidth={4} strokeDasharray="8 6" />
    </motion.g>
  );
}

/* ---------- the stages ---------- */

export function StartDrawing() {
  return (
    <Sheet w={640} label="Start of the production line">
      <rect x={520} y={250} width={10} height={122} fill={C.panel} />
      <rect x={444} y={226} width={162} height={40} rx={4} fill={C.body} />
      <text x={525} y={251} textAnchor="middle" className="np-plate">
        To the plant →
      </text>
    </Sheet>
  );
}

export function ScrapDrawing({ t }: DrawingProps) {
  const truckX = useSeg(t, 0, 0.62, -320, 0);
  const roll = useRoll(truckX, 24);
  const lift = useSeg(t, 0.32, 0.6, 0, -56);

  return (
    <Sheet w={720} label="Truck bringing aluminium scrap into the plant">
      {/* gate: the boom lifts as the truck pulls up */}
      <Boom x1={584} x2={700} y={206} lift={lift} />
      <rect x={574} y={198} width={20} height={26} rx={3} fill={C.body} />
      <rect x={560} y={150} width={16} height={222} fill={C.panel} />
      <rect x={692} y={150} width={16} height={222} fill={C.panel} />
      <rect x={548} y={128} width={172} height={28} rx={3} fill={C.body} />
      <text x={634} y={147} textAnchor="middle" className="np-plate">
        Gate 01
      </text>

      {/* tipper truck loaded with scrap */}
      <motion.g style={{ x: truckX }}>
        <rect x={96} y={318} width={372} height={12} rx={2} fill={C.panel} />
        <path d="M110 236H384L376 318H118Z" fill={C.body} />
        <path d="M168 240V314M226 240V314M284 240V314M340 240V314" strokeWidth={1.25} opacity={0.45} />
        <path
          d="M114 236L132 214L152 222L170 202L192 214L208 196L232 208L252 192L274 206L296 196L318 212L338 202L360 218L382 236Z"
          fill={C.steel}
        />
        <path
          d="M150 228l14-10M196 222l18-4M240 220l10-12M286 226l16-12M330 228l12-10M262 214l-10-6M178 214l6 8"
          strokeWidth={1.25}
          opacity={0.55}
        />
        <Cab x={100} />
        <Wheel cx={160} cy={348} roll={roll} />
        <Wheel cx={222} cy={348} roll={roll} />
        <Wheel cx={424} cy={348} roll={roll} />
        <Callout x={250} y={204} tx={170} ty={150}>
          Aluminium scrap
        </Callout>
      </motion.g>

      <Callout x={600} y={128} tx={556} ty={98} end>
        Plant gate
      </Callout>
    </Sheet>
  );
}

export function FurnaceDrawing({ t }: DrawingProps) {
  // a scrap charge travels into the open door, the door drops, the bath
  // heats up, then metal pours out along the launder
  const chargeX = useSeg(t, 0.04, 0.38, 0, 100);
  const chargeY = useSeg(t, 0.04, 0.38, 0, -96);
  const chargeO = useTransform(t, [0.04, 0.08, 0.34, 0.4], [0, 1, 1, 0]);
  const doorY = useSeg(t, 0.4, 0.56, 0, 70);
  const bath = useSeg(t, 0.2, 0.62, 0.2, 1);
  const pour = useSeg(t, 0.6, 0.95, 0, 1);
  const pourOn = useShow(t, 0.6, 0.62);
  const flowOn = useShow(t, 0.9, 0.98);

  return (
    <Sheet w={760} label="Melting furnace with molten aluminium leaving through the launder">
      {/* scrap waiting at the charging door */}
      <path d="M40 372L56 350L76 356L92 338L112 348L130 334L150 352L166 372Z" fill={C.steel} />
      <path d="M118 326C140 300 160 282 194 264" stroke={C.deep} strokeWidth={1.5} strokeDasharray="8 6" />
      <path d="M198 262L190 270L186 261Z" fill={C.deep} stroke={C.deep} strokeWidth={1} />
      <motion.path
        style={{ x: chargeX, y: chargeY, opacity: chargeO }}
        d="M98 350l10-12l14 4l8 12z"
        fill={C.steel}
      />

      {/* stack and smoke */}
      <rect x={430} y={56} width={40} height={124} fill={C.panel} />
      <rect x={424} y={48} width={52} height={10} rx={2} fill={C.body} />
      <motion.g style={{ opacity: bath }} stroke="#B9B3A7" strokeWidth={1.5}>
        <circle className="np-rise np-anim" cx={450} cy={34} r={9} />
        <circle className="np-rise np-anim" style={{ animationDelay: "-1.2s" }} cx={457} cy={30} r={12} />
        <circle className="np-rise np-anim" style={{ animationDelay: "-2.4s" }} cx={444} cy={32} r={8} />
      </motion.g>

      {/* furnace */}
      <path d="M170 372V198Q170 176 192 176H498Q520 176 520 198V372" fill={C.body} />
      <path d={bricks(178, 184, 512, 368)} strokeWidth={1} opacity={0.16} />
      <path d="M188 132V272M280 132V272" strokeWidth={1.5} />
      <rect x={198} y={206} width={76} height={58} rx={4} fill={C.ink} />
      <path
        className="np-flicker np-anim"
        d={flame(216, 260, 1.1) + flame(238, 260, 1.5) + flame(258, 260, 1)}
        fill={C.gold}
        stroke="none"
      />
      <motion.rect style={{ y: doorY }} x={192} y={136} width={84} height={60} rx={3} fill={C.panel} />
      <circle cx={392} cy={252} r={36} fill={C.panel} />
      <circle cx={392} cy={252} r={26} fill={C.ink} />
      <motion.g style={{ opacity: bath }}>
        <circle cx={392} cy={252} r={26} fill={C.amber} className="np-flicker np-anim" />
        <path d="M373 254q19-12 38 0" stroke={C.gold} strokeWidth={3} />
      </motion.g>

      {/* burner */}
      <rect x={520} y={292} width={40} height={24} rx={3} fill={C.panel} />
      <path d="M560 304H604" strokeWidth={5} />

      {/* nozzle and launder */}
      <rect x={516} y={200} width={34} height={26} rx={3} fill={C.panel} />
      <rect x={540} y={204} width={220} height={18} fill={C.body} />
      <motion.path style={{ pathLength: pour, opacity: pourOn }} d="M546 211H760" stroke={C.amber} strokeWidth={7} strokeLinecap="butt" />
      <motion.path
        style={{ opacity: flowOn }}
        d="M546 211H760"
        stroke={C.gold}
        strokeWidth={4}
        strokeDasharray="16 12"
        className="np-flow np-anim"
      />
      <path d="M612 222V372M712 222V372" />
      <path d="M612 292L712 240M612 240L712 292" strokeWidth={1} opacity={0.35} />

      <Callout x={236} y={226} tx={26} ty={158}>
        Charging door
      </Callout>
      <Callout x={392} y={252} tx={540} ty={140}>
        Molten bath
      </Callout>
      <Callout x={690} y={211} tx={752} ty={178} end>
        Nozzle · launder
      </Callout>
    </Sheet>
  );
}

export function CastingDrawing({ t }: DrawingProps) {
  const moulds = [300, 380, 460, 540];
  const inflow = useSeg(t, 0, 0.28, 0, 1);
  const inflowOn = useShow(t, 0, 0.02);
  const trough = useSeg(t, 0.26, 0.42, 0, 1);
  const troughOn = useShow(t, 0.26, 0.28);
  const pourOn = useShow(t, 0.4, 0.45);
  const grow = useSeg(t, 0.42, 0.95, 0, 1);
  const waterOn = useShow(t, 0.36, 0.46);

  return (
    <Sheet w={760} label="Casting table: metal drops through water-cooled moulds and solidifies into logs">
      {/* launder from the furnace */}
      <rect x={0} y={204} width={292} height={18} fill={C.body} />
      <motion.path style={{ pathLength: inflow, opacity: inflowOn }} d="M0 211H292" stroke={C.amber} strokeWidth={7} strokeLinecap="butt" />
      <motion.path
        style={{ opacity: troughOn }}
        d="M0 211H292"
        stroke={C.gold}
        strokeWidth={4}
        strokeDasharray="16 12"
        className="np-flow np-anim"
      />
      <rect x={30} y={222} width={10} height={150} fill={C.panel} />

      {/* distribution trough */}
      <rect x={268} y={204} width={304} height={18} rx={2} fill={C.body} />
      <motion.path style={{ pathLength: trough, opacity: troughOn }} d="M274 211H566" stroke={C.amber} strokeWidth={7} strokeLinecap="butt" />

      {/* table and legs */}
      <rect x={236} y={228} width={404} height={22} fill={C.panel} />
      <path d={hatch(236, 228, 640, 250)} strokeWidth={1} opacity={0.3} />
      <rect x={244} y={250} width={14} height={122} fill={C.panel} />
      <rect x={618} y={250} width={14} height={122} fill={C.panel} />
      <path d="M258 262H618" stroke={C.water} strokeWidth={5} />

      {moulds.map((x) => (
        <g key={x}>
          <motion.path style={{ opacity: pourOn }} d={`M${x} 222V230`} stroke={C.gold} strokeWidth={6} />
          <motion.rect
            style={{ scaleY: grow, originY: 0 }}
            x={x - 18}
            y={250}
            width={36}
            height={112}
            fill={C.steel}
            vectorEffect="non-scaling-stroke"
          />
          <motion.rect style={{ opacity: pourOn }} x={x - 18} y={250} width={36} height={14} fill={C.amber} stroke="none" />
          <rect x={x - 24} y={228} width={48} height={22} fill={C.ink} />
          <motion.path
            style={{ opacity: waterOn }}
            d={`M${x - 26} 266l-8 30M${x + 26} 266l8 30`}
            stroke={C.water}
            strokeWidth={2}
            strokeDasharray="4 3"
            className="np-flow np-anim"
          />
        </g>
      ))}

      <Callout x={130} y={211} tx={52} ty={168}>
        Launder
      </Callout>
      <Callout x={630} y={234} tx={748} ty={188} end>
        Casting table
      </Callout>
      <Callout x={290} y={262} tx={48} ty={306}>
        Water-cooled liners
      </Callout>
      <Callout x={558} y={272} tx={748} ty={300} end>
        Logs form
      </Callout>
    </Sheet>
  );
}

export function LogsDrawing({ t }: DrawingProps) {
  // lift out of the pit, travel along the beam, lower onto the trolley
  const hx = useTransform(t, [0, 0.15, 0.65, 1], [-166, -166, 274, 274], { ease: easeInOut });
  const hy = useTransform(t, [0, 0.15, 0.65, 0.85, 1], [46, 0, 0, 52, 52], { ease: easeInOut });
  const cableEnd = useTransform(hy, (v) => 176 + v);

  return (
    <Sheet w={760} label="Overhead crane lifting a 17-inch log out of the pit onto a trolley">
      {/* crane */}
      <rect x={24} y={82} width={16} height={290} fill={C.panel} />
      <rect x={720} y={82} width={16} height={290} fill={C.panel} />
      <rect x={16} y={58} width={728} height={24} fill={C.body} />
      <path d="M16 64H744M16 76H744" strokeWidth={1} opacity={0.4} />

      {/* trolley, waiting */}
      <rect x={476} y={330} width={228} height={12} rx={2} fill={C.panel} />
      <path d="M478 336l-26-44" strokeWidth={4} />
      <Wheel cx={508} cy={358} r={14} />
      <Wheel cx={672} cy={358} r={14} />

      {/* cables, hook and log */}
      <motion.g style={{ x: hx }}>
        <motion.line x1={300} y1={96} x2={300} y2={cableEnd} strokeWidth={1.5} />
        <motion.line x1={332} y1={96} x2={332} y2={cableEnd} strokeWidth={1.5} />
      </motion.g>
      <motion.g style={{ x: hx, y: hy }}>
        <rect x={296} y={174} width={40} height={22} rx={3} fill={C.body} />
        <path d="M316 196v10a8 8 0 1 1-8 8" strokeWidth={3} />
        <path d="M316 214L236 236M316 214L396 236" strokeWidth={1.5} />
        <rect x={210} y={236} width={212} height={42} rx={6} fill={C.steel} />
        <path d="M220 246H410" stroke={C.steelHi} strokeWidth={3} />
        <ellipse cx={422} cy={257} rx={9} ry={21} fill={C.steelHi} />
        <DimV x={446} y1={236} y2={278}>17″</DimV>
      </motion.g>

      {/* pit in front of the lifted log */}
      <rect x={70} y={300} width={160} height={72} fill={C.panel} />
      <path d={hatch(70, 300, 230, 372)} strokeWidth={1} opacity={0.22} />
      {[92, 180].map((x) => (
        <rect key={x} x={x} y={288} width={28} height={84} fill={C.steel} />
      ))}

      {/* hoist rides the beam */}
      <motion.g style={{ x: hx }}>
        <rect x={290} y={82} width={52} height={24} rx={3} fill={C.panel} />
      </motion.g>

      <Callout x={520} y={70} tx={548} ty={40}>
        Overhead crane
      </Callout>
      <Callout x={150} y={300} tx={56} ty={262}>
        Casting pit
      </Callout>
      <Callout x={480} y={336} tx={440} ty={306} end>
        Trolley
      </Callout>
    </Sheet>
  );
}

export function BilletOvenDrawing({ t }: DrawingProps) {
  const feed = useSeg(t, 0, 0.45, 0, 150);
  const heat = useSeg(t, 0.05, 0.4, 0.15, 1);
  const outLen = useSeg(t, 0.36, 0.62, 0, 1);
  const chop = useTransform(t, [0.62, 0.69, 0.76], [0, 22, 0]);
  const b1x = useSeg(t, 0.68, 0.84, -44, 0);
  const b1o = useShow(t, 0.68);
  const b2x = useSeg(t, 0.8, 0.96, -44, 0);
  const b2o = useShow(t, 0.8);

  return (
    <Sheet w={820} label="Billet oven heating a log before the hot log shear cuts it into billets">
      {/* infeed: the log slides into the oven */}
      <path d="M10 314H196" />
      {[30, 70, 110, 150].map((x) => (
        <circle key={x} cx={x} cy={305} r={8} fill={C.body} />
      ))}
      <rect x={34} y={314} width={10} height={58} fill={C.panel} />
      <rect x={160} y={314} width={10} height={58} fill={C.panel} />
      <motion.rect style={{ x: feed }} x={18} y={269} width={200} height={28} rx={4} fill={C.steel} />

      {/* oven */}
      <rect x={382} y={112} width={24} height={50} fill={C.panel} />
      <rect x={364} y={160} width={60} height={32} rx={3} fill={C.panel} />
      <rect x={200} y={190} width={384} height={150} rx={6} fill={C.body} />
      <path d={vlines(238, 584, 38, 196, 334)} strokeWidth={1} opacity={0.18} />
      <rect x={232} y={206} width={320} height={36} rx={4} fill={C.ink} />
      <motion.g style={{ opacity: heat }}>
        <path
          className="np-flicker np-anim"
          d={range(250, 540, 28)
            .map((x, i) => flame(x, 238, i % 2 ? 0.9 : 1.15))
            .join("")}
          fill={C.gold}
          stroke="none"
        />
      </motion.g>
      <rect x={193} y={262} width={14} height={42} rx={2} fill={C.ink} />
      <rect x={220} y={340} width={14} height={32} fill={C.panel} />
      <rect x={552} y={340} width={14} height={32} fill={C.panel} />

      {/* hot log out, shear */}
      <rect x={624} y={198} width={84} height={22} rx={3} fill={C.panel} />
      <rect x={630} y={220} width={10} height={124} fill={C.panel} />
      <rect x={692} y={220} width={10} height={124} fill={C.panel} />
      <rect x={622} y={297} width={88} height={47} fill={C.panel} />
      <path d={hatch(622, 297, 710, 344)} strokeWidth={1} opacity={0.25} />
      <motion.rect
        style={{ scaleX: outLen, originX: 0 }}
        x={584}
        y={269}
        width={66}
        height={28}
        fill={C.amber}
        vectorEffect="non-scaling-stroke"
      />
      <motion.g style={{ y: chop }}>
        <rect x={652} y={222} width={28} height={30} fill={C.ink} />
        <path d="M652 252h28l-14 10z" fill={C.ink} />
      </motion.g>

      {/* billets roll off */}
      <path d="M714 314H812" />
      {[736, 790].map((x) => (
        <circle key={x} cx={x} cy={305} r={8} fill={C.body} />
      ))}
      <rect x={744} y={314} width={10} height={58} fill={C.panel} />
      <motion.g style={{ x: b1x, opacity: b1o }}>
        <rect x={716} y={269} width={40} height={28} rx={3} fill={C.amber} />
        <ellipse cx={756} cy={283} rx={5} ry={14} fill={C.hot} />
      </motion.g>
      <motion.g style={{ x: b2x, opacity: b2o }}>
        <rect x={764} y={269} width={40} height={28} rx={3} fill={C.amber} />
        <ellipse cx={804} cy={283} rx={5} ry={14} fill={C.hot} />
      </motion.g>

      <Callout x={200} y={272} tx={30} ty={236}>
        Billet-sized inlet
      </Callout>
      <Callout x={330} y={190} tx={240} ty={150}>
        Billet oven
      </Callout>
      <Callout x={666} y={198} tx={640} ty={166}>
        Hot log shear
      </Callout>
      <Callout x={784} y={269} tx={812} ty={236} end>
        Billets
      </Callout>
    </Sheet>
  );
}

export function PressDrawing({ t }: DrawingProps) {
  // pusher loads the billet, then the ram drives it through the die
  const pushX = useSeg(t, 0, 0.28, -60, 24);
  const loaded = useShow(t, 0.27, 0.3);
  const onPusher = useTransform(loaded, (v) => 1 - v);
  const ramX = useSeg(t, 0.32, 0.9, 0, 116);
  const billet = useSeg(t, 0.32, 0.9, 1, 0.12);
  const profile = useSeg(t, 0.34, 0.92, 0, 1);
  const needle = useSeg(t, 0.28, 0.42, -70, 55);

  return (
    <Sheet w={1000} label="7500 MT extrusion press pushing a billet through the die">
      <rect x={168} y={354} width={590} height={18} fill={C.panel} />

      {/* billet pusher */}
      <rect x={52} y={176} width={18} height={196} fill={C.panel} />
      <motion.g style={{ x: pushX }}>
        <rect x={52} y={230} width={112} height={12} rx={2} fill={C.body} />
        <path d="M112 242V252M156 242V252" />
        <motion.g style={{ opacity: onPusher }}>
          <rect x={104} y={252} width={58} height={32} rx={4} fill={C.amber} />
          <ellipse cx={162} cy={268} rx={5} ry={16} fill={C.hot} />
        </motion.g>
      </motion.g>

      {/* oil tank and main cylinder with its pressure gauge */}
      <rect x={196} y={128} width={128} height={40} rx={4} fill={C.panel} />
      <path d="M222 168V178M298 168V178" strokeWidth={5} />
      <rect x={178} y={176} width={172} height={178} rx={10} fill={C.body} />
      <path d="M200 182V348M328 182V348" strokeWidth={1} opacity={0.3} />
      <rect x={210} y={206} width={108} height={34} rx={4} fill={C.ink} />
      <text x={264} y={229} textAnchor="middle" className="np-readout">
        7500 MT
      </text>
      <circle cx={264} cy={296} r={28} fill={C.body} />
      <path d="M243 309a26 26 0 1 1 42 0" stroke={C.muted} strokeWidth={1.25} />
      <path d="M276 274a26 26 0 0 1 11 22" stroke={C.amber} strokeWidth={3} />
      <motion.path style={{ rotate: needle, originX: 0.5, originY: 1 }} d="M264 296V276" strokeWidth={2.5} />
      <circle cx={264} cy={296} r={4} fill={C.ink} />

      {/* tie rods */}
      <rect x={350} y={182} width={392} height={10} fill={C.steel} />
      <rect x={350} y={336} width={392} height={10} fill={C.steel} />

      {/* container: the billet shortens as the ram advances */}
      <rect x={484} y={212} width={148} height={112} rx={6} fill={C.body} />
      <path d={hatch(484, 212, 632, 250)} strokeWidth={1} opacity={0.22} />
      <path d={hatch(484, 286, 632, 324)} strokeWidth={1} opacity={0.22} />
      <rect x={484} y={250} width={148} height={36} fill={C.ink} />
      <motion.g style={{ opacity: loaded }}>
        <motion.rect
          style={{ scaleX: billet, originX: 1 }}
          x={490}
          y={254}
          width={136}
          height={28}
          rx={3}
          fill={C.amber}
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>

      {/* crosshead and ram */}
      <motion.g style={{ x: ramX }}>
        <rect x={350} y={198} width={38} height={134} rx={4} fill={C.panel} />
        <rect x={388} y={256} width={96} height={24} fill={C.steel} />
      </motion.g>

      {/* die and platen */}
      <rect x={632} y={198} width={34} height={140} fill={C.panel} />
      <path d={hatch(632, 198, 666, 338)} strokeWidth={1} opacity={0.3} />
      <rect x={638} y={256} width={22} height={24} fill={C.ink} />
      <rect x={666} y={170} width={76} height={184} rx={6} fill={C.body} />
      <rect x={666} y={258} width={76} height={20} fill={C.ink} />

      {/* profile coming out */}
      <RollerTable from={742} to={1000} legs={[800, 960]} />
      <motion.g style={{ scaleX: profile, originX: 0 }}>
        <rect x={742} y={258} width={258} height={20} fill={C.steel} vectorEffect="non-scaling-stroke" />
        <rect x={743} y={259} width={46} height={18} fill={C.hot} stroke="none" />
      </motion.g>

      <Callout x={80} y={236} tx={30} ty={150}>
        Pusher
      </Callout>
      <Callout x={436} y={268} tx={410} ty={160}>
        Ram
      </Callout>
      <Callout x={558} y={212} tx={530} ty={130}>
        Container
      </Callout>
      <Callout x={649} y={198} tx={690} ty={150}>
        Die
      </Callout>
      <Callout x={880} y={258} tx={860} ty={220}>
        Profile
      </Callout>
    </Sheet>
  );
}

function QuenchZone({ t, x, name, at }: { t: Progress; x: number; name: string; at: number }) {
  const lit = useTransform(t, [at, at + 0.08], [C.body, C.lit]);
  return (
    <g>
      <motion.path style={{ fill: lit }} d={`M${x} 194H${x + 190}L${x + 178} 236H${x + 12}Z`} />
      <rect x={x + 95} y={150} width={10} height={44} fill={C.panel} />
      <text x={x + 95} y={220} textAnchor="middle" className="np-plate">
        {name}
      </text>
    </g>
  );
}

export function QuenchDrawing({ t }: DrawingProps) {
  // the profile runs in and each zone switches on as it arrives
  const bar = useSeg(t, 0, 0.55, 0, 1);
  const barFill = useTransform(t, [0.05, 0.6], [C.hot, C.steel]);
  const water = useShow(t, 0.08, 0.16);
  const air = useShow(t, 0.25, 0.33);
  const mist = useShow(t, 0.42, 0.5);

  return (
    <Sheet w={760} label="Profile quenched in three modes: water, air and mist">
      <RollerTable from={0} to={760} legs={[40, 380, 712]} />
      <motion.rect
        style={{ scaleX: bar, originX: 0, fill: barFill }}
        x={-2}
        y={258}
        width={764}
        height={20}
        vectorEffect="non-scaling-stroke"
      />

      <QuenchZone t={t} x={60} name="01 · Water" at={0.08} />
      <QuenchZone t={t} x={290} name="02 · Air" at={0.25} />
      <QuenchZone t={t} x={520} name="03 · Mist" at={0.42} />

      <motion.g style={{ opacity: water }}>
        <path
          d={range(84, 230, 18)
            .map((x) => `M${x} 240V256`)
            .join("")}
          stroke={C.water}
          strokeWidth={2.5}
          strokeDasharray="4 3"
          className="np-flow np-anim"
        />
        <rect x={60} y={300} width={190} height={12} rx={2} fill={C.water} opacity={0.3} stroke="none" />
      </motion.g>

      <motion.g style={{ opacity: air }}>
        <path
          d={range(314, 460, 24)
            .map((x) => `M${x} 238q6 5 0 9q-6 5 0 9`)
            .join("")}
          stroke="#9AAAB2"
          strokeWidth={1.75}
          strokeDasharray="4 3"
          className="np-flow np-anim"
        />
      </motion.g>

      <motion.g style={{ opacity: mist }}>
        {range(540, 690, 15).map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={i % 2 ? 242 : 250}
            r={2}
            fill={C.water}
            stroke="none"
            className="np-pulse np-anim"
            style={{ animationDelay: `${-(i % 4) * 0.4}s` }}
          />
        ))}
      </motion.g>
    </Sheet>
  );
}

export function PullerDrawing({ t }: DrawingProps) {
  // the puller draws the profile out, counting billets, then the hot saw cuts
  const pullX = useSeg(t, 0, 0.72, -60, 260);
  const barScale = useTransform(pullX, (v) => (472 + v) / 824);
  const count = useTransform(t, (v) => `Billet ${Math.min(3, Math.max(1, Math.floor(v / 0.24) + 1))} / 3`);
  const sawY = useTransform(t, [0.7, 0.8, 0.92], [44, 0, 44]);
  const spin = useTransform(t, [0, 1], [0, 1080]);
  const cut = useShow(t, 0.8);

  return (
    <Sheet w={820} label="Puller drawing the profile down the run-out table while the hot saw cuts it">
      <RollerTable from={0} to={820} legs={[40, 420, 780]} />

      {/* puller rail */}
      <rect x={280} y={166} width={540} height={14} fill={C.panel} />
      <rect x={290} y={180} width={10} height={112} fill={C.panel} />

      <motion.rect
        style={{ scaleX: barScale, originX: 0 }}
        x={-2}
        y={258}
        width={824}
        height={20}
        fill={C.steel}
        vectorEffect="non-scaling-stroke"
      />
      <motion.rect style={{ opacity: cut }} x={171} y={256} width={8} height={24} fill={C.paper} stroke="none" />

      {/* hot saw rises from below the table to cut */}
      <motion.g style={{ y: sawY }}>
        <Blade cx={175} cy={292} r={34} spin={spin} />
      </motion.g>
      <rect x={126} y={300} width={98} height={72} rx={4} fill={C.panel} />
      <path d={hatch(126, 300, 224, 372)} strokeWidth={1} opacity={0.22} />

      {/* puller carriage */}
      <motion.g style={{ x: pullX }}>
        <circle cx={436} cy={182} r={6} fill={C.body} />
        <circle cx={508} cy={182} r={6} fill={C.body} />
        <rect x={420} y={186} width={110} height={50} rx={5} fill={C.body} />
        <text x={475} y={207} textAnchor="middle" className="np-plate">
          Puller
        </text>
        <motion.text x={475} y={226} textAnchor="middle" className="np-label">
          {count}
        </motion.text>
        <path d="M500 236V298H472" strokeWidth={4} />
        <rect x={466} y={236} width={14} height={22} fill={C.ink} />
        <rect x={466} y={278} width={14} height={12} fill={C.ink} />
      </motion.g>

      <Callout x={160} y={262} tx={36} ty={200}>
        Hot saw · cut every 3 billets
      </Callout>
      <Callout x={660} y={292} tx={748} ty={336} end>
        Run-out table
      </Callout>
    </Sheet>
  );
}

export function FinishSawDrawing({ t }: DrawingProps) {
  const feed = useSeg(t, 0, 0.45, -180, 0);
  const inset = useSeg(t, 0.1, 0.32, 0.5, 1);
  const insetOn = useShow(t, 0.1, 0.24);
  const bladeY = useTransform(t, [0.45, 0.52, 0.6], [-14, 10, -14]);
  const spin = useTransform(t, [0, 1], [0, 900]);
  const pieceX = useSeg(t, 0.55, 0.85, -110, 0);
  const pieceOn = useShow(t, 0.55);
  const dimOn = useShow(t, 0.8, 0.9);

  return (
    <Sheet w={900} label="Handling table and finish saw cutting a 600 mm channel bar into 4820 mm lengths">
      {/* handling table carries the bar to the saw */}
      <rect x={0} y={278} width={548} height={12} fill={C.panel} />
      <path d={vlines(30, 548, 40, 280, 288)} strokeWidth={1} opacity={0.4} />
      {[24, 270, 516].map((x) => (
        <rect key={x} x={x} y={290} width={10} height={82} fill={C.panel} />
      ))}
      <motion.rect style={{ x: feed }} x={-2} y={258} width={570} height={20} fill={C.steel} />

      {/* finish saw */}
      <rect x={560} y={196} width={118} height={176} rx={6} fill={C.body} />
      <rect x={576} y={212} width={86} height={40} rx={3} fill={C.panel} />
      <motion.g style={{ y: bladeY }}>
        <Blade cx={619} cy={232} r={14} spin={spin} />
      </motion.g>
      <rect x={558} y={258} width={122} height={20} fill={C.steel} />
      <text x={619} y={326} textAnchor="middle" className="np-plate">
        Finish saw
      </text>

      {/* cut lengths */}
      <rect x={680} y={278} width={220} height={12} fill={C.panel} />
      {[704, 880].map((x) => (
        <rect key={x} x={x} y={290} width={10} height={82} fill={C.panel} />
      ))}
      <motion.rect style={{ x: pieceX, opacity: pieceOn }} x={690} y={258} width={204} height={20} fill={C.steel} />
      <motion.g style={{ opacity: dimOn }}>
        <Dim x1={690} x2={894} y={232}>
          4820 mm
        </Dim>
      </motion.g>

      {/* cross-section of the cut bar */}
      <motion.g style={{ scale: inset, opacity: insetOn }}>
        <path d="M752 190V256" stroke={C.muted} strokeWidth={1.25} strokeDasharray="4 3" />
        <circle cx={790} cy={120} r={72} fill={C.body} />
        <path d="M740 90V146H840V90H828V134H752V90Z" fill={C.steel} />
        <path d={hatch(740, 134, 840, 146, 6)} strokeWidth={1} opacity={0.35} />
        <Dim x1={740} x2={840} y={168}>
          600 mm
        </Dim>
        <text x={790} y={34} textAnchor="middle" className="np-label">
          Section · channel bar
        </text>
      </motion.g>

      <Callout x={200} y={284} tx={44} ty={344}>
        Handling table
      </Callout>
    </Sheet>
  );
}

export function AgeingDrawing({ t }: DrawingProps) {
  // basket rides the hoist into the oven, the shutter drops, the oven runs
  const bx = useTransform(t, [0, 0.1, 0.45, 1], [0, 0, 320, 320], { ease: easeInOut });
  const by = useTransform(t, [0, 0.1, 0.45, 0.62, 1], [10, -14, -14, 98, 98], { ease: easeInOut });
  const cableX = useTransform(bx, (v) => 150 + v);
  // follows the basket down, then winds back up once the shutter drops
  const cableEnd = useTransform(t, [0, 0.1, 0.45, 0.62, 0.72, 1], [130, 106, 106, 218, 70, 70], {
    ease: easeInOut,
  });
  const shutter = useSeg(t, 0.62, 0.76, 0, 1);
  const running = useShow(t, 0.74, 0.8);
  const temp = useCount(t, 0.74, 0.92, 30, 190, "°C");
  const hours = useCount(t, 0.76, 0.98, 0, 8, " HRS");
  const ends = range(78, 216, 32);

  return (
    <Sheet w={820} label="Basket of profiles lifted into the ageing oven, held at 190°C for 8 hours">
      {/* oven */}
      <rect x={404} y={96} width={44} height={24} rx={3} fill={C.panel} />
      <rect x={604} y={96} width={44} height={24} rx={3} fill={C.panel} />
      <rect x={300} y={120} width={490} height={252} fill={C.body} />
      <path d={vlines(349, 790, 49, 126, 140)} strokeWidth={1} opacity={0.25} />
      <rect x={318} y={146} width={334} height={226} fill={C.warm} />
      <rect x={288} y={140} width={10} height={232} fill={C.panel} />

      {/* hoist rail, cable and basket */}
      <rect x={30} y={40} width={640} height={14} fill={C.panel} />
      <motion.line x1={cableX} y1={64} x2={cableX} y2={cableEnd} strokeWidth={1.5} />
      <motion.g style={{ x: bx }}>
        <rect x={134} y={50} width={32} height={18} rx={3} fill={C.body} />
      </motion.g>
      <motion.g style={{ x: bx, y: by }}>
        <path d="M150 120L64 150M150 120L236 150" strokeWidth={1.5} />
        <rect x={60} y={150} width={180} height={10} fill={C.panel} />
        <rect x={60} y={160} width={180} height={104} fill={C.body} />
        {[176, 206, 236].map((y) =>
          ends.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={20} height={16} fill={C.steel} />),
        )}
        <path d={vlines(60, 241, 45, 160, 264)} strokeWidth={1.25} />
      </motion.g>

      {/* shutter rolls down over the opening */}
      <motion.g style={{ scaleY: shutter, originY: 0 }}>
        <rect x={318} y={146} width={334} height={226} fill={C.body} vectorEffect="non-scaling-stroke" />
        <path d={range(170, 360, 24).map((y) => `M318 ${y}H652`).join("")} strokeWidth={1} opacity={0.3} vectorEffect="non-scaling-stroke" />
      </motion.g>
      <motion.g style={{ opacity: running }}>
        <rect x={440} y={196} width={90} height={44} rx={4} fill={C.warm} />
        <g className="np-flicker np-anim" stroke={C.amber} strokeWidth={1.5}>
          <path d="M462 232q6-8 0-16M485 232q6-8 0-16M508 232q6-8 0-16" />
        </g>
      </motion.g>

      {/* control panel */}
      <rect x={672} y={160} width={100} height={150} rx={6} fill={C.panel} />
      <rect x={684} y={176} width={76} height={34} rx={4} fill={C.ink} />
      <motion.text x={722} y={199} textAnchor="middle" className="np-readout">
        {temp}
      </motion.text>
      <rect x={684} y={220} width={76} height={34} rx={4} fill={C.ink} />
      <motion.text x={722} y={243} textAnchor="middle" className="np-readout">
        {hours}
      </motion.text>
      <motion.circle style={{ opacity: running }} cx={700} cy={282} r={6} fill={C.gold} />
      <circle cx={722} cy={282} r={6} fill={C.body} />
      <circle cx={744} cy={282} r={6} fill={C.body} />

      <Callout x={480} y={120} tx={460} ty={84}>
        Ageing oven
      </Callout>
    </Sheet>
  );
}

function StackRow({ t, at, y, battens }: { t: Progress; at: number; y: number; battens: number }) {
  const drop = useSeg(t, at, at + 0.1, -44, 0);
  const show = useShow(t, at);
  return (
    <motion.g style={{ y: drop, opacity: show }}>
      <rect x={430} y={battens} width={18} height={10} fill={C.panel} />
      <rect x={660} y={battens} width={18} height={10} fill={C.panel} />
      <rect x={410} y={y - 2} width={290} height={32} fill={C.steel} />
      <path d={vlines(430, 700, 24, y + 2, y + 26)} strokeWidth={1} opacity={0.25} />
      {[460, 555, 650].map((x) => (
        <rect key={x} x={x} y={y - 2} width={6} height={32} fill={C.deep} stroke="none" />
      ))}
    </motion.g>
  );
}

export function PackingDrawing({ t }: DrawingProps) {
  const ringX = useSeg(t, 0.04, 0.44, -115, 115);
  const wrapped = useTransform(ringX, (v) => (v + 115) / 230);
  const strap1 = useShow(t, 0.44);
  const strap2 = useShow(t, 0.5);
  const tagY = useSeg(t, 0.86, 0.96, -30, 0);
  const tagOn = useShow(t, 0.86);

  return (
    <Sheet w={720} label="Aged profiles packed into strapped bundles">
      {/* packing table: the wrap ring runs along the bundle */}
      <rect x={40} y={300} width={330} height={12} fill={C.panel} />
      <rect x={56} y={312} width={10} height={60} fill={C.panel} />
      <rect x={344} y={312} width={10} height={60} fill={C.panel} />
      <rect x={70} y={258} width={270} height={42} fill={C.steel} />
      <motion.path
        style={{ scaleX: wrapped, originX: 0 }}
        d={hatch(70, 258, 340, 300, 12)}
        strokeWidth={1}
        opacity={0.35}
      />
      <motion.rect style={{ opacity: strap1 }} x={120} y={258} width={7} height={42} fill={C.deep} stroke="none" />
      <motion.rect style={{ opacity: strap2 }} x={280} y={258} width={7} height={42} fill={C.deep} stroke="none" />
      <motion.ellipse style={{ x: ringX }} cx={205} cy={279} rx={16} ry={50} strokeWidth={3} />

      {/* bundles stack up from the bottom */}
      <StackRow t={t} at={0.55} y={330} battens={362} />
      <StackRow t={t} at={0.65} y={290} battens={322} />
      <StackRow t={t} at={0.75} y={250} battens={282} />
      <motion.g style={{ y: tagY, opacity: tagOn }}>
        <rect x={580} y={214} width={92} height={24} rx={3} fill={C.gold} stroke={C.ink} />
        <text x={626} y={230} textAnchor="middle" className="np-plate">
          Natraj
        </text>
        <path d="M626 238V248" strokeWidth={1.25} />
      </motion.g>

      <Callout x={205} y={229} tx={140} ty={196}>
        Packing
      </Callout>
      <Callout x={520} y={248} tx={430} ty={196}>
        Bundles ready
      </Callout>
    </Sheet>
  );
}

function LoadRow({ t, at, y }: { t: Progress; at: number; y: number }) {
  const drop = useSeg(t, at, at + 0.12, -70, 0);
  const show = useShow(t, at);
  return (
    <motion.g style={{ y: drop, opacity: show }}>
      <rect x={62} y={y} width={390} height={32} fill={C.steel} />
      <path d={vlines(80, 452, 24, y + 4, y + 28)} strokeWidth={1} opacity={0.22} />
      {[110, 210, 310, 410].map((x) => (
        <rect key={x} x={x} y={y} width={6} height={32} fill={C.deep} stroke="none" />
      ))}
    </motion.g>
  );
}

export function DispatchDrawing({ t }: DrawingProps) {
  // empty truck pulls in, gets loaded, then leaves through the gate
  const truckX = useTransform(t, [0, 0.28, 0.62, 1], [-320, 0, 0, 340], { ease: easeInOut });
  const truckOn = useTransform(t, [0.84, 0.97], [1, 0]);
  const roll = useRoll(truckX, 24);
  const labelOn = useTransform(t, [0.3, 0.36, 0.6, 0.66], [0, 1, 1, 0]);
  const moving = useTransform(t, [0, 0.04, 0.24, 0.28, 0.62, 0.68, 0.95, 1], [0, 1, 1, 0, 0, 1, 1, 0]);
  const lift = useSeg(t, 0.54, 0.66, 0, -56);

  return (
    <Sheet w={760} label="Truck loaded at the plant and leaving through the gate">
      {/* exit gate */}
      <Boom x1={646} x2={732} y={206} lift={lift} />
      <rect x={636} y={198} width={20} height={26} rx={3} fill={C.body} />
      <rect x={620} y={150} width={14} height={222} fill={C.panel} />
      <rect x={736} y={150} width={14} height={222} fill={C.panel} />
      <rect x={608} y={128} width={150} height={28} rx={3} fill={C.body} />
      <text x={683} y={147} textAnchor="middle" className="np-plate">
        Dispatch
      </text>

      <motion.g style={{ x: truckX, opacity: truckOn }}>
        <motion.path
          style={{ opacity: moving }}
          d="M0 268H44M6 290H40M0 312H34"
          stroke={C.muted}
          strokeWidth={1.5}
          strokeDasharray="8 6"
          className="np-flow np-anim"
        />
        <rect x={52} y={318} width={424} height={12} rx={2} fill={C.panel} />
        <rect x={52} y={302} width={410} height={16} fill={C.panel} />
        <LoadRow t={t} at={0.3} y={270} />
        <LoadRow t={t} at={0.42} y={238} />
        <Cab x={180} />
        <Wheel cx={104} cy={348} roll={roll} />
        <Wheel cx={164} cy={348} roll={roll} />
        <Wheel cx={410} cy={348} roll={roll} />
        <Wheel cx={516} cy={348} roll={roll} />
      </motion.g>
      <motion.g style={{ opacity: labelOn }}>
        <Callout x={260} y={238} tx={200} ty={190}>
          Loaded on site
        </Callout>
      </motion.g>
    </Sheet>
  );
}

export function ShippingDrawing({ t }: DrawingProps) {
  // container lowered onto the ship, the ship sails, the plane takes off
  const crateY = useSeg(t, 0, 0.35, 0, 38);
  const cableEnd = useTransform(t, [0, 0.35, 0.45], [200, 238, 150], { ease: easeInOut });
  const shipX = useSeg(t, 0.45, 1, 0, 260);
  const route = useSeg(t, 0.3, 0.85, 0, 1);
  const planeX = useSeg(t, 0.3, 0.85, -470, 0);
  const planeY = useSeg(t, 0.3, 0.85, 160, 0);
  const planeTilt = useTransform(t, [0.3, 0.7, 0.85], [-14, -10, 0]);
  const planeOn = useShow(t, 0.28, 0.33);
  const landed = useShow(t, 0.84, 0.9);

  return (
    <Sheet w={900} floorTo={330} label="Orders leave by sea freight and by air freight">
      {/* quay edge */}
      <path d="M330 372V400" />
      <path d={hatch(300, 372, 330, 400, 8)} strokeWidth={1} opacity={0.25} />

      {/* containers waiting on the quay */}
      <rect x={34} y={320} width={110} height={52} fill={C.crate} />
      <path d={vlines(48, 144, 14, 324, 368)} strokeWidth={1} opacity={0.35} />
      <rect x={58} y={268} width={110} height={52} fill={C.body} />
      <path d={vlines(72, 168, 14, 272, 316)} strokeWidth={1} opacity={0.35} />

      {/* air route draws itself as the plane climbs */}
      <motion.path
        style={{ pathLength: route, opacity: planeOn }}
        d="M150 250C280 120 470 92 618 94"
        stroke={C.deep}
        strokeWidth={1.5}
        opacity={0.6}
      />

      {/* ship, with the new container riding on deck */}
      <motion.g style={{ x: shipX }}>
        <path d="M370 316H806L776 376H404Z" fill={C.body} />
        <path d="M384 334H796" stroke={C.deep} strokeWidth={3} />
        <rect x={722} y={240} width={58} height={76} rx={3} fill={C.panel} />
        <path d="M732 256H770M732 272H770" strokeWidth={1.5} />
        <rect x={744} y={218} width={18} height={22} fill={C.body} />
        {(
          [
            [404, C.body],
            [464, C.crate],
            [524, C.steel],
            [584, C.body],
            [644, C.crate],
          ] as const
        ).map(([x, fill]) => (
          <rect key={x} x={x} y={290} width={58} height={26} fill={fill} />
        ))}
        {(
          [
            [434, C.steel],
            [494, C.body],
            [554, C.crate],
            [614, C.steel],
          ] as const
        ).map(([x, fill]) => (
          <rect key={x} x={x} y={264} width={58} height={26} fill={fill} />
        ))}
        <motion.rect style={{ y: crateY }} x={448} y={200} width={58} height={26} fill={C.crate} />
        <Callout x={556} y={290} tx={590} ty={236}>
          Sea freight
        </Callout>
      </motion.g>

      {/* water covers the hull below the waterline */}
      <rect x={331} y={344} width={569} height={56} fill={C.sea} stroke="none" />
      <g className="np-sway np-anim" stroke={C.water} strokeWidth={1.5}>
        <path d={waves(340, 900, 350)} />
        <path d={waves(360, 900, 368)} opacity={0.6} />
      </g>

      {/* quay crane */}
      <path d="M232 372L252 122M312 372L292 122" strokeWidth={3} />
      <path d="M240 260H304M246 190H298" strokeWidth={1.5} />
      <rect x={244} y={122} width={52} height={26} rx={3} fill={C.panel} />
      <motion.line x1={477} y1={118} x2={477} y2={cableEnd} strokeWidth={1.5} />
      <rect x={176} y={110} width={360} height={12} fill={C.body} />
      <rect x={464} y={122} width={26} height={12} fill={C.panel} />

      {/* plane */}
      <motion.g style={{ x: planeX, y: planeY, rotate: planeTilt, opacity: planeOn }}>
        <path d="M704 92L688 132H706L744 94Z" fill={C.panel} />
        <path d="M640 92Q640 80 654 80H772Q794 80 804 92Q794 104 772 104H654Q640 104 640 92Z" fill={C.body} />
        <path d="M708 84L692 58H708L740 86Z" fill={C.panel} />
        <path d="M654 82L642 58H656L676 82Z" fill={C.panel} />
        <path d={range(700, 776, 14).map((x) => `M${x} 90h4`).join("")} strokeWidth={2.5} />
      </motion.g>

      <motion.g style={{ opacity: landed }}>
        <Callout x={740} y={104} tx={780} ty={160}>
          Air freight
        </Callout>
      </motion.g>
    </Sheet>
  );
}

export function EndDrawing() {
  return (
    <Sheet w={640} floorFrom={320} label="End of the production line">
      {/* open water continues from the port, then the far quay */}
      <rect x={-1} y={344} width={321} height={56} fill={C.sea} stroke="none" />
      <g className="np-sway np-anim" stroke={C.water} strokeWidth={1.5}>
        <path d={waves(0, 320, 350)} />
        <path d={waves(20, 320, 368)} opacity={0.6} />
      </g>
      <path d="M320 372V400" />
      <path d={hatch(320, 372, 350, 400, 8)} strokeWidth={1} opacity={0.25} />
      <rect x={478} y={200} width={6} height={172} fill={C.ink} />
      <rect x={484} y={202} width={72} height={40} fill={C.body} />
      <path
        d="M484 202h18v20h-18zM520 202h18v20h-18zM502 222h18v20h-18zM538 222h18v20h-18z"
        fill={C.ink}
        stroke="none"
      />
    </Sheet>
  );
}
