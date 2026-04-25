"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const EVPlugScene = dynamic(
  () => import("@/components/3d/ShowcaseScenes").then((m) => m.EVPlugScene),
  { ssr: false, loading: () => <SceneFallback /> }
);
const EdisonBulbScene = dynamic(
  () => import("@/components/3d/ShowcaseScenes").then((m) => m.EdisonBulbScene),
  { ssr: false, loading: () => <SceneFallback /> }
);
const LightningBoltScene = dynamic(
  () =>
    import("@/components/3d/ShowcaseScenes").then((m) => m.LightningBoltScene),
  { ssr: false, loading: () => <SceneFallback /> }
);

function SceneFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="h-20 w-20 animate-pulse rounded-full bg-cta/15 blur-2xl" />
    </div>
  );
}

const CARDS = [
  {
    Scene: EVPlugScene,
    eyebrow: "EV Charger Install",
    title: "Level-2 in a day.",
    body: "Permitted, wired, inspected — and we handle every utility rebate from PG&E to Tesla referrals.",
    meta: "From $1,450 · 4-hour install",
  },
  {
    Scene: EdisonBulbScene,
    eyebrow: "Lighting & Outlets",
    title: "Right the first time.",
    body: "Recessed cans, smart switches, code-correct outlet upgrades. No mystery flickers, no over-spec invoices.",
    meta: "Avg job · 1 service call",
  },
  {
    Scene: LightningBoltScene,
    eyebrow: "Emergency / 24-7",
    title: "On-call when it sparks.",
    body: "Sparking outlets, dead panels, lost power after a storm. A licensed tech rolls within the hour.",
    meta: "47-min average response",
  },
];

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      aria-label="Showcase"
      className="relative isolate overflow-hidden bg-background py-24 sm:py-32"
    >
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-[60vh] w-[60vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.10),transparent_70%)] blur-3xl will-change-transform"
      />
      <motion.span
        aria-hidden
        style={{ x: driftX }}
        className="pointer-events-none absolute right-0 top-10 -z-[1] select-none whitespace-nowrap font-mono text-[clamp(6rem,18vw,18rem)] font-bold uppercase leading-none tracking-tighter text-foreground/[0.025] will-change-transform"
      >
        ⚡ ⚡ ⚡
      </motion.span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Capabilities — in 3D
          </p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
            Three trades.<br />
            <span className="text-cta">Zero shortcuts.</span>
          </h2>
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const { Scene } = card;
            return (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-cta/50"
              >
                <div className="relative h-72 w-full overflow-hidden border-b border-border bg-gradient-to-b from-background via-card to-card">
                  <Scene />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cta">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {card.meta}
                    </span>
                    <a
                      href="#quote"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cta transition-transform group-hover:translate-x-0.5"
                    >
                      Quote
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.10),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
