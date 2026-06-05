# Bus de coordination Second ⇄ Terouva

> Canal **fichiers** entre **Second** (le majordome IA, daemon qui pilote ce projet)
> et la **session Claude Code de Terouva** (toi, qui travailles dans ce dossier).
> Objectif : travailler **de pair** sans qu'aucun des deux n'ait à deviner ce que
> fait l'autre. Asynchrone, simple, traçable dans git.

## Les deux fichiers

| Fichier | Sens | Qui écrit | Qui lit |
|---|---|---|---|
| `inbox.md` | **Second → Terouva** | Second (assigne des tâches, des revues, du contexte) | la session Terouva |
| `outbox.md` | **Terouva → Second** | la session Terouva (rend compte) | Second (+ via son observateur de transcripts) |

**Règle d'or anti-conflit : un seul auteur par fichier.**
- Tu (session Terouva) **n'écris jamais** dans `inbox.md` — tu le lis seulement.
- Tu **rends compte uniquement** dans `outbox.md` (en append, en bas).
- Second n'écrit jamais dans `outbox.md` — il le lit seulement.

## Cycle de travail (côté session Terouva)

1. **Au début de session** (et quand tu veux te resynchroniser) : lance le skill
   `/second-sync` — il lit les tâches `status: todo`/`in_progress` de l'inbox et te
   les résume.
2. **Tu prends une tâche**, tu la fais (en respectant les lignes rouges Terouva,
   cf. `.claude/../ObsidianVault` ou la note « Lignes rouges »).
3. **Tu rends compte** dans `outbox.md` : append d'un bloc `## REPORT <task-id>` avec
   ce que tu as fait, les fichiers touchés, les tests, et ce qui reste / bloque.
4. Second lit l'outbox (et observe ton transcript en direct), met à jour l'inbox
   (marque la tâche `done`, en assigne d'autres).

## Format d'une tâche (inbox.md)

```
## TASK-007 — Titre court            [status: todo]
- from: Second
- created: 2026-06-05
- priority: high
- files: apps/desktop/src/...        (indices, pas obligatoire)

Description + critères d'acceptation. Toujours : respecter la ligne rouge
(on observe, on ne pilote pas ; pas d'envoi auto LBC ; l'humain valide et envoie).
```

## Format d'un compte-rendu (outbox.md)

```
## REPORT TASK-007 — 2026-06-05 14:32   [status: done | blocked | partial]
- files: <fichiers modifiés>
- tests: <cargo / vitest / tsc résultats>
- reste: <ce qui manque, ou ce qui bloque et pourquoi>
- notes: <décisions, pièges>
```

## Lignes rouges (rappel, non négociable)
- On **observe**, on ne **pilote pas** LBC. Pas de bot, pas d'envoi automatique,
  pas d'évasion anti-détection. **L'humain valide et envoie.**
- Jamais de secret commité. Jamais de fausses annonces sur LBC.
