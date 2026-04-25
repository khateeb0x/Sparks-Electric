"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowDown } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-cta/30 blur-2xl" />
    </div>
  ),
});

const HEADLINE_TOP = ["We", "wire", "the", "Bay."];
const HEADLINE_BOT = ["Sparks", "answers."];

const MAX_HEADLINE = "clamp(2.75rem, 8.5vw, 8.5rem)";

const wordVariant = {
  hidden: { y: "115%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: 0.15 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <motion.div
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <HeroScene />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-[4] h-44 bg-gradient-to-b from-background via-background/85 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-[4] h-72 bg-gradient-to-t from-background via-background/80 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-[4] w-1/3 bg-gradient-to-r from-background/85 via-background/30 to-transparent"
      />
      <div className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(5,5,7,0.55)_70%,_rgba(5,5,7,0.95)_100%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:pb-24 lg:pt-40 will-change-transform"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cta/40 bg-background/40 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cta backdrop-blur"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cta" />
          </span>
          24/7 — Bay Area emergency line live now
        </motion.span>

        <h1
          className="max-w-[90vw] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          <span className="block" style={{ fontSize: MAX_HEADLINE }}>
            {HEADLINE_TOP.map((w, i) => (
              <span key={`t-${i}`} className="mr-[0.12em] inline-block overflow-hidden align-bottom">
                <motion.span
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  animate="show"
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block" style={{ fontSize: MAX_HEADLINE }}>
            {HEADLINE_BOT.map((w, i) => (
              <span key={`b-${i}`} className="mr-[0.12em] inline-block overflow-hidden align-bottom">
                <motion.span
                  custom={i + HEADLINE_TOP.length}
                  variants={wordVariant}
                  initial="hidden"
                  animate="show"
                  className={i === 0 ? "inline-block text-cta" : "inline-block"}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Licensed C-10 contractor. Panel upgrades, EV chargers, lighting,
            and after-hours emergencies — done right, the first time, since
            2003.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#quote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-cta px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-cta-foreground transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Get a free quote</span>
              <span className="absolute inset-0 -translate-x-full bg-accent-electric transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="tel:+15105550199"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 bg-background/30 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-foreground backdrop-blur transition-colors hover:border-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              (510) 555-0199
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="flex flex-col items-center gap-2">
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </span>
      </motion.div>
    </section>
  );
}
