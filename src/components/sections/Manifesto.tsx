"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const LINE = "Wires don't fail on a schedule. Neither do we.".split(" ");

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="relative bg-background"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <BackgroundGlow progress={smooth} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <p className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            <span className="block h-px w-8 bg-cta" />
            We answer when others won't
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground/15">
            {LINE.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={smooth}
                start={i / LINE.length}
                end={(i + 1) / LINE.length}
                accent={word === "fail" || word === "we." || word === "Neither"}
              />
            ))}
          </h2>
          <ScrollMeter progress={smooth} />
        </div>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  start,
  end,
  accent,
}: {
  word: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.18em] inline-block ${accent ? "text-cta" : "text-foreground"}`}
    >
      {word}
    </motion.span>
  );
}

function BackgroundGlow({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(progress, [0, 1], ["-30%", "30%"]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  return (
    <motion.div
      aria-hidden
      style={{ x, opacity }}
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.5),transparent_60%)] blur-3xl" />
    </motion.div>
  );
}

function ScrollMeter({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mt-16 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span>Read</span>
      <div className="h-px flex-1 overflow-hidden bg-border">
        <motion.div
          style={{ width }}
          className="h-full bg-gradient-to-r from-cta to-accent-electric"
        />
      </div>
      <span className="text-cta">Sparks</span>
    </div>
  );
}
