import { z } from "zod";

const logoSchema = z.object({
  logos_software_id: z.object({
    logo: z.string().min(1),
  }),
});

const customerOpinionSchema = z.object({
  opiniao_consumidor_id: z.object({
    nome: z.string().min(1),
    descricao: z.string().min(1),
  }),
});

const faqSchema = z.object({
  faq_id: z.object({
    pergunta: z.string().min(1),
    resposta: z.string().min(1),
  }),
});

export const homeCmsResponseSchema = z.object({
  data: z.object({
    instagram: z.string().default(""),
    whatsapp: z.string().default(""),
    canal_youtube: z.string().default(""),
    link_video_youtube: z.string().default(""),
    logos_software: z.array(logoSchema).default([]),
    opiniao_consumidor: z.array(customerOpinionSchema).default([]),
    faq: z.array(faqSchema).default([]),
  }),
});

export type HomeCmsResponse = z.infer<typeof homeCmsResponseSchema>;
