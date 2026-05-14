"use client";

import { useState, useCallback } from "react";
import { Share2, CheckCircle2, Copy, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  currency: string;
  propertySlug?: string;
  size?: "sm" | "md";
  className?: string;
}

export function ShareButton({
  propertyId,
  propertyTitle,
  propertyPrice,
  currency,
  propertySlug,
  size = "md",
  className,
}: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 p-1.5",
    md: "h-10 w-10 p-2",
  };

  const propertyUrl = propertySlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/m/${propertySlug}`
    : `${typeof window !== "undefined" ? window.location.origin : ""}/search?q=${encodeURIComponent(propertyTitle)}`;

  const shareText = `🏠 ${propertyTitle}\n💰 ${currency === "USD" ? "$" : "RD$"}${propertyPrice.toLocaleString()}\n📍 Ver detalles aquí:`;

  const handleWhatsApp = useCallback(() => {
    const encodedUrl = encodeURIComponent(propertyUrl);
    const encodedText = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encodedText}%0A${encodedUrl}`, "_blank");
    setShowMenu(false);
  }, [propertyUrl, shareText]);

  const handleTelegram = useCallback(() => {
    const encodedUrl = encodeURIComponent(propertyUrl);
    const encodedText = encodeURIComponent(propertyTitle);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, "_blank");
    setShowMenu(false);
  }, [propertyUrl, propertyTitle]);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(`${propertyTitle} - InmueblePro`);
    const body = encodeURIComponent(`${shareText}\n${propertyUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setShowMenu(false);
  }, [propertyTitle, shareText, propertyUrl]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowMenu(false);
    } catch (err) {
      console.error("Error copying link:", err);
    }
  }, [propertyUrl]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          text: `${propertyTitle} - ${currency === "USD" ? "$" : "RD$"}${propertyPrice.toLocaleString()}`,
          url: propertyUrl,
        });
        setShowMenu(false);
      } catch (err) {
        // User cancelled or share failed
      }
    }
  }, [propertyTitle, propertyPrice, currency, propertyUrl]);

  return (
    <div className={cn("relative", className)}>
      {/* Main share button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={cn(
          sizeClasses[size],
          "flex items-center justify-center rounded-full border-2 border-border bg-white/80 backdrop-blur-sm text-muted-foreground transition-all duration-200",
          "hover:border-emerald-brand hover:text-emerald-brand hover:scale-105",
          "active:scale-95"
        )}
        aria-label="Compartir propiedad"
        title="Compartir propiedad"
      >
        <Share2 className={cn("transition-transform duration-200", showMenu && "scale-110 rotate-12")} style={{ width: size === "sm" ? 14 : 18, height: size === "sm" ? 14 : 18 }} />
      </button>

      {/* Share menu dropdown */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div className="fixed inset-0 z-50" onClick={() => setShowMenu(false)} />
          
          {/* Menu popup */}
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-border/50 bg-white shadow-xl shadow-black/5">
            <div className="p-2">
              {/* Native share (mobile) */}
              {"share" in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-emerald-50 transition-colors"
                >
                  <Share2 className="h-4 w-4 text-emerald-brand" />
                  Compartir...
                </button>
              )}

              {/* WhatsApp */}
              <button
                onClick={handleWhatsApp}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-green-50 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.384c-.097-.049-1.791-.887-2.073-.989-.282-.101-.488-.151-.69.15-.203.301-.786.989-.964 1.19-.179.201-.358.225-.64.124-.282-.1-1.19-.437-2.27-1.392-.841-.749-1.409-1.672-1.573-1.954-.164-.282-.018-.435.133-.585.134-.133.298-.347.446-.52.151-.175.201-.299.301-.499.1-.2.05-.381-.025-.52-.075-.14-.69-1.655-.948-2.265-.252-.6-.508-.52-.69-.53l-.59-.01c-.201 0-.528.074-.804.375-.282.301-1.078 1.054-1.078 2.564 0 1.51 1.1 3.02 1.254 3.235.154.214 2.132 3.27 5.17 4.569.723.308 1.287.495 1.725.638.723.238 1.383.204 1.902.124.581-.087 1.791-.732 2.043-1.438.252-.706.252-1.31.176-1.438-.075-.125-.282-.2-.564-.35zm-5.41 6.59c-.781 0-1.543-.14-2.258-.414l-.256-.095-2.146.563-.588-.607c-1.31-1.352-2.09-2.94-2.263-4.73l-.093-.62 1.548-.408.056-.008c1.37 0 2.728.47 3.87 1.33l.24.19.197-.24c.37-.45.646-.97.81-1.53l.07-.23-.2-.18c-1.17-1.09-2.64-1.69-4.14-1.69-.24 0-.48.01-.71.04l-.23.02-.08-.22c-.38-.95-.2-2.02.48-2.75.63-.68 1.54-1.06 2.57-1.06 1.47 0 2.7.57 3.67 1.61l.19.21.22-.18c1.07-.84 2.37-1.28 3.68-1.28.24 0 .48.02.72.05l.23.02.08.22c.38.95.2 2.02-.48 2.75-.63.68-1.54 1.06-2.57 1.06-.24 0-.48-.01-.71-.04l-.23-.02-.08-.22c-.38-.95-.2-2.02.48-2.75.63-.68 1.54-1.06 2.57-1.06.78 0 1.52.25 2.14.72l.2.15.19-.18c.72-.68 1.77-.68 2.49 0 .72.68.72 1.78 0 2.46l-.19.18.19.15c.62.47.97 1.2.97 1.96 0 .76-.35 1.49-.97 1.96l-.2.15-.19-.18c-.72-.68-1.77-.68-2.49 0l-.19.18-.2-.15c-.62-.47-1.36-.72-2.14-.72-.78 0-1.52.25-2.14.72l-.2.15-.19-.18c-.72-.68-1.77-.68-2.49 0-.72.68-.72 1.78 0 2.46l.19.18-.19.15c-.62.47-.97 1.2-.97 1.96 0 .76.35 1.49.97 1.96l.2.15.19-.18c.72-.68 1.77-.68 2.49 0l.19.18.2-.15c.62-.47 1.36-.72 2.14-.72z" />
                </svg>
                WhatsApp
              </button>

              {/* Telegram */}
              <button
                onClick={handleTelegram}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-blue-50 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0088cc">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.342-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </button>

              {/* Email */}
              <button
                onClick={handleEmail}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </button>

              {/* Divider */}
              <div className="my-1 border-t border-border/50" />

              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-brand" />
                    <span className="text-emerald-brand">¡Enlace copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    Copiar enlace
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}