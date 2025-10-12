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
  - `cp cms/.env.example cms/.env`
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
- Variáveis do Mapbox (`NEXT_PUBLIC_MAPBOX_*`) permanecem iguais à configuração anterior.
