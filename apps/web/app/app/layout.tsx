import type { ReactNode } from "react";
// CSS de l'app (Tailwind + thème sombre Terouva). Importé ici (layout) car le
// CSS global ne peut l'être que dans un layout/page. Scopé au segment /app.
import "../../components/app/index.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  return children;
}
