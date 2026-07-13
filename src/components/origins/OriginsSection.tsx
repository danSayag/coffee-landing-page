import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import CoffeeBean from '../hero/CoffeeBean'
import { getA11ySettings, subscribeA11y } from '../a11y/a11yStore'
import { ORIGINS } from './data'
import OriginCard from './OriginCard'
import OriginsBackground from './OriginsBackground'
import OriginsMobile from './OriginsMobile'
import WorldMap, { createWorldMapEls, mapPos } from './WorldMap'

export interface OriginsSectionProps {
  onSelectOrigin: (id: OriginId) => void
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Deterministic per-bean flight randomness
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

// Where each bean enters from (fractions of the section size), echoing the
// floating beans that drift out of the hero above.
const BEAN_STARTS = [
  { x: 0.16, y: -0.16 },
  { x: 0.8, y: -0.12 },
  { x: 0.3, y: -0.2 },
  { x: 0.68, y: -0.22 },
  { x: 0.07, y: -0.1 },
  { x: 0.9, y: -0.18 },
]

const BEAN_SIZES = [46, 36, 52, 40, 34, 44]

function OriginsDesktop({ onSelectOrigin }: OriginsSectionProps) {
  const { t } = useI18n()

  const wrapRef = useRef<HTMLDivElement>(null)
  const kickerRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const mapWrapRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const beanRefs = useRef<(HTMLDivElement | null)[]>([])
  const wobbleRefs = useRef<(HTMLDivElement | null)[]>([])
  const wobbleTweens = useRef<gsap.core.Tween[]>([])
  const flightTl = useRef<gsap.core.Timeline | null>(null)
  const mapEls = useRef(createWorldMapEls())
  const playedRef = useRef(false)

  const [hovered, setHovered] = useState(-1)
  const [selected, setSelected] = useState(-1)

  // Accessibility: "stop animations" pauses wobble and fast-forwards the flight.
  useEffect(() => {
    const apply = () => {
      const stop = getA11ySettings().stopAnimations
      wobbleTweens.current.forEach((tween) => (stop ? tween.pause() : tween.play()))
      if (stop && flightTl.current && flightTl.current.progress() < 1) {
        flightTl.current.progress(1)
      }
    }
    apply()
    return subscribeA11y(apply)
  }, [])

  // Close the story card with Escape.
  useEffect(() => {
    if (selected < 0) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  // Opening a story card brings the whole section (and the card) into view,
  // in case the map was only partly visible when the bean was clicked.
  useEffect(() => {
    if (selected < 0 || !wrapRef.current) return
    gsap.to(window, {
      scrollTo: { y: wrapRef.current, offsetY: 90 },
      duration: 1,
      ease: 'power2.inOut',
    })
  }, [selected])

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const mapWrap = mapWrapRef.current
    if (!wrap || !mapWrap) return

    const els = mapEls.current
    const setFinalState = () => {
      gsap.set([kickerRef.current, titleRef.current, subtitleRef.current, hintRef.current], { autoAlpha: 1, y: 0 })
      gsap.set(mapWrap, { autoAlpha: 1, scale: 1, y: 0, pointerEvents: 'auto' })
      gsap.set(els.markers.filter(Boolean), { autoAlpha: 1 })
      gsap.set(els.beans.filter(Boolean), { scale: 1 })
      gsap.set(els.glows.filter(Boolean), { autoAlpha: 0.55, scale: 1 })
      gsap.set(els.labels.filter(Boolean), { autoAlpha: 1, y: 0 })
      gsap.set(beanRefs.current.filter(Boolean), { autoAlpha: 0 })
    }

    const ctx = gsap.context(() => {
      // The journey already played (e.g. a rebuild after language change):
      // restore the landed state without replaying.
      if (playedRef.current) {
        setFinalState()
        return
      }

      // --- initial states ---
      gsap.set([kickerRef.current, titleRef.current, subtitleRef.current], { autoAlpha: 0, y: 46 })
      gsap.set(mapWrap, { autoAlpha: 0, scale: 0.95, y: 60, pointerEvents: 'none' })
      gsap.set(hintRef.current, { autoAlpha: 0, y: 18 })
      gsap.set(els.markers.filter(Boolean), { autoAlpha: 0 })
      gsap.set(els.beans.filter(Boolean), { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(els.glows.filter(Boolean), { autoAlpha: 0, scale: 0.4 })
      gsap.set(els.labels.filter(Boolean), { autoAlpha: 0, y: 6 })
      gsap.set(beanRefs.current.filter(Boolean), { autoAlpha: 0 })

      const buildAndPlay = () => {
        playedRef.current = true
        const wrapRect = wrap.getBoundingClientRect()
        const mapRect = mapWrap.getBoundingClientRect()
        const w = wrapRect.width
        const h = wrapRect.height

        wobbleTweens.current.forEach((tween) => tween.kill())
        wobbleTweens.current = []

        const tl = gsap.timeline()
        flightTl.current = tl

        // reveal heading + map
        tl.to(kickerRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
        tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.12)
        tl.to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.24)
        tl.to(mapWrap, { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 0.25)

        // --- the flock: all beans take off together, each with its own
        // curve, spin and pace, and land on their countries ---
        let lastLanding = 0
        ORIGINS.forEach((origin, i) => {
          const rnd = mulberry32(4242 + i * 31)
          const bean = beanRefs.current[i]
          if (!bean) return
          const start = { x: BEAN_STARTS[i].x * w, y: BEAN_STARTS[i].y * h }
          const pos = mapPos(origin.lat, origin.lon)
          const end = {
            x: mapRect.left - wrapRect.left + pos.x * mapRect.width - BEAN_SIZES[i] / 2,
            y: mapRect.top - wrapRect.top + pos.y * mapRect.height - BEAN_SIZES[i] / 2,
          }
          const launch = 0.55 + rnd() * 0.4
          const flight = 1.9 + rnd() * 0.9
          const landAt = launch + flight
          lastLanding = Math.max(lastLanding, landAt)
          const fromLeft = start.x < end.x
          const swing = (fromLeft ? 1 : -1) * (0.1 + rnd() * 0.14) * w

          gsap.set(bean, {
            x: start.x,
            y: start.y,
            rotation: rnd() * 360,
            scale: 0.85 + rnd() * 0.3,
            autoAlpha: 1,
          })

          // organic wobble layered on top of the flight path
          const wobble = wobbleRefs.current[i]
          if (wobble && !getA11ySettings().stopAnimations) {
            wobbleTweens.current.push(
              gsap.to(wobble, {
                x: 5 + rnd() * 6,
                y: 7 + rnd() * 6,
                rotation: 4 + rnd() * 5,
                duration: 1.6 + rnd() * 1.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              }),
            )
          }

          tl.to(
            bean,
            {
              motionPath: {
                path: [
                  { x: start.x, y: start.y },
                  { x: start.x + swing * 0.5, y: end.y - h * (0.34 + rnd() * 0.14) },
                  { x: end.x - swing, y: end.y - h * (0.14 + rnd() * 0.08) },
                  { x: end.x, y: end.y },
                ],
                curviness: 1.4,
              },
              duration: flight,
              ease: 'power2.inOut',
            },
            launch,
          )
          tl.to(bean, { rotation: `+=${(fromLeft ? 1 : -1) * (200 + rnd() * 200)}`, duration: flight, ease: 'power1.inOut' }, launch)
          tl.to(bean, { scale: 0.55, duration: flight * 0.85, ease: 'power1.in' }, launch)
          tl.to(bean, { scale: 0.22, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, landAt - 0.26)

          // touchdown: ripple, country glow, marker pop, label
          const marker = els.markers[i]
          const beanPop = els.beans[i]
          const glow = els.glows[i]
          const ripple = els.ripples[i]
          const label = els.labels[i]
          if (marker) tl.set(marker, { autoAlpha: 1 }, landAt - 0.18)
          if (beanPop) tl.to(beanPop, { scale: 1, duration: 0.7, ease: 'back.out(2.6)' }, landAt - 0.18)
          if (ripple) {
            tl.fromTo(
              ripple,
              { scale: 0.25, autoAlpha: 0.9 },
              { scale: 2.6, autoAlpha: 0, duration: 1, ease: 'power1.out' },
              landAt - 0.1,
            )
          }
          if (glow) {
            tl.to(glow, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, landAt - 0.1)
            tl.to(glow, { autoAlpha: 0.55, duration: 1.2 }, landAt + 0.8)
          }
          if (label) tl.to(label, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, landAt + 0.35)
        })

        // --- interactive finale: the map opens up for exploration ---
        tl.set(mapWrap, { pointerEvents: 'auto' }, lastLanding + 0.2)
        tl.to(hintRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, lastLanding + 0.5)
        tl.add(() => {
          wobbleTweens.current.forEach((tween) => tween.kill())
          wobbleTweens.current = []
        }, lastLanding + 0.6)

        if (getA11ySettings().stopAnimations) tl.progress(1)
      }

      ScrollTrigger.create({
        trigger: wrap,
        start: 'top 55%',
        once: true,
        onEnter: buildAndPlay,
      })
    }, wrapRef)

    return () => {
      wobbleTweens.current.forEach((tween) => tween.kill())
      wobbleTweens.current = []
      flightTl.current?.kill()
      flightTl.current = null
      ctx.revert()
    }
  }, [])

  const handleHover = useCallback((index: number) => setHovered(index), [])
  const handleSelect = useCallback((index: number) => setSelected((current) => (current === index ? -1 : index)), [])

  const handleExplore = useCallback(
    (index: number) => {
      onSelectOrigin(ORIGINS[index].id)
      setSelected(-1)
    },
    [onSelectOrigin],
  )

  // Clicking anywhere outside the open story card (but not a bean marker,
  // which owns its own toggle) dismisses it.
  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (selected < 0) return
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (cardRef.current?.contains(target)) return
      if (target instanceof Element && target.closest('[data-origin-marker]')) return
      setSelected(-1)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [selected])

  const hoveredOrigin = hovered >= 0 ? ORIGINS[hovered] : null
  const selectedOrigin = selected >= 0 ? ORIGINS[selected] : null
  // The story card opens on the emptier side of the map (opposite the bean).
  const cardOnLeft = selectedOrigin ? mapPos(selectedOrigin.lat, selectedOrigin.lon).x > 0.5 : false

  return (
    <div ref={wrapRef} className="relative overflow-hidden py-24 lg:py-28">
      <OriginsBackground />

      {/* Heading */}
      <div className="relative z-20 px-6 text-center">
        <p ref={kickerRef} className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold">
          {t.origins.kicker}
        </p>
        <h2
          ref={titleRef}
          className="mx-auto mt-4 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.06] tracking-[-0.01em]"
        >
          {t.origins.title}
        </h2>
        <p ref={subtitleRef} className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-cream/60">
          {t.origins.subtitle}
        </p>
      </div>

      {/* World map */}
      <div ref={mapWrapRef} className="relative z-10 mx-auto mt-12 w-[min(84vw,1240px)] aspect-360/136">
        <WorldMap els={mapEls} hovered={hovered} onHover={handleHover} onSelect={handleSelect}>
          {/* Hover tooltip anchored to the hovered bean */}
          <AnimatePresence>
            {hoveredOrigin && hovered !== selected && (
              <motion.div
                key={hoveredOrigin.id}
                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute z-30 w-52 -translate-x-1/2 -translate-y-full rounded-2xl border border-gold/30 bg-espresso-900/95 p-4 text-center shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-md"
                style={{
                  left: `${mapPos(hoveredOrigin.lat, hoveredOrigin.lon).x * 100}%`,
                  top: `calc(${mapPos(hoveredOrigin.lat, hoveredOrigin.lon).y * 100}% - 30px)`,
                }}
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gold">
                  {t.origins.items[hoveredOrigin.id].country}
                </p>
                <p className="mt-1.5 font-display text-lg italic leading-snug text-cream">
                  {t.origins.items[hoveredOrigin.id].profile}
                </p>
                <p className="mt-1 text-xs text-cream/60">{t.origins.items[hoveredOrigin.id].roast}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </WorldMap>

        {/* Origin story card (opens on bean click) */}
        <AnimatePresence>
          {selectedOrigin && (
            <motion.div
              key={selectedOrigin.id}
              initial={{ opacity: 0, x: cardOnLeft ? -44 : 44, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: cardOnLeft ? -28 : 28, transition: { duration: 0.25 } }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute top-1/2 z-40 w-[350px] -translate-y-1/2 xl:w-[400px] ${
                cardOnLeft ? 'left-2 xl:left-6' : 'right-2 xl:right-6'
              }`}
            >
              <div ref={cardRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSelected(-1)}
                  aria-label={t.origins.closeCard}
                  className="absolute -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-espresso-900 text-cream/70 shadow-lg transition-colors hover:bg-gold hover:text-espresso-950 ltr:-right-3 rtl:-left-3"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
                <OriginCard
                  index={selected}
                  text={t.origins.items[selectedOrigin.id]}
                  flavorNotesLabel={t.origins.flavorNotesLabel}
                  footer={
                    <button
                      type="button"
                      onClick={() => handleExplore(selected)}
                      className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_10px_30px_-10px_rgba(200,155,91,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
                    >
                      {t.collections.explore}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive hint */}
      <div ref={hintRef} className="relative z-20 mt-10 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-espresso-900/70 px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur-md">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" aria-hidden="true" />
          {t.origins.interactiveHint}
        </p>
      </div>

      {/* Flying beans */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
        {ORIGINS.map((origin, index) => (
          <div
            key={origin.id}
            ref={(el) => {
              beanRefs.current[index] = el
            }}
            className="absolute left-0 top-0 opacity-0 will-change-transform"
            style={{ width: BEAN_SIZES[index] }}
          >
            <div
              ref={(el) => {
                wobbleRefs.current[index] = el
              }}
              className="drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)]"
            >
              <CoffeeBean className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OriginsSection({ onSelectOrigin }: OriginsSectionProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <section id="origins" className="relative">
      {isDesktop && !prefersReduced ? (
        <OriginsDesktop onSelectOrigin={onSelectOrigin} />
      ) : (
        <OriginsMobile onSelectOrigin={onSelectOrigin} reduced={prefersReduced} />
      )}
    </section>
  )
}

export default OriginsSection
