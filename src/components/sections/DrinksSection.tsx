import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HashLink from '../HashLink'
import { SectionHeading, SteamWisps, reveal, useSections } from './shared'
import espressoImg from '../../assets/espresso.webp'
import flatwhiteImg from '../../assets/flat white.webp'
import cappuccinoImg from '../../assets/cappuccino.webp'
import coldbrewImg from '../../assets/cold-brew-iced-coffee.webp'
import seasonalImg from '../../assets/season coffee.png'
import v60Img from '../../assets/v60.png'

const DRINK_IMAGES: Record<string, string> = {
  espresso: espressoImg,
  flatwhite: flatwhiteImg,
  cappuccino: cappuccinoImg,
  coldbrew: coldbrewImg,
  seasonal: seasonalImg,
  v60 : v60Img,
}

function DrinkArt({ kind }: { kind: string }) {
  const src = DRINK_IMAGES[kind] ?? DRINK_IMAGES.seasonal
  return <img src={src} alt="" className="h-full w-full object-contain" aria-hidden="true" />
}

const STEAMY = new Set(['espresso', 'flatwhite', 'cappuccino', 'v60'])

interface DrinkCardProps {
  drink: { id: string; name: string; desc: string; origin: string; roast: string; notes: string }
  index: number
  originLabel: string
}

function DrinkCard({ drink, index, originLabel }: DrinkCardProps) {
  return (
    <motion.article
      {...reveal((index % 3) * 0.1)}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.4),rgba(230,220,199,0.85))] p-6 transition-all duration-500 hover:border-gold/45 hover:shadow-[0_28px_70px_-24px_rgba(200,155,91,0.2)] sm:p-7 lg:p-4"
    >
      {/* lighting shift on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <div className="relative mx-auto h-28 w-28 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 lg:h-16 lg:w-16">
        <DrinkArt kind={drink.id} />
        {STEAMY.has(drink.id) && (
          <SteamWisps className="absolute -top-7 left-1/2 w-9 -translate-x-1/2 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col text-center">
        <h3 className="mt-3 text-center font-display text-lg font-medium text-cream lg:mt-2 lg:text-sm">{drink.name}</h3>
        <p className="mt-2 flex-1 text-center text-sm leading-relaxed text-cream/60 lg:hidden">{drink.desc}</p>

        <p className="mt-2 text-center font-display text-xs italic text-gold-soft transition-[letter-spacing] duration-500 group-hover:tracking-wider lg:mt-1 lg:text-[0.62rem]">
          {drink.notes}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-cream/10 pt-4 text-[0.68rem] lg:mt-2 lg:pt-2 lg:text-[0.58rem]">
          <span>
            <span className="block font-semibold uppercase tracking-[0.18em] text-cream/40">{originLabel}</span>
            <span className="mt-0.5 block text-cream/75">{drink.origin}</span>
          </span>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-bold uppercase tracking-[0.14em] text-gold lg:px-2 lg:py-0.5 lg:text-[0.55rem]">
            {drink.roast}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function DrinksSection() {
  const s = useSections()

  return (
    <section id="drinks" className="relative overflow-hidden py-24 lg:py-10">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#F4F0EA_50%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(880px_560px_at_25%_15%,rgba(200,155,91,0.07),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 sm:px-8 lg:h-[calc(100svh-5rem)] lg:justify-center">
        <SectionHeading heading={s.drinks.heading} description={s.drinks.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-3 lg:h-[46vh] lg:min-h-[360px] lg:max-h-[520px]">
          {s.drinks.cards.map((drink, index) => (
            <DrinkCard key={drink.id} drink={drink} index={index} originLabel={s.drinks.originLabel} />
          ))}
        </div>

        <motion.div {...reveal(0.3)} className="mt-12 flex justify-center lg:mt-6">
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
