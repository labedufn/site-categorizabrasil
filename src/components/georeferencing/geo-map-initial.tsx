import { Marker, Seal } from "@/types";
import { HeaderTitle } from "../ui/header-title";
import { SealList } from "./seal-list";
import { Map } from "./map";

interface GeoMapInitialProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
  seals?: Seal[];
  topText?: string;
  mainTitle?: string;
}

export function GeoMapInitial({ centerLat, centerLng, zoom, markers, seals, topText, mainTitle }: GeoMapInitialProps) {
  return (
    <div className="lg:max-w-screen-xl max-w-none m-auto px-0 mt-32">
      <HeaderTitle topText={topText} mainTitle={mainTitle} />
      <div className="grid lg:grid-cols-[1fr_2fr] items-center gap-8 lg:gap-0">
        <SealList seals={seals} />
        <div className="h-[400px] lg:h-[600px] px-6 lg:p-0">
          <Map centerLat={centerLat} centerLng={centerLng} zoom={zoom} markers={markers} />
        </div>
      </div>
    </div>
  );
}
