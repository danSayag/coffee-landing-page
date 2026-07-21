// Shared Framer Motion primitives used by hero-style sections across the site.

/** Standard "ease out" curve used for nearly every scroll/entrance animation. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Fade-up-on-mount transition (hero headings, ctas, badges). Not viewport-gated —
 *  used only above the fold, where content is visible immediately on load. */
export function fadeUp(delay: number, y = 28) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  }
}
