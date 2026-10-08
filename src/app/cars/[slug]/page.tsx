import { CarCard } from "@/components/CarCard";
import { getVehicle, vehicles } from "@/data/vehicles";
import { bookHref, formatINR } from "@/lib/booking";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vehicles.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = getVehicle(slug);
  return { title: car ? `${car.name} ${car.year}` : "Car" };
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params;
  const car = getVehicle(slug);
  if (!car) notFound();
  const related = vehicles.filter((item) => item.category === car.category && item.slug !== car.slug).slice(0, 3);

  return (
    <main className="bg-ivory pt-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:py-12">
        <div className="relative min-h-[320px] bg-ink lg:col-span-7 lg:min-h-[560px]">
          <Image src={car.image} alt={`${car.name} ${car.year}`} fill priority className="object-cover" sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-copper">{car.category}</p>
          <h1 className="display mt-3 text-5xl">{car.name}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-stone">
            {car.year} · {car.body}{car.color ? ` · ${car.color}` : ""}
          </p>
          <p className="mt-5 text-stone">{car.blurb}</p>
          <p className="mt-6 font-display text-4xl">
            {formatINR(car.pricePerDay)}
            <span className="text-base text-stone"> / day</span>
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-px bg-line">
            {[
              ["Seats", String(car.seats)],
              ["Transmission", car.transmission],
              ["Fuel", car.fuel],
              ["Mileage", car.mileage],
            ].map(([k, v]) => (
              <div key={k} className="bg-paper px-4 py-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-stone">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 space-y-2 text-sm">
            {car.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={bookHref(car.slug)} className="btn btn-copper">
              Book Now
            </Link>
            <Link href="/cars" className="btn btn-line">
              Back to fleet
            </Link>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="font-display text-3xl">More in {car.category}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <CarCard key={item.slug} car={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
