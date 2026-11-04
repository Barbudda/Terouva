"""Étude « Où le préavis tombe à un mois » : zonage TLV × populations légales.

Lancer depuis n'importe où, Python 3.10+ et bibliothèque standard seulement :

    python -I etude.py

Lit les deux fichiers de `source/` (copies compressées des fichiers publiés,
contrôlées par empreinte SHA-256), écrit `resultats/` et affiche les chiffres.
Aucun chiffre de CHIFFRES.md ne doit venir d'ailleurs que de cette sortie.
"""

from __future__ import annotations

import csv
import gzip
import hashlib
import io
import json
from collections import defaultdict
from pathlib import Path

ICI = Path(__file__).resolve().parent
SOURCE = ICI / "source"
RESULTATS = ICI / "resultats"

# Empreintes des fichiers tels que publiés (avant compression). Si l'éditeur
# remplace un fichier sans changer son nom, l'étude refuse de tourner au lieu
# de sortir des chiffres qui ne correspondent plus à la méthode publiée.
ZONAGE = (
    SOURCE / "zonage-tlv-decret-22-dec-2025.csv.gz",
    "503424cd140c1f6e3befcdfdcb0addffa3d471aa2abb5fc7fa6b9f6f27fe69b6",
)
POPULATIONS = (
    SOURCE / "insee-populations-2023-communes.csv.gz",
    "ccfe782e04ebde04a1706214157b288a0d055eb3ab913ff9f7bab5a3571f67ab",
)

COLONNE_ZONAGE = "Zonage TLV post décret 22/12/2025"
COLONNE_ZONAGE_2023 = "Zonage TLV 2023"
TENDUE = "1. Zone tendue"  # 1er tableau de l'annexe : préavis d'un mois en location vide
TOURISTIQUE = "2. Zone touristique et tendue"  # 2e tableau : pas de préavis réduit
SEUIL_GRANDE_VILLE = 100_000


def lire_csv(chemin: Path, empreinte: str) -> list[dict[str, str]]:
    brut = gzip.decompress(chemin.read_bytes())
    calcule = hashlib.sha256(brut).hexdigest()
    if calcule != empreinte:
        raise SystemExit(f"{chemin.name} : empreinte {calcule}, attendue {empreinte}")
    texte = brut.decode("utf-8-sig")
    return list(csv.DictReader(io.StringIO(texte, newline=""), delimiter=";"))


def commune_parente(code: str) -> str:
    """L'Insee publie Paris, Lyon et Marseille par arrondissement ; le zonage, par commune."""
    if code.startswith("751"):
        return "75056"
    if code.startswith("6938"):
        return "69123"
    if code.startswith("132"):
        return "13055"
    return code


def main() -> None:
    zonage = lire_csv(*ZONAGE)
    insee = lire_csv(*POPULATIONS)

    population: dict[str, int] = defaultdict(int)
    for ligne in insee:
        population[commune_parente(ligne["COM"])] += int(ligne["PMUN"])
    population_totale = sum(population.values())

    codes_zonage = {z["CODGEO25"] for z in zonage}
    sans_population = sorted(c for c in codes_zonage if c not in population)
    sans_zonage = sorted(c for c in population if c not in codes_zonage)

    par_categorie: dict[str, dict[str, int]] = {}
    for z in zonage:
        cat = z[COLONNE_ZONAGE]
        entree = par_categorie.setdefault(cat, {"communes": 0, "population": 0})
        entree["communes"] += 1
        entree["population"] += population.get(z["CODGEO25"], 0)

    # Changements du décret du 22 décembre 2025 par rapport au zonage de 2023.
    changements = [
        {
            "code": z["CODGEO25"],
            "commune": z["LIBGEO"],
            "avant": z[COLONNE_ZONAGE_2023],
            "apres": z[COLONNE_ZONAGE],
        }
        for z in zonage
        if z[COLONNE_ZONAGE_2023] != z[COLONNE_ZONAGE]
    ]

    # Communes de 100 000 habitants ou plus.
    grandes = sorted(
        (
            {
                "code": z["CODGEO25"],
                "commune": z["LIBGEO"],
                "departement": z["DEP"],
                "population_2023": population[z["CODGEO25"]],
                "preavis_location_vide": "1 mois" if z[COLONNE_ZONAGE] == TENDUE else "3 mois",
                "zonage": z[COLONNE_ZONAGE],
            }
            for z in zonage
            if population.get(z["CODGEO25"], 0) >= SEUIL_GRANDE_VILLE
        ),
        key=lambda g: -g["population_2023"],
    )

    # Part de la population en zone tendue, par département.
    deps: dict[str, dict[str, int]] = defaultdict(lambda: {"population": 0, "tendue": 0, "communes_tendues": 0})
    for z in zonage:
        pop = population.get(z["CODGEO25"], 0)
        d = deps[z["DEP"]]
        d["population"] += pop
        if z[COLONNE_ZONAGE] == TENDUE:
            d["tendue"] += pop
            d["communes_tendues"] += 1
    departements = sorted(
        (
            {
                "departement": dep,
                "population_2023": v["population"],
                "population_zone_tendue": v["tendue"],
                "part_zone_tendue_pct": round(100 * v["tendue"] / v["population"], 1) if v["population"] else None,
                "communes_zone_tendue": v["communes_tendues"],
            }
            for dep, v in deps.items()
        ),
        key=lambda d: (-(d["part_zone_tendue_pct"] or 0), d["departement"]),
    )

    tendue = par_categorie[TENDUE]
    touristique = par_categorie[TOURISTIQUE]
    grandes_tendues = [g for g in grandes if g["preavis_location_vide"] == "1 mois"]
    chiffres = {
        "communes_total": len(zonage),
        "communes_zone_tendue": tendue["communes"],
        "part_communes_zone_tendue_pct": round(100 * tendue["communes"] / len(zonage), 1),
        "population_totale_hors_mayotte": population_totale,
        "population_zone_tendue": tendue["population"],
        "part_population_zone_tendue_pct": round(100 * tendue["population"] / population_totale, 1),
        "communes_touristiques_tendues": touristique["communes"],
        "population_touristiques_tendues": touristique["population"],
        "grandes_villes": len(grandes),
        "grandes_villes_preavis_1_mois": len(grandes_tendues),
        "grandes_villes_preavis_3_mois": len(grandes) - len(grandes_tendues),
        # Mayotte n'a pas de population dans le fichier Insee : hors champ des deux décomptes.
        "departements_sans_commune_tendue": sum(
            1 for d in departements if d["population_2023"] and d["communes_zone_tendue"] == 0
        ),
        "departements_total": sum(1 for d in departements if d["population_2023"]),
        "changements_decret_2025": changements,
        "controle_codes_zonage_sans_population": sans_population,
        "controle_codes_population_sans_zonage": sans_zonage,
        "par_categorie": par_categorie,
    }

    RESULTATS.mkdir(exist_ok=True)
    (RESULTATS / "chiffres.json").write_text(json.dumps(chiffres, ensure_ascii=False, indent=2), encoding="utf-8")
    for nom, lignes in (("grandes-villes.csv", grandes), ("departements.csv", departements)):
        with open(RESULTATS / nom, "w", encoding="utf-8", newline="") as f:
            ecrivain = csv.DictWriter(f, fieldnames=list(lignes[0].keys()), delimiter=";")
            ecrivain.writeheader()
            ecrivain.writerows(lignes)

    print(json.dumps({k: v for k, v in chiffres.items() if k != "par_categorie"}, ensure_ascii=False, indent=2))
    print("\nVilles de 100 000 habitants ou plus où le préavis en location vide reste de 3 mois :")
    for g in grandes:
        if g["preavis_location_vide"] == "3 mois":
            print(f"  {g['commune']} ({g['departement']}) {g['population_2023']}")


if __name__ == "__main__":
    main()
