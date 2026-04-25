"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle2, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
  "Pick a service",
  "Residential repair",
  "Commercial work",
  "EV charger install",
  "Panel upgrade",
  "Emergency / 24-7",
  "Generator install",
  "Other",
];

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("[demo] quote request", data);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section id="quote" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-cta">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              Get a free quote
            </p>
            <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em] text-foreground">
              Tell us about<br />
              <span className="text-cta">the job.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Quotes are free, written, and never come with surprise add-ons.
              We confirm scope, schedule, and price before any work begins.
            </p>

            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 grid h-11 w-11 flex-none place-items-center rounded-xl bg-cta text-cta-foreground">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Prefer to talk?
                  </div>
                  <a
                    href="tel:+15105550199"
                    data-cursor="hover"
                    className="text-lg font-semibold text-foreground hover:text-cta"
                  >
                    (510) 555-0199
                  </a>
                  <div className="text-xs text-muted-foreground">
                    7 days · 24h emergencies
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 grid h-11 w-11 flex-none place-items-center rounded-xl border border-border bg-card text-cta">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <a
                    href="mailto:hello@sparkselectric.example"
                    data-cursor="hover"
                    className="text-base font-medium text-foreground hover:text-cta"
                  >
                    hello@sparkselectric.example
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-border bg-card p-6 shadow-[0_30px_80px_-20px_rgba(249,115,22,0.25)] sm:p-9"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-5 py-16 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-cta/15 text-cta">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  Got it.
                </h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  A licensed estimator will reply within an hour during
                  business hours, sooner for emergencies.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="h-12 bg-background"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(510) 555-0123"
                      className="h-12 bg-background"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      className="h-12 bg-background"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="service" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="h-12 cursor-pointer rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                  >
                    {SERVICES.map((s, i) => (
                      <option key={s} value={i === 0 ? "" : s} disabled={i === 0}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tell us about the job
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Address, timeline, what you're trying to accomplish…"
                    className="bg-background"
                  />
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  data-cursor="hover"
                  className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-cta px-7 py-4 text-sm font-semibold uppercase tracking-wider text-cta-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {pending ? "Sending…" : "Request my free quote"}
                  </span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
