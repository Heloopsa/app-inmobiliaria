"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { formatCurrencyDOP } from "@/lib/formatters";
import type { Property } from "@/lib/mock-data";

// Fix Leaflet default marker icon issue (Webpack resolves wrong path)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default marker icon
const iconProto = L.Icon.Default.prototype as unknown as Record<string, unknown>;
delete iconProto._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function priceLabel(p: Property): string {
  return p.currency === "USD"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(p.price)
    : formatCurrencyDOP(p.price);
}

interface PropertiesMapProps {
  properties: Property[];
  focusId?: string;
  className?: string;
}

export function PropertiesMap({
  properties,
  focusId,
  className,
}: PropertiesMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Memoize properties to prevent unnecessary re-renders
  const memoizedProperties = useMemo(() => properties, [properties]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Destroy existing map if present
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const focus = focusId
      ? memoizedProperties.find((p) => p.id === focusId)
      : undefined;
    const center: L.LatLngExpression = focus
      ? [focus.lat, focus.lng]
      : [18.4861, -69.9312];

    const map = L.map(el, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView(center, focus ? 14 : 8);

    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    const extended = L as typeof L & {
      markerClusterGroup: (opts?: Record<string, unknown>) => L.Layer;
    };
    const cluster = extended.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    }) as unknown as L.FeatureGroup;

    // Filter out properties without valid coordinates
    const validProperties = memoizedProperties.filter(
      (p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)
    );

    validProperties.forEach((p) => {
      const html = `<div style="font-size:11px;font-weight:700;padding:4px 8px;border-radius:9999px;background:#0F172A;color:#fff;border:2px solid #fff;box-shadow:0 1px 2px rgba(15,23,42,.15)">${priceLabel(p)}</div>`;
      const icon = L.divIcon({
        html,
        className: "leaflet-property-marker",
        iconSize: [72, 28],
        iconAnchor: [36, 14],
      });
      const marker = L.marker([p.lat, p.lng], { icon });
      marker.bindPopup(
        `<div style="min-width:180px"><strong>${p.title}</strong><br/><span style="color:#10B981;font-weight:600">${priceLabel(p)}</span></div>`
      );
      cluster.addLayer(marker);
    });

    map.addLayer(cluster);

    // Fit bounds to show all markers
    if (validProperties.length > 0 && !focus) {
      const group = L.featureGroup(validProperties.map((p) =>
        L.marker([p.lat, p.lng])
      ));
      map.fitBounds(group.getBounds().pad(0.1));
    }

    const resize = () => map.invalidateSize();
    window.addEventListener("resize", resize);
    const t = window.setTimeout(() => map.invalidateSize(), 200);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", resize);
    };
  }, [memoizedProperties, focusId]);

  return (
    <div
      ref={containerRef}
      className={className ?? "min-h-[320px] w-full rounded-xl"}
    />
  );
}