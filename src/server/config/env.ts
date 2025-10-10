const DEFAULT_TIMEOUT_MS = 10_000;

interface CmsEnv {
  baseUrl: string;
  token: string;
  timeoutMs: number;
}

/** Centraliza a leitura de variáveis de ambiente relacionadas ao CMS */
export const cmsEnv: CmsEnv = {
  baseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim(),
  token: (process.env.API_TOKEN ?? "").trim(),
  timeoutMs: Number(process.env.API_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS),
};

/** Indica se as credenciais do CMS estão disponíveis */
export const isCmsConfigured = Boolean(cmsEnv.baseUrl && cmsEnv.token);

export const ENV_TAG = "[cms]";
