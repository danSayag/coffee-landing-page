// PLACEHOLDER café location — replace the coordinates and name with the real
// café before launch. Everything map-related reads from this single spot.
export const CAFE_NAME = 'Terra Roasters'
export const CAFE_LAT = 32.0853
export const CAFE_LNG = 34.7818

/** Keyless Google Maps embed centered on the café. */
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${CAFE_LAT},${CAFE_LNG}&z=16&output=embed`

/**
 * Directions link that opens the platform's navigation app:
 * Android gets a geo: URI (the OS offers Waze / Google Maps / etc.),
 * iOS gets Apple Maps, and desktop gets Google Maps in the browser.
 */
export function getDirectionsUrl(): string {
  const dest = `${CAFE_LAT},${CAFE_LNG}`
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) return `geo:${dest}?q=${dest}(${encodeURIComponent(CAFE_NAME)})`
    if (/iphone|ipad|ipod/i.test(ua)) return `https://maps.apple.com/?daddr=${dest}&q=${encodeURIComponent(CAFE_NAME)}`
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`
}
