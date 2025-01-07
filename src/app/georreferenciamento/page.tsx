import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Georreferenciamento",
  description: "Busque os estabelecimentos geolocalizados",
};

export default async function Georreferenciamento() {
  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_georef.webp"
            title="Georreferenciamento"
            subtitle="Busque os estabelecimentos geolocalizados"
          />
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
