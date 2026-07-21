import { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { EASE } from '../../lib/motion'
import SectionBackground from '../ui/SectionBackground'
import { ORIGINS, ORIGIN_INDEX } from '../origins/data'
import OriginArt from './OriginArt'

interface SimilarRoastsProps {
  selectedId: OriginId
}

function SimilarRoasts({ selectedId }: SimilarRoastsProps) {
  const { t } = useI18n()
  const reduce = useStopAnimations()
  const selected = ORIGINS[ORIGIN_INDEX[selectedId]]
  const recommendations = selected.similar.map((id) => ORIGINS[ORIGIN_INDEX[id]])

  return (
    <section id="similar" className="relative overflow-hidden pb-28 pt-4 lg:pb-36">
      <SectionBackground
        gradient="linear-gradient(180deg,#ECE3D2 0%,#F4F0EA 55%,#F4F0EA 100%)"
        overlays={['radial-gradient(820px 540px at 14% 70%,rgba(200,155,91,0.06),transparent 62%)']}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="border-t border-cream/10 pt-20 text-center lg:pt-24">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE }}
            className="font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.08]"
          >
            {t.similar.heading}
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-4 text-sm text-cream/55"
            >
              {t.similar.becauseYouChose}{' '}
              <span className="font-display text-base italic text-gold">
                {t.origins.items[selectedId].coffeeName}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {recommendations.map((origin, index) => {
              const text = t.origins.items[origin.id]
              return (
                <motion.article
                  key={origin.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: reduce ? 0 : 0.3 } }}
                  transition={reduce ? { duration: 0 } : { duration: 0.75, ease: EASE, delay: index * 0.1 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.45),rgba(230,220,199,0.85))] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-500 hover:border-gold/40"
                >
                  <div className="relative h-36 shrink-0 overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]">
                      <OriginArt origin={origin} index={ORIGIN_INDEX[origin.id]} className="h-full w-full" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 to-transparent" />
                    <p className="absolute bottom-3 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gold ltr:left-5 rtl:right-5">
                      {text.country}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-medium text-cream">{text.coffeeName}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">{text.blurb}</p>
                    <p className="mt-4 font-display text-sm italic text-gold-soft/90">
                      {text.notes.map((note, noteIndex) => (
                        <Fragment key={note}>
                          {noteIndex > 0 && <span className="mx-1.5 not-italic text-gold/50">•</span>}
                          {note}
                        </Fragment>
                      ))}
                    </p>
                    <p className="mt-3 inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold">
                      {text.roast}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default SimilarRoasts
