"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Home,
  Building2,
  AlertTriangle,
  PlugZap,
  CircuitBoard,
  Battery,
  ArrowUpRight,
  Zap,
} from "lucide-react";

interface BentoItem {
  icon: typeof Home;
  title: string;
  body: string;
  className: string;
  highlight?: boolean;
  meta?: string;
}

const ITEMS: BentoItem[] = [
  {
    icon: AlertTriangle,
    title: "24/7 Emergency",
    body: "Sparking outlets, dead panels, lost power. A licensed tech on the way the same day, every day.",
    className: "lg:col-span-2 lg:row-span-2",
    highlight: true,
    meta: "Avg 47-min response",
  },
  {
    icon: PlugZap,
    title: "EV charger install",
    body: "Level-2 home chargers wired to spec. Permits, rebates, inspection — handled.",
    className: "lg:col-span-2",
  },
  {
    icon: Home,
    title: "Residential",
    body: "Whole-home rewiring, lighting, outlets, code-compliant repairs.",
    className: "",
  },
  {
    icon: Building2,
    title: "Commercial",
    body: "Tenant build-outs, after-hours work that keeps the doors open.",
    className: "",
  },
  {
    icon: CircuitBoard,
    title: "Panel upgrades",
    body: "200A service upgrades, sub-panels, surge protection — solar + EV ready.",
    className: "lg:col-span-2",
  },
  {
    icon: Battery,
    title: "Generators",
    body: "Standby and portable generator hookups with automatic transfer.",
    className: "lg:col-span-2",
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      id="services"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-cta/40 to-transparent" />

      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.10),transparent_70%)] blur-3xl will-change-transform"
      />
      <motion.span
        aria-hidden
        style={{ x: driftX }}
        className="pointer-events-none absolute bottom-8 left-0 -z-[1] select-none whitespace-nowrap font-mono text-[clamp(6rem,18vw,18rem)] font-bold uppercase leading-none tracking-tighter text-foreground/[0.025] will-change-transform"
      >
        SERVICES · SERVICES
      </motion.span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              What we do
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
              Six trades.<br />
              <span className="text-shimmer">One licensed crew.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Every job led by a state-licensed journeyman. Every quote written
            before a tool is lifted. Every install backed for a year.
          </p>
        </div>

        <ul className="mt-16 grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={item.className}
              >
                <a
                  href="#quote"
                  data-cursor="hover"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors sm:p-7 ${
                    item.highlight
                      ? "border-cta/40 bg-gradient-to-br from-cta/15 via-card to-card hover:border-cta"
                      : "border-border bg-card/60 hover:border-cta/60 hover:bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-xl transition-colors ${
                        item.highlight
                          ? "bg-cta text-cta-foreground"
                          : "bg-secondary text-cta group-hover:bg-cta group-hover:text-cta-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cta"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>

                  {item.meta && (
                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 rounded-full border border-cta/30 bg-cta/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cta">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cta" />
                        {item.meta}
                      </span>
                    </div>
                  )}

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
