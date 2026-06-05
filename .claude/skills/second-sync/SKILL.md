---
name: Second Sync
description: Synchronise la session Claude Code de Terouva avec Second (le majordome IA qui pilote le projet). Lit les tâches assignées par Second dans .claude/second/inbox.md, les résume, aide à en prendre une, et rend compte dans .claude/second/outbox.md. Utiliser au début de session, ou quand l'utilisateur dit "sync Second", "check Second", "qu'est-ce que Second m'a confié", "/second-sync".
---

# Second Sync — travailler de pair avec Second

Second est le **majordome IA** qui pilote ce projet (Terouva). Il communique avec
toi (la session Claude Code de Terouva) via un **bus de fichiers** dans
`.claude/second/`. Ce skill gère ce va-et-vient.

## Quand l'utiliser
- **Au démarrage de session** (toujours, pour savoir ce que Second attend).
- Quand l'utilisateur dit « sync Second », « check l'inbox », « qu'est-ce que Second
  veut », ou lance `/second-sync`.
- **Après avoir terminé une tâche**, pour rendre compte.

## Procédure — PULL (récupérer le travail)
1. Lis `.claude/second/PROTOCOL.md` (une fois par session) pour les règles.
2. Lis `.claude/second/inbox.md`. Extrais les tâches dont le `status` est `todo`
   ou `in_progress`.
3. Lis `.claude/second/outbox.md` pour voir ce qui a déjà été reporté (ne pas
   refaire / ne pas dupliquer un report).
4. **Résume** à l'utilisateur : les tâches en attente, par priorité (high → low),
   en une ligne chacune (id + titre + priorité). Propose de prendre la plus
   prioritaire, ou demande laquelle.
5. Exécute la tâche choisie normalement (plan bref → code → tests). Respecte
   **toujours** les lignes rouges Terouva : on observe, on ne pilote pas LBC ;
   pas d'envoi automatique ; l'humain valide et envoie ; aucun secret commité.

## Procédure — PUSH (rendre compte)
Quand une tâche est faite/bloquée/partielle, **append** (jamais d'écrasement) un
bloc dans `.claude/second/outbox.md`, tout en bas :

```
## REPORT <task-id> — <date heure>   [status: done | blocked | partial]
- files: <fichiers modifiés>
- tests: <cargo / vitest / tsc — résultats réels>
- reste: <ce qui manque, ou ce qui bloque et pourquoi>
- notes: <décisions, pièges>
```

## Règles strictes
- **Tu ne modifies JAMAIS `inbox.md`** (Second en est le seul auteur). Tu le lis.
- Tu écris **uniquement** dans `outbox.md`, en append.
- Si l'inbox est vide de `todo`, dis-le et propose de continuer le travail courant.
- Sois honnête dans les reports : si un test échoue ou si une étape exige une vraie
  session LBC (que tu ne peux pas faire seul), écris-le noir sur blanc.
