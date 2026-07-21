import { motion } from 'framer-motion'
import GoldCtaLink from '../ui/GoldCtaLink'
import SectionBackground from '../ui/SectionBackground'
import { SectionHeading, SteamWisps, reveal, useSections } from './shared'
import espressoImg from '../../assets/drinks/espresso.webp'
import flatwhiteImg from '../../assets/drinks/flat white.webp'
import cappuccinoImg from '../../assets/drinks/cappuccino.webp'
import coldbrewImg from '../../assets/drinks/cold-brew-iced-coffee.webp'
import seasonalImg from '../../assets/drinks/season coffee.png'
import v60Img from '../../assets/drinks/v60.png'

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
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.4),rgba(230,220,199,0.85))] p-6 transition-all duration-500 hover:border-gold/45 hover:shadow-[0_28px_70px_-24px_rgba(200,155,91,0.2)] sm:p-7"
    >
      {/* lighting shift on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* image area with the name tag overlapping its top */}
      <div className="relative mt-3 h-52 pt-4">
        <span className="absolute -top-3 z-10 rounded-lg border border-cream/20 bg-espresso-900 px-3 py-1 font-display text-sm font-medium text-cream shadow-sm ltr:left-4 rtl:right-4">
          {drink.name}
        </span>
        <div className="relative mx-auto h-full w-full transition-transform duration-500 group-hover:-translate-y-2">
          <DrinkArt kind={drink.id} />
          {STEAMY.has(drink.id) && (
            <SteamWisps className="absolute -top-7 left-1/2 w-9 -translate-x-1/2 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mt-4 rounded-xl px-4 py-3 text-center">
          <p className="text-sm leading-relaxed text-cream/60">{drink.desc}</p>
          <p className="mt-1.5 font-display text-xs italic text-gold-soft transition-[letter-spacing] duration-500 group-hover:tracking-wider">
            {drink.notes}
          </p>
        </div>

        <div className="mt-5 flex flex-1 items-stretch gap-2.5 border-t border-cream/10 pt-4 text-[0.68rem]">
          <span className="flex-1 rounded-xl px-3 py-2 text-center">
            <span className="block font-semibold uppercase tracking-[0.18em] text-cream/40">{originLabel}</span>
            <span className="mt-0.5 block text-cream/75">{drink.origin}</span>
          </span>
          <span className="flex-1 rounded-xl px-3 py-2 text-center font-bold uppercase tracking-[0.14em] text-gold">
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
    <section id="drinks" className="relative overflow-hidden py-24 lg:py-32">
      <SectionBackground
        gradient="linear-gradient(180deg,#F1EBDF 0%,#F4F0EA 50%,#F4F0EA 100%)"
        overlays={['radial-gradient(880px 560px at 25% 15%,rgba(200,155,91,0.07),transparent 60%)']}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 sm:px-8">
        <SectionHeading heading={s.drinks.heading} description={s.drinks.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {s.drinks.cards.map((drink, index) => (
            <DrinkCard key={drink.id} drink={drink} index={index} originLabel={s.drinks.originLabel} />
          ))}
        </div>

        <motion.div {...reveal(0.3)} className="mt-12 flex justify-center">
          <GoldCtaLink href="/coffee">{s.drinks.cta}</GoldCtaLink>
        </motion.div>
      </div>
    </section>
  )
}

export default DrinksSection
