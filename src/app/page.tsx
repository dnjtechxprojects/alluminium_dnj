"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";

import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Choose from "@/components/home/Choose";
import Capabilities from "@/components/home/Capabilities";
import Innovation from "@/components/home/Innovation";
import Product from "@/components/home/Product";
// import Impact from "@/components/home/Impact";
// import Updates from "@/components/home/Updates";

import PaperBackground from "@/components/common/PaperBackground";
import { LAYOUT } from "@/lib/constant";
import LayoutWrapper from "@/features/layouts";
import PageLoader from "@/components/PageLoader";

function HomeContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <LayoutWrapper variant={LAYOUT.public}>
        <Hero />
        <Process />
        {/* Hero and Process carry their own backgrounds; the rest share the paper surface. */}
        <PaperBackground>
          <Choose />
          <Capabilities />
          <Innovation />
          {/* <Impact /> */}
          <Product />
          {/* <Updates /> */}
        </PaperBackground>
      </LayoutWrapper>
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
