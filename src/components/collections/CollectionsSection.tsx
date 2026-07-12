import { Fragment, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPinned } from 'lucide-react'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { ORIGINS, type OriginMeta } from '../origins/data'
import OriginArt from './OriginArt'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export interface OriginSelection {
  id: OriginId
  fromGlobe: boolean
  at: number
}

interface CollectionsSectionProps {
  selection: OriginSelection | null
  onExplore: (id: OriginId) => void
}

interface CollectionCardProps {
  origin: OriginMeta
  index: number
  highlighted: boolean
  fromGlobe: boolean
  onExplore: (id: OriginId) => void
}

function CollectionCard({ origin, index, highlighted, fromGlobe, onExplore }: CollectionCardProps) {
  const { t } = useI18n()
  const text = t.origins.items[origin.id]

  return (
    <motion.article
      id={`coffee-${origin.id}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: EASE, delay: (index % 3) * 0.1 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: highlighted ? -10 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[linear-gradient(165deg,rgba(46,34,26,0.5),rgba(21,17,15,0.85))] backdrop-blur-sm transition-[border-color,box-shadow] duration-700 ${
          highlighted
            ? 'border-gold shadow-[0_0_0_1px_rgba(200,155,91,0.9),0_30px_80px_-20px_rgba(200,155,91,0.28)]'
            : 'border-cream/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] hover:border-gold/40'
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            animate={{ scale: highlighted ? 1.12 : 1 }}
            transition={{ duration: 4.5, ease: 'easeOut' }}
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
          >
            <OriginArt origin={origin} index={index} className="h-full w-full" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />

          <AnimatePresence>
            {highlighted && fromGlobe && (
              <motion.p
                initial={{ opacity: 0, y: -14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                className="absolute top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-espresso-950/85 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md ltr:left-4 rtl:right-4"
              >
                <MapPinned className="h-3.5 w-3.5" aria-hidden="true" />
                {t.collections.selectedBadge}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="absolute bottom-4 rounded-full border border-cream/15 bg-espresso-950/70 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream/80 backdrop-blur-sm ltr:left-4 rtl:right-4">
            {text.roast}
          </p>
        </div>

        <div className="flex flex-1 flex-col p-6 xl:p-7">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-gold">{text.country}</p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-cream xl:text-[1.7rem]">
            {text.coffeeName}
          </h3>
          <p className="mt-1.5 font-display text-sm italic text-gold-soft/90">
            {text.notes.map((note, noteIndex) => (
              <Fragment key={note}>
                {noteIndex > 0 && <span className="mx-1.5 not-italic text-gold/50">•</span>}
                {note}
              </Fragment>
            ))}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/60">{text.collectionDescription}</p>

          <button
            type="button"
            onClick={() => onExplore(origin.id)}
            className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full border border-gold/50 px-6 py-3 text-[0.8rem] font-bold tracking-wide text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-espresso-950 hover:shadow-[0_12px_32px_-10px_rgba(200,155,91,0.55)]"
          >
            {t.collections.explore}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.article>
  )
}

function CollectionsSection({ selection, onExplore }: CollectionsSectionProps) {
  const { t } = useI18n()
  const [highlight, setHighlight] = useState<OriginSelection | null>(null)

  // Highlight the selected collection, then let it fade after a few seconds.
  useEffect(() => {
    if (!selection) return
    setHighlight(selection)
    const timer = window.setTimeout(() => setHighlight(null), 5000)
    return () => window.clearTimeout(timer)
  }, [selection])

  return (
    <section id="coffee" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#140f0c_0%,#15110f_40%,#1b1410_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_80%_10%,rgba(200,155,91,0.07),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold"
          >
            {t.collections.kicker}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.06]"
          >
            {t.collections.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
            className="mt-4 text-base leading-relaxed text-cream/60"
          >
            {t.collections.subtitle}
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {ORIGINS.map((origin, index) => (
            <CollectionCard
              key={origin.id}
              origin={origin}
              index={index}
              highlighted={highlight?.id === origin.id}
              fromGlobe={Boolean(highlight?.fromGlobe)}
              onExplore={onExplore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionsSection
