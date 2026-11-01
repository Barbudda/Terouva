import { PRIVACY } from "@/lib/content";

/** Une icône par contenu, dessinées ici au trait : loupe, maison, dossier, enveloppe. */
const ICONES = [
  <g key="loupe">
    <circle cx="7" cy="7" r="4.25" />
    <path d="m10.25 10.25 3.25 3.25" />
  </g>,
  <path key="maison" d="M2.5 7.25 8 2.75l5.5 4.5v5.75a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5Z" />,
  <path key="dossier" d="M2 4.5a1 1 0 0 1 1-1h3.1l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" />,
  <g key="enveloppe">
    <rect x="2" y="3.5" width="12" height="9" rx="1" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </g>,
];

/**
 * Le cadre de « Vos données » : une fenêtre « Votre ordinateur » qui garde
 * les quatre choses que Terouva connaît de vous, une liaison coupée, et le
 * serveur Terouva, barré, qui n'existe pas. C'est l'énoncé de la section mis
 * en image, sans rien y ajouter.
 *
 * À l'apparition, la fenêtre se pose, les quatre contenus y entrent un à un,
 * la liaison se trace, la croix la coupe, puis le serveur absent apparaît.
 */
export function CetOrdinateur() {
  const s = PRIVACY.schema;
  return (
    <figure className="encadre @container p-5 sm:p-8">
      <figcaption className="champ text-ink-3">{s.titre}</figcaption>

      <div className="mt-6 flex flex-col items-stretch @min-[35rem]:flex-row @min-[35rem]:items-center">
        <div
          className="encadre-pas min-w-0 flex-1 overflow-hidden rounded-[0.625rem] border border-white/10 bg-paper/70"
          style={{ "--rang": 0 } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2 rounded-full bg-ink-3/40" />
              <span className="size-2 rounded-full bg-ink-3/40" />
              <span className="size-2 rounded-full bg-ink-3/40" />
            </span>
            <p className="champ text-ink-2">{s.machine}</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 p-3">
            {s.contenus.map((contenu, i) => (
              <li
                key={contenu}
                className="encadre-pas flex min-w-0 items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-2.5 text-[13px] leading-tight text-ink sm:gap-2.5 sm:px-3"
                style={{ "--rang": i + 1 } as React.CSSProperties}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="size-4 shrink-0 text-blue-clair"
                >
                  {ICONES[i]}
                </svg>
                <span className="min-w-0">{contenu}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* La liaison coupée : verticale, puis horizontale quand le cadre a la
            place d'aligner les trois pièces (requête de conteneur : le cadre
            change de largeur selon la section, pas selon l'écran). */}
        <div aria-hidden className="relative mx-auto h-14 w-px @min-[35rem]:mx-0 @min-[35rem]:h-px @min-[35rem]:w-20 @min-[35rem]:flex-none">
          <span
            className="encadre-trait liaison absolute inset-0"
            style={{ "--rang": 5 } as React.CSSProperties}
          />
          <span
            className="encadre-pas absolute top-1/2 left-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-action/60 bg-paper-2 text-action"
            style={{ "--rang": 6 } as React.CSSProperties}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-2.5">
              <path d="m3 3 6 6M9 3 3 9" />
            </svg>
          </span>
        </div>

        <div
          className="encadre-pas rounded-[0.625rem] border border-dashed border-white/20 px-4 py-4 text-center @min-[35rem]:w-44 @min-[35rem]:flex-none"
          style={{ "--rang": 7 } as React.CSSProperties}
        >
          <p className="champ text-ink-3 line-through decoration-action/70">{s.serveur}</p>
          <p className="mt-1.5 text-[14px] text-ink-2">{s.absent}</p>
        </div>
      </div>
    </figure>
  );
}
