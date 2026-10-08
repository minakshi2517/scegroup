"use client";

import { stats } from "@/data/site";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Count({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <div className="road-swoosh pointer-events-none absolute inset-0 opacity-80" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:py-24">
        {stats.map((item) => (
          <div key={item.label} className="border-t border-white/15 pt-5">
            <p className="font-display text-6xl tracking-tight text-gold-soft sm:text-7xl">
              <Count value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-ivory/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
