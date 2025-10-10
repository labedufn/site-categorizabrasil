import { z } from "zod";

const newsImageSchema = z
  .object({
    id: z.string().min(1),
    type: z.string().optional().default("image/svg+xml"),
  })
  .nullable()
  .optional();

const gallerySchema = z.object({
  imagens_noticia_id: z.object({
    imagens: z.string().min(1),
  }),
});

const newsItemSchema = z.object({
  date_created: z.string().min(1),
  titulo: z.string().min(1),
  texto: z.string().min(1),
  slug: z.string().min(1),
  imagem_principal: newsImageSchema,
  imagens_noticia: z.array(gallerySchema).default([]),
});

export const newsCmsResponseSchema = z.object({
  data: z.array(newsItemSchema),
});

export type NewsCmsResponse = z.infer<typeof newsCmsResponseSchema>;
