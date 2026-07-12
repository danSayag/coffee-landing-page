import { useEffect } from 'react'
import { useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'

const SPRING = { stiffness: 55, damping: 18, mass: 0.6 }

export interface ParallaxSprings {
  springX: MotionValue<number>
  springY: MotionValue<number>
}

/**
 * Tracks the cursor as normalized offsets (-0.5..0.5) smoothed by springs.
 * Only active on desktop pointer devices; disabled for reduced-motion users.
 */
export function useMouseParallax(): ParallaxSprings {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, SPRING)
  const springY = useSpring(pointerY, SPRING)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const desktopPointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)')

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }

    const sync = () => {
      if (desktopPointer.matches) {
        window.addEventListener('mousemove', handleMove, { passive: true })
      } else {
        window.removeEventListener('mousemove', handleMove)
        pointerX.set(0)
        pointerY.set(0)
      }
    }

    sync()
    desktopPointer.addEventListener('change', sync)

    return () => {
      desktopPointer.removeEventListener('change', sync)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [pointerX, pointerY, prefersReducedMotion])

  return { springX, springY }
}
