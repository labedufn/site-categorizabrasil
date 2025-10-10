import { z } from "zod";

export const englishCmsResponseSchema = z.object({
  data: z.object({
    texto: z.string().min(1),
  }),
});

export type EnglishCmsResponse = z.infer<typeof englishCmsResponseSchema>;
