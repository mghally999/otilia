"use client";
import { useEffect } from "react";

/**
 * RevealObserver — mounts once at the app root.
 * Watches every element with .reveal or .stagger and adds .is-visible when it
 * enters the viewport. One IO instance for the whole page; tiny JS cost.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Respect motion preferences: just show everything immediately
      document.querySelectorAll(".reveal, .stagger").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const watch = () => {
      document
        .querySelectorAll(".reveal:not(.is-visible), .stagger:not(.is-visible)")
        .forEach((el) => io.observe(el));
    };
    watch();

    // Re-watch on route change (Next App Router doesn't unmount layout)
    const mo = new MutationObserver(() => watch());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
