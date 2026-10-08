"use client";

import { locations } from "@/data/site";
import { addDaysISO, searchHref, todayISO } from "@/lib/booking";
import { useLocation } from "wouter";
import { FormEvent, useMemo, useState } from "react";

type Initial = { pickup?: string; dropoff?: string; from?: string; to?: string };

export function BookingSearch({ initial, tone = "panel" }: { initial?: Initial; tone?: "panel" | "plain" }) {
  const [, navigate] = useLocation();
  const defaults = useMemo(() => {
    const from = initial?.from || todayISO();
    return {
      pickup: initial?.pickup || locations[0],
      dropoff: initial?.dropoff || locations[1],
      from,
      to: initial?.to || addDaysISO(from, 1),
    };
  }, [initial?.pickup, initial?.dropoff, initial?.from, initial?.to]);

  const [from, setFrom] = useState(defaults.from);
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pickup = String(data.get("pickup") || "");
    const dropoff = String(data.get("dropoff") || "");
    const start = String(data.get("from") || "");
    const end = String(data.get("to") || "");
    if (!pickup || !dropoff || !start || !end) {
      setError("Add a pickup, drop-off, and both dates.");
      return;
    }
    if (end < start) {
      setError("Return date must be on or after pickup.");
      return;
    }
    setError("");
    navigate(searchHref({ pickup, dropoff, from: start, to: end }));
  }

  return (
    <form
      onSubmit={onSubmit}
      className={tone === "panel" ? "bg-paper px-4 py-5 shadow-[0_20px_60px_rgba(12,16,22,0.18)] sm:px-6" : "bg-transparent"}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_auto] lg:items-end lg:gap-5">
        <label className="block">
          <span className="eyebrow text-stone">Pick-up location</span>
          <select name="pickup" defaultValue={defaults.pickup} className="field">
            {locations.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-stone">Drop-off location</span>
          <select name="dropoff" defaultValue={defaults.dropoff} className="field">
            {locations.map((place) => (
              <option key={place}>{place}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="eyebrow text-stone">Pick-up date</span>
          <input
            type="date"
            name="from"
            required
            min={todayISO()}
            defaultValue={defaults.from}
            onChange={(e) => setFrom(e.target.value)}
            className="field"
          />
        </label>
        <label className="block">
          <span className="eyebrow text-stone">Return date</span>
          <input type="date" name="to" required min={from || todayISO()} defaultValue={defaults.to} className="field" />
        </label>
        <button type="submit" className="btn btn-copper w-full lg:w-auto">
          Search Cars
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-copper-deep">{error}</p>}
    </form>
  );
}
