"use client";

import { Reveal } from "@/components/Reveal";
import { getVehicle, showcaseSlugs } from "@/data/vehicles";
import { bookHref, formatINR } from "@/lib/booking";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const labels = ["Luxury SUV", "Premium SUV", "Sports Car"] as const;

export function Showcase() {
  const cars = showcaseSlugs.map((slug) => getVehicle(slug)!).filter(Boolean);
  const [index, setIndex] = useState(0);
  const car = cars[index];
  const reduce = useReducedMotion();
  if (!car) return null;

  return (
    <section className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="stage-floor relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[720px]">
          <div
            className="absolute left-1/2 top-[46%] h-[46%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(196,98,45,0.45), transparent 68%)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={car.slug}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.04, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: 1200 }}
            >
              <Image src={car.image} alt={car.name} fill className="object-cover object-center" sizes="(min-width: 1024px) 58vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-6 left-6 right-6 flex gap-2">
            {cars.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1 flex-1 ${i === index ? "bg-copper" : "bg-white/25"}`}
                aria-label={labels[i]}
              />
            ))}
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
