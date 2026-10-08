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

  useEffect(() => {
    if (!list.some((car) => car.slug === activeSlug)) {
      setActiveSlug(list[0]?.slug ?? '');
    }
  }, [list, activeSlug]);

  return (
    <section
      id="fleet"
      className="bg-ivory px-4 py-20 sm:px-6 lg:py-28"
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

              {/* Car selector */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                {list.map((car) => {
                  const active = car.slug === activeSlug;

                  return (
                    <button
                      key={car.slug}
                      type="button"
                      onClick={() => setActiveSlug(car.slug)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:scale-105 ${
                        active
                          ? 'opacity-100'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {car.name} - {formatINR(car.pricePerDay)}/day
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Car cards */}
            <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
              {list.map((car) => (
                <div
                  key={car.slug}
                  className="flex min-w-[80px] snap-start"
                >
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