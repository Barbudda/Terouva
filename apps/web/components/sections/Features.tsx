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

/**
 * Liste éditoriale, pas grille de cartes : des filets fins, l'icône dans la
 * ligne du titre. Une grille de six cartes blanches à tuile d'icône est le
 * réflexe par défaut de toutes les pages de produit ; celle-ci se lit comme un
 * sommaire.
 */
export function Features() {
  return (
    <section id="fonctions" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Ce que fait Terouva"
          lead="Peu de choses,"
          tail="celles qui font gagner du temps."
          className="monte max-w-2xl"
        >
          Pas une usine à gaz : la poignée de gestes qui comptent vraiment quand on cherche un
          logement.
        </SectionHeading>

        <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <li
                key={f.title}
                className="monte border-t border-rule py-7 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
              >
                <h3 className="flex items-start gap-3 text-lg leading-snug font-bold text-ink">
                  <Icon
                    size={19}
                    strokeWidth={1.75}
                    aria-hidden
                    className="mt-[3px] shrink-0 text-accent"
                  />
                  {f.title}
                </h3>
                <p className="mt-2 pl-[31px] leading-relaxed text-ink-2">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
