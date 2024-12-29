export const getImageUrl = (fileId: string, extensions: string[] = ["svg", "png", "jpg", "jpeg"]) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_API_BASE_URL não está definido.");
    return null;
  }

  for (const ext of extensions) {
    const url = `${baseUrl}/assets/${fileId}.${ext}`;
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = url;
      img.onerror = null;
      return url;
    }
  }
  return null;
};
