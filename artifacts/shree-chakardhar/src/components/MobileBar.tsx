import { brand } from "@/data/site";
import { Link } from "wouter";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 md:hidden">
      <a href={brand.phoneHref} className="bg-ink py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ivory">
        Call
      </a>
      <Link href="/book" className="bg-copper py-3.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white">
        Book Now
      </Link>
    </div>
  );
}
