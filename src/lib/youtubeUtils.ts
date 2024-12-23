export const extractVideoId = (url: string): string => {
  const patterns = [
    /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu.be\/|youtube\.com\/v\/|youtube\.com\/video\/)([^&?\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return "";
};

export const getYouTubeVideoEmbed = (url: string): string => {
  const videoId = extractVideoId(url);
  return `https://www.youtube.com/embed/${videoId}?si=5T3edTRUdmHri8VR`;
};

interface YouTubeThumbnailUrls {
  default: string;
  medium: string;
  high: string;
  standard: string;
  maxres: string;
}

export const getYouTubeThumbnail = (videoUrl: string): YouTubeThumbnailUrls => {
  const videoId = extractVideoId(videoUrl);

  return {
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
    medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // 320x180
    high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // 480x360
    standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, // 640x480
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // 1920x1080
  };
};
