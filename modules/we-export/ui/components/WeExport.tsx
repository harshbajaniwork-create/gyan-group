"use client";

import { useState, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

gsap.registerPlugin(ScrollTrigger);

// GeoJSON URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MarkerData {
  name: string;
  coordinates: [number, number];
  color: string;
}

const markers: MarkerData[] = [
  { name: "Germany", coordinates: [10.4515, 51.1657], color: "#FF5C5C" },
  { name: "USA", coordinates: [-95.7129, 37.0902], color: "#FF5C5C" },
  { name: "China", coordinates: [104.1954, 35.8617], color: "#FF5C5C" },
  { name: "Japan", coordinates: [138.2529, 36.2048], color: "#FF5C5C" },
  { name: "Switzerland", coordinates: [8.2275, 46.8182], color: "#FF5C5C" },
  { name: "France", coordinates: [2.2137, 46.6034], color: "#FF5C5C" },
  { name: "Italy", coordinates: [12.5674, 41.8719], color: "#FF5C5C" },
  { name: "South Africa", coordinates: [22.9375, -30.5595], color: "#FF5C5C" },
];

const CountriesWeExport = () => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Map animation
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Legend animation
      if (legendRef.current) {
        const items = legendRef.current.querySelectorAll(".legend-item");
        gsap.from(items, {
          scrollTrigger: {
            trigger: legendRef.current,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold">
            Countries We Export
          </h2>
        </div>

        {/* Map Container */}
        <div
          ref={mapRef}
          className="relative bg-linear-to-br from-ebony via-ebony/95 to-ebony rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* World Map */}
          <div className="relative w-full aspect-video">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 140,
                center: [0, 20],
              }}
              className="w-full h-full"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#2B2C31"
                      stroke="#00BBD1"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#3a3b41", outline: "none" },
                        pressed: { fill: "#2B2C31", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers */}
              {markers.map(({ name, coordinates, color }) => (
                <Marker key={name} coordinates={coordinates}>
                  <g
                    onMouseEnter={() => setHoveredMarker(name)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulsing circle */}
                    <circle
                      r={8}
                      fill={color}
                      opacity={0.2}
                      className="animate-ping"
                    />

                    {/* Pin marker */}
                    <path
                      d="M0,-15 C-4,-15 -7,-12 -7,-8 C-7,-4 0,0 0,0 C0,0 7,-4 7,-8 C7,-12 4,-15 0,-15 Z"
                      fill={color}
                      stroke="white"
                      strokeWidth={1.5}
                      style={{
                        transform:
                          hoveredMarker === name ? "scale(1.2)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <circle r={2} cy={-8} fill="white" />

                    {/* Tooltip */}
                    {hoveredMarker === name && (
                      <g>
                        <rect
                          x={-40}
                          y={-35}
                          width={80}
                          height={24}
                          rx={4}
                          fill="white"
                          stroke={color}
                          strokeWidth={2}
                        />
                        <text
                          textAnchor="middle"
                          y={-19}
                          fill="#2B2C31"
                          fontSize={12}
                          fontWeight="600"
                        >
                          {name}
                        </text>
                      </g>
                    )}
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* Legend */}
          <div
            ref={legendRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 md:mt-8"
          >
            {markers.map((marker) => (
              <div
                key={marker.name}
                className="legend-item flex items-center gap-2 group cursor-pointer"
                onMouseEnter={() => setHoveredMarker(marker.name)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <MapPin
                  className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                    hoveredMarker === marker.name
                      ? "scale-125 text-coral-red"
                      : "text-coral-red"
                  }`}
                  fill="currentColor"
                />
                <span
                  className={`text-ivory text-sm font-medium transition-colors duration-300 ${
                    hoveredMarker === marker.name ? "text-turquoise-blue" : ""
                  }`}
                >
                  {marker.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountriesWeExport;
