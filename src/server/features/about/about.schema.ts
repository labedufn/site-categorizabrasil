import { z } from "zod";

export const aboutCmsResponseSchema = z.object({
  data: z.object({
    texto: z.string().min(1),
  }),
});

export type AboutCmsResponse = z.infer<typeof aboutCmsResponseSchema>;
