"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

type MarkerType = "A" | "B" | "C";

interface Marker {
  lng: number;
  lat: number;
  type: MarkerType;
}

interface MapProps {
  centerLat: number;
  centerLng: number;
  zoom: number;
  markers: Marker[];
}

const markerIcons: Record<MarkerType, string> = {
  A: "/selo-a.svg",
  B: "/selo-b.svg",
  C: "/selo-c.svg",
};

export const Map: React.FC<MapProps> = ({ centerLat, centerLng, zoom, markers }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: process.env.NEXT_PUBLIC_MAPBOX_STYLE!,
        center: [centerLng, centerLat],
        zoom: zoom,
        attributionControl: false,
        interactive: true,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
      mapRef.current.removeControl(new mapboxgl.NavigationControl());
    }

    markers.forEach(({ lat, lng, type }) => {
      const el = document.createElement("div");
      el.style.backgroundImage = `url(${markerIcons[type]})`;
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.backgroundSize = "contain";

      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(mapRef.current!);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [centerLat, centerLng, zoom, markers]);

  return <div ref={mapContainerRef} className="h-full w-full rounded-2xl overflow-hidden"></div>;
};
