import { fetchGeoreferencingPageData } from "../repositories/georeferencingPageRepository";

interface localizacao {
  longitude: number;
  latitude: number;
}

export interface GeoreferencingPageContent {
  nomeEstabelecimento: string;
  enderecoCompleto: string;
  contato: string;
  site: string;
  localizacao: localizacao;
  fotoEstabelecimento: string;
  categoria: string;
  cidadeEstado: string;
}

export async function getGeoreferencingPageContent(): Promise<GeoreferencingPageContent[]> {
  const { data } = await fetchGeoreferencingPageData();

  const georeferencingPageContent = data.map((item) => {
    const fotoEstabelecimento = item.foto_estabelecimento
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.foto_estabelecimento}.svg`
      : "";

    const enderecoCompleto = `${item.endereco_completo}, ${item.cidade_estado.cidade} - ${item.cidade_estado.sigla_estado}`;
    const [longitude, latitude] = item.localizacao.coordinates;

    const cidadeEstado = `${item.cidade_estado.cidade} - ${item.cidade_estado.sigla_estado}`;

    return {
      nomeEstabelecimento: item.nome_estabelecimento,
      enderecoCompleto,
      cidadeEstado,
      contato: item.contato,
      site: item.site,
      localizacao: {
        longitude,
        latitude,
      },
      fotoEstabelecimento,
      categoria: item.categoria,
    };
  });

  return georeferencingPageContent;
}
