"use client";

import { Marker } from "@/types";
import { Map } from "./map";
import { ComboBox } from "../ui/combobox";
import { EstablishmentCard } from "./establishment-card";

interface GeoMapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
}

export function GeoMap({ centerLat, centerLng, zoom, markers }: GeoMapProps) {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-4 lg:h-[520px]">
      <div className="w-full h-[400px] lg:h-full">
        <Map centerLat={centerLat} centerLng={centerLng} zoom={zoom} markers={markers} />
      </div>
      <div className="h-full flex flex-col gap-4">
        <ComboBox
          options={[]}
          onChange={function (selectedOption: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <ComboBox
          options={[]}
          onChange={function (selectedOption: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="flex-1">
          <EstablishmentCard
            name={"Nome do Restaurante"}
            type={"Pizzaria"}
            address={"Rua das Flores, 123 - Centro, Santa Maria - RS"}
            phone={"(55) 99999-9999"}
            website={"https://www.google.com"}
            categoryIconUrl={"/selo-a.svg"}
            imageUrl="/background_georef.webp"
          />
        </div>
      </div>
    </div>
  );
}
