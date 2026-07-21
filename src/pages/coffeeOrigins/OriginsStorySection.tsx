import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { useStopAnimations } from '../../components/a11y/useStopAnimations'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { EASE } from '../../lib/motion'
import { COFFEE_ORIGIN_ORDER, type CoffeeOriginId } from './data'
import { coffeeOriginsContent } from './content'
import OriginContent from './OriginContent'
import FlatWorldMap from './FlatWorldMap'

const CoffeeGlobe = lazy(() => import('./CoffeeGlobe'))

function OriginsStorySection() {
  const { lang } = useI18n()
  const content = coffeeOriginsContent[lang]
  const navigate = useNavigate()
  const osReduced = useStopAnimations()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const useGlobe = isDesktop && !osReduced
  const activeId = COFFEE_ORIGIN_ORDER[activeIndex]

  const countryLabels = useMemo(
    () => Object.fromEntries(content.items.map((item) => [item.id, item.country])) as Record<CoffeeOriginId, string>,
    [content],
  )

  // Track which story step is centered in the viewport (same technique as the navbar scroll-spy).
  useEffect(() => {
    const els = stepRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (els.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = els.indexOf(entry.target as HTMLDivElement)
            if (index >= 0) setActiveIndex(index)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [content])

  const handleExplore = (id: CoffeeOriginId) => {
    navigate('/coffee', { state: { selectedOrigin: id, fromGlobe: false } })
  }

  return (
    // No overflow-hidden on this section: it would become the sticky containing
    // scrollport and the visualization would stop sticking entirely.
    <section id="coffee-origins-story" aria-label={content.hero.heading} className="relative py-16 lg:py-0">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Visualization: stacked above the story on mobile (sticky when the screen is
            tall enough), sticky beside the story on desktop */}
        <div className="order-1 top-20 z-30 bg-espresso-950 pb-3 [@media(min-height:640px)]:sticky lg:order-2 lg:top-24 lg:z-auto lg:flex lg:h-[72vh] lg:items-center lg:bg-transparent lg:pb-0">
          <div className={`relative w-full overflow-hidden rounded-[2rem] ${useGlobe ? 'flex h-full items-center' : ''}`}>
            {useGlobe ? (
              <Suspense fallback={<FlatWorldMap activeId={activeId} countryLabels={countryLabels} ariaLabel={content.globeLabel} />}>
                <CoffeeGlobe activeId={activeId} countryLabels={countryLabels} paused={osReduced} ariaLabel={content.globeLabel} />
              </Suspense>
            ) : (
              <FlatWorldMap activeId={activeId} countryLabels={countryLabels} ariaLabel={content.mapLabel} />
            )}
          </div>
          <p aria-live="polite" className="sr-only">
            {content.activeAnnouncement.replace('{country}', countryLabels[activeId])}
          </p>
        </div>

        {/* Story steps */}
        <div className="order-2 mt-10 lg:order-1 lg:mt-0">
          {content.items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                stepRefs.current[index] = el
              }}
              className="flex min-h-[50vh] flex-col justify-center py-10 lg:min-h-screen lg:py-0"
            >
              <motion.div
                initial={osReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={osReduced ? { duration: 0 } : { duration: 0.7, ease: EASE }}
              >
                <OriginContent item={item} index={index} total={content.items.length} labels={content.labels} onExplore={() => handleExplore(item.id)} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OriginsStorySection
