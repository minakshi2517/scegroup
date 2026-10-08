import { brand, nav } from "@/data/site";
import Link from "next/link";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsApp } from "./Icons";
import { Logo } from "./Logo";

const serviceLinks = [
  { href: "/cars?category=Economy", label: "Economy cars" },
  { href: "/cars?category=SUV", label: "SUVs" },
  { href: "/cars?category=Luxury", label: "Luxury SUVs" },
  { href: "/cars?category=Sports", label: "Sports & Thar" },
  { href: "/#services", label: "Long-term rentals" },
];

export function Footer() {
  return (
    <footer className="bg-ink pb-16 text-ivory md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo className="h-14" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
            Self-drive cars from Sector 93, Gurugram. Clear daily rates, a known fleet, and a desk that picks up the phone.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold-soft">{brand.tagline}</p>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-gold">Navigate</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-gold">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="eyebrow text-gold">Desk</p>
          <ul className="mt-4 space-y-3 text-sm text-ivory/80">
            <li className="flex gap-3">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
              <span>{brand.address}</span>
            </li>
            <li className="flex gap-3">
              <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
              <span>{brand.hours}</span>
            </li>
            <li className="flex gap-3">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
              <a href={brand.phoneHref} className="nav-link">{brand.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
              <a href={`mailto:${brand.email}`} className="nav-link break-all">{brand.email}</a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={brand.whatsapp} className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-ivory transition hover:border-gold hover:text-gold-soft" aria-label="WhatsApp">
              <IconWhatsApp className="h-4 w-4" />
            </a>
            <a href={brand.phoneHref} className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-ivory transition hover:border-gold hover:text-gold-soft" aria-label="Call">
              <IconPhone className="h-4 w-4" />
            </a>
            <a href={`mailto:${brand.email}`} className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-ivory transition hover:border-gold hover:text-gold-soft" aria-label="Email">
              <IconMail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Gurugram · Haryana</p>
        </div>
      </div>
    </footer>
  );
}
