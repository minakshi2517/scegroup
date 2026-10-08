import { BookForm } from "@/components/BookForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book" };

type Raw = Record<string, string | string[] | undefined>;

function one(sp: Raw, key: string) {
  const value = sp[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookPage({ searchParams }: { searchParams: Promise<Raw> }) {
  const sp = await searchParams;
  return (
    <main className="bg-ivory px-4 pb-20 pt-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-copper">Booking</p>
          <h1 className="display mt-3 text-5xl sm:text-6xl">Book your ride.</h1>
          <p className="mt-5 text-sm leading-relaxed text-stone">
            Choose the car and dates. The estimated total uses the published daily rate. Confirm on WhatsApp or by phone — the desk holds the car.
          </p>
        </div>
        <div className="lg:col-span-8">
          <BookForm
            initial={{
              car: one(sp, "car"),
              pickup: one(sp, "pickup"),
              dropoff: one(sp, "dropoff"),
              from: one(sp, "from"),
              to: one(sp, "to"),
            }}
          />
        </div>
      </div>
    </main>
  );
}
