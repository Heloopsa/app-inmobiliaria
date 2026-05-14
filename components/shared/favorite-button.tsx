"use client";

import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorited?: boolean;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function FavoriteButton({
  propertyId,
  initialFavorited = false,
  size = "md",
  showCount = false,
  className,
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const toggleFavorite = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      // Optimistic update
      const wasFavorited = favorited;
      setFavorited(!favorited);

      const res = await fetch(`/api/favorites/${propertyId}`, {
        method: wasFavorited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: wasFavorited ? undefined : JSON.stringify({ propertyId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al actualizar favorito");
      }

      // If the API call failed, revert optimistic update
      const data = await res.json();
      if (wasFavorited && !data.removed) {
        setFavorited(true);
      }
      if (!wasFavorited && !data.added && !data.alreadyFavorited) {
        setFavorited(false);
      }
    } catch (err: any) {
      console.error("Error toggling favorite:", err);
      setError(err.message);
      setFavorited(!favorited); // Revert
    } finally {
      setLoading(false);
    }
  }, [favorited, loading, propertyId]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={toggleFavorite}
        disabled={loading}
        className={cn(
          sizeClasses[size],
          "flex items-center justify-center rounded-full border-2 transition-all duration-200",
          "hover:scale-110 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          favorited
            ? "border-red-400 bg-red-400 text-white shadow-md"
            : "border-border bg-white/80 backdrop-blur-sm text-muted-foreground hover:border-red-300 hover:text-red-400"
        )}
        aria-label={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={favorited ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <Heart
          className={cn(
            "transition-transform duration-200",
            favorited && "fill-current scale-110"
          )}
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        />
      </button>

      {showCount && (
        <span className={cn("text-sm font-medium", favorited ? "text-red-500" : "text-muted-foreground")}>
          {favorited ? "Favorito" : "Favorito"}
        </span>
      )}

      {error && (
        <span className="text-xs text-red-500 animate-pulse">{error}</span>
      )}
    </div>
  );
}