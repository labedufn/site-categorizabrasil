export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface GeoreferencingPoint {
  nomeEstabelecimento: string;
  enderecoCompleto: string;
  contato: string;
  site: string;
  localizacao: Coordinates;
  fotoEstabelecimento: string;
  categoria: string;
  cidadeEstado: string;
}
