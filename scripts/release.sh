#!/usr/bin/env bash
# Reusable release script for Terouva. Re-run on every version bump.
#
# Usage:
#   npx -y dotenv-cli -e .env.local -- bash scripts/release.sh
#
# Requires:
#   - apps/desktop/{Cargo.toml,tauri.conf.json,package.json} bumped
#   - tauri build already run (artifacts in C:/cargo-targets/terouva/release/bundle/)
#   - .env.local exposing GITHUB_PERSONAL_ACCESS_TOKEN
#   - gh CLI installed (path auto-discovered below)
#   - .github/release-notes/v<version>.md present

set -euo pipefail

# Resolve gh executable (it may not be on PATH right after winget install).
if command -v gh >/dev/null 2>&1; then
  GH=gh
elif [ -x "/c/Program Files/GitHub CLI/gh.exe" ]; then
  GH="/c/Program Files/GitHub CLI/gh.exe"
elif [ -x "/c/Program Files (x86)/GitHub CLI/gh.exe" ]; then
  GH="/c/Program Files (x86)/GitHub CLI/gh.exe"
else
  echo "error: gh CLI not found. Install with: winget install GitHub.cli" >&2
  exit 1
fi

# Read version from apps/desktop/package.json (single source of truth).
VERSION=$(node -p "require('./apps/desktop/package.json').version")
TAG="v${VERSION}"

NOTES_FILE=".github/release-notes/${TAG}.md"
if [ ! -f "$NOTES_FILE" ]; then
  echo "error: missing release notes file at ${NOTES_FILE}" >&2
  exit 1
fi

# Bundle outputs from the Tauri release build.
MSI="C:/cargo-targets/terouva/release/bundle/msi/Terouva_${VERSION}_x64_en-US.msi"
NSIS="C:/cargo-targets/terouva/release/bundle/nsis/Terouva_${VERSION}_x64-setup.exe"

for f in "$MSI" "$NSIS"; do
  if [ ! -f "$f" ]; then
    echo "error: bundle missing — run 'npm --prefix apps/desktop run tauri:build' first" >&2
    echo "       expected: $f" >&2
    exit 1
  fi
done

# Token: prefer the one already in env (dotenv-cli sets it). Map the project
# naming convention to what gh expects.
if [ -z "${GH_TOKEN:-}" ] && [ -n "${GITHUB_PERSONAL_ACCESS_TOKEN:-}" ]; then
  export GH_TOKEN="$GITHUB_PERSONAL_ACCESS_TOKEN"
fi

if [ -z "${GH_TOKEN:-}" ]; then
  echo "error: no GH_TOKEN / GITHUB_PERSONAL_ACCESS_TOKEN in environment." >&2
  echo "       Run via: npx -y dotenv-cli -e .env.local -- bash scripts/release.sh" >&2
  exit 1
fi

echo "[release] Creating release ${TAG} on Barbudda/Terouva…"
"$GH" release create "$TAG" \
  "$MSI" \
  "$NSIS" \
  --repo Barbudda/Terouva \
  --title "Terouva ${TAG} — live watch + polling background" \
  --notes-file "$NOTES_FILE" \
  --target main

echo "[release] Done. Release page:"
echo "          https://github.com/Barbudda/Terouva/releases/tag/${TAG}"
