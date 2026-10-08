"use client";

import { Reveal } from "@/components/Reveal";
import { getVehicle, showcaseSlugs } from "@/data/vehicles";
import { bookHref, formatINR } from "@/lib/booking";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";

const labels = ["Compact SUV", "Premium SUV", "Off-road"] as const;

export function Showcase() {
  const cars = showcaseSlugs.map((slug) => getVehicle(slug)!).filter(Boolean);
  const [index, setIndex] = useState(0);
  const car = cars[index];
  const reduce = useReducedMotion() ?? false;

  const moveSlide = (direction: -1 | 1) => {
    if (!cars.length) return;
    setIndex((current) => (current + direction + cars.length) % cars.length);
  };

  if (!car) return null;

  return (
    <section id="spotlight" className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        {/* Full-photo vehicle carousel */}
        <div className="stage-floor relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[720px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={car.slug}
              src={car.image}
              alt={`${car.name} ${car.year}`}
              initial={reduce ? false : { opacity: 0, scale: 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-ink/10" />

          <div className="absolute left-4 top-6 z-10 flex items-center gap-3 sm:left-6">
            <span className="border border-white/20 bg-ink/65 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-md">
              Spotlight
            </span>
            <span className="border border-white/15 bg-ink/45 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur-md">
              {labels[index]}
            </span>
          </div>

          <div className="absolute right-4 top-5 z-10 flex gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              aria-label="Previous spotlight car"
              onClick={() => moveSlide(-1)}
              className="grid h-11 w-11 place-items-center border border-white/30 bg-ink/60 text-ivory backdrop-blur-md transition hover:border-copper hover:bg-copper"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next spotlight car"
              onClick={() => moveSlide(1)}
              className="grid h-11 w-11 place-items-center border border-white/30 bg-ink/60 text-ivory backdrop-blur-md transition hover:border-copper hover:bg-copper"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-6 left-4 right-4 z-10 flex items-end justify-between gap-4 text-ivory sm:bottom-8 sm:left-6 sm:right-6">
            <div>
              <p className="eyebrow text-gold-soft">Made for the open road</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl">{car.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums text-ivory/75">
                {String(index + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
              </span>
              <span className="h-1 w-14 overflow-hidden bg-white/30 sm:w-20">
                <span
                  className="block h-full bg-copper transition-[width] duration-300"
                  style={{ width: `${((index + 1) / cars.length) * 100}%` }}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-4 py-14 sm:px-8 lg:col-span-5 lg:px-12">
          <Reveal>
            <p className="eyebrow text-gold">Find your kind of drive</p>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Featured vehicles">
              {cars.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  role="tab"
                  aria-selected={i === index}
                  className={`border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    i === index ? "border-copper bg-copper text-white" : "border-white/20 text-ivory/80"
                  }`}
                >
                  {labels[i]}
                </button>
              ))}
            </div>
            <h2 className="display mt-8 text-5xl sm:text-6xl" aria-live="polite">{car.name}</h2>
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
