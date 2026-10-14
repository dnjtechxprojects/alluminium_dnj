"use client";

import { MotionConfig } from "framer-motion";

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

const PublicLayout = ({
  children,
  footer = true,
}: {
  children: React.ReactNode;
  footer?: boolean;
}) => {
  return (
    // Visitors who ask for reduced motion get fades without the slide.
    <MotionConfig reducedMotion="user">
      <Navbar />
      {children}
      {footer && <Footer />}
    </MotionConfig>
  );
};

export default PublicLayout;
