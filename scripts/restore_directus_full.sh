#!/usr/bin/env bash
set -euo pipefail

# =========================
# CONFIG BÁSICA (pode sobrescrever via env)
# =========================
SQL_DUMP=${SQL_DUMP:-/root/directus-backup/directus-db.sql}
MINIO_TAR=${MINIO_TAR:-/root/directus-backup/minio-data.tar.gz}

# Você pode passar os nomes/IDs dos containers via env:
#   DIRECTUS_C="..." DB_C="..." MINIO_C="..."
# Se não passar, tentamos descobrir automaticamente.
DIRECTUS_C=${DIRECTUS_C:-$(docker ps -q --filter "ancestor=directus/directus" --filter "publish=8055" | head -n1)}
DB_C=${DB_C:-$(docker ps -q --filter "name=database" --filter "ancestor=postgres" | head -n1)}
[ -z "${DB_C}" ] && DB_C=$(docker ps -q --filter "ancestor=postgis/postgis" | head -n1)
MINIO_C=${MINIO_C:-$(docker ps -q --filter "ancestor=minio/minio" | head -n1)}

# =========================
# SANITY CHECKS
# =========================
echo "==> checando arquivos de backup..."
[ -f "$SQL_DUMP" ] || { echo "❌ dump SQL não encontrado: $SQL_DUMP"; exit 1; }
[ -f "$MINIO_TAR" ] || { echo "❌ arquivo MinIO (.tar.gz) não encontrado: $MINIO_TAR"; exit 1; }

echo "==> identificando containers..."
[ -n "$DIRECTUS_C" ] || { echo "❌ container do Directus não encontrado. Informe via env DIRECTUS_C=..."; exit 1; }
[ -n "$DB_C" ] || { echo "❌ container do Postgres (directus-database) não encontrado. Informe via env DB_C=..."; exit 1; }
[ -n "$MINIO_C" ] || { echo "❌ container do MinIO (directus-minio) não encontrado. Informe via env MINIO_C=..."; exit 1; }

echo "   Directus: $(docker ps --filter id=$DIRECTUS_C --format '{{.Names}}')"
echo "   Postgres: $(docker ps --filter id=$DB_C --format '{{.Names}}')"
echo "   MinIO   : $(docker ps --filter id=$MINIO_C --format '{{.Names}}')"

# =========================
# DB PARAMS (a partir das envs do container do Directus — funciona parado/rodando)
# =========================
echo "==> lendo envs do Directus (DB_* ou DATABASE_URL)..."
mapfile -t DB_ENVS < <(docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$DIRECTUS_C" | grep -E '^(DB_|DATABASE_URL)' || true)
printf '%s\n' "${DB_ENVS[@]:-}"

DB_USER=$(printf '%s\n' "${DB_ENVS[@]:-}" | awk -F= '$1=="DB_USER"{print $2}')
DB_DATABASE=$(printf '%s\n' "${DB_ENVS[@]:-}" | awk -F= '$1=="DB_DATABASE"{print $2}')
if [ -z "${DB_USER:-}" ] || [ -z "${DB_DATABASE:-}" ]; then
  DATABASE_URL=$(printf '%s\n' "${DB_ENVS[@]:-}" | awk -F= '$1=="DATABASE_URL"{print $2}')
  if [ -n "${DATABASE_URL:-}" ]; then
    DB_USER=$(printf '%s' "$DATABASE_URL" | sed -E 's#^.*://([^:]+):.*$#\1#')
    DB_DATABASE=$(printf '%s' "$DATABASE_URL" | sed -E 's#^.*/([^/?]+)(\?.*)?$#\1#')
  fi
fi
[ -n "${DB_USER:-}" ] || { echo "❌ não consegui obter DB_USER (veja envs do Directus)"; exit 1; }
[ -n "${DB_DATABASE:-}" ] || { echo "❌ não consegui obter DB_DATABASE (veja envs do Directus)"; exit 1; }
echo "   ➜ usando DB_USER=$DB_USER DB_DATABASE=$DB_DATABASE"

# =========================
# PARAR DIRECTUS
# =========================
echo "==> parando Directus para restaurar o banco..."
docker stop "$DIRECTUS_C" >/dev/null || true

# =========================
# LIMPAR SCHEMAS/EXTENSÕES CONFLITANTES (POSTGIS) E RECRIAR PUBLIC
# =========================
echo "==> limpando schemas/extensões PostGIS conflitando e recriando schema public..."
docker exec -i "$DB_C" psql -U "$DB_USER" -d "$DB_DATABASE" -v ON_ERROR_STOP=1 -c "
  DROP EXTENSION IF EXISTS postgis_tiger_geocoder CASCADE;
  DROP EXTENSION IF EXISTS postgis_topology CASCADE;
  DROP EXTENSION IF EXISTS postgis CASCADE;
  DROP SCHEMA IF EXISTS tiger CASCADE;
  DROP SCHEMA IF EXISTS tiger_data CASCADE;
  DROP SCHEMA IF EXISTS topology CASCADE;
  DROP SCHEMA IF EXISTS public CASCADE;
  CREATE SCHEMA public;
  ALTER DATABASE $DB_DATABASE SET search_path = public;
"

# =========================
# IMPORTAR DUMP SQL
# =========================
echo '==> importando dump SQL (ON_ERROR_STOP=1)...'
cat "$SQL_DUMP" | docker exec -i "$DB_C" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_DATABASE"

echo "==> checando tabelas do Directus..."
docker exec -i "$DB_C" psql -U "$DB_USER" -d "$DB_DATABASE" -c "\dt public.directus_*" || true

# =========================
# RESTAURAR MINIO
# =========================
echo "==> restaurando dados do MinIO..."
docker stop "$MINIO_C" >/dev/null || true

# detectar se o tar possui 'data/' na raiz
echo "   detectando formato do tar..."
if tar -tzf "$MINIO_TAR" | head -n50 | grep -qE '^data/'; then
  EXTRACT_TO="/"
  CLEAN_DIR="/data/*"
  echo "   formato: contém 'data/' → extrair em /"
else
  EXTRACT_TO="/data"
  CLEAN_DIR="/data/*"
  echo "   formato: não contém 'data/' → extrair em /data"
fi

docker run --rm --name minio-restore \
  --volumes-from "$MINIO_C" \
  -v "$(dirname "$MINIO_TAR")":/backup \
  alpine sh -c "rm -rf $CLEAN_DIR && tar -xzf /backup/$(basename "$MINIO_TAR") -C $EXTRACT_TO && chown -R 1000:1000 /data"

docker start "$MINIO_C" >/dev/null

# =========================
# SUBIR DIRECTUS E CHECAR SAÚDE
# =========================
echo "==> subindo Directus..."
docker start "$DIRECTUS_C" >/dev/null

echo "==> checando saúde do Directus..."
sleep 2
HOSTPORT=$(docker ps --filter id="$DIRECTUS_C" --format '{{.Ports}}' | sed -E 's/.*0\.0\.0\.0:([0-9]+)->.*/\1/;t;d')
if [ -n "$HOSTPORT" ]; then
  echo "   tentando http://127.0.0.1:$HOSTPORT/server/health"
  curl -fsS "http://127.0.0.1:$HOSTPORT/server/health" || true
fi

echo "==> amostra de usuários e arquivos:"
docker exec -i "$DB_C" psql -U "$DB_USER" -d "$DB_DATABASE" -c "SELECT id,email,status FROM directus_users LIMIT 5;" || true
docker exec -i "$DB_C" psql -U "$DB_USER" -d "$DB_DATABASE" -c "SELECT id,type,filename_download FROM directus_files LIMIT 5;" || true

echo "✅ restauração concluída."