import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { getA11ySettings } from '../a11y/a11yStore'
import { ORIGINS } from './data'
import OriginCard from './OriginCard'
import OriginsBackground from './OriginsBackground'
import WorldMap, { createWorldMapEls } from './WorldMap'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface OriginsMobileProps {
  onSelectOrigin: (id: OriginId) => void
  reduced: boolean
}

/**
 * Simplified premium experience for touch / small screens:
 * the flat dot-matrix map with tap-able bean markers, synced with
 * swipeable origin cards below.
 */
function OriginsMobile({ onSelectOrigin, reduced }: OriginsMobileProps) {
  const { t } = useI18n()
  const wrapRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollTimer = useRef<number | undefined>(undefined)
  const mapEls = useRef(createWorldMapEls())
  const [activeIndex, setActiveIndex] = useState(0)
  const playedRef = useRef(false)

  const stopMotion = useMemo(() => reduced || getA11ySettings().stopAnimations, [reduced])

  // One-shot entrance: beans pop onto the map one after another.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const els = mapEls.current
    const markers = els.markers.filter(Boolean)
    const beans = els.beans.filter(Boolean)
    const glows = els.glows.filter(Boolean)
    const labels = els.labels.filter(Boolean)

    if (stopMotion) {
      gsap.set(markers, { autoAlpha: 1 })
      gsap.set(beans, { scale: 1 })
      gsap.set(glows, { autoAlpha: 0.55, scale: 1 })
      gsap.set(labels, { autoAlpha: 1, y: 0 })
      return
    }

    gsap.set(markers, { autoAlpha: 0 })
    gsap.set(beans, { scale: 0, transformOrigin: '50% 50%' })
    gsap.set(glows, { autoAlpha: 0, scale: 0.4 })
    gsap.set(labels, { autoAlpha: 0, y: 6 })

    let tl: gsap.core.Timeline | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || playedRef.current) return
        playedRef.current = true
        io.disconnect()
        tl = gsap.timeline()
        ORIGINS.forEach((_, i) => {
          const at = 0.3 + (i % 3) * 0.09
          const marker = mapEls.current.markers[i]
          const bean = mapEls.current.beans[i]
          const glow = mapEls.current.glows[i]
          const ripple = mapEls.current.ripples[i]
          const label = mapEls.current.labels[i]
          if (marker) tl!.set(marker, { autoAlpha: 1 }, at)
          if (bean) tl!.to(bean, { scale: 1, duration: 0.7, ease: 'back.out(2.4)' }, at)
          if (ripple) {
            tl!.fromTo(ripple, { scale: 0.25, autoAlpha: 0.9 }, { scale: 2.4, autoAlpha: 0, duration: 0.9, ease: 'power1.out' }, at)
          }
          if (glow) tl!.to(glow, { autoAlpha: 0.55, scale: 1, duration: 0.8, ease: 'power2.out' }, at)
          if (label) tl!.to(label, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.3)
        })
      },
      { rootMargin: '-15% 0px' },
    )
    io.observe(wrap)
    return () => {
      io.disconnect()
      tl?.kill()
    }
  }, [stopMotion])

  const scrollToCard = useCallback((index: number) => {
    const carousel = carouselRef.current
    const child = carousel?.children[index] as HTMLElement | undefined
    if (!carousel || !child) return
    carousel.scrollTo({
      left: child.offsetLeft - (carousel.clientWidth - child.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [])

  // Swiping the cards highlights the matching bean on the map.
  const handleCarouselScroll = useCallback(() => {
    window.clearTimeout(scrollTimer.current)
    scrollTimer.current = window.setTimeout(() => {
      const carousel = carouselRef.current
      if (!carousel) return
      const center = carousel.scrollLeft + carousel.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      Array.from(carousel.children).forEach((child, index) => {
        const el = child as HTMLElement
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
        if (dist < bestDist) {
          bestDist = dist
          best = index
        }
      })
      setActiveIndex(best)
    }, 90)
  }, [])

  // Tap a bean on the map → swipe to its card.
  const handleMarkerSelect = useCallback(
    (index: number) => {
      setActiveIndex(index)
      scrollToCard(index)
    },
    [scrollToCard],
  )

  const handleExplore = useCallback(
    (index: number) => {
      onSelectOrigin(ORIGINS[index].id)
    },
    [onSelectOrigin],
  )

  return (
    <div ref={wrapRef} className="relative overflow-hidden py-20">
      <OriginsBackground />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-gold"
        >
          {t.origins.kicker}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-4 max-w-md font-display text-[clamp(2.1rem,8vw,3rem)] font-medium leading-[1.08]"
        >
          {t.origins.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60"
        >
          {t.origins.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10 mx-auto mt-10 w-[min(94vw,900px)] px-3 sm:px-0"
      >
        <div className="aspect-360/136 w-full">
          <WorldMap els={mapEls} hovered={activeIndex} onSelect={handleMarkerSelect} />
        </div>
      </motion.div>

      {/* Swipeable origin cards */}
      <div
        ref={carouselRef}
        onScroll={handleCarouselScroll}
        className="scrollbar-none relative z-10 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] pb-4"
        dir="ltr"
      >
        {ORIGINS.map((origin, index) => (
          <div key={origin.id} className="w-[82vw] max-w-sm shrink-0 snap-center" dir={t.dir}>
            <OriginCard
              index={index}
              text={t.origins.items[origin.id]}
              flavorNotesLabel={t.origins.flavorNotesLabel}
              compact
              footer={
                <button
                  type="button"
                  onClick={() => handleExplore(index)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cta/40 px-6 py-3 text-sm font-bold text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
                >
                  {t.collections.explore}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              }
            />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="relative z-10 mt-2 flex justify-center gap-2">
        {ORIGINS.map((origin, index) => (
          <button
            key={origin.id}
            type="button"
            aria-label={t.origins.items[origin.id].country}
            onClick={() => handleMarkerSelect(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-6 bg-gold' : 'w-2 bg-cream/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default OriginsMobile
