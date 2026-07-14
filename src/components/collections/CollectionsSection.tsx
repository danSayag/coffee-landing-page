import { Fragment, useEffect, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPinned } from 'lucide-react'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { ORIGINS, ORIGIN_INDEX, type OriginMeta } from '../origins/data'
import OriginArt from './OriginArt'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const COUNT = ORIGINS.length
const SWIPE_THRESHOLD = 64

export interface OriginSelection {
  id: OriginId
  fromGlobe: boolean
  at: number
}

interface CollectionsSectionProps {
  selection: OriginSelection | null
  onExplore: (id: OriginId) => void
}

/** Signed circular distance from the active card, so the deck wraps endlessly. */
function circularOffset(index: number, active: number): number {
  const raw = (((index - active) % COUNT) + COUNT) % COUNT
  return raw > COUNT / 2 ? raw - COUNT : raw
}

interface CollectionCardProps {
  origin: OriginMeta
  index: number
  isActive: boolean
  showBadge: boolean
  onExplore: (id: OriginId) => void
}

function CollectionCard({ origin, index, isActive, showBadge, onExplore }: CollectionCardProps) {
  const { t } = useI18n()
  const text = t.origins.items[origin.id]

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-[linear-gradient(165deg,rgba(255,255,255,0.5),rgba(230,220,199,0.85))] backdrop-blur-sm transition-[border-color,box-shadow] duration-700 ${
        isActive
          ? 'border-gold shadow-[0_0_0_1px_rgba(200,155,91,0.9),0_30px_80px_-20px_rgba(200,155,91,0.28)]'
          : 'border-cream/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <OriginArt origin={origin} index={index} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />

        <AnimatePresence>
          {showBadge && (
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
          tabIndex={isActive ? 0 : -1}
          onClick={() => onExplore(origin.id)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 text-[0.8rem] font-bold tracking-wide text-espresso-950 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
        >
          {t.collections.explore}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

function CollectionsSection({ selection, onExplore }: CollectionsSectionProps) {
  const { t, dir } = useI18n()
  const reduce = useStopAnimations()
  const [active, setActive] = useState(0)
  const [badge, setBadge] = useState<OriginSelection | null>(null)

  // In RTL the deck fans out mirrored, so "next" still moves in reading direction.
  const mirror = dir === 'rtl' ? -1 : 1

  const step = (delta: number) => setActive((current) => (current + delta + COUNT) % COUNT)

  // Bring the selected coffee (map, quiz, similar-roasts) to the front of the deck,
  // then let its badge fade after a few seconds.
  useEffect(() => {
    if (!selection) return
    setActive(ORIGIN_INDEX[selection.id])
    setBadge(selection)
    const timer = window.setTimeout(() => setBadge(null), 5000)
    return () => window.clearTimeout(timer)
  }, [selection])

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) step(1 * mirror)
    else if (info.offset.x > SWIPE_THRESHOLD) step(-1 * mirror)
  }

  const activeText = t.origins.items[ORIGINS[active].id]

  return (
    <section id="coffee" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#ECE3D2_0%,#F4F0EA_55%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_720px_at_78%_30%,rgba(200,155,91,0.08),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_620px_at_6%_88%,rgba(143,168,155,0.10),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
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

        {/* Endless card deck: the focused coffee sits in the middle, neighbours fan out behind. */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mt-14"
        >
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-md">
            {/* Invisible in-flow copy of the active card gives the deck its height. */}
            <div className="invisible" aria-hidden="true">
              <CollectionCard origin={ORIGINS[active]} index={active} isActive showBadge={false} onExplore={() => {}} />
            </div>

            {ORIGINS.map((origin, index) => {
              const off = circularOffset(index, active)
              const depth = Math.abs(off)
              const hidden = depth > 2
              const isActiveCard = off === 0
              const text = t.origins.items[origin.id]

              return (
                <motion.div
                  key={origin.id}
                  animate={{
                    x: `${Math.sign(off) * [0, 52, 90][depth] * mirror}%`,
                    y: depth * 14,
                    scale: 1 - depth * 0.12,
                    opacity: hidden ? 0 : isActiveCard ? 1 : depth === 1 ? 0.5 : 0.14,
                  }}
                  transition={reduce ? { duration: 0 } : { duration: 0.65, ease: EASE }}
                  style={{ zIndex: 30 - depth * 10, pointerEvents: hidden ? 'none' : 'auto' }}
                  drag={isActiveCard && !reduce ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={isActiveCard ? handleDragEnd : undefined}
                  className="absolute inset-x-0 top-0"
                >
                  <div aria-hidden={!isActiveCard} className="h-full">
                    <CollectionCard
                      origin={origin}
                      index={index}
                      isActive={isActiveCard}
                      showBadge={badge?.id === origin.id && badge.fromGlobe}
                      onExplore={onExplore}
                    />
                  </div>
                  {!isActiveCard && !hidden && (
                    <button
                      type="button"
                      aria-label={`${text.country} — ${text.coffeeName}`}
                      onClick={() => setActive(index)}
                      className="absolute inset-0 z-10 cursor-pointer rounded-3xl"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="relative z-40 mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label={t.collections.prev}
              onClick={() => step(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              <ChevronLeft className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </button>
            <div className="flex gap-1.5">
              {ORIGINS.map((origin, index) => {
                const dotText = t.origins.items[origin.id]
                return (
                  <button
                    key={origin.id}
                    type="button"
                    aria-label={`${dotText.country} — ${dotText.coffeeName}`}
                    aria-current={index === active}
                    onClick={() => setActive(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === active ? 'w-8 bg-gold' : 'w-4 bg-cream/15 hover:bg-cream/30'
                    }`}
                  />
                )
              })}
            </div>
            <button
              type="button"
              aria-label={t.collections.next}
              onClick={() => step(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              <ChevronRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden="true" />
            </button>
          </div>

          <p aria-live="polite" className="sr-only">
            {activeText.country} — {activeText.coffeeName}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CollectionsSection
