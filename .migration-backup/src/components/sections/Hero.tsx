"use client";

import { BookingSearch } from "@/components/BookingSearch";
import { getVehicle } from "@/data/vehicles";
import { formatINR } from "@/lib/booking";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { Car3D } from "@/components/Car3D";

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
  const car = getVehicle("thar-3-door") ?? getVehicle("venue-2026") ?? getVehicle("punch-2026") ?? getVehicle("swift");
 

  if (!car) return null;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory" onMouseMove={(e) => handleHeroMouseMove(e, reduce, visual.current)}>
      {/* 3D car stage with gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[80%] w-[90%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(244,241,235,0.12), transparent 70%)" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[90%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(184,146,74,0.18), transparent 70%)" }} />
        {/* Animated road lines */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="absolute bottom-0 left-0 right-0 h-full" style={{
            background: `linear-gradient(90deg, transparent 0%, transparent 45%, rgba(184,146,74,0.35) 45%, rgba(184,146,74,0.35) 55%, transparent 55%, transparent 100%)`,
          }}>
            <div className="absolute inset-y-0 left-[22%] w-px bg-white/10" style={{ animation: "shineLine 3s ease-in-out infinite alternate" }} />
            <div className="absolute inset-y-0 left-[63%] w-px bg-white/10" style={{ animation: "shineLine 3.6s ease-in-out infinite alternate-reverse" }} />
          </div>
          <style>{`
            @keyframes shineLine {
              0% { transform: translateX(-20%); opacity: 0.3; }
              100% { transform: translateX(120%); opacity: 1; }
            }
          `}</style>
        </div>
        {/* 3D car */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Car3D car={car} />
        </div>
        <div className="shine absolute inset-0" />
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
