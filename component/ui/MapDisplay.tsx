"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MapDisplayProps {
  latitude: number;
  longitude: number;
  address: string;
  googleMapsUrl: string;
  className?: string;
  zoom?: number;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as
  | string
  | undefined;

// Fallback style jika belum ada Map ID di Google Cloud
export const darkLuxuryMapStyle: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0a0a" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#141414" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#232323" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0a0a0a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#050507" }],
  },
];

/**
 * Custom animated marker dengan murni Tailwind CSS (High Contrast).
 * Sangat ringan saat peta digeser dan aman untuk Dark/Light mode.
 */
function PulsingMarkerContent() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <div className="absolute h-10 w-10 animate-ping rounded-full bg-black/50"></div>
      <div className="absolute h-6 w-6 rounded-full border-2 border-black/20 bg-black/5"></div>
      <div className="relative h-4 w-4 rounded-full border-[2.5px] border-white bg-black shadow-[0_2px_10px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
}

function MapInner({
  latitude,
  longitude,
  address,
  zoom = 15,
}: Required<Pick<MapDisplayProps, "latitude" | "longitude" | "address">> & {
  zoom?: number;
}) {
  const position = { lat: latitude, lng: longitude };

  return (
    <Map
      mapId={GOOGLE_MAPS_MAP_ID}
      defaultCenter={position}
      defaultZoom={zoom}
      styles={GOOGLE_MAPS_MAP_ID ? undefined : darkLuxuryMapStyle}
      disableDefaultUI
      zoomControl
      streetViewControl={false}
      fullscreenControl={false}
      mapTypeControl={false}
      keyboardShortcuts={false}
      clickableIcons={false}
      // "cooperative" membuat pengguna di HP harus pakai 2 jari untuk geser peta,
      // agar tidak bentrok saat men-scroll halaman web.
      gestureHandling="cooperative"
      scrollwheel={false}>
      <AdvancedMarker position={position} title={address}>
        <PulsingMarkerContent />
      </AdvancedMarker>
    </Map>
  );
}

export default function MapDisplay({
  latitude,
  longitude,
  address,
  googleMapsUrl,
  className,
  zoom = 15,
}: MapDisplayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Intro Animation menggunakan GSAP saat elemen masuk layar
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  const handleOpen = useCallback(() => {
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  }, [googleMapsUrl]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex w-full aspect-square md:aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-black text-xs uppercase tracking-widest text-white/40">
        Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      // HAPUS onClick dari sini.
      // Sekarang container ini hanyalah wadah pasif, petanya yang aktif digeser.
      className={`relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] ${
        className ?? ""
      }`}>
      <div className="absolute inset-0">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <MapInner
            latitude={latitude}
            longitude={longitude}
            address={address}
            zoom={zoom}
          />
        </APIProvider>
      </div>

      {/* TOMBOL MELAYANG DI POJOK KANAN BAWAH */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah klik tembus ke peta
            handleOpen();
          }}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 md:text-xs shadow-lg"
          aria-label="Buka di aplikasi Google Maps">
          <span>Buka Map</span>
          {/* Ikon Eksternal Link */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
