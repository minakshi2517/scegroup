"use client";

import { brand, locations } from "@/data/site";
import { getVehicle, vehicles } from "@/data/vehicles";
import {
  addDaysISO,
  bookingMessage,
  buildBookingPayload,
  formatINR,
  quoteFor,
  todayISO,
  type BookingRequest,
} from "@/lib/booking";
import { FormEvent, useMemo, useState } from "react";

type Initial = { car?: string; pickup?: string; dropoff?: string; from?: string; to?: string };

export function BookForm({ initial }: { initial: Initial }) {
  const fromDefault = initial.from || todayISO();
  const [slug, setSlug] = useState(initial.car && getVehicle(initial.car) ? initial.car : vehicles[0].slug);
  const [from, setFrom] = useState(fromDefault);
  const [to, setTo] = useState(initial.to || addDaysISO(fromDefault, 1));
  const [error, setError] = useState("");
  const [done, setDone] = useState<BookingRequest | null>(null);

  const car = getVehicle(slug) ?? vehicles[0];
  const quote = useMemo(() => quoteFor(car, from, to), [car, from, to]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pickupDate = String(data.get("from") || "");
    const returnDate = String(data.get("to") || "");
    if (returnDate < pickupDate) {
      setError("Return date must be on or after pickup.");
      return;
    }
    const payload = buildBookingPayload({
      vehicleSlug: car.slug,
      vehicleName: `${car.name} ${car.year}${car.color ? ` (${car.color})` : ""}`,
      pickupLocation: String(data.get("pickup") || ""),
      dropoffLocation: String(data.get("dropoff") || ""),
      pickupDate,
      returnDate,
      customerName: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      notes: String(data.get("notes") || ""),
      days: quoteFor(car, pickupDate, returnDate).days,
      pricePerDay: car.pricePerDay,
      total: quoteFor(car, pickupDate, returnDate).total,
    });
    setError("");
    setDone(payload);
  }

  if (done) {
    const text = bookingMessage(done);
    const ref = `SCE-${done.phone.slice(-4)}${done.pickupDate.replaceAll("-", "").slice(-4)}`;
    return (
      <div className="border border-line bg-paper p-6 sm:p-8">
        <p className="eyebrow text-copper">Request ready</p>
        <h2 className="display mt-3 text-4xl">Send this to the desk.</h2>
        <p className="mt-3 text-sm text-stone">Reference {ref}. Nothing is charged on this page — the desk confirms the car.</p>
        <pre className="mt-6 whitespace-pre-wrap bg-ivory p-4 text-sm leading-relaxed">{text}</pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-copper" href={`${brand.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">
            Confirm on WhatsApp
          </a>
          <a className="btn btn-line" href={brand.phoneHref}>Call {brand.phoneDisplay}</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper p-5 sm:p-8">
      <label className="block">
        <span className="eyebrow text-stone">Vehicle</span>
        <select name="car" value={slug} onChange={(e) => setSlug(e.target.value)} className="field">
          {vehicles.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name} {item.year} {item.color ? `· ${item.color}` : ""} — {formatINR(item.pricePerDay)}/day
            </option>
          ))}
        </select>
      </label>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="eyebrow text-stone">Pick-up</span>
          <select name="pickup" defaultValue={initial.pickup || locations[0]} className="field">
            {locations.map((place) => <option key={place}>{place}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow text-stone">Drop-off</span>
          <select name="dropoff" defaultValue={initial.dropoff || locations[0]} className="field">
            {locations.map((place) => <option key={place}>{place}</option>)}
          </select>
        </label>
        <label>
          <span className="eyebrow text-stone">Pick-up date</span>
          <input type="date" name="from" required min={todayISO()} value={from} onChange={(e) => setFrom(e.target.value)} className="field" />
        </label>
        <label>
          <span className="eyebrow text-stone">Return date</span>
          <input type="date" name="to" required min={from} value={to} onChange={(e) => setTo(e.target.value)} className="field" />
        </label>
        <label>
          <span className="eyebrow text-stone">Your name</span>
          <input name="name" required className="field" />
        </label>
        <label>
          <span className="eyebrow text-stone">Phone</span>
          <input name="phone" required inputMode="tel" className="field" />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="eyebrow text-stone">Email</span>
        <input name="email" type="email" className="field" />
      </label>
      <label className="mt-4 block">
        <span className="eyebrow text-stone">Notes</span>
        <textarea name="notes" rows={3} className="field resize-none" placeholder="Flight number, colour preference, extra kilometres" />
      </label>
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
        <p className="text-sm text-stone">
          {quote.days} day{quote.days > 1 ? "s" : ""} · {formatINR(car.pricePerDay)} / day
        </p>
        <p className="font-display text-3xl">{formatINR(quote.total)}</p>
      </div>
      {error && <p className="mt-3 text-sm text-copper-deep">{error}</p>}
      <button type="submit" className="btn btn-copper mt-6 w-full sm:w-auto">
        Request Booking
      </button>
    </form>
  );
}
