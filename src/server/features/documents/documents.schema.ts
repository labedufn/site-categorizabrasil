import { z } from "zod";

const documentItemSchema = z.object({
  titulo_documento: z.string().min(1),
  link_documento: z.string().url(),
  date_created: z.string().min(1),
});

export const documentsCmsResponseSchema = z.object({
  data: z.array(documentItemSchema),
});

export type DocumentsCmsResponse = z.infer<typeof documentsCmsResponseSchema>;
