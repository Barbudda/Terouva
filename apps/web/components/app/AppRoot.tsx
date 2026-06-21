/**
 * Racine de l'application web Terouva (local-first).
 *
 * LOT 1 — placeholder : le montage de l'arbre React existant (HashRouter + pages
 * + composants UI réutilisés du desktop) et la couche IndexedDB arrivent aux
 * lots 2-3. Ce composant est chargé exclusivement côté client (cf. page.tsx).
 */
export default function AppRoot() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-6">
      <div className="max-w-md text-center space-y-4">
        <div className="text-2xl font-semibold tracking-tight">Terouva</div>
        <p className="text-sm text-zinc-400">
          L&apos;application web local-first se monte ici. Tes données restent dans
          ton navigateur — aucun serveur, aucun compte.
        </p>
        <p className="text-xs text-zinc-600 font-mono">/app — en construction</p>
      </div>
    </main>
  );
}
