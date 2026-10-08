import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="bg-ivory px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-copper">Services</p>
          <h2 className="display mt-3 max-w-2xl text-5xl sm:text-6xl">Rentals shaped around the trip.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="border border-line bg-paper p-6 sm:p-8">
              <p className="font-display text-sm text-copper">0{i + 1}</p>
              <h3 className="mt-4 font-display text-3xl tracking-tight">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
