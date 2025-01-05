import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Publicações",
  description: "",
};

export default async function Publicacoes() {
  return (
    <>
      <LayoutInterno>
        <ImageHeader src="/background_publi.webp" title="Publicações" subtitle="Confira nossas publicações" />
      </LayoutInterno>
    </>
  );
}
