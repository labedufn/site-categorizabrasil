export enum MarkerType {
  A = "A",
  B = "B",
  C = "C",
}

export interface Marker {
  lat: number;
  lng: number;
  type: MarkerType;
  label: string;
}

export interface Seal {
  type: MarkerType;
  bgColor: string;
  textColor: string;
  imgSrc: string;
  description: string;
}
