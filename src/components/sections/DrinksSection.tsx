import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HashLink from '../HashLink'
import { SectionHeading, SteamWisps, reveal, useSections } from './shared'

const GOLD = '#8FA89B'

/** Stylized drink illustration — glass/cup shape varies per drink. */
function DrinkArt({ kind }: { kind: string }) {
  const cupStroke = { fill: '#20150e', stroke: GOLD, strokeOpacity: 0.6, strokeWidth: 1.8 }
  switch (kind) {
    case 'espresso':
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="98" rx="40" ry="6" fill="#000" opacity="0.4" />
          <path d="M 30 44 L 90 44 L 84 82 Q 82 90 72 90 L 48 90 Q 38 90 36 82 Z" {...cupStroke} />
          <path d="M 90 50 Q 106 54 102 66 Q 99 76 86 73" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.8" />
          <ellipse cx="60" cy="44" rx="30" ry="5.5" fill="#6b4423" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
          <ellipse cx="60" cy="44" rx="20" ry="3.5" fill="#8a5c36" opacity="0.8" />
        </svg>
      )
    case 'flatwhite':
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="98" rx="40" ry="6" fill="#000" opacity="0.4" />
          <path d="M 26 40 L 94 40 L 86 84 Q 84 92 74 92 L 46 92 Q 36 92 34 84 Z" {...cupStroke} />
          <ellipse cx="60" cy="40" rx="34" ry="6" fill="#e9dcc3" opacity="0.9" />
          <path d="M 44 40 Q 60 30 76 40 Q 60 44 44 40" fill="#8a5c36" opacity="0.75" />
        </svg>
      )
    case 'cappuccino':
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="98" rx="40" ry="6" fill="#000" opacity="0.4" />
          <path d="M 24 44 L 96 44 L 88 84 Q 86 92 76 92 L 44 92 Q 34 92 32 84 Z" {...cupStroke} />
          <path d="M 96 50 Q 112 54 108 66 Q 105 76 92 73" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.8" />
          <ellipse cx="60" cy="44" rx="36" ry="7" fill="#e9dcc3" opacity="0.92" />
          <circle cx="60" cy="43" r="10" fill="#8a5c36" opacity="0.5" />
        </svg>
      )
    case 'v60':
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="100" rx="36" ry="5" fill="#000" opacity="0.4" />
          <path d="M 30 22 L 90 22 L 64 62 L 56 62 Z" {...cupStroke} />
          <line x1="60" y1="62" x2="60" y2="72" stroke={GOLD} strokeOpacity="0.8" strokeWidth="1.4" strokeDasharray="2 4" />
          <path d="M 36 74 L 84 74 L 79 96 Q 78 102 70 102 L 50 102 Q 42 102 41 96 Z" {...cupStroke} />
          <rect x="46" y="86" width="28" height="10" fill="#5e3d24" opacity="0.6" />
        </svg>
      )
    case 'coldbrew':
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="102" rx="30" ry="4.5" fill="#000" opacity="0.4" />
          <path d="M 38 18 L 82 18 L 82 94 Q 82 100 76 100 L 44 100 Q 38 100 38 94 Z" {...cupStroke} />
          <rect x="43" y="46" width="34" height="49" rx="3" fill="#5e3d24" opacity="0.55" />
          <rect x="48" y="30" width="10" height="13" rx="2" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(10 53 36)" />
          <rect x="62" y="56" width="10" height="13" rx="2" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.2" transform="rotate(-8 67 62)" />
        </svg>
      )
    default: // seasonal
      return (
        <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden="true">
          <ellipse cx="60" cy="100" rx="34" ry="5" fill="#000" opacity="0.4" />
          <path d="M 40 20 L 80 20 L 76 92 Q 75 98 68 98 L 52 98 Q 45 98 44 92 Z" {...cupStroke} />
          <path d="M 44 52 Q 60 44 76 52 L 74 88 Q 73 94 68 94 L 52 94 Q 47 94 46 88 Z" fill="#8a5c36" opacity="0.55" />
          <path d="M 80 22 Q 92 10 100 16 Q 94 22 84 24" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.6" />
          <circle cx="68" cy="30" r="2.4" fill={GOLD} opacity="0.7" />
          <circle cx="54" cy="34" r="1.8" fill={GOLD} opacity="0.5" />
        </svg>
      )
  }
}

const STEAMY = new Set(['espresso', 'flatwhite', 'cappuccino', 'v60'])

function DrinksSection() {
  const s = useSections()

  return (
    <section id="drinks" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#F4F0EA_50%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(880px_560px_at_25%_15%,rgba(200,155,91,0.07),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.drinks.heading} description={s.drinks.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-7">
          {s.drinks.cards.map((drink, index) => (
            <motion.article
              key={drink.id}
              {...reveal((index % 3) * 0.1)}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.4),rgba(230,220,199,0.85))] p-6 transition-all duration-500 hover:border-gold/45 hover:shadow-[0_28px_70px_-24px_rgba(200,155,91,0.2)] sm:p-7"
            >
              {/* lighting shift on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative mx-auto h-36 w-36 transition-transform duration-500 group-hover:-translate-y-2">
                <DrinkArt kind={drink.id} />
                {STEAMY.has(drink.id) && (
                  <SteamWisps className="absolute -top-7 left-1/2 w-9 -translate-x-1/2 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
                )}
              </div>

              <h3 className="mt-4 text-center font-display text-2xl font-medium text-cream">{drink.name}</h3>
              <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-cream/60">{drink.desc}</p>

              <p className="mt-4 text-center font-display text-sm italic text-gold-soft transition-[letter-spacing] duration-500 group-hover:tracking-wider">
                {drink.notes}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-cream/10 pt-4 text-[0.68rem]">
                <span>
                  <span className="block font-semibold uppercase tracking-[0.18em] text-cream/40">{s.drinks.originLabel}</span>
                  <span className="mt-0.5 block text-cream/75">{drink.origin}</span>
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-bold uppercase tracking-[0.14em] text-gold">
                  {drink.roast}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div {...reveal(0.3)} className="mt-12 flex justify-center">
          <HashLink
            href="/coffee"
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
          >
            {s.drinks.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </HashLink>
        </motion.div>
      </div>
    </section>
  )
}

export default DrinksSection
