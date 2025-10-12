import { cmsEnv } from "../config/env";

const SLASH_REGEX = /\/+$/;

export function buildCmsAssetUrl(assetId: string, extension?: string): string {
  const baseUrl = (cmsEnv.publicUrl || cmsEnv.baseUrl).replace(SLASH_REGEX, "");

  if (!baseUrl || !assetId) return "";

  if (!extension) {
    return `${baseUrl}/assets/${assetId}`;
  }

  const ext = extension.replace(/^\./, "");
  return `${baseUrl}/assets/${assetId}.${ext}`;
}
