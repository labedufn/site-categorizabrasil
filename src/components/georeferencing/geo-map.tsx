"use client";

import { useState } from "react";
import { Marker } from "@/types";
import { Map } from "./map";
import { EstablishmentCard } from "./establishment-card";
import { ComboBox } from "../ui/combobox";

interface Establishment {
  name: string;
  address: string;
  phone: string;
  website: string;
  categoryIconUrl: string;
  imageUrl?: string;
  city: string;
}

interface GeoMapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
  establishments: Establishment[];
}

export function GeoMap({ centerLat, centerLng, zoom, markers, establishments }: GeoMapProps) {
  const [, setSelectedCity] = useState<string | null>(null);
  const [filteredEstablishments, setFilteredEstablishments] = useState(establishments);
  const [filteredMarkers, setFilteredMarkers] = useState(markers);
  const [mapCenter, setMapCenter] = useState({ lat: centerLat, lng: centerLng });
  const [mapZoom, setMapZoom] = useState(zoom);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const cities = Array.from(new Set(establishments.map((establishment) => establishment.city)));

  const handleCityChange = (selectedCity: string | null) => {
    setSelectedCity(selectedCity);
    if (selectedCity) {
      const filtered = establishments.filter((establishment) => establishment.city === selectedCity);
      setFilteredEstablishments(filtered);

      const updatedMarkers = markers.filter((marker) =>
        filtered.some((establishment) => establishment.name === marker.label),
      );
      setFilteredMarkers(updatedMarkers);

      if (updatedMarkers.length > 0) {
        setMapCenter({ lat: updatedMarkers[0].lat, lng: updatedMarkers[0].lng });
        setMapZoom(10);
      }
    } else {
      setFilteredEstablishments(establishments);
      setFilteredMarkers(markers);
      setMapCenter({ lat: centerLat, lng: centerLng });
      setMapZoom(zoom);
    }
    setSelectedEstablishment(null);
  };

  const handleEstablishmentChange = (selectedOption: string | null) => {
    const establishment = filteredEstablishments.find((item) => item.name === selectedOption);
    if (establishment) {
      const marker = filteredMarkers.find((m) => m.label === establishment.name);
      if (marker) {
        setMapCenter({ lat: marker.lat, lng: marker.lng });
        setMapZoom(17);
      }
      setSelectedEstablishment(establishment);
    } else {
      setSelectedEstablishment(null);
    }
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 lg:h-[520px]">
      <div className="w-full h-[400px] lg:h-full">
        <Map
          centerLat={mapCenter.lat}
          centerLng={mapCenter.lng}
          zoom={mapZoom}
          markers={filteredMarkers}
          onMarkerClick={(markerIndex) => {
            const marker = filteredMarkers[markerIndex];
            setMapCenter({ lat: marker.lat, lng: marker.lng });
            setMapZoom(14);
            const establishment = filteredEstablishments.find((e) => e.name === marker.label);
            setSelectedEstablishment(establishment || null);
          }}
        />
      </div>
      <div className="h-full flex flex-col gap-4">
        <ComboBox
          options={cities}
          placeholder="Selecione uma cidade"
          onChange={(selectedOption) => handleCityChange(selectedOption)}
        />
        <ComboBox
          options={filteredEstablishments.map((establishment) => establishment.name)}
          placeholder="Selecione um estabelecimento"
          onChange={(selectedOption) => handleEstablishmentChange(selectedOption)}
        />
        <div className="flex-1">
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
            <p className="text-gray-500 text-center mt-4">
              Selecione um marcador ou um estabelecimento para ver os detalhes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
