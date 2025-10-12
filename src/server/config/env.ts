const DEFAULT_TIMEOUT_MS = 10_000;

interface CmsEnv {
  /** URL interna utilizada pelo servidor Next.js */
  baseUrl: string;
  /** URL pública exposta ao navegador para assets e requisições client-side */
  publicUrl: string;
  token: string;
  timeoutMs: number;
}

const rawPublicUrl = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim();
const rawInternalUrl = (process.env.DIRECTUS_INTERNAL_URL ?? rawPublicUrl).trim();
const rawToken = (process.env.DIRECTUS_STATIC_TOKEN ?? process.env.API_TOKEN ?? "").trim();

/** Centraliza a leitura de variáveis de ambiente relacionadas ao CMS */
export const cmsEnv: CmsEnv = {
  baseUrl: rawInternalUrl,
  publicUrl: rawPublicUrl,
  token: rawToken,
  timeoutMs: Number(process.env.API_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS),
};

/** Indica se as credenciais do CMS estão disponíveis */
export const isCmsConfigured = Boolean(cmsEnv.baseUrl && cmsEnv.token);

/** Indica se a URL pública está configurada (necessário para assets) */
export const isCmsPublicConfigured = Boolean(cmsEnv.publicUrl);

export const ENV_TAG = "[cms]";
