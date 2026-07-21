import { Fragment, memo, type ReactNode } from 'react'
import type { OriginText } from '../../i18n/translations'
import { formatIndex } from '../../lib/format'

interface OriginCardProps {
  index: number
  text: OriginText
  flavorNotesLabel: string
  compact?: boolean
  footer?: ReactNode
}

/**
 * Premium glassmorphism panel describing one coffee origin.
 * Purely presentational — visibility/motion is driven by GSAP (desktop)
 * or the swipe carousel (mobile).
 */
const OriginCard = memo(function OriginCard({ index, text, flavorNotesLabel, compact, footer }: OriginCardProps) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/25 bg-[linear-gradient(150deg,rgba(255,255,255,0.72),rgba(230,220,199,0.82))] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(245,240,232,0.07)] backdrop-blur-xl ${
        compact ? 'p-6' : 'p-7 xl:p-8'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 h-40 w-40 rounded-full bg-gold/15 blur-3xl ltr:-right-12 rtl:-left-12"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <header className="flex items-baseline gap-3">
        <span className="font-display text-sm italic text-gold/70">{formatIndex(index)}</span>
        <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.34em] text-gold">{text.country}</h3>
      </header>

      <p className={`mt-3 font-display font-medium leading-tight text-cream ${compact ? 'text-2xl' : 'text-[1.75rem] xl:text-3xl'}`}>
        {text.region}
      </p>

      <p className={`mt-3 flex-1 leading-relaxed text-cream/70 ${compact ? 'text-sm' : 'text-[0.95rem]'}`}>{text.description}</p>

      <div className="mt-5 border-t border-cream/10 pt-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cream/45">{flavorNotesLabel}</p>
        <p className="mt-2 font-display text-lg italic text-gold-soft">
          {text.notes.map((note, noteIndex) => (
            <Fragment key={note}>
              {noteIndex > 0 && <span className="mx-2 not-italic text-gold/60">•</span>}
              {note}
            </Fragment>
          ))}
        </p>
      </div>

      <p className="mt-4 inline-flex items-center rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">
        {text.roast}
      </p>

      {footer}
    </article>
  )
})

export default OriginCard
