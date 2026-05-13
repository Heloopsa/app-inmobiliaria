"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[0] ?? "";
  const rest = images.slice(1, 5);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
      <motion.div
        layout
        className="relative col-span-2 row-span-2 aspect-[16/10] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[280px] lg:min-h-[360px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active === 0 ? main : images[active]}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.85 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full"
          >
            <Image
              src={active === 0 ? main : images[active]}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 shadow-soft"
          aria-label="Vista ampliada"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </motion.div>

      {rest.map((src, i) => {
        const idx = i + 1;
        return (
          <button
            key={src}
            type="button"
            onClick={() => setActive(idx)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl ring-offset-2 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy sm:aspect-auto sm:min-h-[120px] lg:min-h-[140px]"
          >
            <Image
              src={src}
              alt={`${title} ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            {i === rest.length - 1 && images.length > 5 ? (
              <span className="absolute inset-0 flex items-center justify-center bg-navy/55 text-lg font-semibold text-white">
                +{images.length - 5}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
