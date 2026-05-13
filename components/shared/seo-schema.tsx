import type { Property } from "@/lib/mock-data";

interface SeoSchemaProps {
  property: Property;
}

/**
 * Genera el JSON-LD structured data para Google Rich Snippets
 * de propiedades inmobiliarias (schema.org/RealEstateListing)
 * 
 * Este es un SERVER COMPONENT que renderiza el script como string seguro.
 */
export function SeoSchema({ property }: SeoSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "image": property.images,
    "url": `https://inmueblepro.com/property/${property.id}`,
    "price": property.price,
    "priceCurrency": property.currency,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.city,
      "addressCountry": "DO",
    },
    "floorSize": {
      "@type": "AreaSpecification",
      "value": property.areaM2,
      "unitCode": "MTK",
    },
    "numberOfRooms": property.beds > 0 ? String(property.beds) : undefined,
    "breadcrumb": {
      "@type": "Breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://inmueblepro.com" },
        { "@type": "ListItem", "position": 2, "name": "Propiedades", "item": "https://inmueblepro.com/search" },
        { "@type": "ListItem", "position": 3, "name": property.title },
      ],
    },
  };

  // Next.js 13+ soporta renderizado de scripts JSON-LD directamente
  // Usamos un string raw para evitar escape de HTML
  const jsonStr = JSON.stringify(schema);

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: jsonStr }}
    />
  );
}
