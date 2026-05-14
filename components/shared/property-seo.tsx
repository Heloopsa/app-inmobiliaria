/**
 * SEO component for property pages
 * Implements Schema.org RealEstateListing markup for Google Rich Results
 * No external dependencies - uses inline JSON-LD scripts
 */

"use client";

import { useEffect } from "react";

export interface PropertySEOData {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address?: string;
  city: string;
  zone: string;
  beds: number;
  baths: number;
  areaM2: number;
  images?: string[];
  url?: string;
  agentName?: string;
  agentPhone?: string;
  category?: string;
  dealType?: "venta" | "alquiler";
  yearBuilt?: number;
}

interface PropertySEOProps {
  property: PropertySEOData;
  pageTitle?: string;
}

/**
 * Injects JSON-LD structured data scripts into the document head.
 * This enables Google Rich Results for real estate listings.
 */
function injectJsonLd(data: any, id?: string) {
  if (typeof window === "undefined") return;
  
  const scriptId = id || `json-ld-${Math.random().toString(36).slice(2, 8)}`;
  
  // Remove existing script if any
  const existing = document.getElementById(scriptId);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = scriptId;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/** Update document title and meta description */
function updateMetaTags(title: string, description: string, canonical: string, images: string[]) {
  if (typeof window === "undefined") return;

  // Update title
  document.title = title;

  // Update or create meta description
  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Update or create canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!linkCanonical) {
    linkCanonical = document.createElement("link");
    linkCanonical.rel = "canonical";
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.href = canonical;

  // Open Graph tags
  const updateOG = (prop: string, content: string) => {
    let meta = document.querySelector(`meta[property="og:${prop}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", `og:${prop}`);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  updateOG("title", title);
  updateOG("type", "website");
  updateOG("locale", "es_DO");
  updateOG("site_name", "InmueblePro");
  
  if (images.length > 0) {
    updateOG("image", images[0]);
  }

  // Twitter Card tags
  const updateTW = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="twitter:${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = `twitter:${name}`;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  updateTW("card", "summary_large_image");
  updateTW("site", "@inmueblepro");
  if (images.length > 0) {
    updateTW("image", images[0]);
  }
}

export function PropertySEO({ property, pageTitle }: PropertySEOProps) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const canonicalUrl = property.url || `${baseUrl}/m/${property.id}`;
  const imageList = property.images && property.images.length > 0 
    ? property.images 
    : [`${baseUrl}/placeholder.jpg`];

  const shortDesc = property.description.substring(0, 160);
  const displayTitle = pageTitle || `${property.title} | InmueblePro RD`;

  useEffect(() => {
    // Update meta tags
    updateMetaTags(displayTitle, shortDesc, canonicalUrl, imageList);

    // Property Schema.org (RealEstateListing)
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "id": canonicalUrl,
      "url": canonicalUrl,
      "name": property.title,
      "description": property.description,
      "image": imageList,
      "price": property.price,
      "priceCurrency": property.currency === "USD" ? "USD" : "DOP",
      "availability": "https://schema.org/InStock",
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "telephone": property.agentPhone,
      "agent": property.agentName ? {
        "@type": "RealEstateAgent",
        "name": property.agentName,
        "telephone": property.agentPhone,
      } : undefined,
      "numberOfRooms": property.beds + property.baths,
      "areaModified": {
        "@type": "QuantitativeValue",
        "value": property.areaM2,
        "unitCode": "MTK",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.city,
        "addressRegion": property.zone,
        "addressCountry": "DO",
      },
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": property.currency === "USD" ? "USD" : "DOP",
        "availability": "https://schema.org/InStock",
      },
      "realEstateListing": {
        "@type": "RealEstateListing",
        "category": property.category,
        "propertyType": getPropertyType(property.category),
      },
      "additionalProperty": [
        { "@type": "QuantitativeValue", "name": "bedrooms", "value": property.beds },
        { "@type": "QuantitativeValue", "name": "bathrooms", "value": property.baths },
        { "@type": "QuantitativeValue", "name": "livingArea", "value": property.areaM2, "unitCode": "MTK", "unitText": "square meters" },
      ],
    }, `json-ld-property-${property.id}`);

    // BreadcrumbList Schema
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": baseUrl },
        { 
          "@type": "ListItem", 
          "position": 2, 
          "name": property.dealType === "alquiler" ? "Alquiler" : "Venta",
          "item": `${baseUrl}/search?tipo=${property.dealType || "venta"}`
        },
        { 
          "@type": "ListItem", 
          "position": 3, 
          "name": property.category || "Propiedades",
          "item": `${baseUrl}/search?categoria=${property.category}`
        },
        { "@type": "ListItem", "position": 4, "name": property.title, "item": canonicalUrl },
      ],
    }, `json-ld-breadcrumbs-${property.id}`);

    // FAQ Schema (optional)
    if (property.yearBuilt) {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Cuántos dormitorios tiene esta propiedad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `La propiedad ${property.title} tiene ${property.beds} dormitorios.`
            }
          },
          {
            "@type": "Question",
            "name": "Cuántos baños tiene esta propiedad?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `La propiedad ${property.title} tiene ${property.baths} baños.`
            }
          },
        ],
      }, `json-ld-faq-${property.id}`);
    }

    // Cleanup: remove scripts on unmount
    return () => {
      const prefixes = ["property", "breadcrumbs", "faq"];
      prefixes.forEach((prefix) => {
        const el = document.getElementById(`json-ld-${prefix}-${property.id}`);
        if (el) el.remove();
      });
    };
  }, [property, displayTitle, canonicalUrl, imageList, baseUrl]);

  // This component doesn't render anything visible
  return null;
}

/** Map property category to Schema.org propertyType */
function getPropertyType(category?: string): string {
  const map: Record<string, string> = {
    "Apartamento": "apartment",
    "Casa": "single_family",
    "Villa": "villa",
    "Penthouse": "penthouse",
    "Townhouse": "townhouse",
    "Loft": "loft",
    "Terreno": "land",
    "Oficina": "office",
    "Local comercial": "retail",
    "Nave industrial": "industrial",
    "Hotel / hospedaje": "hotel",
    "Edificio": "building",
    "Estudio": "studio",
    "Finca": "farm",
  };
  return map[category || ""] || "other";
}