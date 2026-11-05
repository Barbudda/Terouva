// Sans dépendance : importé aussi par le sommaire, qui est un composant client.

/**
 * La typographie française, posée au rendu sans toucher au texte : espace fine
 * insécable avant « : ; ? ! » et à l'intérieur des guillemets, espace
 * insécable dans un nombre (« 1 940 € », « 10 % »). Sans elles, un titre se
 * coupe en « appartement / : 4 exemples », et une ligne s'ouvre sur un
 * deux-points. Une revue imprimée ne laisse jamais passer ça.
 */
export function typographier(texte: string): string {
  return texte
    .replace(/ ([:;?!»])/g, "\u202f$1")
    .replace(/« /g, "«\u202f")
    .replace(/(\d) (?=[\d€%])/g, "$1\u00a0");
}
