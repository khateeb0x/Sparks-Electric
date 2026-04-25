"use client";

import { motion } from "framer-motion";
import { Receipt, Wrench, ShieldCheck, Zap } from "lucide-react";

const PILLARS = [
  {
    no: "01",
    icon: Receipt,
    title: "Upfront, written pricing",
    body: "Every quote is itemized and signed before we lift a tool. No surprise add-ons, no after-the-fact upsell.",
  },
  {
    no: "02",
    icon: Wrench,
    title: "Licensed journeymen, every job",
    body: "Not 'helpers' — the person on your job is a state-licensed electrician with 5+ years on the tools.",
  },
  {
    no: "03",
    icon: ShieldCheck,
    title: "1-year workmanship guarantee",
    body: "Anything we install or repair is covered for a full year. If it fails, we come back free of charge.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-secondary/30 py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cta/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Why Sparks
          </p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
            The basics, done<br />
            <span className="text-cta">the way they should be.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-background p-8 transition-colors hover:bg-card sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {pillar.no}
                  </span>
                  <Icon
                    className="h-7 w-7 text-cta transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-cta transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
