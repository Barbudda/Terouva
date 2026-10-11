import { Bell, Gauge, Inbox, Lock, PenLine, Send } from "lucide-react";
import { FEATURES } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = {
  inbox: Inbox,
  bell: Bell,
  gauge: Gauge,
  pen: PenLine,
  send: Send,
  lock: Lock,
};

export function Features() {
  return (
    <section id="fonctions" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Ce que fait Terouva"
          lead="Peu de choses,"
          tail="celles qui font gagner du temps."
          align="center"
        >
          Pas une usine à gaz : la poignée de gestes qui comptent vraiment quand on cherche un
          logement.
        </SectionHeading>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <article key={f.title} className="card-soft p-6">
                <span className="grid size-11 place-items-center rounded-lg bg-accent-wash text-accent-ink">
                  <Icon size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{f.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-2">{f.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
