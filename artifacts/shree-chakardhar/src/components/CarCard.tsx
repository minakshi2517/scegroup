import type { Vehicle } from "@/data/vehicles";
import { bookHref, formatINR, type SearchQuery } from "@/lib/booking";
import { Link } from "wouter";

export function CarCard({ car, query = {} }: { car: Vehicle; query?: SearchQuery }) {
  const specs = [car.transmission, `${car.seats} seats`, car.fuel, car.color].filter(Boolean).join("  ·  ");
  return (
    <article className="group flex h-full flex-col border border-line bg-paper transition duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_18px_40px_rgba(12,16,22,0.08)]">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink">
        <img
          src={car.image}
          alt={`${car.name} ${car.year}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 bg-ink/85 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ivory">
          {car.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl tracking-tight">{car.name}</h3>
          <p className="text-xs uppercase tracking-[0.14em] text-stone">{car.year}</p>
        </div>
        <p className="mt-2 text-sm text-stone">{car.body}{car.color ? ` · ${car.color}` : ""}</p>
        <p className="mt-3 text-sm text-ink/80">{specs}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4">
          <p>
            <span className="font-display text-2xl tracking-tight">{formatINR(car.pricePerDay)}</span>
            <span className="text-sm text-stone"> / day</span>
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">Available</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/cars/${car.slug}`} className="btn btn-line px-2 text-center">
            View Details
          </Link>
          <Link href={bookHref(car.slug, query)} className="btn btn-ink px-2 text-center">
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
