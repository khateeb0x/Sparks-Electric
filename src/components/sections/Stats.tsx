"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  fmt?: (n: number) => string;
}

const STATS: Stat[] = [
  { value: 22, suffix: "+", label: "Years on the trade" },
  { value: 4800, suffix: "+", label: "Jobs completed" },
  { value: 47, suffix: "min", label: "Average emergency response" },
  { value: 4.9, label: "Rating across 600+ reviews", fmt: (n) => n.toFixed(1) },
];

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["20%", "-25%"]);

  return (
    <section
      ref={ref}
      aria-label="Stats"
      className="relative isolate overflow-hidden border-y border-border bg-background py-24 sm:py-32"
    >
      <motion.div
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div className="absolute -left-20 top-1/2 h-[60vh] w-[60vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[40vh] w-[40vw] rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.12),transparent_70%)] blur-3xl" />
      </motion.div>

      <motion.p
        style={{ y: headlineY }}
        className="pointer-events-none absolute left-1/2 top-12 z-0 -translate-x-1/2 select-none whitespace-nowrap font-mono text-[clamp(8rem,22vw,22rem)] font-bold uppercase tracking-tighter text-foreground/[0.025] will-change-transform"
        aria-hidden
      >
        SPARKS
      </motion.p>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            <span className="block h-px w-8 bg-cta" />
            By the numbers
          </p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
            Two decades.<br />
            <span className="text-cta">One licensed crew.</span>
          </h2>
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <li key={stat.label} className="bg-background p-8 sm:p-10">
              <Counter stat={stat} delay={i * 0.1} />
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Counter({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const value = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, stat.value, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (!ref.current) return;
        ref.current.textContent = stat.fmt
          ? stat.fmt(latest)
          : Math.round(latest).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, stat, delay, value]);

  return (
    <div className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em] text-foreground">
      <span ref={ref}>{stat.fmt ? stat.fmt(0) : "0"}</span>
      {stat.suffix && (
        <span className="text-cta">{stat.suffix}</span>
      )}
    </div>
  );
}
