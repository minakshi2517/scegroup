import { CarCard } from '@/components/CarCard';
import { Reveal } from '@/components/Reveal';
import { carsIn, categories, type Category } from '@/data/vehicles';
import type { SearchQuery } from '@/lib/booking';
import { useEffect, useMemo, useState } from 'react';
import { Fleet3D } from '@/components/sections/Fleet3D';
import { formatINR } from '@/lib/booking';

export function Fleet({
  query = {},
  initialCategory = 'All',
  heading = 'Explore Our Fleet',
  intro = 'Daily rates from the Gurugram desk. Every car below can be requested for your dates.',
}: {
  query?: SearchQuery;
  initialCategory?: Category;
  heading?: string;
  intro?: string;
}) {
  const [category, setCategory] = useState<Category>(initialCategory);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const list = useMemo(() => carsIn(category), [category]);

  const [activeSlug, setActiveSlug] = useState<string>(
    list[0]?.slug ?? ''
  );
  const activeCar = list.find((car) => car.slug === activeSlug) ?? list[0];

  useEffect(() => {
    if (!list.some((car) => car.slug === activeSlug)) {
      setActiveSlug(list[0]?.slug ?? '');
    }
  }, [list, activeSlug]);

  return (
    <section
      id="fleet"
        className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-copper">
                The garage
              </p>

              <h2 className="display mt-3 text-5xl sm:text-6xl">
                {heading}
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-stone">
              {intro}
            </p>
          </div>
        </Reveal>

        {/* Categories */}
        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Vehicle categories"
        >
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
                  active
                    ? 'border-stone bg-stone text-white'
                    : 'border-stone hover:bg-stone/5'
                }`}
              >
                {item}

                <span className="ml-2 text-[0.65rem] opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {list.length === 0 ? (
          <div className="mt-8 border border-line bg-paper px-6 py-14">
            <p className="font-display text-3xl">
              Sedans are arranged on request.
            </p>

            <p className="mt-3 max-w-lg text-stone">
              Today's published fleet is hatchbacks and SUVs.
              Tell the desk your dates and we will line up a sedan.
            </p>

            <a
              href="tel:+918396977520"
              className="btn btn-copper mt-6"
            >
              Call the desk
            </a>
          </div>
        ) : (
          <>
            {/* 3D carousel stage */}
            <div className="relative mt-8 h-[520px] min-h-[420px] overflow-hidden">
              <Fleet3D
                cars={list}
                activeSlug={activeSlug}
              />

              {activeCar && (
                <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] items-start justify-between gap-4 sm:left-6 sm:top-6">
                  <div className="border border-white/15 bg-ink/80 px-4 py-3 text-ivory shadow-xl backdrop-blur-md sm:px-5 sm:py-4">
                    <p className="eyebrow text-gold-soft">Selected vehicle</p>
                    <p className="mt-2 font-display text-xl sm:text-2xl">{activeCar.name}</p>
                    <p className="mt-1 text-sm text-ivory/70">
                      {formatINR(activeCar.pricePerDay)} / day
                    </p>
                  </div>
                </div>
              )}

              {/* Car selector */}
              <div
                className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto border border-white/10 bg-ink/85 p-2 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6"
                role="tablist"
                aria-label="Choose a vehicle to preview"
              >
                {list.map((car) => {
                  const active = car.slug === activeSlug;

                  return (
                    <button
                      key={car.slug}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveSlug(car.slug)}
                      className={`shrink-0 px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors sm:px-4 ${
                        active
                          ? 'bg-copper text-white'
                          : 'text-ivory/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {car.name} - {formatINR(car.pricePerDay)}/day
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Car cards */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((car) => (
                <div key={car.slug} className="min-w-0">
                  <CarCard
                    car={car}
                    query={query}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}