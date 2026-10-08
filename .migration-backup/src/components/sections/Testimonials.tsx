import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/site";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-gold" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "" : "text-ink/15"}>
          ★
        </span>
      ))}
    </p>
  );
}

export function Testimonials() {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-copper">Drivers</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl">What the trips felt like.</h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05} className="bg-paper p-6 sm:p-8">
              <Stars rating={item.rating} />
              <p className="mt-4 font-display text-2xl leading-snug tracking-tight">“{item.review}”</p>
              <p className="mt-6 text-sm">
                <span className="font-semibold">{item.name}</span>
                <span className="text-stone"> · {item.location}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
