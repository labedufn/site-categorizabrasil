import { buildCmsAssetUrl } from "../../cms/assetUrl";
import { fetchCmsData } from "../../cms/fetchCmsData";
import { georeferencingFallback } from "../../fallback/georeferencing";
import { GeoreferencingCmsResponse, georeferencingCmsResponseSchema } from "./georeferencing.schema";
import { GeoreferencingPoint } from "./georeferencing.types";

const GEOREFERENCING_ENDPOINT = "/items/georreferenciamento?fields=*,cidade_estado.cidade,cidade_estado.sigla_estado";

function mapFromCms(data: GeoreferencingCmsResponse): GeoreferencingPoint[] {
  return data.data.map((item) => {
    const [longitude, latitude] = item.localizacao.coordinates;
    const fotoEstabelecimento = item.foto_estabelecimento ? buildCmsAssetUrl(item.foto_estabelecimento, "svg") : "";

    const cidadeEstado = `${item.cidade_estado.cidade} - ${item.cidade_estado.sigla_estado}`;

    return {
      nomeEstabelecimento: item.nome_estabelecimento,
      enderecoCompleto: item.endereco_completo,
      contato: item.contato ?? "",
      site: item.site ?? "",
      fotoEstabelecimento,
      categoria: item.categoria,
      cidadeEstado,
      localizacao: {
        latitude,
        longitude,
      },
    };
  });
}

export async function getGeoreferencingPoints(): Promise<GeoreferencingPoint[]> {
  const response = await fetchCmsData<unknown>(GEOREFERENCING_ENDPOINT);

  if (!response) {
    return georeferencingFallback;
  }

  const parsed = georeferencingCmsResponseSchema.safeParse(response);

  if (!parsed.success) {
    console.error("[cms] Erro ao validar payload de georreferenciamento:", parsed.error.flatten());
    return georeferencingFallback;
  }

  const content = mapFromCms(parsed.data);

  if (!content.length) {
    return georeferencingFallback;
  }

  return content;
}
