import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Navbar } from "@/components/Navbar";
import { brand } from "@/data/site";
import type { ReactNode } from "react";

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
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        {children}
        <Footer />
        <MobileBar />
    </>
  );
}
