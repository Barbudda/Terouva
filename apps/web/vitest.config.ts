import { defineConfig } from "vitest/config";
import path from "node:path";

// Tests unitaires de la couche données (IndexedDB/Dexie) et utilitaires web.
// Next.js ignore ce fichier ; il ne sert qu'à vitest.
export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    include: ["lib/**/*.test.ts", "components/app/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./components/app"),
      "@": path.resolve(__dirname, "."),
      "@terouva/core": path.resolve(__dirname, "../../packages/core/src"),
    },
  },
});
