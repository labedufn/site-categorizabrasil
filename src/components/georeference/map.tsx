"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Marker as MapboxMarker } from "mapbox-gl";
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

export function Map({ centerLat, centerLng, zoom, markers }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<MapboxMarker[]>([]);

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
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([centerLng, centerLat]);
      mapRef.current.setZoom(zoom);
    }
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    markers.forEach(({ lat, lng, type }) => {
      const el = document.createElement("div");
      el.style.backgroundImage = `url(${markerIcons[type]})`;
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";

      const newMarker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(mapRef.current!);

      markersRef.current.push(newMarker);
    });
  }, [markers]);

  return <div ref={mapContainerRef} className="h-full w-full rounded-2xl overflow-hidden" />;
}
