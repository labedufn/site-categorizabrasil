import { apiGet } from "@/infrastructure/http/externalApiClient";

interface cidadeEstado {
  cidade: string;
  sigla_estado: string;
}

interface localizacao {
  coordinates: number[];
}

interface GeoreferencingPageItem {
  nome_estabelecimento: string;
  endereco_completo: string;
  contato: string;
  site: string;
  cidade_estado: cidadeEstado;
  localizacao: localizacao;
  foto_estabelecimento: string;
  categoria: string;
}

interface GeoreferencingPageData {
  data: GeoreferencingPageItem[];
}

export async function fetchGeoreferencingPageData(): Promise<GeoreferencingPageData> {
  const endpoint = "/items/georreferenciamento?fields=*,cidade_estado.cidade,cidade_estado.sigla_estado";
  return apiGet<GeoreferencingPageData>(endpoint);
}
