"use client";

import { BookingSearch } from "@/components/BookingSearch";
import { getVehicle } from "@/data/vehicles";
import { formatINR } from "@/lib/booking";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import type { MouseEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function handleHeroMouseMove(
  e: MouseEvent<HTMLElement>,
  reduce: boolean,
  visual: HTMLDivElement | null
) {
  if (reduce || !visual) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  visual.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 0) scale(1.04)`;
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const visual = useRef<HTMLDivElement>(null);
  const car = getVehicle("xuv700") ?? getVehicle("thar-3-door") ?? getVehicle("swift");
 

  if (!car) return null;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory" onMouseMove={(e) => handleHeroMouseMove(e, reduce, visual.current)}>
      {/* Full-bleed fleet photo keeps the hero clear even when WebGL is unavailable. */}
      <div className="absolute inset-0 z-0">
        <div
          ref={visual}
          className="absolute inset-[-3%] transition-transform duration-500 ease-out"
        >
          <img
            src={car.image}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[66%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_5%,rgba(12,16,22,0.14)_78%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:px-6 lg:pb-10">
        <motion.p
          className="eyebrow text-gold-soft"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Gurugram · Self-drive rentals
        </motion.p>
        <motion.h1
          className="display mt-4 max-w-4xl text-[3.1rem] text-ivory sm:text-7xl lg:text-[6.4rem]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
        >
          Your Journey.
          <br />
          Your Car.
          <br />
          Your Way.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-base text-ivory/75 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          Premium cars. Flexible rentals. Seamless journeys.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
        >
          <Link href="/cars" className="btn btn-copper">
            Explore Cars
          </Link>
          <Link href="/book" className="btn btn-ghost">
            Book Your Ride
          </Link>
        </motion.div>

        {car && (
          <motion.div
            className="mt-8 hidden w-fit border border-white/15 bg-ink/50 px-4 py-3 backdrop-blur-sm sm:block"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-soft">In the fleet · {car.name} {car.year}</p>
            <p className="mt-1 font-display text-xl">{car.name}</p>
            <p className="text-sm text-ivory/70">{formatINR(car.pricePerDay)} / day · {car.seats} seats · {car.fuel} · {car.transmission}</p>
          </motion.div>
        )}

        <motion.div
          className="relative z-10 mt-6 sm:mt-8"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
        >
          <div className="mx-auto max-w-7xl">
            <BookingSearch />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
