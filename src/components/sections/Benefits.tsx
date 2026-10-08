import { IconBook, IconFleet, IconPhone, IconTag } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { benefits } from "@/data/site";

const icons = [IconFleet, IconTag, IconBook, IconPhone];

export function Benefits() {
  return (
    <section className="border-y border-line bg-paper px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow text-copper">Why choose us</p>
          <h2 className="display mt-3 max-w-xl text-5xl sm:text-6xl">A desk that keeps the drive simple.</h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 0.06} className="bg-paper p-6 sm:p-8">
                <Icon className="h-6 w-6 text-copper" />
                <h3 className="mt-6 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
