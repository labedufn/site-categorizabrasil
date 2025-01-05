import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Georreferenciamento",
  description: "",
};

export default async function Georreferenciamento() {
  return (
    <>
      <LayoutInterno>
        <ImageHeader
          src="/background_georef.webp"
          title="Georreferenciamento"
          subtitle="Busque os estabelecimentos geolocalizados"
        />
      </LayoutInterno>
    </>
  );
}
