import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ORIGINS } from '../origins/data'
import OriginArt from '../collections/OriginArt'
import { EASE, SectionHeading, useSections } from './shared'

const GOLD = '#8FA89B'

/** Compact illustrated "moments" — coffee textures, brewing, café life. */
function MomentArt({ kind }: { kind: string }) {
  const bg = <rect width="200" height="200" fill="#191009" />
  switch (kind) {
    case 'green':
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          {bg}
          {Array.from({ length: 14 }, (_, i) => {
            const x = 22 + ((i * 47) % 160)
            const y = 20 + ((i * 71) % 160)
            const rot = (i * 53) % 360
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
                <ellipse rx="13" ry="18" fill={i % 3 ? '#94a06b' : '#a3ad7c'} />
                <path d="M0 -16 C -7 -6, 7 6, 0 17" stroke="#5d6844" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )
          })}
        </svg>
      )
    case 'roast':
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          {bg}
          <circle cx="100" cy="100" r="66" fill="#20150e" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.6" />
          <circle cx="100" cy="104" r="46" fill="#e8964a" opacity="0.25" />
          {[0, 60, 120].map((a) => (
            <line key={a} x1="100" y1="48" x2="100" y2="152" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.6" transform={`rotate(${a} 100 100)`} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i} transform={`translate(${72 + ((i * 31) % 60)} ${86 + ((i * 19) % 44)}) rotate(${i * 40})`}>
              <ellipse rx="7" ry="10" fill="#5e3d24" />
            </g>
          ))}
        </svg>
      )
    case 'espresso':
      return (
        <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect width="200" height="260" fill="#170f0a" />
          <rect x="60" y="20" width="80" height="34" rx="6" fill="#20150e" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.6" />
          <line x1="92" y1="54" x2="90" y2="120" stroke="#8a5c36" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="54" x2="110" y2="120" stroke="#8a5c36" strokeWidth="3" strokeLinecap="round" />
          <path d="M 66 126 L 134 126 L 128 168 Q 126 176 116 176 L 84 176 Q 74 176 72 168 Z" fill="#22150d" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.8" />
          <ellipse cx="100" cy="126" rx="30" ry="5" fill="#6b4423" />
          <ellipse cx="100" cy="216" rx="52" ry="8" fill="#000" opacity="0.4" />
        </svg>
      )
    case 'pour':
      return (
        <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect width="200" height="260" fill="#1a110b" />
          <path d="M 40 44 L 96 44 L 96 66 L 56 78 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.6" />
          <path d="M 96 52 Q 128 52 128 84" fill="none" stroke={GOLD} strokeOpacity="0.7" strokeWidth="1.6" strokeDasharray="3 5" />
          <path d="M 92 96 L 164 96 L 134 148 L 122 148 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.8" />
          <line x1="128" y1="148" x2="128" y2="168" stroke={GOLD} strokeOpacity="0.7" strokeWidth="1.4" strokeDasharray="3 5" />
          <path d="M 96 172 L 160 172 L 154 208 Q 153 216 144 216 L 112 216 Q 103 216 102 208 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.8" />
        </svg>
      )
    case 'latte':
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect width="200" height="200" fill="#1c130d" />
          <circle cx="100" cy="100" r="72" fill="#8a5c36" stroke={GOLD} strokeOpacity="0.5" strokeWidth="2" />
          <path
            d="M 100 48 C 84 70, 92 78, 100 92 C 108 78, 116 70, 100 48 M 100 92 C 86 110, 92 118, 100 130 C 108 118, 114 110, 100 92 M 100 130 C 92 142, 96 150, 100 158"
            fill="#e9dcc3"
            opacity="0.9"
          />
          <circle cx="100" cy="100" r="80" fill="none" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.4" />
        </svg>
      )
    case 'interior':
      return (
        <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect width="300" height="200" fill="#1b120c" />
          <rect x="30" y="26" width="90" height="110" rx="4" fill="#0e0a07" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.6" />
          <line x1="75" y1="26" x2="75" y2="136" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.4" />
          <circle cx="60" cy="58" r="16" fill="#e8c88f" opacity="0.14" />
          <line x1="170" y1="60" x2="170" y2="86" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.4" />
          <path d="M 152 86 Q 170 72 188 86 L 182 100 L 158 100 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.4" />
          <circle cx="170" cy="106" r="4" fill="#e8c88f" opacity="0.8" />
          <rect x="140" y="140" width="130" height="8" rx="3" fill="#2a1c12" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" />
          <path d="M 190 122 L 210 122 L 207 138 L 193 138 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.3" />
        </svg>
      )
    default: // quiet moment
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <rect width="200" height="200" fill="#18100a" />
          <circle cx="160" cy="34" r="50" fill="#e8c88f" opacity="0.08" />
          <rect x="36" y="120" width="128" height="7" rx="3" fill="#2a1c12" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" />
          <path d="M 60 96 L 92 96 L 88 118 L 64 118 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M 92 102 Q 102 104 100 112 L 90 110" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.4" />
          <rect x="112" y="104" width="34" height="14" rx="2" fill="#241812" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.2" />
          <line x1="129" y1="104" x2="129" y2="118" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1" />
        </svg>
      )
  }
}

interface Tile {
  kind: string
  aspect: string
  originIndex?: number
}

const TILES: Tile[] = [
  { kind: 'green', aspect: 'aspect-square' },
  { kind: 'roast', aspect: 'aspect-4/5' },
  { kind: 'espresso', aspect: 'aspect-3/4' },
  { kind: 'pour', aspect: 'aspect-4/5' },
  { kind: 'latte', aspect: 'aspect-square' },
  { kind: 'interior', aspect: 'aspect-4/3' },
  { kind: 'origin', aspect: 'aspect-3/4', originIndex: 0 },
  { kind: 'origin', aspect: 'aspect-4/3', originIndex: 4 },
  { kind: 'quiet', aspect: 'aspect-square' },
]

function GallerySection() {
  const s = useSections()
  const wrapRef = useRef<HTMLDivElement>(null)

  // Cursor-follow lighting (desktop): move a soft glow with the pointer.
  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    wrap.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    wrap.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }, [])

  return (
    <section id="gallery" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#F4F0EA_55%,#F1EBDF_100%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div ref={wrapRef} onMouseMove={handleMove} className="group/gallery relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* cursor-follow light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-700 group-hover/gallery:opacity-100 max-lg:hidden"
          style={{
            background: 'radial-gradient(280px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(200,155,91,0.09), transparent 70%)',
          }}
        />

        <SectionHeading heading={s.gallery.heading} />

        <div className="mt-14 columns-2 gap-4 lg:columns-3 lg:gap-5 [column-fill:balance]">
          {TILES.map((tile, index) => {
            const caption = s.gallery.items[index]?.caption ?? ''
            return (
              <motion.figure
                key={index}
                initial={{ opacity: 0, clipPath: 'inset(14% 10% 14% 10% round 20px)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.95, ease: EASE, delay: (index % 3) * 0.1 }}
                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-cream/10 lg:mb-5 ${tile.aspect}`}
              >
                <div className="h-full w-full transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]">
                  {tile.kind === 'origin' && tile.originIndex !== undefined ? (
                    <OriginArt origin={ORIGINS[tile.originIndex]} index={tile.originIndex} className="h-full w-full" />
                  ) : (
                    <MomentArt kind={tile.kind} />
                  )}
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-soft/90 ltr:left-4 rtl:right-4">
                  {caption}
                </figcaption>
              </motion.figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
