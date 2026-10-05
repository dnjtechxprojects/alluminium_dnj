/**
 * The two fixed catalogue PDFs offered on the Extruded Products page.
 *
 * The heading and titles are shared by the admin upload screen and the public
 * download buttons, so renaming one here renames it everywhere (including the
 * name of the downloaded file).
 */
export const CATALOGUE_HEADING =
  "Explore Our Complete Range of Precision Aluminium Profiles";

/** Page and section holding the download buttons; the header icon links here. */
export const CATALOGUE_PAGE = "/product/extrudedproducts";
export const CATALOGUE_SECTION_ID = "catalogue";

export const CATALOGUES = [
  { slot: "1", title: "Formwork" },
  { slot: "2", title: "Architectural" },
] as const;

export type CatalogueSlot = (typeof CATALOGUES)[number]["slot"];

export const getCatalogue = (slot: string) =>
  CATALOGUES.find((c) => c.slot === slot);

/** Fixed on-disk name: re-uploading a slot replaces its PDF. */
export const catalogueFileName = (slot: CatalogueSlot) => `catalogue-${slot}.pdf`;
