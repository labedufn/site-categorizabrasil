import { z } from "zod";

const articleItemSchema = z.object({
  data_publicacao: z.string().min(1),
  titulo: z.string().min(1),
  resumo: z.string().optional().default(""),
  autores: z.array(z.string()).default([]),
  link: z.string().url(),
});

export const articlesCmsResponseSchema = z.object({
  data: z.array(articleItemSchema),
});

export type ArticlesCmsResponse = z.infer<typeof articlesCmsResponseSchema>;
