"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/**
 * Spread onto a motion element to fade it up once it scrolls into view.
 * Triggers when the top edge clears the bottom 10% of the screen, so blocks
 * taller than the viewport (long product or blog copy) still reveal.
 */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  variants: reveal,
} as const;

/** A div that fades up into place the first time it scrolls into view. */
export default function Reveal(props: HTMLMotionProps<"div">) {
  return <motion.div {...inView} {...props} />;
}
