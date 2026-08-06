#!/usr/bin/env bash
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL not set — skipping database migration (bundled member catalog still works)."
  exit 0
fi

echo "Applying database migrations..."
pnpm exec drizzle-kit migrate
