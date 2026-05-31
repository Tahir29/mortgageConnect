"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Custom icon library or use an SVG

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Only show the button if user has scrolled down past a threshold (e.g., 300px)
      // 2. AND only show it if the current scroll position is LESS than the last one (scrolling up)
      if (currentScrollY > 300 && currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Update the last scroll position to calculate direction on the next tick
      lastScrollY = currentScrollY;
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-foreground border border-white text-white rounded-full shadow-lg transition-all duration-300 transform hover:foreground hover:scale-110 active:scale-95
        ${isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}