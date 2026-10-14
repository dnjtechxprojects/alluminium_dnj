"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/*
 * Depth for the line without going 3D: the plant building behind the
 * machines slides slower than they do, and the shop floor in front slides
 * faster, so the flat drawings read as standing inside a hall.
 */

// One bay of the hall in drawing units (the machines are 400 units high):
// a column, the roof truss, the crane runway and a band of high windows.
// The floor sits at y = 692 so the bottom 400 units line up with the machines.
const BAY = 600;
const BAYS = 24;
const HALL_H = 720;
const HALL_FLOOR = 692;

function bay(x: number) {
  const r = x + BAY;
  let d = "";
  // column with flange caps and a base plate
  d += `M${x - 7} 60V${HALL_FLOOR}M${x + 7} 60V${HALL_FLOOR}M${x - 13} 60H${x + 13}M${x - 16} ${HALL_FLOOR}H${x + 16}`;
  // roof truss: chords and a W web
  d += `M${x} 40H${r}M${x} 100H${r}`;
  for (let k = x; k < r; k += 50) d += `M${k} 100L${k + 25} 40L${k + 50} 100`;
  // knee braces from this column and the next one
  d += `M${x + 7} 176L${x + 64} 100M${r - 7} 176L${r - 64} 100`;
  // crane runway on corbels
  d += `M${x + 7} 236H${x + 26}V250H${x + 7}M${x - 7} 236H${x - 26}V250H${x - 7}`;
  d += `M${x} 250H${r}M${x} 264H${r}`;
  // clerestory windows
  d += `M${x + 64} 124H${r - 64}V204H${x + 64}Z M${x + 64} 164H${r - 64}`;
  for (let k = x + 124; k < r - 64; k += 60) d += `M${k} 124V204`;
  // wall girts
  d += `M${x + 7} 430H${r - 7}M${x + 7} 570H${r - 7}`;
  return d;
}

const HALL_D = Array.from({ length: BAYS }, (_, i) => bay(i * BAY + BAY / 2)).join("");

/** The plant building, drawn faintly and moving at `depth` of the track speed. */
export function Hall({ pos, depth }: { pos: MotionValue<number>; depth: number }) {
  const x = useTransform(pos, (p) => -p * depth);
  return (
    <motion.div
      aria-hidden
      style={{ x, bottom: "var(--band)", height: `calc(var(--u) * ${HALL_H} * 0.9)` }}
      className="pointer-events-none absolute left-0 will-change-transform"
    >
      <svg
        viewBox={`0 0 ${BAYS * BAY} ${HALL_H}`}
        preserveAspectRatio="xMinYMax meet"
        className="block h-full"
        style={{ width: `calc(var(--u) * ${BAYS * BAY} * 0.9)` }}
        fill="none"
        stroke="#2B2B2B"
        strokeOpacity={0.09}
        strokeWidth={1.25}
        strokeLinejoin="round"
      >
        <path d={HALL_D} vectorEffect="non-scaling-stroke" />
      </svg>
    </motion.div>
  );
}

// Floor joints run towards the viewer, so they lean; one tile per joint.
const JOINT_W = 180;
const JOINT_TILE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${JOINT_W}' height='40' viewBox='0 0 ${JOINT_W} 40' preserveAspectRatio='none'%3E%3Cpath d='M48 0L0 40' stroke='%23212121' stroke-opacity='0.13' stroke-width='1.5' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`;
const LANE_W = 84;

/**
 * The strip of floor in front of the machines. Things nearer the viewer move
 * faster: the painted lane a little faster than the machines, the joints at
 * the bottom edge faster still.
 */
export function ShopFloor({ pos, depth }: { pos: MotionValue<number>; depth: number }) {
  // Both patterns repeat, so they only ever shift by one tile.
  const laneX = useTransform(pos, (p) => -((p * (1 + 0.14 * depth)) % LANE_W));
  const jointX = useTransform(pos, (p) => -((p * (1 + 0.38 * depth)) % JOINT_W));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden bg-[#ECE6DA]/60"
      style={{ height: "calc(var(--band) + var(--stage-h) * 0.07)" }}
    >
      <motion.div
        style={{
          x: laneX,
          bottom: "calc(var(--band) * 0.62)",
          width: `calc(100% + ${LANE_W}px)`,
          backgroundImage: `repeating-linear-gradient(90deg, rgba(255,182,0,0.7) 0 46px, transparent 46px ${LANE_W}px)`,
        }}
        className="absolute left-0 h-[3px]"
      />
      <motion.div
        style={{
          x: jointX,
          width: `calc(100% + ${JOINT_W}px)`,
          height: "calc(var(--band) * 0.5)",
          backgroundImage: JOINT_TILE,
          backgroundSize: `${JOINT_W}px 100%`,
        }}
        className="absolute bottom-0 left-0"
      />
    </div>
  );
}

// Hatching under the floor line, matching the drawings' (a 10×13 stroke every
// 16 units, starting 3 units below the line).
const HATCH_TILE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='13' viewBox='0 0 16 13' preserveAspectRatio='none'%3E%3Cpath d='M10 0L0 13' stroke='%232B2B2B' stroke-opacity='0.25' stroke-width='1' vector-effect='non-scaling-stroke'/%3E%3C/svg%3E")`;

/**
 * Floor line for panels without a machine drawing, at the same height and
 * weight as the drawings' own floor so the line runs on unbroken.
 */
export function PanelFloor({ left = "0px", right = "0px" }: { left?: string; right?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute" style={{ left, right, bottom: "var(--band)" }}>
      <div
        className="absolute inset-x-0 bg-[#2B2B2B]"
        style={{ bottom: "calc(var(--u) * 27)", height: "calc(var(--u) * 2)" }}
      />
      <div
        className="absolute inset-x-0"
        style={{
          bottom: "calc(var(--u) * 12)",
          height: "calc(var(--u) * 13)",
          backgroundImage: HATCH_TILE,
          backgroundSize: "calc(var(--u) * 16) 100%",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "calc(var(--u) * 8) 0",
        }}
      />
    </div>
  );
}
