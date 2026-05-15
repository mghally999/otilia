"use client";
import { useEffect, useRef } from "react";

/**
 * Tiny scroll-progress indicator. Uses one rAF-throttled scroll listener
 * and translates a single 1px-tall element. Sub-1KB component.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH <= 0 ? 0 : window.scrollY / docH;
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1.5,
        zIndex: 200,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          background: "var(--brand-gold)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
