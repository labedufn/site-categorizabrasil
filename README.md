# Site Categoriza

## Visão Geral
- Frontend Next.js 15 (app router) consumindo dados do Directus CMS.
- Backend Directus 11 com Postgres + Redis orquestrados via Docker Compose.
- Fluxo de desenvolvimento local pensado para subir todo o stack com um único comando.

## Estrutura de Pastas
- `infra/`: infraestrutura Docker (arquivos compose de prod/dev).
- `cms/`: projeto Directus completo (configurações, template, dados persistidos).
- `src/`: código do site em Next.js.

## Primeiros Passos
- Copie os arquivos de exemplo e ajuste as variáveis:
  - `cp .env.example .env`
- Revise especialmente as variáveis do MinIO (`MINIO_*` e `STORAGE_S3_*`) para garantir que o Directus aponte para o bucket desejado.
- Os arquivos `.env` dentro de `cms/` servem apenas de referência. Sempre rode o Docker Compose apontando para o `.env` da raiz (ex.: `docker compose --env-file ../.env up` dentro de `cms/`).
- Gere um Access Token estático no Directus depois que o CMS estiver de pé:
  - Acesse `http://localhost:8055`, logue com `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
  - Vá em **Configurações → Tokens de Acesso** e crie um token com as permissões necessárias.
  - Atualize `DIRECTUS_STATIC_TOKEN` (e opcionalmente `API_TOKEN`) no `.env` da raiz.

## Executando em Desenvolvimento
- Suba todo o monolito (Next + Directus):
  - `npm run monolith:dev` (atalho) ou `npm run dev -w infra`
  - A aplicação ficará em `http://localhost:3000`, o Directus em `http://localhost:8055`.
- Para encerrar e remover containers/volumes temporários:
  - `npm run monolith:dev:down` ou `npm run dev:down -w infra`
- Quer rodar só o frontend? Execute `npm run dev` na raiz e aponte `NEXT_PUBLIC_DIRECTUS_URL` para um CMS existente (ex.: produção).
  - Todas as variáveis (Next e Directus) agora ficam concentradas no `.env` da raiz.

## Executando em Produção / Homologação
- Construa e suba os containers em modo destacado:
  - `npm run monolith:up` ou `npm run up -w infra`
- Para derrubar todo o stack:
  - `npm run monolith:down` ou `npm run down -w infra`

## Variáveis de Ambiente Relevantes
- `NEXT_PUBLIC_DIRECTUS_URL`: URL pública usada pelo browser (default `http://localhost:8055`).
- `DIRECTUS_INTERNAL_URL`: URL interna usada pelo servidor Next (default `http://directus:8055` em Docker).
- `DIRECTUS_STATIC_TOKEN`: token estático criado no Directus (obrigatório para leitura autenticada).
- `API_TIMEOUT_MS`: personaliza o timeout das requisições ao CMS (default `10000` ms).
- `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`: credenciais do Postgres usado pelo Directus.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: acesso inicial ao painel Directus.
- `PUBLIC_URL`: URL pública do Directus (usada para gerar links de assets).
- `STORAGE_LOCATIONS` / `STORAGE_DEFAULT`: mantêm `s3` como driver padrão de arquivos.
- `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`: credenciais do servidor MinIO (usadas também pelo Directus).
- `MINIO_BUCKET`: bucket onde os uploads do Directus serão armazenados (default `directus`).
- `STORAGE_S3_ENDPOINT`: endpoint interno para o MinIO (`http://directus-minio:9000` em Docker).
- `STORAGE_S3_PUBLIC_URL`: base usada pelo Directus para gerar URLs públicas (default `${PUBLIC_URL}/assets`).
- Variáveis opcionais (`EMAIL_*`, `CONTENT_SECURITY_POLICY_*`, etc.) também podem ser definidas aqui ou no painel do Dokploy.

## Armazenamento de Arquivos (MinIO)
- O stack agora sobe um servidor MinIO (`minio/minio`) com persistência em `cms/data/minio`.
- As credenciais padrão são `minioadmin` / `minioadmin`; ajuste `MINIO_ROOT_USER` e `MINIO_ROOT_PASSWORD` no `.env` se precisar endurecer a segurança (lembre-se de atualizar as variáveis `STORAGE_S3_KEY`/`STORAGE_S3_SECRET` em conjunto).
- O bucket configurado por padrão é `directus` e é criado automaticamente pelo serviço auxiliar `directus-minio-setup`.
- A UI de administração do MinIO fica exposta em `http://localhost:9001` (porta configurável via `MINIO_CONSOLE_PORT`); o endpoint compatível com S3 fica em `http://localhost:9000`.
- Em produção certifique-se de expor apenas o que for necessário (ex.: publicar o console atrás de autenticação ou desabilitá-lo) e, se usar HTTPS externo, ajuste `STORAGE_S3_ENDPOINT` / `STORAGE_S3_PUBLIC_URL` para refletirem o domínio público.

## Automação de Backup e Restauração
- Faça backup local antes de migrar para a VPS:
  - `./scripts/backup-directus.sh` usa `infra/docker-compose.dev.yml` e o `.env` da raiz por padrão.
  - Os artefatos são gravados em `backups/<timestamp>/directus-db.sql` e `backups/<timestamp>/minio-data.tar.gz`.
- Copie os arquivos gerados e o `.env` para a VPS (`scp -r backups/<timestamp> usuario@servidor:/caminho`).
- Na VPS, restaure executando:
  - `./scripts/restore-directus.sh backups/<timestamp>/directus-db.sql backups/<timestamp>/minio-data.tar.gz` (o terceiro argumento opcional permite apontar para outro `.env`).
  - O script usa `infra/docker-compose.yml`, reinicia o MinIO com o dump restaurado e importa o banco antes de subir Directus + app.
- Caso não tenha uploads para migrar, passe `-` no segundo argumento da restauração e apenas o banco será importado.
- Em ambientes já em produção (por exemplo, stacks gerenciados pelo Dokploy), use `scripts/restore_directus_full.sh`. Ele aceita variáveis para apontar diretamente aos containers que já estão rodando, sem precisar derrubar o stack inteiro. Exemplo real na VPS:
  ```bash
  DIRECTUS_C="categorizabrasilsite-web-yt8gc6-directus-1" \
  DB_C="categorizabrasilsite-web-yt8gc6-directus-database-1" \
  MINIO_C="categorizabrasilsite-web-yt8gc6-directus-minio-1" \
  SQL_DUMP="/root/directus-backup/directus-db.sql" \
  MINIO_TAR="/root/directus-backup/minio-data.tar.gz" \
  /root/restore_directus_full.sh
  ```
  O script pausa o Directus, limpa o schema `public`, importa o dump, restaura os dados do MinIO no volume existente e liga novamente o serviço validando a saúde em seguida. Ajuste os nomes dos containers e caminhos conforme o ambiente.
