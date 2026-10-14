import type { ComponentType } from "react";

import {
  type DrawingProps,
  AgeingDrawing,
  BilletOvenDrawing,
  CastingDrawing,
  DispatchDrawing,
  FinishSawDrawing,
  FurnaceDrawing,
  LogsDrawing,
  PackingDrawing,
  PressDrawing,
  PullerDrawing,
  QuenchDrawing,
  ScrapDrawing,
  ShippingDrawing,
} from "./drawings";

export const CHAPTERS = [
  { id: "melt", label: "Melt" },
  { id: "cast", label: "Cast" },
  { id: "extrude", label: "Extrude" },
  { id: "finish", label: "Finish" },
  { id: "deliver", label: "Deliver" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export interface Station {
  id: string;
  chapter: ChapterId;
  title: string;
  body: string;
  chips: string[];
  /** What the metal is at this stage, shown in the journey's status readout. */
  material: string;
  /** Line drawing, run by the stage's scroll progress. */
  Drawing: ComponentType<DrawingProps>;
  /** viewBox width of the drawing; every drawing is 400 units high. */
  width: number;
}

// One entry per machine on the line, in plant order. Figures are the plant's
// own: 17-inch logs, the 7500 MT press, 4820 mm cut lengths, 190°C for 8 hours.
export const STATIONS: Station[] = [
  {
    id: "scrap",
    chapter: "melt",
    title: "Scrap Arrives",
    body: "Trucks bring aluminium scrap in through the plant gates. This is where the metal's journey begins.",
    chips: ["Aluminium scrap"],
    material: "Scrap",
    Drawing: ScrapDrawing,
    width: 720,
  },
  {
    id: "furnace",
    chapter: "melt",
    title: "Melting Furnace",
    body: "The scrap is charged into the furnace and melted down. Molten aluminium leaves through the nozzle into the launder.",
    chips: ["45,000 MT a year melting"],
    material: "Molten aluminium",
    Drawing: FurnaceDrawing,
    width: 760,
  },
  {
    id: "casting",
    chapter: "cast",
    title: "Casting Table",
    body: "The launder carries the metal to the casting table, where it drops through the moulds. Water-cooled liners below switch on, and it cools and solidifies into logs in the pit.",
    chips: ["Water-cooled liners", "Solidifies automatically"],
    material: "Molten → Log",
    Drawing: CastingDrawing,
    width: 760,
  },
  {
    id: "logs",
    chapter: "cast",
    title: "Log Handling",
    body: "A crane lifts the finished logs out of the pit and lays them on a trolley, ready for the billet oven.",
    chips: ["17-inch logs"],
    material: "Log",
    Drawing: LogsDrawing,
    width: 760,
  },
  {
    id: "billet-oven",
    chapter: "extrude",
    title: "Billet Oven & Shear",
    body: "Each log enters the billet oven through an opening sized to the billet. Once heated, it is cut into billets.",
    chips: ["Heated log", "Cut into billets"],
    material: "Log → Billet",
    Drawing: BilletOvenDrawing,
    width: 820,
  },
  {
    id: "press",
    chapter: "extrude",
    title: "7500 MT Extrusion Press",
    body: "A pusher carries the billet to the press and pushes it into the container from behind. The ram drives it through the die, and the profile comes out the other side.",
    chips: ["India's largest press", "Profiles 100–720 mm"],
    material: "Billet → Profile",
    Drawing: PressDrawing,
    width: 1000,
  },
  {
    id: "quench",
    chapter: "extrude",
    title: "3-Mode Quenching",
    body: "Straight out of the die, the profile is cooled in three modes: water, air and mist.",
    chips: ["Water", "Air", "Mist"],
    material: "Profile",
    Drawing: QuenchDrawing,
    width: 760,
  },
  {
    id: "puller",
    chapter: "extrude",
    title: "Puller & Hot Saw",
    body: "The puller grips the profile as it leaves the press and draws it down the run-out table. After three billets' worth, the hot saw cuts it.",
    chips: ["Cut every 3 billets"],
    material: "Profile",
    Drawing: PullerDrawing,
    width: 820,
  },
  {
    id: "finish-saw",
    chapter: "finish",
    title: "Handling Table & Finish Saw",
    body: "The handling table carries the profile across to the finish saw, which cuts it into 4820 mm lengths. Shown here: a 600 mm channel bar.",
    chips: ["600 mm channel bar", "Cut to 4820 mm"],
    material: "Cut lengths",
    Drawing: FinishSawDrawing,
    width: 900,
  },
  {
    id: "ageing",
    chapter: "finish",
    title: "Ageing Oven",
    body: "The cut lengths are loaded into a basket, which is lifted into the ageing oven and held at 190°C for 8 hours.",
    chips: ["190°C", "8 hours"],
    material: "Aged profiles",
    Drawing: AgeingDrawing,
    width: 820,
  },
  {
    id: "packing",
    chapter: "finish",
    title: "Packing",
    body: "Aged profiles come out of the oven and are packed into bundles.",
    chips: ["Packed bundles"],
    material: "Packed bundles",
    Drawing: PackingDrawing,
    width: 720,
  },
  {
    id: "dispatch",
    chapter: "deliver",
    title: "Dispatch",
    body: "A truck pulls in, the bundles are loaded, and the order leaves the plant.",
    chips: ["Loaded on site"],
    material: "Shipment",
    Drawing: DispatchDrawing,
    width: 760,
  },
  {
    id: "shipping",
    chapter: "deliver",
    title: "By Sea & By Air",
    body: "From the plant, orders travel on by sea freight and by air freight.",
    chips: ["Sea freight", "Air freight"],
    material: "Shipment",
    Drawing: ShippingDrawing,
    width: 900,
  },
];

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const chapterLabel = (id: ChapterId) =>
  CHAPTERS.find((c) => c.id === id)?.label ?? "";
