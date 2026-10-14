"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";

import HomeHero from "@/components/home/HomeHero";
import ProcessJourney from "@/components/home/process/ProcessJourney";
import HomeProducts from "@/components/home/HomeProducts";
import HomeSegments from "@/components/home/HomeSegments";
import HomeCta from "@/components/home/HomeCta";
import HomeLine from "@/components/home/line/HomeLine";

import PaperBackground from "@/components/common/PaperBackground";
import { LAYOUT } from "@/lib/constant";
import LayoutWrapper from "@/features/layouts";
import PageLoader from "@/components/PageLoader";

/**
 * Which home page to show:
 * - "line":    the full-screen sideways walk down the production line, where
 *              the whole page (products, industries and contact included)
 *              scrolls horizontally and closes with its own footer.
 * - "classic": the earlier page with the hero, the process journey and the
 *              product, segment and contact sections stacked vertically.
 */
const HOME_VERSION: "line" | "classic" = "line";

function ClassicHome() {
  return (
    <LayoutWrapper variant={LAYOUT.public}>
      <HomeHero />
      {/* The journey pins while it scrolls, so it sits outside
          PaperBackground (its overflow-hidden would break sticky). */}
      <ProcessJourney />
      <PaperBackground>
        <HomeProducts />
        <HomeSegments />
        <HomeCta />
      </PaperBackground>
    </LayoutWrapper>
  );
}

function LineHome() {
  return (
    <LayoutWrapper variant={LAYOUT.public} footer={false}>
      <HomeLine />
    </LayoutWrapper>
  );
}

function HomeContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {HOME_VERSION === "line" ? <LineHome /> : <ClassicHome />}
    </motion.div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomeContent />
    </Suspense>
  );
}
