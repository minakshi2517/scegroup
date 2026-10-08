"use client";

import { Reveal } from "@/components/Reveal";
import { getVehicle, showcaseSlugs } from "@/data/vehicles";
import { bookHref, formatINR } from "@/lib/booking";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { ThreeCarousel } from "@/components/ThreeCarousel";

const labels = ["Compact SUV", "Premium SUV", "Off-road"] as const;

export function Showcase() {
  const cars = showcaseSlugs.map((slug) => getVehicle(slug)!).filter(Boolean);
  const [index, setIndex] = useState(0);
  const car = cars[index];
  const reduce = useReducedMotion();
  if (!car) return null;

  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        {/* 3D carousel stage */}
        <div className="stage-floor relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[720px]">
          <ThreeCarousel autoRotate autoPlay />
          {/* Car badge overlay */}
          <div className="absolute left-4 top-6 z-20 flex items-center gap-3">
            <span className="bg-ink/70 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-sm">
              Spotlight
            </span>
            <span className="bg-ink/50 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-sm">
              {labels[index]}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:col-span-5 lg:px-12">
          <Reveal>
            <p className="eyebrow text-gold">Spotlight</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {cars.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${
                    i === index ? "border-copper bg-copper text-white" : "border-white/20 text-ivory/80"
                  }`}
                >
                  {labels[i]}
                </button>
              ))}
            </div>
            <h2 className="display mt-8 text-5xl sm:text-6xl">{car.name}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-gold-soft">
              {car.year} · {car.body}
            </p>
            <p className="mt-5 max-w-md text-ivory/75">{car.blurb}</p>
            <dl className="mt-8 grid grid-cols-2 gap-px bg-white/10">
              {[
                ["Rate", `${formatINR(car.pricePerDay)} / day`],
                ["Seats", String(car.seats)],
                ["Gearbox", car.transmission],
                ["Fuel", car.fuel],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink px-4 py-4">
                  <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-stone">{k}</dt>
                  <dd className="mt-1 font-display text-xl">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref(car.slug)} className="btn btn-copper">
                Book Now
              </Link>
              <Link href={`/cars/${car.slug}`} className="btn btn-ghost">
                View Details
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
