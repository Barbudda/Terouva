/**
 * Global keyboard shortcut registry.
 *
 * Inspired by Linear / Vim:
 *   - "g" then a letter → "go to" navigation (g+d = dashboard, g+a = annonces, …)
 *   - "/" → focus the Annonces search bar (when on /annonces)
 *   - "?" → open the shortcut help modal
 *
 * Shortcuts are *ignored* when the user is typing in an input/textarea/contenteditable.
 * That way they never collide with normal text entry.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ShortcutDef {
  /** Display key combo (used in the help modal). */
  combo: string;
  description: string;
}

export const SHORTCUTS: ShortcutDef[] = [
  { combo: "g a", description: "Aller à Mes annonces" },
  { combo: "g c", description: "Aller à Mes candidatures" },
  { combo: "g d", description: "Aller à Mon dossier" },
  { combo: "g ,", description: "Aller aux Réglages" },
  { combo: "/", description: "Focus de la recherche (page Annonces)" },
  { combo: "?", description: "Afficher / fermer cette aide" },
];

function isTypingInForm(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

/**
 * Mount-once hook that listens at window-level for the shortcuts above.
 * Returns the current state of the "help modal" toggle.
 */
export function useGlobalShortcuts(): {
  helpOpen: boolean;
  closeHelp: () => void;
} {
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    let pendingG = false;
    let gTimer: number | null = null;

    const clearG = () => {
      pendingG = false;
      if (gTimer !== null) {
        window.clearTimeout(gTimer);
        gTimer = null;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTypingInForm(e.target)) return;

      // Help toggle
      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        clearG();
        return;
      }
      // Close help with Escape
      if (e.key === "Escape" && helpOpen) {
        e.preventDefault();
        setHelpOpen(false);
        return;
      }
      // Annonces-specific "/" → focus search
      if (e.key === "/") {
        const input = document.querySelector<HTMLInputElement>(
          "[data-shortcut-target='search']",
        );
        if (input) {
          e.preventDefault();
          input.focus();
          input.select();
        }
        clearG();
        return;
      }

      // "g" then letter — Linear-style navigation
      if (pendingG) {
        const dest = navTargetFor(e.key);
        if (dest) {
          e.preventDefault();
          navigate(dest);
        }
        clearG();
        return;
      }
      if (e.key === "g") {
        pendingG = true;
        gTimer = window.setTimeout(() => clearG(), 1200);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, helpOpen]);

  return { helpOpen, closeHelp: () => setHelpOpen(false) };
}

function navTargetFor(key: string): string | null {
  switch (key.toLowerCase()) {
    case "a":
      return "/";
    case "c":
      return "/candidatures";
    case "d":
      return "/dossier";
    case ",":
      return "/reglages";
    default:
      return null;
  }
}
