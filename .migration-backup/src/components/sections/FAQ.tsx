"use client";

import { faqs } from "@/data/site";
import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-paper px-4 py-20 sm:px-6 lg:py-28" id="faq">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-copper">FAQ</p>
          <h2 className="display mt-3 text-5xl">Before you collect the keys.</h2>
        </div>
        <div className="lg:col-span-8">
          {faqs.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q} className="border-b border-line">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : i)}
                >
                  <span className="font-display text-xl tracking-tight sm:text-2xl">{item.q}</span>
                  <span className="text-copper">{expanded ? "–" : "+"}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 text-sm leading-relaxed text-stone">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
