import { memo, useEffect, useRef, type MutableRefObject, type ReactNode } from 'react'
import { useI18n } from '../../i18n'
import CoffeeBean from '../hero/CoffeeBean'
import { ORIGINS } from './data'

// Visible latitude window (trims empty polar space, keeps a classic world-map crop)
export const MAP_LAT_MAX = 78
export const MAP_LAT_MIN = -58
export const MAP_ASPECT = 360 / (MAP_LAT_MAX - MAP_LAT_MIN) // ≈ 2.65 : 1

/** Fractional position of a lat/lon inside the map rectangle (0..1). */
export function mapPos(lat: number, lon: number): { x: number; y: number } {
  return {
    x: (lon + 180) / 360,
    y: (MAP_LAT_MAX - lat) / (MAP_LAT_MAX - MAP_LAT_MIN),
  }
}

export interface WorldMapEls {
  markers: (HTMLButtonElement | null)[]
  beans: (HTMLElement | null)[]
  glows: (HTMLElement | null)[]
  ripples: (HTMLElement | null)[]
  labels: (HTMLElement | null)[]
}

export function createWorldMapEls(): WorldMapEls {
  return { markers: [], beans: [], glows: [], ripples: [], labels: [] }
}

interface WorldMapProps {
  els: MutableRefObject<WorldMapEls>
  hovered: number
  onHover?: (index: number) => void
  onSelect: (index: number) => void
  /** Overlay content rendered above the markers (tooltips etc.). */
  children?: ReactNode
}

export function drawMap(canvas: HTMLCanvasElement, landDots: number[]) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(rect.width * dpr)
  canvas.height = Math.round(rect.height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const w = rect.width
  const h = rect.height

  // Faint graticule
  ctx.strokeStyle = 'rgba(43, 38, 37, 0.06)'
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let lon = -150; lon <= 150; lon += 30) {
    const x = ((lon + 180) / 360) * w
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
  }
  for (let lat = -30; lat <= 60; lat += 30) {
    const y = ((MAP_LAT_MAX - lat) / (MAP_LAT_MAX - MAP_LAT_MIN)) * h
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
  }
  ctx.stroke()

  // Land dots in three brightness buckets (single fill per bucket = fast)
  const raw = landDots
  const count = raw.length / 2
  const dotR = Math.max(0.55, (w / 1100) * 1.05)
  const buckets: [string, number][] = [
    ['rgba(200, 155, 91, 0.20)', 0],
    ['rgba(208, 166, 104, 0.34)', 1],
    ['rgba(222, 182, 122, 0.5)', 2],
  ]
  for (const [style, bucket] of buckets) {
    ctx.fillStyle = style
    ctx.beginPath()
    for (let i = 0; i < count; i++) {
      if (i % 3 !== bucket) continue
      const lat = raw[i * 2] / 100
      if (lat < MAP_LAT_MIN || lat > MAP_LAT_MAX) continue
      const lon = raw[i * 2 + 1] / 100
      const x = ((lon + 180) / 360) * w
      const y = ((MAP_LAT_MAX - lat) / (MAP_LAT_MAX - MAP_LAT_MIN)) * h
      const r = dotR * (0.75 + ((i * 2654435761) % 100) / 200)
      ctx.moveTo(x + r, y)
      ctx.arc(x, y, r, 0, Math.PI * 2)
    }
    ctx.fill()
  }
}

/**
 * Premium flat world map: gold dot-matrix continents on a glass panel,
 * with one interactive coffee-bean marker per origin. All beans are
 * visible at once; motion (pop-in, ripples, glow) is driven externally
 * through the `els` ref registry.
 */
const WorldMap = memo(function WorldMap({ els, hovered, onHover, onSelect, children }: WorldMapProps) {
  const { t } = useI18n()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    let observer: ResizeObserver | undefined
    // The dot data (~45 KB gzipped) loads off the critical path.
    import('./land-dots.json').then((mod) => {
      if (disposed) return
      const dots = mod.default as number[]
      drawMap(canvas, dots)
      observer = new ResizeObserver(() => drawMap(canvas, dots))
      observer.observe(canvas)
    })
    return () => {
      disposed = true
      observer?.disconnect()
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.42),rgba(230,220,199,0.75))] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(245,240,232,0.06)] backdrop-blur-sm">
      {/* Ambient light inside the frame */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_40%,rgba(200,155,91,0.08),transparent_70%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Origin markers */}
      {ORIGINS.map((origin, index) => {
        const pos = mapPos(origin.lat, origin.lon)
        const text = t.origins.items[origin.id]
        return (
          <button
            key={origin.id}
            ref={(el) => {
              els.current.markers[index] = el
            }}
            type="button"
            data-origin-marker="true"
            aria-label={`${text.country} — ${text.profile}`}
            onClick={() => onSelect(index)}
            onMouseEnter={() => onHover?.(index)}
            onMouseLeave={() => onHover?.(-1)}
            onFocus={() => onHover?.(index)}
            onBlur={() => onHover?.(-1)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%` }}
          >
            {/* country glow (brightens the continent under the bean) */}
            <span
              ref={(el) => {
                els.current.glows[index] = el
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,189,124,0.4),rgba(200,155,91,0.12)_45%,transparent_70%)] mix-blend-screen"
            />
            {/* landing ripple */}
            <span
              ref={(el) => {
                els.current.ripples[index] = el
              }}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/70 opacity-0 shadow-[0_0_28px_rgba(200,155,91,0.4)]"
            />
            {/* halo on hover/selection */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-gold/10 blur-[1px] transition-all duration-500 ${
                hovered === index ? 'scale-110 opacity-100' : 'scale-75 opacity-0'
              }`}
            />
            {/* endless heartbeat rings around every landed bean */}
            <span aria-hidden="true" className="bean-pulse pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-gold/70" />
            <span
              aria-hidden="true"
              className="bean-pulse pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-gold/50"
              style={{ animationDelay: '1.3s' }}
            />
            {/* the bean itself: outer span is GSAP's pop target, inner span owns the CSS hover scale */}
            <span
              ref={(el) => {
                els.current.beans[index] = el
              }}
              className="relative block w-6 sm:w-7"
            >
              <span
                className={`block transition-transform duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
                  hovered === index ? 'scale-125' : 'group-hover:scale-125'
                }`}
              >
                <span className="bean-breathe block">
                  <CoffeeBean className="w-full" />
                </span>
              </span>
            </span>
          </button>
        )
      })}

      {children}

      {/* Frame vignette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(120%_120%_at_50%_50%,transparent_62%,rgba(43,38,37,0.06)_100%)]" />
    </div>
  )
})

export default WorldMap
