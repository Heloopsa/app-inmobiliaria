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

// Fix Leaflet default marker icon - run only once
if (typeof window !== "undefined") {
  delete ((L.Icon.Default.prototype as unknown) as Record<string, unknown>)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
}

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

    // Ensure container has dimensions before initializing map
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      el.style.width = "100%";
      el.style.height = "100%";
    }

    // Destroy existing map if present
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const focus = focusId
      ? memoizedProperties.find((p) => p.id === focusId)
      : undefined;
    const center: [number, number] = focus
      ? [focus.lat, focus.lng]
      : [18.4861, -69.9312];

    // Wait for container to be ready
    if (!el.offsetWidth || !el.offsetHeight) {
      requestAnimationFrame(() => {
        if (!el.offsetWidth || !el.offsetHeight) {
          el.style.width = "100vw";
          el.style.height = "100vh";
        }
      });
    }

    let zoomLevel = focus ? 14 : 8;
    
    // Fit bounds first if no focus, then adjust zoom
    if (!focus && memoizedProperties.length > 0) {
      const validProps = memoizedProperties.filter(
        (p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)
      );
      if (validProps.length > 1) {
        // Temporarily create map without zoom to calculate bounds
        const tempMap = L.map(el, {
          zoomControl: false,
          scrollWheelZoom: false,
          dragging: false,
          touchZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
        });
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '',
        }).addTo(tempMap);

        const latlngs = validProps.map((p) => [p.lat, p.lng] as [number, number]);
        const boundsObj = L.latLngBounds(latlngs);
        tempMap.fitBounds(boundsObj, { padding: [50, 50] });
        
        const newZoom = tempMap.getZoom();
        zoomLevel = Math.min(newZoom, 12); // Cap zoom level
        
        tempMap.remove();
      }
    }

    const map = L.map(el, {
      zoomControl: true,
      scrollWheelZoom: true,
      zoom: zoomLevel,
    });

    mapRef.current = map;

    // Invalidate size after adding to DOM
    requestAnimationFrame(() => {
      map.invalidateSize();
    });

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

    // Fit bounds to show all markers if not focused
    if (validProperties.length > 0 && !focus) {
      const latlngs = validProperties.map((p) => [p.lat, p.lng] as [number, number]);
      const boundsObj = L.latLngBounds(latlngs);
      map.fitBounds(boundsObj, { padding: [50, 50] });
    }

    const resize = () => map.invalidateSize();
    window.addEventListener("resize", resize);
    const t = window.setTimeout(() => map.invalidateSize(), 200);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", resize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [memoizedProperties, focusId]);

  return (
    <div
      ref={containerRef}
      className={className ?? "min-h-[320px] w-full rounded-xl"}
    />
  );
}