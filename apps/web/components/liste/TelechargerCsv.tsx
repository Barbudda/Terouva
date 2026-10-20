"use client";

import { Download } from "lucide-react";

/**
 * Télécharge la liste au format CSV.
 *
 * Le fichier est construit dans le navigateur à partir d'un texte déjà rendu
 * par la page : pas de route de téléchargement à ajouter, donc pas de seconde
 * porte d'entrée serveur à protéger.
 *
 * Le BOM en tête n'est pas un détail : sans lui, Excel lit le fichier en
 * ANSI et transforme les accents en charabia dès la première adresse.
 */
export function TelechargerCsv({ csv, nombre }: { csv: string; nombre: number }) {
  if (nombre === 0) return null;

  const telecharger = () => {
    const fichier = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(fichier);
    const a = document.createElement("a");
    a.href = url;
    a.download = `terouva-liste-attente-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.append(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={telecharger}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-rule bg-card px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-muted"
    >
      <Download aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
      Télécharger le CSV
    </button>
  );
}
