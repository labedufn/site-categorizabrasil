export interface Logo {
  imgSrc: string;
  name?: string;
}

export interface CustomerReview {
  name: string;
  body: string;
}

export interface FaqItem {
  title: string;
  content: string;
}

export interface HomePageContent {
  instagram: string;
  whatsapp: string;
  youtubeChannel: string;
  youtubeVideoLink: string;
  logos: Logo[];
  reviews: CustomerReview[];
  faq: FaqItem[];
}
