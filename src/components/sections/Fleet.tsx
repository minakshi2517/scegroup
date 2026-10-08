"use client";

import { CarCard } from "@/components/CarCard";
import { Reveal } from "@/components/Reveal";
import { carsIn, categories, type Category } from "@/data/vehicles";
import type { SearchQuery } from "@/lib/booking";
import { useEffect, useMemo, useState } from "react";

export function Fleet({
  query = {},
  initialCategory = "All",
  heading = "Explore Our Fleet",
  intro = "Daily rates from the Gurugram desk. Every car below can be requested for your dates.",
}: {
  query?: SearchQuery;
  initialCategory?: Category;
  heading?: string;
  intro?: string;
}) {
  const [category, setCategory] = useState<Category>(initialCategory);
  useEffect(() => setCategory(initialCategory), [initialCategory]);
  const list = useMemo(() => carsIn(category), [category]);

  return (
    <section id="fleet" className="bg-ivory px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-copper">The garage</p>
              <h2 className="display mt-3 text-5xl sm:text-6xl">{heading}</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-stone">{intro}</p>
          </div>
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Vehicle categories">
          {categories.map((item) => {
            const count = carsIn(item).length;
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(item)}
                className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  active ? "border-ink bg-ink text-ivory" : "border-line bg-paper text-ink hover:border-ink"
                }`}
              >
                {item}
                <span className="ml-2 text-[0.65rem] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {list.length === 0 ? (
          <div className="mt-8 border border-line bg-paper px-6 py-14">
            <p className="font-display text-3xl">Sedans are arranged on request.</p>
            <p className="mt-3 max-w-lg text-stone">
              Today’s published fleet is hatchbacks and SUVs. Tell the desk your dates and we will line up a sedan.
            </p>
            <a href="tel:+918396977520" className="btn btn-copper mt-6">
              Call the desk
            </a>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((car) => (
              <CarCard key={car.slug} car={car} query={query} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
