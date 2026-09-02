"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useMounted from "@/hooks/useMounted";
import { Loader } from "@/ui";
import { useAuth } from "@/context/useAuth";
import { LOGIN_ROUTE } from "@/lib/constant";

const MainGuard = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  const { user } = useAuth();
  const router = useRouter();

  // Redirect AFTER hydration only
  useEffect(() => {
    if (!mounted) return;

    if (!user?.access_token) {
      router.replace(LOGIN_ROUTE);
    }
  }, [mounted, user, router]);

  // 🚫 Server & First Client Render MUST match
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <Loader size={50} />
      </div>
    );
  }

  // While redirecting
  if (!user?.access_token) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <Loader size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default MainGuard;
