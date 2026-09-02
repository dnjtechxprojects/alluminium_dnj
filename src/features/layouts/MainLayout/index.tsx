"use client";

// PROJECT IMPORTS
import Header from "./Header";
import { DRAWER_TRANSITION_DURATION } from "@/lib/constant";
import Drawer from "./Drawer/Drawer";
import { useAuth } from "@/context/useAuth";

/* ============================== MAIN LAYOUT ============================== */

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {isDrawerVisible,setIsDrawerVisible} = useAuth();

  return (
    <div
      className={`${DRAWER_TRANSITION_DURATION} relative flex overflow-hidden z-0 h-full w-dvw bg-white-50`}
    >
      {/* Sidebar / Drawer */}
      <div className="max-md:z-50">
        <Drawer />
      </div>

      {/* Main Content */}
      <div
        className={`relative bg-white-50 flex h-full transition-all ${DRAWER_TRANSITION_DURATION} flex-1 flex-col overflow-hidden`}
      >
        <Header className="max-md:!hidden p-3" />

        <div className="flex w-full items-center justify-center bg-white-50 md:hidden"></div>
        <main
          className={`relative px-6 max-md:!h-[calc(100vh-60px)] overflow-y-auto h-full flex-1 transition-width ${DRAWER_TRANSITION_DURATION}`}
        >
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`hidden fixed inset-0 ${
          isDrawerVisible ? "max-md:flex max-md:bg-gray-50/50 max-md:opacity-90" : ""
        } max-md:z-40`}
        onClick={() => {
          setIsDrawerVisible(false)
        }}
      ></div>
    </div>
  );
};

export default MainLayout;
