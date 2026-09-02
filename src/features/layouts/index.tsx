"use client";
// PROJECT IMPORTS
import { LAYOUT } from "@/lib/constant";
import PublicLayout from "./publicLayout/PublicLayout";
import PublicGuard from "./publicLayout/PublicGuard";
import MinimalGuard from "./MinimalLayout/MinimalGuard";
import MinimalLayout from "./MinimalLayout";
import MainGuard from "./MainLayout/MainGuard";
import MainLayout from "./MainLayout";

interface LayoutProps {
  variant?: "main" | "minimal";
  children: React.ReactNode;
}

const LayoutWrapper = (porps: LayoutProps) => {
  const { variant = LAYOUT.main, children } = porps;

  switch (variant) {
    case LAYOUT.minimal:
      return (
        <MinimalGuard>
          <MinimalLayout>{children}</MinimalLayout>
        </MinimalGuard>
      );

    case LAYOUT.public:
      return (
        <PublicGuard>
          <PublicLayout>{children}</PublicLayout>
        </PublicGuard>
      );

    case LAYOUT.main:
      return (
        <MainGuard>
          <MainLayout>{children}</MainLayout>
        </MainGuard>
      );

    default:
      return (
        <MainGuard>
          <MainLayout>{children}</MainLayout>
        </MainGuard>
      );
  }
};

export default LayoutWrapper;
