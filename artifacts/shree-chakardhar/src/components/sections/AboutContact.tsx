"use client";

import { IconClock, IconMail, IconPhone, IconPin } from "@/components/Icons";
import { brand } from "@/data/site";
import { FormEvent, useState } from "react";

export function AboutContact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const body = `Name: ${name}\nPhone: ${phone}\n\n${message}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent("Enquiry — Shree Chakardhar Enterprises")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <section id="about" className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold">About</p>
            <h2 className="display mt-3 text-5xl sm:text-6xl">Shree Chakardhar Enterprises</h2>
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <p className="text-lg leading-relaxed text-ivory/80">
              A Gurugram rental desk for people who want the car they asked for, at the rate they were told. The fleet runs from Swift and Punch through Venue, Seltos, Grand Vitara, Scorpio, XUV700, and Thar.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ivory/80">
              {brand.tagline}. The office sits at Signature Global, Sector 93, and the desk is open {brand.hours}.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-paper px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-copper">Contact</p>
            <h2 className="display mt-3 text-5xl">Talk to the desk.</h2>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 h-5 w-5 text-copper" />
                <span>{brand.address}</span>
              </li>
              <li className="flex gap-3">
                <IconClock className="mt-0.5 h-5 w-5 text-copper" />
                <span>Office timing {brand.hours}</span>
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 h-5 w-5 text-copper" />
                <a href={brand.phoneHref} className="nav-link">{brand.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <IconMail className="mt-0.5 h-5 w-5 text-copper" />
                <a href={`mailto:${brand.email}`} className="nav-link break-all">{brand.email}</a>
              </li>
            </ul>
          </div>
          <form onSubmit={onSubmit} className="border border-line bg-ivory p-5 sm:p-8">
            <label className="block">
              <span className="eyebrow text-stone">Name</span>
              <input name="name" required className="field" />
            </label>
            <label className="mt-4 block">
              <span className="eyebrow text-stone">Phone</span>
              <input name="phone" required inputMode="tel" className="field" />
            </label>
            <label className="mt-4 block">
              <span className="eyebrow text-stone">Message</span>
              <textarea name="message" required rows={4} className="field resize-none" />
            </label>
            <button type="submit" className="btn btn-copper mt-6">
              Email the desk
            </button>
            {sent && <p className="mt-3 text-sm text-stone">Your email app should open with this message. If it does not, write to {brand.email}.</p>}
          </form>
        </div>
      </section>
    </>
  );
}
