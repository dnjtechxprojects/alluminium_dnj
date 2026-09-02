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

import { LAYOUT } from "@/lib/constant";
import LayoutWrapper from "@/features/layouts";

function PageLoader() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/navbar-bg.png')" }}
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-widest text-black mb-10">
          NATRAJALUFORM
        </h1>
        <div className="w-14 h-14 rounded-full border-4 border-black border-t-gray-400 animate-spin" />
      </div>
    </div>
  );
}

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
        <Choose />
        <Capabilities />
        <Innovation />
        {/* <Impact /> */}
         <Product />
        {/* <Updates /> */}
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
