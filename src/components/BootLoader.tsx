"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import PageLoader from "@/components/PageLoader";

// Covers the page from the first byte of HTML until the page content has
// hydrated. The server HTML renders framer-motion wrappers at opacity 0, so
// without this the loader would give way to a blank screen until JS arrives.

let ready = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// Called by LayoutWrapper once it has hydrated.
export const markAppReady = () => {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
};

const FADE_MS = 400;

export default function BootLoader() {
  const isReady = useSyncExternalStore(subscribe, () => ready, () => false);
  const [removed, setRemoved] = useState(false);

  // Fallback for pages rendered without a LayoutWrapper (e.g. the default 404)
  useEffect(() => {
    let timer: number | undefined;
    const onLoad = () => {
      timer = window.setTimeout(markAppReady, 3000);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const timer = window.setTimeout(() => setRemoved(true), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [isReady]);

  if (removed) return null;

  return (
    <PageLoader
      className={`transition-opacity duration-[400ms] ${
        isReady ? "opacity-0 pointer-events-none" : ""
      }`}
    />
  );
}
