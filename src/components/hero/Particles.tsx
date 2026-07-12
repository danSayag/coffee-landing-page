import { memo, useMemo, type CSSProperties } from 'react'

const PARTICLE_COUNT = 18

// Deterministic PRNG so particle layout is stable across renders and strict-mode remounts.
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

const Particles = memo(function Particles() {
  const particles = useMemo(() => {
    const random = mulberry32(2026)
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      id: index,
      left: `${(random() * 100).toFixed(2)}%`,
      top: `${(18 + random() * 78).toFixed(2)}%`,
      size: 1.5 + random() * 2.5,
      duration: 16 + random() * 14,
      delay: -random() * 24,
      opacity: 0.12 + random() * 0.3,
      driftX: `${(-24 + random() * 48).toFixed(1)}px`,
    }))
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="hero-particle"
          style={
            {
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              '--particle-opacity': particle.opacity,
              '--particle-x': particle.driftX,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
})

export default Particles
