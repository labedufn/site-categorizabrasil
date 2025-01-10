"use client";

import { useState } from "react";
import { Marker } from "@/types";
import { Map } from "./map";
import { EstablishmentCard } from "./establishment-card";

interface Establishment {
  name: string;
  address: string;
  phone: string;
  website: string;
  categoryIconUrl: string;
  imageUrl?: string;
}

interface GeoMapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
  establishments: Establishment[];
}

export function GeoMap({ centerLat, centerLng, zoom, markers, establishments }: GeoMapProps) {
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const handleMarkerClick = (markerIndex: number) => {
    setSelectedEstablishment(establishments[markerIndex]);
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 lg:h-[520px]">
      <div className="w-full h-[400px] lg:h-full">
        <Map
          centerLat={centerLat}
          centerLng={centerLng}
          zoom={zoom}
          markers={markers}
          onMarkerClick={handleMarkerClick}
        />
      </div>
      <div className="h-full flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto">
          {selectedEstablishment ? (
            <EstablishmentCard
              name={selectedEstablishment.name}
              address={selectedEstablishment.address}
              phone={selectedEstablishment.phone}
              website={selectedEstablishment.website}
              categoryIconUrl={selectedEstablishment.categoryIconUrl}
              imageUrl={selectedEstablishment.imageUrl}
            />
          ) : (
            <p className="text-gray-500 text-center mt-4">Clique em um marcador no mapa para ver os detalhes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
