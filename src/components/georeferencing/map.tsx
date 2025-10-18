"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tooltip } from "../ui/tooltip";
import { useRecaptcha } from "@/components/recaptcha/recaptcha-provider";

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
  A: "/images/seals/selo-a.svg",
  B: "/images/seals/selo-b.svg",
  C: "/images/seals/selo-c.svg",
};

export function Map({ centerLat, centerLng, zoom, markers, onMarkerClick }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { status: recaptchaStatus, refresh: refreshRecaptcha } = useRecaptcha();

  const recaptchaReady = recaptchaStatus === "verified";
  const recaptchaError = recaptchaStatus === "error";

  const overlayContent = useMemo(() => {
    if (!recaptchaReady) {
      if (recaptchaError) {
        return {
          message: "Não foi possível validar a sessão de segurança.",
          actionLabel: "Tentar novamente",
        };
      }

      return {
        message: "Validando proteção reCAPTCHA...",
        actionLabel: null,
      };
    }

    if (!isMapLoaded) {
      return {
        message: "Carregando mapa...",
        actionLabel: null,
      };
    }

    return null;
  }, [isMapLoaded, recaptchaError, recaptchaReady]);

  useEffect(() => {
    if (!recaptchaReady || mapRef.current || !mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE ?? "mapbox://styles/mapbox/streets-v11",
      center: [centerLng, centerLat],
      zoom: zoom,
      attributionControl: false,
      interactive: true,
      projection: "mercator",
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
    });

    return () => {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? "";

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setIsMapLoaded(false);
    };
  }, [centerLat, centerLng, zoom, recaptchaReady]);

  useEffect(() => {
    if (!recaptchaReady || !mapRef.current) return;

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
  }, [markers, onMarkerClick, recaptchaReady]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative">
      {overlayContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-200/90 text-gray-700 text-center px-6">
          <span>{overlayContent.message}</span>
          {overlayContent.actionLabel ? (
            <button
              type="button"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
              onClick={() => {
                refreshRecaptcha().catch((error) => {
                  console.error("[recaptcha] manual refresh failed", error);
                });
              }}
            >
              {overlayContent.actionLabel}
            </button>
          ) : null}
        </div>
      )}
      <div ref={mapContainerRef} className={`h-full w-full ${overlayContent ? "opacity-0 pointer-events-none" : ""}`} />
    </div>
  );
}
