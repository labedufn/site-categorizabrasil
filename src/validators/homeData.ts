import { HomeActions } from "@/app/actions/homeActions";
import { z } from "zod";

const homeDataSchema = z.object({
  instagram: z.string(),
  whatsapp: z.string().url(),
  canal_youtube: z.string().url(),
  link_video_youtube: z.string().url(),
});

export const validateHomeData = (data: HomeActions) => {
  return homeDataSchema.parse(data);
};
