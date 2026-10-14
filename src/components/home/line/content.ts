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
} from "../process/drawings";

/*
 * Copy for the full-screen "line" home page. The machine drawings are shared
 * with the classic page's process journey; the words live here so the two
 * versions can be edited independently.
 */

export const CHAPTERS = [
  { id: "melt", label: "Melt", summary: "Scrap comes in at the gate and is melted down." },
  { id: "cast", label: "Cast", summary: "Liquid metal is cast into solid 17-inch logs." },
  { id: "extrude", label: "Extrude", summary: "Logs become billets and go through the 7500 MT press." },
  { id: "finish", label: "Finish", summary: "Profiles are cut to length, aged and packed." },
  { id: "deliver", label: "Deliver", summary: "Bundles leave the plant by road, sea and air." },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export interface Spec {
  label: string;
  value: string;
}

export interface Station {
  id: string;
  chapter: ChapterId;
  title: string;
  body: string;
  specs: Spec[];
  Drawing: ComponentType<DrawingProps>;
  /** viewBox width of the drawing; every drawing is 400 units high. */
  width: number;
}

// One entry per machine, in plant order. Figures are the plant's own:
// 45,000 MT melting, 17-inch logs, the 7500 MT press, 4820 mm cut lengths,
// 190°C for 8 hours.
export const STATIONS: Station[] = [
  {
    id: "scrap",
    chapter: "melt",
    title: "Scrap arrives",
    body: "Trucks bring aluminium scrap in through the plant gate. This is where the metal's journey begins.",
    specs: [
      { label: "Raw material", value: "Aluminium scrap" },
      { label: "Comes in by", value: "Truck" },
    ],
    Drawing: ScrapDrawing,
    width: 720,
  },
  {
    id: "furnace",
    chapter: "melt",
    title: "Melting furnace",
    body: "The scrap is charged through the furnace door and melted into a bath of liquid aluminium. When it is ready, the metal leaves through the nozzle into the launder.",
    specs: [
      { label: "Melting capacity", value: "45,000 MT a year" },
      { label: "Comes out as", value: "Molten aluminium" },
    ],
    Drawing: FurnaceDrawing,
    width: 760,
  },
  {
    id: "casting",
    chapter: "cast",
    title: "Casting table",
    body: "The launder carries the metal to the casting table, where it drops through the moulds. Water-cooled liners chill it from the outside in, and it solidifies into long logs in the pit below.",
    specs: [
      { label: "Moulds", value: "Water-cooled" },
      { label: "Comes out as", value: "Solid logs" },
    ],
    Drawing: CastingDrawing,
    width: 760,
  },
  {
    id: "logs",
    chapter: "cast",
    title: "Log handling",
    body: "An overhead crane lifts the finished logs out of the pit and lays them on a trolley, which takes them on to the billet oven.",
    specs: [
      { label: "Log diameter", value: "17 inch" },
      { label: "Moved by", value: "Crane and trolley" },
    ],
    Drawing: LogsDrawing,
    width: 760,
  },
  {
    id: "billet-oven",
    chapter: "extrude",
    title: "Billet oven and shear",
    body: "Each log goes into the billet oven through an opening sized to fit it. Once it is hot enough to shape, the shear cuts it into short billets, one per press stroke.",
    specs: [
      { label: "Step 1", value: "Heat the log" },
      { label: "Step 2", value: "Shear into billets" },
    ],
    Drawing: BilletOvenDrawing,
    width: 820,
  },
  {
    id: "press",
    chapter: "extrude",
    title: "7500 MT extrusion press",
    body: "A pusher loads the hot billet into the container. The ram then drives it through the die, and the metal comes out the other side in the exact shape of the profile.",
    specs: [
      { label: "Press force", value: "7500 MT" },
      { label: "Profile width", value: "100–720 mm" },
    ],
    Drawing: PressDrawing,
    width: 1000,
  },
  {
    id: "quench",
    chapter: "extrude",
    title: "3-mode quenching",
    body: "Straight out of the die, the profile runs through the quench, which cools it with water, air or mist depending on the alloy and shape.",
    specs: [{ label: "Cooling modes", value: "Water · Air · Mist" }],
    Drawing: QuenchDrawing,
    width: 760,
  },
  {
    id: "puller",
    chapter: "extrude",
    title: "Puller and hot saw",
    body: "The puller grips the profile as it leaves the press and draws it straight down the run-out table. After three billets' worth, the hot saw cuts it free.",
    specs: [{ label: "Hot saw cuts", value: "Every 3 billets" }],
    Drawing: PullerDrawing,
    width: 820,
  },
  {
    id: "finish-saw",
    chapter: "finish",
    title: "Finish saw",
    body: "The handling table carries the profile across to the finish saw, which cuts it into exact lengths. The section shown here is a 600 mm channel.",
    specs: [
      { label: "Cut length", value: "4820 mm" },
      { label: "Shown", value: "600 mm channel" },
    ],
    Drawing: FinishSawDrawing,
    width: 900,
  },
  {
    id: "ageing",
    chapter: "finish",
    title: "Ageing oven",
    body: "The cut lengths are loaded into a basket and lifted into the ageing oven, where they are held at temperature to give the metal its final strength.",
    specs: [
      { label: "Temperature", value: "190°C" },
      { label: "Time", value: "8 hours" },
    ],
    Drawing: AgeingDrawing,
    width: 820,
  },
  {
    id: "packing",
    chapter: "finish",
    title: "Packing",
    body: "Aged profiles come out of the oven and are stacked with battens between the layers, then packed into bundles.",
    specs: [{ label: "Comes out as", value: "Packed bundles" }],
    Drawing: PackingDrawing,
    width: 720,
  },
  {
    id: "dispatch",
    chapter: "deliver",
    title: "Dispatch",
    body: "A truck pulls in, the bundles are loaded on site, and the order leaves the plant.",
    specs: [{ label: "Loaded", value: "On site" }],
    Drawing: DispatchDrawing,
    width: 760,
  },
  {
    id: "shipping",
    chapter: "deliver",
    title: "By sea and by air",
    body: "From the plant, orders travel on by sea freight and by air freight.",
    specs: [
      { label: "By sea", value: "Sea freight" },
      { label: "By air", value: "Air freight" },
    ],
    Drawing: ShippingDrawing,
    width: 900,
  },
];

export const HERO = {
  eyebrow: "Natraj Aluform · Surat, India",
  lede: "Walk through our plant, from the scrap that comes in at the gate to the finished profiles that leave by sea and air. Every step happens under one roof, around India's largest 7500 MT extrusion press.",
};

export const SUMMARY = {
  eyebrow: "End of the line",
  title: "Made under one roof",
  body: "Melting, casting, extrusion, ageing and packing all happen in our own plant, so every profile is made to the same standard.",
};

export interface ProductCategory {
  /** `page` value the admin stores on products for this category. */
  pageKey: string;
  label: string;
  href: string;
  blurb: string;
}

export const PRODUCTS: ProductCategory[] = [
  {
    pageKey: "EXTRUDEDPRODUCTS",
    label: "Extruded Products",
    href: "/product/extrudedproducts",
    blurb: "Precision aluminium profiles for architectural, industrial and formwork use, from 100 mm up to 720 mm.",
  },
  {
    pageKey: "NEWALLOY",
    label: "New Alloy",
    href: "/product/newalloy",
    blurb: "Low-scandium Al-Mg-Sc alloys developed for high-stress structural parts in electric vehicles and aerospace.",
  },
  {
    pageKey: "DIEMANUFACTURING",
    label: "Mould Manufacturing",
    href: "/product/mouldmanufacturing",
    blurb: "Extrusion dies made in-house, up to 1000 mm in diameter, with capacity for over 700 moulds a month.",
  },
];

// Same order and labels as the Segments menu.
export const SEGMENTS = [
  { title: "Building Construction", href: "/segments/buildingconstruction", image: "/images/buil1.png" },
  { title: "Automobile", href: "/segments/automobile", image: "/images/auto1.png" },
  { title: "Transportations", href: "/segments/transportations", image: "/images/trans1.png" },
  { title: "Aerospace", href: "/segments/aerospace", image: "/images/aero3.png" },
  { title: "Industrial", href: "/segments/industrial", image: "/images/ind1.png" },
  { title: "Defense", href: "/segments/defense", image: "/images/def1.png" },
  { title: "Renewable Energy", href: "/segments/renewableenergy", image: "/images/renew1.png" },
];

export const CONNECT = {
  eyebrow: "Start a project",
  title: "Have a profile in mind? Let's extrude it.",
  body: "Send us your drawing or requirement and our team will get back to you. Or browse the catalogues to see the profiles we already make.",
};

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const chapterOf = (id: ChapterId) => CHAPTERS.find((c) => c.id === id)!;
