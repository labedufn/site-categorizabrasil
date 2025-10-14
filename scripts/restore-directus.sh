#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ] || [ "$#" -gt 3 ]; then
  echo "Uso: $0 <dump.sql> [minio.tar.gz|-] [arquivo.env]" >&2
  exit 1
fi

abspath() {
  case "$1" in
    /*) printf '%s\n' "$1" ;;
    *) printf '%s\n' "$(pwd)/$1" ;;
  esac
}

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
SQL_DUMP=$(abspath "$1")
MINIO_ARCHIVE=${2:-""}
ENV_FILE=${3:-"$ROOT_DIR/.env"}

if [ ! -f "$SQL_DUMP" ]; then
  echo "Arquivo SQL não encontrado: $SQL_DUMP" >&2
  exit 1
fi

if [ -n "$MINIO_ARCHIVE" ] && [ "$MINIO_ARCHIVE" != "-" ]; then
  MINIO_ARCHIVE=$(abspath "$MINIO_ARCHIVE")
  if [ ! -f "$MINIO_ARCHIVE" ]; then
    echo "Arquivo do MinIO não encontrado: $MINIO_ARCHIVE" >&2
    exit 1
  fi
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Arquivo de variáveis não encontrado: $ENV_FILE" >&2
  exit 1
fi

COMPOSE_FILE=${COMPOSE_FILE:-"$ROOT_DIR/infra/docker-compose.yml"}

set -a
. "$ENV_FILE"
set +a

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

echo "==> Subindo dependências (database, cache, minio)"
compose up -d directus-database directus-cache directus-minio >/dev/null

if [ -n "$MINIO_ARCHIVE" ] && [ "$MINIO_ARCHIVE" != "-" ]; then
  echo "==> Restaurando dados do MinIO a partir de $MINIO_ARCHIVE"
  compose stop directus-minio >/dev/null
  MINIO_DATA_DIR="$ROOT_DIR/cms/data/minio"
  mkdir -p "$MINIO_DATA_DIR"
  if [ -n "$(find "$MINIO_DATA_DIR" -mindepth 1 -print -quit 2>/dev/null)" ]; then
    find "$MINIO_DATA_DIR" -mindepth 1 -delete
  fi
  tar -xzf "$MINIO_ARCHIVE" -C "$MINIO_DATA_DIR"
  compose up -d directus-minio >/dev/null
fi

echo "==> Aguardando Postgres ficar pronto"
until compose exec directus-database pg_isready -U "$DB_USER" -d "$DB_DATABASE" >/dev/null 2>&1; do
  sleep 2
done

echo "==> Importando dump SQL $SQL_DUMP"
compose exec -T directus-database psql -U "$DB_USER" "$DB_DATABASE" <"$SQL_DUMP"

echo "==> Subindo serviços do Directus e app"
compose up -d directus app >/dev/null

echo "Restauração concluída."
