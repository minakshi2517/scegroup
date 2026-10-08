"use client";

import { brand, nav } from "@/data/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [pathname] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open ? "border-line bg-paper/95 shadow-[0_10px_30px_rgba(12,16,22,0.06)] backdrop-blur-md" : "border-transparent bg-paper"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 ${scrolled ? "h-16" : "h-[4.5rem]"} transition-[height] duration-300`}>
        <Link href="/" aria-label={brand.name} className="shrink-0">
          <Logo className={scrolled ? "h-9" : "h-11"} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href}
              className="nav-link text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/book" className="btn btn-copper">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-6">
            <span className={`absolute left-0 h-px w-6 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-6 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-6 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-line bg-paper lg:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-line py-4 text-lg font-medium tracking-tight">
                  {item.label}
                </Link>
              ))}
              <Link href="/book" className="btn btn-copper mt-5">
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
