import { cmsGet } from "./cmsClient";
import { ENV_TAG, isCmsConfigured } from "../config/env";

export async function fetchCmsData<T>(endpoint: string): Promise<T | null> {
  if (!isCmsConfigured) {
    console.warn(`${ENV_TAG} Requisição ignorada: CMS não está configurado.`);
    return null;
  }

  try {
    return await cmsGet<T>(endpoint);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`${ENV_TAG} Erro durante fetch ${endpoint}: ${message}`);
    return null;
  }
}
