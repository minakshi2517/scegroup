"use client";

import { steps } from "@/data/site";
import { motion, useReducedMotion } from "framer-motion";

export function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section className="overflow-hidden bg-ivory px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-copper">How it works</p>
        <h2 className="display mt-3 text-5xl sm:text-6xl">Three steps. Then the keys.</h2>
        <div className="relative mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8">
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-copper lg:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.map((step, i) => (
            <motion.article
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
            >
              <p className="relative z-10 inline-block bg-ivory pr-4 font-display text-6xl text-copper">{step.n}</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
