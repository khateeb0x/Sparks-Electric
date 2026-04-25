"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote, Zap } from "lucide-react";

const REVIEWS = [
  {
    name: "Maria S.",
    where: "Oakland · Rockridge",
    quote:
      "Sparks installed our EV charger and rewired the kitchen. Showed up on time, cleaned up after themselves, charged exactly what they quoted. Already booked them for the panel upgrade.",
  },
  {
    name: "Devon W.",
    where: "Berkeley · North Berkeley",
    quote:
      "Called at 9pm with a sparking outlet. A licensed tech was at the door before 11. Made it safe, quoted the proper repair the next morning. Hard to find this kind of responsiveness.",
  },
  {
    name: "Priya R.",
    where: "Alameda",
    quote:
      "Got three quotes for a 200A panel upgrade. Sparks wasn't the cheapest but the quote was the most detailed and they pulled the permit themselves. Inspector signed off first try.",
  },
  {
    name: "James T.",
    where: "San Leandro · Bay-O-Vista",
    quote:
      "Used them for tenant improvements at our retail space. Worked weekends so we wouldn't lose business hours. Exactly the kind of contractor you hope to find.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.10),transparent_70%)] blur-3xl will-change-transform"
      />
      <motion.span
        aria-hidden
        style={{ x: driftX }}
        className="pointer-events-none absolute -top-6 right-0 -z-[1] select-none whitespace-nowrap font-mono text-[clamp(6rem,18vw,18rem)] font-bold uppercase leading-none tracking-tighter text-foreground/[0.025] will-change-transform"
      >
        ★ ★ ★ ★ ★
      </motion.span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              From the customers
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
              4.9 stars across<br />
              <span className="text-cta">600+ verified reviews.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-cta text-cta"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-wider">
              Google · Yelp · BBB
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors hover:border-cta/50 sm:p-8"
            >
              <Quote
                className="absolute right-6 top-6 h-10 w-10 text-cta/15 transition-colors group-hover:text-cta/30"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-cta text-cta"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-foreground">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-2 text-sm">
                <div className="font-semibold text-foreground">{review.name}</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {review.where}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
