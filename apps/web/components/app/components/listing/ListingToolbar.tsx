import { Plus, Search } from "lucide-react";
import { Button } from "@app/components/ui/Button";
import { Input, Select } from "@app/components/ui/Input";
import { cn } from "@app/lib/cn";
import type { ListingStatus, SearchProfile } from "@app/types";
import { LISTING_FILTERS } from "./format";

export type SortBy = "score" | "date" | "price";
export type StatusFilter = ListingStatus | "all";

const FILTERS: StatusFilter[] = [
  "all",
  "new",
  "to_review",
  "favorite",
  "applied",
  "ignored",
  "expired",
];

interface Props {
  total: number;
  shown: number;
  counts: Record<string, number>;
  statusFilter: StatusFilter;
  onStatusFilter: (s: StatusFilter) => void;
  query: string;
  onQuery: (v: string) => void;
  minScore: number;
  onMinScore: (v: number) => void;
  sortBy: SortBy;
  onSortBy: (v: SortBy) => void;
  searches: SearchProfile[];
  searchFilter: number | "all";
  onSearchFilter: (v: number | "all") => void;
  onRescoreAll: () => void;
  busy: boolean;
  showAddButton: boolean;
  onAdd: () => void;
}

/** Recherche, tri, filtres d'état et compteur au-dessus de la liste d'annonces. */
export function ListingToolbar(p: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 basis-64">
          <Search
            size={16}
            strokeWidth={1.75}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3"
          />
          <Input
            data-shortcut-target="search"
            aria-label="Chercher dans vos annonces"
            placeholder="Chercher un titre, une ville, un annonceur…"
            value={p.query}
            onChange={(e) => p.onQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          className="w-auto"
          aria-label="Trier les annonces"
          value={p.sortBy}
          onChange={(e) => p.onSortBy(e.target.value as SortBy)}
        >
          <option value="score">Meilleure note d'abord</option>
          <option value="date">Plus récentes d'abord</option>
          <option value="price">Loyer le plus bas d'abord</option>
        </Select>
        <Input
          type="number"
          min={0}
          max={100}
          aria-label="Note minimum"
          value={p.minScore || ""}
          onChange={(e) => p.onMinScore(Number(e.target.value) || 0)}
          placeholder="Note min."
          className="w-28"
        />
        {p.showAddButton && (
          <Button variant="secondary" onClick={p.onAdd} className="h-10">
            <Plus size={16} strokeWidth={1.75} aria-hidden />
            Ajouter
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule">
        <div
          role="tablist"
          aria-label="Filtrer par état"
          className="no-scrollbar -mb-px flex flex-1 gap-1 overflow-x-auto overflow-y-hidden"
        >
          {FILTERS.filter((s) => s === "all" || p.counts[s] || p.statusFilter === s).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={p.statusFilter === s}
              onClick={() => p.onStatusFilter(s)}
              className={cn(
                "whitespace-nowrap border-b-2 px-2.5 py-2 text-[15px] transition-colors",
                p.statusFilter === s
                  ? "border-accent font-medium text-ink"
                  : "border-transparent text-ink-2 hover:text-ink",
              )}
            >
              {LISTING_FILTERS[s]}
              <span className="ml-1.5 text-[13px] text-ink-3 tabular">
                {s === "all" ? p.total : p.counts[s]}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pb-2">
          {p.searches.length > 1 && (
            <Select
              className="h-8 w-48 text-sm"
              aria-label="Filtrer par recherche"
              value={p.searchFilter}
              onChange={(e) => p.onSearchFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
            >
              <option value="all">Toutes les recherches</option>
              {p.searches.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={p.onRescoreAll}
            disabled={p.busy || !p.searches.length}
          >
            Recalculer les notes
          </Button>
        </div>
      </div>

      <p className="text-[13px] text-ink-3">
        {p.shown === p.total
          ? `${p.total} annonce${p.total > 1 ? "s" : ""}`
          : `${p.shown} sur ${p.total} annonces`}
        <span className="hidden md:inline">
          {" "}
          · touche{" "}
          <kbd className="rounded border border-field bg-card px-1.5 font-mono text-[12px]">?</kbd>{" "}
          pour les raccourcis clavier
        </span>
      </p>
    </div>
  );
}
