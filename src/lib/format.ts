/** Zero-pads a 1-based index for display, e.g. `formatIndex(0)` → `"01"`. */
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}
