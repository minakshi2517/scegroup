import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Navbar } from "@/components/Navbar";
import { brand } from "@/data/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Car Rentals in Gurugram`,
    template: `%s · ${brand.short}`,
  },
  description:
    "Self-drive car rentals in Gurugram. Swift, Venue, Seltos, Scorpio, Thar, XUV700 and Grand Vitara with clear daily rates. Desk open 9 AM to 10 PM.",
  icons: { icon: "/logo.png" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: brand.name,
  email: brand.email,
  telephone: "+918396977520",
  openingHours: "Mo-Su 09:00-22:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F Tower, Orchard Avenue, Signature Global, Sector 93",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122505",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        {children}
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
