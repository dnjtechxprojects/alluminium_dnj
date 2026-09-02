"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-[9999]
            bg-[#ffb600] text-white 
            w-14 h-14 rounded-2xl 
            shadow-xl flex items-center justify-center
            transition-all duration-300
            hover:scale-110 active:scale-95 hover:cursor-pointer
          "
        >
          <Image 
    src="/svg/Icon.svg"    
    width={28}
    height={28}
    alt="Scroll to top"
  />

        </button>
      )}
    </>
  );
}
