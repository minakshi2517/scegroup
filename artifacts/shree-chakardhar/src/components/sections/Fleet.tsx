import { CarCard } from '@/components/CarCard';
import { Reveal } from '@/components/Reveal';
import { carsIn, categories, type Category } from '@/data/vehicles';
import type { SearchQuery } from '@/lib/booking';
import { useEffect, useMemo, useState } from 'react';
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
  const activeIndex = Math.max(0, list.findIndex((car) => car.slug === activeCar?.slug));

  const moveCarousel = (direction: -1 | 1) => {
    if (!list.length) return;
    const nextIndex = (activeIndex + direction + list.length) % list.length;
    setActiveSlug(list[nextIndex].slug);
  };

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
            {/* Featured car photo carousel */}
            <div className="relative mt-8 h-[520px] min-h-[420px] overflow-hidden bg-ink">
              {activeCar && (
                <img
                  key={activeCar.slug}
                  src={activeCar.image}
                  alt={`${activeCar.name} ${activeCar.year}`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/15 to-ink/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-ink/20" />

              {activeCar && (
                <>
                  <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
                    <span className="border border-white/20 bg-ink/55 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ivory backdrop-blur-md">
                      {activeCar.category} · {activeCar.year}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 z-10 flex gap-2 sm:right-6 sm:top-6">
                    <button
                      type="button"
                      aria-label="Previous car"
                      onClick={() => moveCarousel(-1)}
                      className="grid h-11 w-11 place-items-center border border-white/30 bg-ink/55 text-white backdrop-blur-md transition hover:bg-copper"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Next car"
                      onClick={() => moveCarousel(1)}
                      className="grid h-11 w-11 place-items-center border border-white/30 bg-ink/55 text-white backdrop-blur-md transition hover:bg-copper"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-5 p-5 text-ivory sm:flex-row sm:items-end sm:justify-between sm:p-8">
                    <div aria-live="polite">
                      <p className="eyebrow text-gold-soft">Featured in the fleet</p>
                      <h3 className="mt-2 font-display text-3xl sm:text-4xl">{activeCar.name}</h3>
                      <p className="mt-2 text-sm text-ivory/75">
                        {activeCar.seats} seats · {activeCar.fuel} · {activeCar.transmission}
                      </p>
                    </div>
                    <div className="flex items-center gap-5 sm:min-w-56 sm:flex-col sm:items-end sm:gap-2">
                      <p className="font-display text-2xl">
                        {formatINR(activeCar.pricePerDay)}
                        <span className="ml-1 font-sans text-sm text-ivory/70">/ day</span>
                      </p>
                      <div className="flex items-center gap-3" aria-label={`Car ${activeIndex + 1} of ${list.length}`}>
                        <span className="text-xs tabular-nums text-ivory/70">
                          {String(activeIndex + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                        </span>
                        <span className="h-1 w-20 overflow-hidden bg-white/25">
                          <span
                            className="block h-full bg-copper transition-[width] duration-300"
                            style={{ width: `${((activeIndex + 1) / list.length) * 100}%` }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
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