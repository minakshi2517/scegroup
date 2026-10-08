import { carImages } from "@/data/images";
import { Link } from "wouter";

export function CTA() {
  const src = carImages.cta || carImages.hero || carImages.premium || "/logo.png";
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover kenburns" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="road-swoosh absolute inset-0" />
      <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6">
        <p className="eyebrow text-gold-soft">Next journey</p>
        <h2 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">Ready to hit the road?</h2>
        <p className="mt-5 max-w-md text-lg text-ivory/75">Find the perfect car for your next journey.</p>
        <div className="mt-8">
          <Link href="/cars" className="btn btn-copper">
            Find Your Car
          </Link>
        </div>
      </div>
    </section>
  );
}
