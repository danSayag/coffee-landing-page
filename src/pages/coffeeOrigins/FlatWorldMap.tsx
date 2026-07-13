import { useEffect, useRef } from 'react'
import { drawMap, mapPos } from '../../components/origins/WorldMap'
import { COFFEE_ORIGIN_POINTS, type CoffeeOriginId } from './data'
import OriginMarker from './OriginMarker'

interface FlatWorldMapProps {
  activeId: CoffeeOriginId
  countryLabels: Record<CoffeeOriginId, string>
  ariaLabel: string
}

/**
 * Reduced-motion fallback for the 3D globe: a static dot-matrix world map.
 * No rotation, no pulsing, no continuous animation — the active origin is
 * simply drawn larger with its label shown, and updates immediately.
 */
function FlatWorldMap({ activeId, countryLabels, ariaLabel }: FlatWorldMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    let observer: ResizeObserver | undefined
    import('../../components/origins/land-dots.json').then((mod) => {
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
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative aspect-360/136 w-full overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.42),rgba(230,220,199,0.75))] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.4)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      {COFFEE_ORIGIN_POINTS.map((point) => {
        const pos = mapPos(point.lat, point.lon)
        const active = point.id === activeId
        return (
          <div
            key={point.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, zIndex: active ? 10 : 1 }}
          >
            <OriginMarker active={active} label={active ? countryLabels[point.id] : undefined} animate={false} />
          </div>
        )
      })}
    </div>
  )
}

export default FlatWorldMap
