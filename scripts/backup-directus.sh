#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

abspath() {
  case "$1" in
    /*) printf '%s\n' "$1" ;;
    *) printf '%s\n' "$(pwd)/$1" ;;
  esac
}

ENV_FILE=${1:-"$ROOT_DIR/.env"}
ENV_FILE=$(abspath "$ENV_FILE")

if [ ! -f "$ENV_FILE" ]; then
  echo "Arquivo de variáveis não encontrado: $ENV_FILE" >&2
  exit 1
fi

COMPOSE_FILE=${COMPOSE_FILE:-"$ROOT_DIR/infra/docker-compose.dev.yml"}

set -a
. "$ENV_FILE"
set +a

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

TIMESTAMP=${TIMESTAMP:-$(date +%Y%m%d-%H%M%S)}
OUT_DIR=${OUT_DIR:-"$ROOT_DIR/backups/$TIMESTAMP"}
DB_DUMP_PATH="$OUT_DIR/directus-db.sql"
MINIO_ARCHIVE_PATH="$OUT_DIR/minio-data.tar.gz"

mkdir -p "$OUT_DIR"

echo "==> Garantindo serviços base 'up' no compose ($COMPOSE_FILE)"
compose up -d directus-database directus-minio directus-cache >/dev/null

echo "==> Realizando dump do Postgres para $DB_DUMP_PATH"
compose exec -T directus-database pg_dump -U "$DB_USER" "$DB_DATABASE" >"$DB_DUMP_PATH"

MINIO_DATA_DIR="$ROOT_DIR/cms/data/minio"
if [ -d "$MINIO_DATA_DIR" ]; then
  echo "==> Compactando dados do MinIO em $MINIO_ARCHIVE_PATH"
  tar -czf "$MINIO_ARCHIVE_PATH" -C "$MINIO_DATA_DIR" .
else
  echo "!! Diretório $MINIO_DATA_DIR não encontrado. Pulando backup do MinIO." >&2
fi

echo "Backup concluído em $OUT_DIR"
