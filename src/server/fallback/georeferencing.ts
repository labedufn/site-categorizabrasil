import { GeoreferencingPoint } from "../features/georeferencing/georeferencing.types";

export const georeferencingFallback: GeoreferencingPoint[] = [
  {
    nomeEstabelecimento: "Restaurante Bom Sabor",
    enderecoCompleto: "Rua das Flores, 123, Centro",
    cidadeEstado: "Santa Maria - RS",
    contato: "(55) 99999-1111",
    site: "https://example.com/restaurante-bom-sabor",
    categoria: "A",
    fotoEstabelecimento: "",
    localizacao: {
      latitude: -29.6881,
      longitude: -53.8069,
    },
  },
  {
    nomeEstabelecimento: "Padaria Tradição",
    enderecoCompleto: "Av. Brasil, 456, Centro",
    cidadeEstado: "Porto Alegre - RS",
    contato: "(51) 98888-2222",
    site: "https://example.com/padaria-tradicao",
    categoria: "B",
    fotoEstabelecimento: "",
    localizacao: {
      latitude: -30.0277,
      longitude: -51.2287,
    },
  },
  {
    nomeEstabelecimento: "Café do Parque",
    enderecoCompleto: "Rua do Lazer, 789, Bairro Verde",
    cidadeEstado: "Curitiba - PR",
    contato: "(41) 97777-3333",
    site: "https://example.com/cafe-do-parque",
    categoria: "C",
    fotoEstabelecimento: "",
    localizacao: {
      latitude: -25.4284,
      longitude: -49.2733,
    },
  },
];
