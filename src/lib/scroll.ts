import { gsap } from './gsap'

export function scrollToHash(hash: string, offsetY = 80) {
  const el = document.getElementById(hash.replace('#', ''))
  if (!el) return
  gsap.to(window, { scrollTo: { y: el, offsetY }, duration: 1, ease: 'power2.inOut' })
}
