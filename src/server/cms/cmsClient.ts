import axios, { AxiosError, AxiosInstance } from "axios";
import { cmsEnv, ENV_TAG, isCmsConfigured } from "../config/env";

let cachedClient: AxiosInstance | null = null;

function createClient(): AxiosInstance {
  if (!isCmsConfigured) {
    throw new Error(`${ENV_TAG} CMS não configurado. Verifique as variáveis NEXT_PUBLIC_API_BASE_URL e API_TOKEN.`);
  }

  if (cachedClient) return cachedClient;

  cachedClient = axios.create({
    baseURL: cmsEnv.baseUrl,
    timeout: cmsEnv.timeoutMs,
    headers: {
      Authorization: `Bearer ${cmsEnv.token}`,
    },
  });

  return cachedClient;
}

export async function cmsGet<T>(endpoint: string): Promise<T> {
  const client = createClient();

  try {
    const response = await client.get<T>(endpoint);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const message = err.response?.status
      ? `${err.response?.status} ${err.response?.statusText}`
      : (err.message ?? "Erro desconhecido");

    throw new Error(`${ENV_TAG} Falha ao requisitar ${endpoint}: ${message}`);
  }
}
