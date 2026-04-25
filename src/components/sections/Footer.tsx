import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cta to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link
            href="#top"
            data-cursor="hover"
            className="inline-flex items-center gap-2.5"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-lg bg-cta text-cta-foreground">
              <Zap className="h-5 w-5" aria-hidden="true" />
              <span className="absolute inset-0 -z-10 rounded-lg bg-cta blur-md opacity-60" />
            </span>
            <span className="text-base font-semibold uppercase tracking-tight text-foreground">
              Sparks Electric
            </span>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Family-owned electrical contractor serving the East Bay since 2003.
            Residential, commercial, and 24/7 emergency service.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            C-10 #1234567 · Bonded · Insured
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            Reach us
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-cta" aria-hidden="true" />
              <a
                href="tel:+15105550199"
                data-cursor="hover"
                className="text-foreground hover:text-cta"
              >
                (510) 555-0199
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-cta" aria-hidden="true" />
              <a
                href="mailto:hello@sparkselectric.example"
                data-cursor="hover"
                className="text-foreground hover:text-cta"
              >
                hello@sparkselectric.example
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-cta" aria-hidden="true" />
              <span className="text-muted-foreground">
                4218 MacArthur Blvd
                <br />
                Oakland, CA 94619
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 flex-none text-cta" aria-hidden="true" />
              <span className="text-muted-foreground">
                Mon–Sat 7am–7pm
                <br />
                24/7 emergency line
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-cta">
            Sitemap
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="#services" data-cursor="hover" className="text-muted-foreground hover:text-foreground">Services</Link></li>
            <li><Link href="#why-us" data-cursor="hover" className="text-muted-foreground hover:text-foreground">Why Sparks</Link></li>
            <li><Link href="#testimonials" data-cursor="hover" className="text-muted-foreground hover:text-foreground">Reviews</Link></li>
            <li><Link href="#service-area" data-cursor="hover" className="text-muted-foreground hover:text-foreground">Coverage</Link></li>
            <li><Link href="#quote" data-cursor="hover" className="text-muted-foreground hover:text-foreground">Get a quote</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:flex-row sm:px-6">
          <p>&copy; {new Date().getFullYear()} Sparks Electric — License C-10 #1234567</p>
          <p>Demo proposal — not a real business</p>
        </div>
      </div>
    </footer>
  );
}
