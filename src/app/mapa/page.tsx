import { ImageHeader } from "@/components/ui/image-header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { GeoMap } from "@/components/georeferencing/geo-map";
import { Marker, MarkerType } from "@/types";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getGeoreferencingPageAction } from "./actions";
import { LayoutGeneral } from "@/components/layouts/layout-general";
import { LayoutInterno } from "@/components/layouts/layout-interno";
import { LayoutDefault } from "@/components/layouts/layout-default";

export const revalidate = 20;

export const metadata: Metadata = {
  title: "Categoriza Brasil - Georreferenciamento",
  description: "Busque os estabelecimentos geolocalizados",
};

export default async function Georreferenciamento() {
  const georeferencingPageData = await getGeoreferencingPageAction();

  const markers: Marker[] = georeferencingPageData.map((item) => ({
    lat: item.localizacao.latitude,
    lng: item.localizacao.longitude,
    type: item.categoria as MarkerType,
    label: item.nomeEstabelecimento,
  }));

  const establishments = georeferencingPageData.map((item) => ({
    name: item.nomeEstabelecimento,
    address: item.enderecoCompleto,
    phone: item.contato,
    website: item.site,
    categoryIconUrl:
      item.categoria === MarkerType.A ? "/selo-a.svg" : item.categoria === MarkerType.B ? "/selo-b.svg" : "/selo-c.svg",
    imageUrl: item.fotoEstabelecimento,
    city: item.cidadeEstado,
  }));

  return (
    <>
      <LayoutGeneral>
        <LayoutInterno>
          <ImageHeader
            src="/background_georef.webp"
            title="Georreferenciamento"
            subtitle="Busque os estabelecimentos geolocalizados categorizados"
          />
          <LayoutDefault className="mx-auto mb-24">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Georreferenciamento" }]} />
            <GeoMap
              centerLat={-29.756}
              centerLng={-53.768}
              zoom={7}
              markers={markers}
              establishments={establishments}
            />
          </LayoutDefault>
        </LayoutInterno>
      </LayoutGeneral>
    </>
  );
}
