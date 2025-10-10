import { z } from "zod";

const cityStateSchema = z.object({
  cidade: z.string().min(1),
  sigla_estado: z.string().min(1),
});

const locationSchema = z.object({
  coordinates: z.array(z.number()).length(2),
});

const georeferencingItemSchema = z.object({
  nome_estabelecimento: z.string().min(1),
  endereco_completo: z.string().min(1),
  contato: z.string().optional().default(""),
  site: z.string().optional().default(""),
  cidade_estado: cityStateSchema,
  localizacao: locationSchema,
  foto_estabelecimento: z.string().optional().default(""),
  categoria: z.string().min(1),
});

export const georeferencingCmsResponseSchema = z.object({
  data: z.array(georeferencingItemSchema),
});

export type GeoreferencingCmsResponse = z.infer<typeof georeferencingCmsResponseSchema>;
