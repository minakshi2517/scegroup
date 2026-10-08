import type { Vehicle } from "@/data/vehicles";

export type SearchQuery = {
  pickup?: string;
  dropoff?: string;
  from?: string;
  to?: string;
};

export type BookingRequest = {
  vehicleSlug: string;
  vehicleName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  returnDate: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  days: number;
  pricePerDay: number;
  total: number;
};

export function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function rentalDays(from?: string, to?: string) {
  if (!from || !to) return 1;
  const start = new Date(`${from}T12:00:00`).getTime();
  const end = new Date(`${to}T12:00:00`).getTime();
  const diff = Math.round((end - start) / 86400000);
  return Math.max(1, diff);
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function searchHref(query: SearchQuery) {
  const params = new URLSearchParams();
  if (query.pickup) params.set("pickup", query.pickup);
  if (query.dropoff) params.set("dropoff", query.dropoff);
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);
  const s = params.toString();
  return s ? `/cars?${s}` : "/cars";
}

export function bookHref(slug: string, query: SearchQuery = {}) {
  const params = new URLSearchParams({ car: slug });
  if (query.pickup) params.set("pickup", query.pickup);
  if (query.dropoff) params.set("dropoff", query.dropoff);
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);
  return `/book?${params.toString()}`;
}

/** Shape a future POST /api/bookings handler can accept without a rewrite. */
export function buildBookingPayload(input: BookingRequest): BookingRequest {
  return { ...input };
}

export function bookingMessage(input: BookingRequest) {
  return [
    "Booking request — Shree Chakardhar Enterprises",
    `Vehicle: ${input.vehicleName}`,
    `Pickup: ${input.pickupLocation} on ${formatDate(input.pickupDate)}`,
    `Return: ${input.dropoffLocation} on ${formatDate(input.returnDate)}`,
    `Duration: ${input.days} day${input.days > 1 ? "s" : ""}`,
    `Rate: ${formatINR(input.pricePerDay)} / day`,
    `Estimated total: ${formatINR(input.total)}`,
    `Name: ${input.customerName}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : "",
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function quoteFor(vehicle: Vehicle, from?: string, to?: string) {
  const days = rentalDays(from, to);
  return { days, total: days * vehicle.pricePerDay };
}
