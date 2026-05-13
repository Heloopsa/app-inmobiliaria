/**
 * Placeholders para integración Stripe (checkout, portal, webhooks).
 * Conecta con tus API routes cuando tengas claves en producción.
 */
export const STRIPE_PRICE_IDS = {
  standard: process.env.STRIPE_PRICE_STANDARD ?? "price_standard",
  featured: process.env.STRIPE_PRICE_FEATURED ?? "price_featured",
  boost: process.env.STRIPE_PRICE_BOOST ?? "price_boost",
} as const;

export function formatStripeAmount(
  amountMinorUnits: number,
  currency: string = "usd"
): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amountMinorUnits / 100);
}
