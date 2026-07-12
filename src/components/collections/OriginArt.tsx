import { memo, useId, useMemo } from 'react'
import type { OriginMeta } from '../origins/data'

interface OriginArtProps {
  origin: OriginMeta
  index: number
  className?: string
}

function mulberry32(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function ridgePath(rnd: () => number, baseY: number, amp: number): string {
  const steps = 7
  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const x = (800 / steps) * i
    const y = baseY - amp * (0.35 + rnd() * 0.65) * (i % 2 === 0 ? 0.55 : 1)
    points.push([x, y])
  }
  let d = `M -10 ${points[0][1].toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    d += ` Q ${x1.toFixed(1)} ${y1.toFixed(1)} ${((x1 + x2) / 2).toFixed(1)} ${((y1 + y2) / 2).toFixed(1)}`
  }
  d += ` L 810 ${points[points.length - 1][1].toFixed(1)} L 810 610 L -10 610 Z`
  return d
}

/**
 * Generative duotone landscape — abstract high-altitude terrain unique to
 * each origin. Keeps the collection imagery premium, cohesive, and fully
 * self-contained (no external assets).
 */
const OriginArt = memo(function OriginArt({ origin, index, className }: OriginArtProps) {
  const uid = useId()
  const { ridges, sunX, sunY, specks } = useMemo(() => {
    const rnd = mulberry32(9000 + index * 131)
    return {
      ridges: [ridgePath(rnd, 470, 150), ridgePath(rnd, 520, 190), ridgePath(rnd, 580, 210)],
      sunX: 180 + rnd() * 440,
      sunY: 170 + rnd() * 90,
      specks: Array.from({ length: 14 }, () => ({
        x: rnd() * 800,
        y: 60 + rnd() * 300,
        r: 0.8 + rnd() * 1.8,
        o: 0.15 + rnd() * 0.4,
      })),
    }
  }, [index])

  const skyId = `${uid}-sky`
  const sunId = `${uid}-sun`
  const vigId = `${uid}-vig`

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={origin.art.sky[0]} />
          <stop offset="100%" stopColor={origin.art.sky[1]} />
        </linearGradient>
        <radialGradient id={sunId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={origin.art.accent} stopOpacity="0.95" />
          <stop offset="55%" stopColor={origin.art.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={origin.art.accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={vigId} cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#${skyId})`} />

      {/* altitude contour rings */}
      {[70, 110, 150, 195].map((r) => (
        <circle key={r} cx={sunX} cy={sunY} r={r} fill="none" stroke={origin.art.accent} strokeOpacity={0.12} strokeWidth="1" />
      ))}

      <circle cx={sunX} cy={sunY} r="150" fill={`url(#${sunId})`} />
      <circle cx={sunX} cy={sunY} r="46" fill={origin.art.accent} fillOpacity="0.9" />

      {specks.map((speck, i) => (
        <circle key={i} cx={speck.x} cy={speck.y} r={speck.r} fill={origin.art.accent} fillOpacity={speck.o} />
      ))}

      <path d={ridges[0]} fill={origin.art.ridge} fillOpacity="0.55" />
      <path d={ridges[1]} fill={origin.art.ridge} fillOpacity="0.8" />
      <path d={ridges[2]} fill={origin.art.ridge} />

      <rect width="800" height="600" fill={`url(#${vigId})`} />
    </svg>
  )
})

export default OriginArt
