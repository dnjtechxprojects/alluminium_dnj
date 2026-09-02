"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMounted from "@/hooks/useMounted";

import { Loader } from "@/ui";
import { useAuth } from "@/context/useAuth";
import { ADMIN_BLOG_ROUTE } from "@/lib/constant";

const MinimalGuard = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  const { user } = useAuth();
  const router = useRouter();

  // Redirect only AFTER hydration
  useEffect(() => {
    if (!mounted) return;

    if (user?.access_token) {
      router.replace(ADMIN_BLOG_ROUTE);
    }
  }, [mounted, user, router]);

  // 🚫 During SSR & first client render → SAME output
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <Loader size={50} />
      </div>
    );
  }

  // While redirecting
  if (user?.access_token) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <Loader size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default MinimalGuard;
