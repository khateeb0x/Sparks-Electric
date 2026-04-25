import { ShieldCheck, Award, Star, Users, Clock, MapPin, Zap } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Licensed · Bonded · Insured" },
  { icon: Award, label: "C-10 Contractor #1234567" },
  { icon: Star, label: "4.9 ★ — 600+ verified reviews" },
  { icon: Users, label: "Family-owned since 2003" },
  { icon: Clock, label: "Same-day appointments" },
  { icon: MapPin, label: "Serving the Bay Area" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Credentials"
      className="relative overflow-hidden border-y border-border bg-background py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap will-change-transform">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-12 px-6"
            aria-hidden={dup === 1 ? "true" : undefined}
          >
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={`${dup}-${item.label}`}
                  className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-cta" aria-hidden="true" />
                  {item.label}
                  <Zap
                    className="ml-12 h-3 w-3 text-cta/40"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
