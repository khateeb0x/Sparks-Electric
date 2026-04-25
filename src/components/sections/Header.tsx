"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#service-area", label: "Coverage" },
  { href: "#quote", label: "Quote" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#top"
          data-cursor="hover"
          className="flex items-center gap-2.5 font-semibold text-foreground"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-cta text-cta-foreground">
            <Zap className="h-5 w-5" aria-hidden="true" />
            <span className="absolute inset-0 -z-10 rounded-lg bg-cta blur-md opacity-60" />
          </span>
          <span className="text-base tracking-tight uppercase">Sparks Electric</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="group relative text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cta transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+15105550199"
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full bg-cta px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cta-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            (510) 555-0199
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-background/95 backdrop-blur-xl md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-3 text-sm uppercase tracking-wider text-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+15105550199"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cta-foreground"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            (510) 555-0199
          </a>
        </nav>
      </div>
    </header>
  );
}
