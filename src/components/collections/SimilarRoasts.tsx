import { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { ORIGINS, ORIGIN_INDEX } from '../origins/data'
import OriginArt from './OriginArt'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface SimilarRoastsProps {
  selectedId: OriginId
}

function SimilarRoasts({ selectedId }: SimilarRoastsProps) {
  const { t } = useI18n()
  const selected = ORIGINS[ORIGIN_INDEX[selectedId]]
  const recommendations = selected.similar.map((id) => ORIGINS[ORIGIN_INDEX[id]])

  return (
    <section id="similar" className="relative overflow-hidden pb-28 pt-4 lg:pb-36">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1b1410_0%,#15110f_55%,#110d0b_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_540px_at_14%_70%,rgba(200,155,91,0.06),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="border-t border-cream/10 pt-20 text-center lg:pt-24">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
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
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.75, ease: EASE, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(46,34,26,0.45),rgba(21,17,15,0.85))] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors duration-500 hover:border-gold/40"
                >
                  <div className="relative h-36 overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]">
                      <OriginArt origin={origin} index={ORIGIN_INDEX[origin.id]} className="h-full w-full" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 to-transparent" />
                    <p className="absolute bottom-3 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gold ltr:left-5 rtl:right-5">
                      {text.country}
                    </p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-medium text-cream">{text.coffeeName}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{text.blurb}</p>
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
