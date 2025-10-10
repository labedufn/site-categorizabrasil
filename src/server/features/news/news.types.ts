export interface NewsGalleryImage {
  imgSrc: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  body: string;
  heroImage: string;
  gallery: NewsGalleryImage[];
  publishedAt: string;
  publishedAtLabel: string;
}
