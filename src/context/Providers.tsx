"use client";

import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "sonner";
import { ReactNode, Suspense } from "react";
import { Loader } from "@/ui";

interface ProvidersProps {
  children: ReactNode;
}
const Providers = (props: ProvidersProps) => {
  const { children } = props;
  return (
    <AuthProvider>
      <Toaster />
      <Suspense
        fallback={
          <div className="main absolute z-30 flex items-center justify-center h-full w-full">
            <Loader
              iconClassName="!text-black !fill-white !stroke-black"
              size={50}
            />
          </div>
        }
      >
        {children}
      </Suspense>
    </AuthProvider>
  );
};

export default Providers;
