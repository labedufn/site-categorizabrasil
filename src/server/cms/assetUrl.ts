import { cmsEnv } from "../config/env";

const DEFAULT_ASSET_EXTENSION = "png";

export function buildCmsAssetUrl(assetId: string, extension?: string): string {
  if (!cmsEnv.baseUrl || !assetId) return "";
  const ext = (extension ?? DEFAULT_ASSET_EXTENSION).replace(/^\./, "");
  return `${cmsEnv.baseUrl}/assets/${assetId}.${ext}`;
}
