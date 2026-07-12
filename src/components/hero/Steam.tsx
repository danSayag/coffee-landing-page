import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface SteamProps {
  className?: string
}

const WISPS = [
  { d: 'M34 164 C 20 132, 48 108, 34 76 C 22 50, 44 30, 34 6', duration: 5.8, delay: 0 },
  { d: 'M62 168 C 48 138, 76 112, 62 82 C 50 54, 74 32, 62 4', duration: 6.9, delay: 1.6 },
  { d: 'M90 160 C 78 132, 104 108, 90 78 C 80 52, 100 32, 90 10', duration: 6.3, delay: 3 },
]

const Steam = memo(function Steam({ className }: SteamProps) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 120 170"
      className={`overflow-visible ${className ?? ''}`}
      style={{ filter: 'blur(7px)' }}
      aria-hidden="true"
      focusable="false"
    >
      {WISPS.map((wisp) => (
        <motion.path
          key={wisp.d}
          d={wisp.d}
          fill="none"
          stroke="#f5f0e8"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ opacity: reduceMotion ? 0.12 : 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0.3, 0], y: [14, -36] }}
          transition={{ duration: wisp.duration, delay: wisp.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
})

export default Steam
