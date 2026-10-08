import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function base(props: P) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export const IconFleet = (p: P) => (
  <svg {...base(p)}><path d="M3 13h18l-1.2-4.2A2 2 0 0 0 17.9 7H6.1a2 2 0 0 0-1.9 1.8L3 13Z" /><path d="M5 13v3M19 13v3M7 18h.01M17 18h.01M3 13h18" /></svg>
);
export const IconTag = (p: P) => (
  <svg {...base(p)}><path d="M12 3H5v7l8.5 8.5a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8L12 3Z" /><path d="M8 8h.01" /></svg>
);
export const IconBook = (p: P) => (
  <svg {...base(p)}><rect x="4" y="5" width="16" height="15" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base(p)}><path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L17 13l4 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2Z" /></svg>
);
export const IconPin = (p: P) => (
  <svg {...base(p)}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.2" /></svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" /><path d="m4 7 8 6 8-6" /></svg>
);
export const IconClock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8" /><path d="M12 8v4.5L15 15" /></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconWhatsApp = (p: P) => (
  <svg {...base(p)}><path d="M6 18.5 5 21l2.7-.8A8 8 0 1 0 6 18.5Z" /><path d="M9 10.2c.2 1.8 1.8 3.3 3.6 3.6" /></svg>
);
