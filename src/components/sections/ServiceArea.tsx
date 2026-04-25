"use client";

import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";

const CITIES = [
  "Oakland",
  "Berkeley",
  "Alameda",
  "San Leandro",
  "Emeryville",
  "Piedmont",
  "Albany",
  "El Cerrito",
  "Richmond",
  "Hayward",
  "Castro Valley",
  "San Lorenzo",
  "Union City",
  "Fremont",
  "Newark",
  "Walnut Creek",
];

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="relative overflow-hidden bg-secondary/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              Where we work
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
              Local to the<br />
              <span className="text-cta">East Bay.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Two trucks, four licensed electricians, all based out of our
              Oakland shop. If you&apos;re in the East Bay, we&apos;re a short
              drive away — usually same-day for service calls.
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
              4218 MacArthur Blvd · Oakland CA 94619
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {CITIES.map((city, i) => (
              <motion.li
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.025 }}
                className="group cursor-default rounded-xl border border-border bg-card px-4 py-3.5 text-center text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-cta/60 hover:bg-card hover:text-cta"
              >
                {city}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
