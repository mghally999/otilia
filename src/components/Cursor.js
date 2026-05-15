"use client";
import { useEffect, useRef } from "react";

/**
 * OTILÌA Cursor — three layered elements:
 *   1. <canvas>   — soft glowing trail (bezier-smoothed)
 *   2. <ring/>    — leading outline ring, lags behind
 *   3. <dot/>     — instant solid dot at cursor tip
 *
 * Hover state: ring expands, dot fades, optional pill label appears.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function Cursor() {
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) {
      document.documentElement.style.cursor = "auto";
      return;
    }

    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!canvas || !ring || !dot || !label) return;

    canvas.style.opacity = "1";
    ring.style.opacity = "1";
    dot.style.opacity = "1";

    // Tell CSS to hide native cursor — only after hydration to avoid flash
    document.documentElement.classList.add("has-cursor");

    const ctx = canvas.getContext("2d");
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const N = 50;
    const startX = w / 2, startY = h / 2;
    const pts = Array.from({ length: N }, () => ({ x: startX, y: startY }));

    let mx = startX, my = startY;
    let rx = startX, ry = startY;
    let dx = startX, dy = startY;
    let raf = 0;
    let hovering = false;
    let hoverLabel = "";
    let visible = false;

    const getGold = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-gold")
        .trim();
      return v || "#9C7C38";
    };
    let gold = getGold();
    const refreshTheme = () => { gold = getGold(); };

    const themeObserver = new MutationObserver(refreshTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onEnter = () => {
      visible = true;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const link = t.closest('a, button, [role="button"], [data-cursor]');
      if (link) {
        hovering = true;
        const cursor = link.getAttribute("data-cursor");
        const labelAttr = link.getAttribute("data-cursor-label");
        if (labelAttr) hoverLabel = labelAttr;
        else if (cursor === "view") hoverLabel = "View";
        else hoverLabel = "";
      } else {
        hovering = false;
        hoverLabel = "";
      }
    };

    const hexToRgb = (hex) => {
      const m = hex.replace("#", "");
      return [
        parseInt(m.slice(0, 2), 16),
        parseInt(m.slice(2, 4), 16),
        parseInt(m.slice(4, 6), 16),
      ];
    };

    const loop = () => {
      // Soft fade — old strokes decay organically
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      pts[0].x += (mx - pts[0].x) * 0.32;
      pts[0].y += (my - pts[0].y) * 0.32;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.24;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.24;
      }

      const [r, g, b] = hexToRgb(gold);

      if (visible) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Outer glow pass
        for (let i = 1; i < N - 2; i++) {
          const t = i / N;
          const a = (1 - t) * 0.16;
          if (a < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.lineWidth = (1 - t) * 9;
          ctx.stroke();
        }
        // Sharp pass
        for (let i = 1; i < N - 2; i++) {
          const t = i / N;
          const a = (1 - t) * 0.85;
          if (a < 0.02) continue;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
          ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
          ctx.lineWidth = (1 - t) * 2.4;
          ctx.stroke();
        }
      }

      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const ringScale = hovering ? 2.4 : 1;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      ring.style.borderColor = hovering ? gold : `rgba(${r},${g},${b},0.7)`;
      ring.style.background = hovering ? `rgba(${r},${g},${b},0.1)` : "transparent";

      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      const dotScale = hovering ? 0 : 1;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${dotScale})`;

      if (hoverLabel) {
        label.style.opacity = "1";
        label.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        if (label.textContent !== hoverLabel) label.textContent = hoverLabel;
      } else {
        label.style.opacity = "0";
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      themeObserver.disconnect();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw", height: "100vh",
          pointerEvents: "none",
          zIndex: 9997,
          opacity: 0,
          transition: "opacity 320ms ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          border: "1.5px solid var(--brand-gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, border-color, background, opacity",
          transition: "opacity 320ms ease, border-color 320ms ease, background-color 320ms ease",
          opacity: 0,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 6, height: 6,
          background: "var(--brand-gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10000,
          willChange: "transform, opacity",
          transition: "opacity 320ms ease",
          opacity: 0,
          boxShadow: "0 0 10px rgba(156,124,56,0.6)",
        }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          padding: "6px 14px",
          background: "var(--brand-gold)",
          color: "#0D0D0D",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          borderRadius: 999,
          pointerEvents: "none",
          zIndex: 10001,
          willChange: "transform, opacity",
          transition: "opacity 240ms ease",
          opacity: 0,
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}
