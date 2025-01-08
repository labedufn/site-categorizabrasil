import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { LayoutInterno } from "@/layouts/layout-interno";
import { LayoutGeneral } from "@/layouts/layout-general";
import { GeoMap } from "@/components/georeference/geo-map";
import { Marker, MarkerType } from "@/types";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LayoutDefault } from "@/layouts/layout-default";

export const metadata: Metadata = {
  title: "Categoriza Brasil - Georreferenciamento",
  description: "Busque os estabelecimentos geolocalizados",
};

export default async function Georreferenciamento() {
  const markers: Marker[] = [
    {
      lat: -29.68140806351066,
      lng: -53.81438297431279,
      type: MarkerType.A,
    },
    {
      lat: -29.69076350294833,
      lng: -53.836662147655815,
      type: MarkerType.B,
    },
    {
      lat: -29.699303768286583,
      lng: -53.788789920678354,
      type: MarkerType.C,
    },
  ];

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_georef.webp"
            title="Georreferenciamento"
            subtitle="Busque os estabelecimentos geolocalizados"
          />
          <LayoutDefault className="mx-auto mb-24">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Georreferenciamento" }]} />
            <GeoMap centerLat={-29.756} centerLng={-53.768} zoom={7} markers={markers} />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
