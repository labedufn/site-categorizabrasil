"use client";

import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tooltip } from "../ui/tooltip";

type MarkerType = "A" | "B" | "C";

interface Marker {
  lng: number;
  lat: number;
  type: MarkerType;
  label: string;
}

interface MapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
  onMarkerClick?: (markerIndex: number) => void;
}

const markerIcons: Record<MarkerType, string> = {
  A: "/selo-a.svg",
  B: "/selo-b.svg",
  C: "/selo-c.svg",
};

export function Map({ centerLat, centerLng, zoom, markers, onMarkerClick }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? "mapbox://styles/mapbox/streets-v11",
        center: [centerLng, centerLat],
        zoom: zoom,
        attributionControl: false,
        interactive: true,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

      mapRef.current.on("load", () => {
        setIsMapLoaded(true); // O mapa carregou
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current
      .getCanvas()
      .parentElement!.querySelectorAll(".map-marker")
      .forEach((marker) => marker.remove());

    markers.forEach(({ lat, lng, type, label }, index) => {
      const el = document.createElement("div");
      el.className = "map-marker";

      const root = createRoot(el);
      root.render(
        <Tooltip content={label}>
          <div
            style={{
              backgroundImage: `url(${markerIcons[type]})`,
              width: "30px",
              height: "30px",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
            }}
            onClick={() => {
              if (onMarkerClick) onMarkerClick(index);
            }}
          />
        </Tooltip>,
      );

      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(mapRef.current!);
    });
  }, [markers, onMarkerClick]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative">
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <span className="text-gray-500">Carregando mapa...</span>
        </div>
      )}
      <div ref={mapContainerRef} className={`h-full w-full ${!isMapLoaded ? "opacity-0" : ""}`} />
    </div>
  );
}
