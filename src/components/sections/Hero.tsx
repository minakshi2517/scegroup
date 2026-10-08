"use client";

import { BookingSearch } from "@/components/BookingSearch";
import { carImages } from "@/data/images";
import { getVehicle } from "@/data/vehicles";
import { formatINR } from "@/lib/booking";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const visual = useRef<HTMLDivElement>(null);
  const heroCar = getVehicle("thar-3-door");
  const src = carImages.hero || heroCar?.image || "/logo.png";

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !visual.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    visual.current.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) scale(1.06)`;
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-ivory" onMouseMove={onMove}>
      <div className="absolute inset-0">
        <div ref={visual} className="absolute inset-0 transition-transform duration-500 ease-out">
          <Image src={src} alt="" fill priority className="object-cover object-[70%_center] kenburns" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        <div className="road-swoosh absolute inset-x-0 bottom-0 h-2/3" />
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

        {heroCar && (
          <motion.div
            className="mt-10 hidden w-fit border border-white/15 bg-ink/50 px-4 py-3 backdrop-blur-sm lg:block"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-soft">In the fleet</p>
            <p className="mt-1 font-display text-xl">{heroCar.name}</p>
            <p className="text-sm text-ivory/70">{formatINR(heroCar.pricePerDay)} / day · {heroCar.seats} seats · {heroCar.fuel}</p>
          </motion.div>
        )}

        <motion.div
          className="relative z-10 mt-8"
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
