"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(hover: none)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    queueMicrotask(() => {
      document.body.style.cursor = "none";
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          background: "#fbbf24",
          boxShadow:
            "0 0 0 1.5px rgba(5, 5, 7, 0.55), 0 0 14px rgba(249, 115, 22, 0.95), 0 0 28px rgba(249, 115, 22, 0.55)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity,border-color,background-color] duration-200 will-change-transform"
        style={{
          width: hovering ? "64px" : "38px",
          height: hovering ? "64px" : "38px",
          border: hovering
            ? "1.5px solid rgba(251, 191, 36, 0.95)"
            : "1.5px solid rgba(251, 191, 36, 0.55)",
          backgroundColor: hovering
            ? "rgba(249, 115, 22, 0.10)"
            : "transparent",
          boxShadow: hovering
            ? "0 0 24px rgba(251, 191, 36, 0.35)"
            : "0 0 12px rgba(249, 115, 22, 0.22)",
        }}
      />
    </>
  );
}
