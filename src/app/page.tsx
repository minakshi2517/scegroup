import { AboutContact } from "@/components/sections/AboutContact";
import { Benefits } from "@/components/sections/Benefits";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Fleet } from "@/components/sections/Fleet";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Fleet />
      <Showcase />
      <Benefits />
      <HowItWorks />
      <Stats />
      <Services />
      <Testimonials />
      <FAQ />
      <AboutContact />
      <CTA />
    </main>
  );
}
