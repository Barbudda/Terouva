import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Tests du chemin nominal, avec un magasin Blob simulé.
 *
 * Le vrai magasin se crée depuis le tableau de bord Vercel, et il n'existe pas
 * encore. Sans ces tests, la logique qui compte (ne pas réinscrire deux fois,
 * ne pas remettre la date à zéro, survivre à une course entre deux
 * inscriptions, ignorer un objet illisible) ne serait vérifiée qu'en
 * production, sur de vraies adresses.
 */

const faux = vi.hoisted(() => {
  class BlobNotFoundError extends Error {
    constructor() {
      super("Blob not found");
      this.name = "BlobNotFoundError";
    }
  }
  return {
    BlobNotFoundError,
    objets: new Map<string, string>(),
    head: vi.fn(),
    put: vi.fn(),
    get: vi.fn(),
    list: vi.fn(),
    del: vi.fn(),
  };
});

vi.mock("@vercel/blob", () => ({
  BlobNotFoundError: faux.BlobNotFoundError,
  head: faux.head,
  put: faux.put,
  get: faux.get,
  list: faux.list,
  del: faux.del,
}));

const { clefPour, enregistrer, lireInscrits, supprimer } = await import("@/lib/inscriptions");

/** Branche les faux sur une simple Map, pour raisonner sur le contenu. */
function brancher() {
  faux.head.mockImplementation(async (chemin: string) => {
    if (!faux.objets.has(chemin)) throw new faux.BlobNotFoundError();
    return { pathname: chemin };
  });
  faux.put.mockImplementation(async (chemin: string, corps: string) => {
    faux.objets.set(chemin, corps);
    return { pathname: chemin };
  });
  faux.get.mockImplementation(async (chemin: string) => {
    const corps = faux.objets.get(chemin);
    if (corps === undefined) return null;
    return { stream: new Response(corps).body };
  });
  faux.list.mockImplementation(async () => ({
    blobs: [...faux.objets.keys()].map((pathname) => ({
      pathname,
      uploadedAt: new Date("2026-01-01T00:00:00.000Z"),
    })),
    hasMore: false,
    cursor: undefined,
  }));
  faux.del.mockImplementation(async (chemin: string) => {
    faux.objets.delete(chemin);
  });
}

beforeEach(() => {
  process.env.BLOB_READ_WRITE_TOKEN = "jeton-de-test";
  delete process.env.BLOB_STORE_ID;
  faux.objets.clear();
  vi.clearAllMocks();
  brancher();
});

afterEach(() => {
  delete process.env.BLOB_READ_WRITE_TOKEN;
  delete process.env.BLOB_STORE_ID;
});

describe("configuree", () => {
  it("accepte le jeton de longue durée", async () => {
    await expect(enregistrer("camille@example.fr")).resolves.toBe("enregistre");
  });

  it("accepte aussi l'identifiant de magasin seul (mode OIDC)", async () => {
    // C'est ce que pose Vercel quand on relie un magasin depuis l'interface :
    // pas de jeton durable, un identifiant et un jeton court à l'exécution.
    delete process.env.BLOB_READ_WRITE_TOKEN;
    process.env.BLOB_STORE_ID = "store_test";
    await expect(enregistrer("camille@example.fr")).resolves.toBe("enregistre");
  });

  it("refuse quand il n'y a ni l'un ni l'autre", async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;
    await expect(enregistrer("camille@example.fr")).resolves.toBe("config");
  });
});

describe("enregistrer", () => {
  it("écrit une adresse qui n'existe pas encore", async () => {
    await expect(enregistrer("camille@example.fr")).resolves.toBe("enregistre");
    expect(faux.objets.size).toBe(1);
  });

  it("ne réécrit pas une adresse déjà présente", async () => {
    await enregistrer("camille@example.fr");
    faux.put.mockClear();
    await expect(enregistrer("camille@example.fr")).resolves.toBe("deja");
    expect(faux.put).not.toHaveBeenCalled();
  });

  it("ne remet pas la date d'inscription à zéro", async () => {
    await enregistrer("camille@example.fr");
    const premier = [...faux.objets.values()][0];
    await new Promise((r) => setTimeout(r, 5));
    await enregistrer("camille@example.fr");
    expect([...faux.objets.values()][0]).toBe(premier);
  });

  it("traite la même adresse écrite différemment comme un doublon", async () => {
    await enregistrer("camille@example.fr");
    await expect(enregistrer("  Camille@Example.FR ")).resolves.toBe("deja");
    expect(faux.objets.size).toBe(1);
  });

  it("survit à une course entre deux inscriptions simultanées", async () => {
    // L'objet apparaît entre le head() et le put() : le put échoue, mais
    // l'adresse est bien enregistrée, donc ce n'est pas une erreur.
    faux.put.mockImplementationOnce(async (chemin: string) => {
      faux.objets.set(chemin, '{"email":"camille@example.fr","date":"2026-01-01T00:00:00.000Z"}');
      throw new Error("blob already exists");
    });
    await expect(enregistrer("camille@example.fr")).resolves.toBe("deja");
  });

  it("signale une vraie panne d'écriture", async () => {
    faux.put.mockImplementationOnce(async () => {
      throw new Error("magasin injoignable");
    });
    await expect(enregistrer("camille@example.fr")).resolves.toBe("erreur");
  });

  it("refuse d'écrire sans magasin configuré", async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;
    await expect(enregistrer("camille@example.fr")).resolves.toBe("config");
    expect(faux.put).not.toHaveBeenCalled();
  });
});

describe("lireInscrits", () => {
  it("rend la liste de la plus récente à la plus ancienne", async () => {
    faux.objets.set(
      "inscriptions/aaa.json",
      '{"email":"ancienne@example.fr","date":"2026-01-01T00:00:00.000Z"}',
    );
    faux.objets.set(
      "inscriptions/bbb.json",
      '{"email":"recente@example.fr","date":"2026-10-20T00:00:00.000Z"}',
    );

    const liste = await lireInscrits();
    expect(liste.kind).toBe("ok");
    if (liste.kind !== "ok") return;
    expect(liste.inscrits.map((i) => i.email)).toEqual([
      "recente@example.fr",
      "ancienne@example.fr",
    ]);
  });

  it("ignore un objet illisible sans faire tomber la console", async () => {
    faux.objets.set("inscriptions/aaa.json", "ceci n'est pas du JSON");
    faux.objets.set(
      "inscriptions/bbb.json",
      '{"email":"valide@example.fr","date":"2026-10-20T00:00:00.000Z"}',
    );

    const liste = await lireInscrits();
    if (liste.kind !== "ok") throw new Error("liste illisible");
    expect(liste.inscrits).toHaveLength(1);
    expect(liste.inscrits[0]?.email).toBe("valide@example.fr");
  });

  it("dit que rien n'est configuré plutôt que de rendre une liste vide", async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;
    await expect(lireInscrits()).resolves.toEqual({ kind: "config" });
  });

  it("remonte une panne de lecture", async () => {
    faux.list.mockImplementationOnce(async () => {
      throw new Error("magasin injoignable");
    });
    const liste = await lireInscrits();
    expect(liste.kind).toBe("erreur");
  });
});

describe("supprimer", () => {
  it("retire l'adresse demandée", async () => {
    await enregistrer("camille@example.fr");
    await expect(supprimer(clefPour("camille@example.fr"))).resolves.toBe(true);
    expect(faux.objets.size).toBe(0);
  });

  it("refuse une clé qui n'est pas une empreinte", async () => {
    await expect(supprimer("../../autre-chose")).resolves.toBe(false);
    expect(faux.del).not.toHaveBeenCalled();
  });
});
