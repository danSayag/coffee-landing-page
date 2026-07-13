import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useI18n } from '../../i18n'
import { getA11ySettings, subscribeA11y } from '../a11y/a11yStore'
import { useMediaQuery } from '../origins/OriginsSection'
import { EASE, SectionHeading, useSections } from './shared'

function TestimonialsSection() {
  const { dir } = useI18n()
  const s = useSections()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopAnim, setStopAnim] = useState(() => getA11ySettings().stopAnimations)

  useEffect(() => subscribeA11y(() => setStopAnim(getA11ySettings().stopAnimations)), [])

  const total = s.testimonials.items.length
  const perPage = isDesktop ? 3 : 1
  const go = (delta: number) => setIndex((current) => (current + delta + total) % total)

  // Slow auto-advance, paused on hover / reduced motion / "stop animations".
  useEffect(() => {
    if (paused || prefersReduced || stopAnim) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), 6500)
    return () => window.clearInterval(timer)
  }, [paused, prefersReduced, stopAnim, total])

  const visible = Array.from({ length: perPage }, (_, i) => s.testimonials.items[(index + i) % total])

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#EFE7D8_50%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_540px_at_85%_80%,rgba(200,155,91,0.06),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading eyebrow={s.testimonials.eyebrow} heading={s.testimonials.heading} />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div aria-live="polite" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <motion.blockquote
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 26, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                  className="relative flex flex-col rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.42),rgba(230,220,199,0.85))] p-7"
                >
                  <Quote className="h-6 w-6 text-gold/40 rtl:-scale-x-100" aria-hidden="true" />
                  <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-cream/90">{item.quote}</p>
                  <footer className="mt-6 border-t border-cream/10 pt-4">
                    <p className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 bg-gold/10 font-display text-sm italic text-gold"
                      >
                        {item.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-cream">{item.name}</span>
                        <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-cream/45">
                          {s.testimonials.types[item.type]}
                        </span>
                      </span>
                    </p>
                    <p className="mt-3 text-[0.72rem] text-cream/55">
                      {s.testimonials.favorite}: <span className="font-display italic text-gold-soft">{item.coffee}</span>
                    </p>
                  </footer>
                </motion.blockquote>
              ))}
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(dir === 'rtl' ? 1 : -1)}
              aria-label={s.testimonials.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {s.testimonials.items.map((item, i) => (
                <span
                  key={item.name}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-cream/20'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(dir === 'rtl' ? -1 : 1)}
              aria-label={s.testimonials.next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
