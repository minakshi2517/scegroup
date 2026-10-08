import { BookingSearch } from "@/components/BookingSearch";
import { Fleet } from "@/components/sections/Fleet";
import { categories, type Category } from "@/data/vehicles";
import { formatDate, rentalDays } from "@/lib/booking";

type Raw = Record<string, string | string[] | undefined>;

function one(sp: Raw, key: string) {
  const value = sp[key];
  return Array.isArray(value) ? value[0] : value;
}

export default function CarsPage() {
  const params = new URLSearchParams(window.location.search);
  const sp: Raw = Object.fromEntries(params.entries());
  const query = {
    pickup: one(sp, "pickup"),
    dropoff: one(sp, "dropoff"),
    from: one(sp, "from"),
    to: one(sp, "to"),
  };
  const requested = one(sp, "category");
  const initialCategory: Category = categories.includes(requested as Category) ? (requested as Category) : "All";
  const days = query.from && query.to ? rentalDays(query.from, query.to) : null;

  return (
    <main className="bg-ivory pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="eyebrow text-copper">Fleet</p>
        <h1 className="display mt-3 text-5xl sm:text-7xl">Cars ready to book.</h1>
        {days && (
          <p className="mt-4 text-sm text-stone">
            {query.pickup} → {query.dropoff} · {formatDate(query.from)} to {formatDate(query.to)} · {days} day{days > 1 ? "s" : ""}
          </p>
        )}
        <div className="mt-8 border border-line bg-paper px-4 py-5 sm:px-6">
          <BookingSearch initial={query} tone="plain" />
        </div>
      </div>
      <Fleet
        query={query}
        initialCategory={initialCategory}
        heading={days ? "Available vehicles" : "Full fleet"}
        intro="Demo availability: every listed car can be requested. The desk confirms the exact car for your dates."
      />
    </main>
  );
}
