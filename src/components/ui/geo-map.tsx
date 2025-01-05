"use client";

import { Map } from "./map";
import { HeaderTitle } from "./header-title";
import Image from "next/image";

export function GeoMap() {
  enum MarkerType {
    A = "A",
    B = "B",
    C = "C",
  }

  const markers: { lat: number; lng: number; type: MarkerType }[] = [
    { lat: -29.68140806351066, lng: -53.81438297431279, type: MarkerType.A },
    { lat: -29.69076350294833, lng: -53.836662147655815, type: MarkerType.B },
    { lat: -29.699303768286583, lng: -53.788789920678354, type: MarkerType.C },
  ];

  return (
    <>
      <div className="lg:max-w-screen-xl max-w-none m-auto px-0 mt-32">
        <HeaderTitle topText="Estabelecimentos" mainTitle="Geolocalizados" />
        <div className="grid lg:grid-cols-[1fr_2fr] items-center">
          <div className="flex flex-col gap-4 mb-8 lg:mb-0 pl-6 lg:pl-0">
            <div className="bg-[#efc33a] rounded-l-full inline-flex items-center">
              <div className="inline-flex gap-8 items-center">
                <Image
                  src="/selo-a.svg"
                  alt="Mapa"
                  width={150}
                  height={150}
                  className="bg-[#efc33a] p-2 border-white border-4 rounded-full w-24 h-24 lg:w-40 lg:h-40"
                />
                <p className="font-bold text-[#663513] pr-8 text-sm lg:text-base">
                  Serviços que cumprem com excelência os requisitos.
                </p>
              </div>
            </div>

            <div className="bg-[#a9a9a8] rounded-l-full inline-flex items-center">
              <div className="inline-flex gap-8 items-center">
                <Image
                  src="/selo-b.svg"
                  alt="Mapa"
                  width={150}
                  height={150}
                  className="bg-[#a9a9a8] p-2 border-white border-4 rounded-full w-24 h-24 lg:w-40 lg:h-40"
                />
                <p className="font-bold text-[#454547] pr-8 text-sm lg:text-base">
                  Serviços que cumprem muito bem os requisitos.
                </p>
              </div>
            </div>

            <div className="bg-[#af4f29] rounded-l-full inline-flex items-center">
              <div className="inline-flex gap-8 items-center">
                <Image
                  src="/selo-c.svg"
                  alt="Mapa"
                  width={150}
                  height={150}
                  className="bg-[#af4f29] p-2 border-white border-4 rounded-full w-24 h-24 lg:w-40 lg:h-40"
                />
                <p className="font-bold text-white pr-8 text-sm lg:text-base">
                  Serviços que cumprem satisfatoriamente os requisitos.
                </p>
              </div>
            </div>
          </div>
          <div className="h-[400px] lg:h-[600px] px-6 lg:p-0">
            <Map centerLat={-29.756} centerLng={-53.768} zoom={8} markers={markers} />
          </div>
        </div>
      </div>
    </>
  );
}
