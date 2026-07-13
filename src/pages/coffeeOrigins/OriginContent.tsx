import { ArrowRight } from 'lucide-react'
import type { CoffeeOriginContent, CoffeeOriginsContent } from './content'

interface OriginContentProps {
  item: CoffeeOriginContent
  index: number
  total: number
  labels: CoffeeOriginsContent['labels']
  onExplore: () => void
}

function OriginContent({ item, index, total, labels, onExplore }: OriginContentProps) {
  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-4">
        <p dir="ltr" className="font-display text-sm italic text-gold/70">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-gold' : 'w-4 bg-cream/15'}`} />
          ))}
        </div>
      </div>

      <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-gold">{item.country}</p>
      <p className="mt-1 text-sm font-medium text-cream/55">{item.region}</p>
      <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-cream sm:text-4xl">{item.title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-cream/65">{item.story}</p>

      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cream/10 pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{labels.elevation}</dt>
          <dd className="mt-1 text-sm text-cream/80">{item.elevation}</dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{labels.variety}</dt>
          <dd className="mt-1 text-sm text-cream/80">{item.variety}</dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{labels.process}</dt>
          <dd className="mt-1 text-sm text-cream/80">{item.process}</dd>
        </div>
        <div className="col-span-2 sm:col-span-3">
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{labels.flavorNotes}</dt>
          <dd className="mt-1 font-display italic text-gold-soft">{item.flavorNotes.join(' • ')}</dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{labels.roast}</dt>
          <dd className="mt-1 text-sm text-cream/80">{item.roast}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onExplore}
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
      >
        {item.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

export default OriginContent
