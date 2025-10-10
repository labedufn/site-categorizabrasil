export function extensionFromMime(mime?: string | null): string | undefined {
  if (!mime) return undefined;
  const [, subtype] = mime.split("/");
  return subtype ?? undefined;
}
