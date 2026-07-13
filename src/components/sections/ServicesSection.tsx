import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BeanShape, SectionHeading, SteamWisps, reveal, useSections } from './shared'

/** Hover visual per card: raw bean / bean roasting / bean becoming a cup. */
function CardVisual({ kind }: { kind: 'green' | 'roasted' | 'cafe' }) {
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(200,155,91,0.16),transparent_68%)] blur-md transition-opacity duration-700 group-hover:opacity-100 opacity-60"
      />
      {kind === 'green' && (
        <div className="relative transition-transform duration-700 group-hover:-translate-y-1.5 group-hover:rotate-6">
          <BeanShape color="#94a06b" seam="#5d6844" className="w-20 drop-shadow-[0_16px_26px_rgba(0,0,0,0.55)]" />
          <BeanShape
            color="#a3ad7c"
            seam="#68724d"
            className="absolute -left-9 top-7 w-12 -rotate-[28deg] opacity-70"
          />
        </div>
      )}
      {kind === 'roasted' && (
        <div className="relative h-24 w-20">
          {/* raw bean fades out, roasted bean fades in on hover */}
          <BeanShape
            color="#94a06b"
            seam="#5d6844"
            className="absolute inset-0 w-20 transition-all duration-700 group-hover:scale-90 group-hover:opacity-0"
          />
          <BeanShape
            color="#4a2c18"
            seam="#1e1007"
            className="absolute inset-0 w-20 opacity-0 transition-all duration-700 group-hover:rotate-6 group-hover:opacity-100 drop-shadow-[0_16px_26px_rgba(0,0,0,0.6)]"
          />
        </div>
      )}
      {kind === 'cafe' && (
        <div className="relative h-24 w-24">
          <BeanShape
            color="#4a2c18"
            seam="#1e1007"
            className="absolute left-1/2 top-1/2 w-16 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 group-hover:scale-75 group-hover:opacity-0"
          />
          <svg
            viewBox="0 0 96 80"
            className="absolute inset-0 h-full w-full opacity-0 transition-all duration-700 group-hover:opacity-100"
            aria-hidden="true"
          >
            <path d="M 18 34 L 74 34 L 68 68 Q 66 74 58 74 L 34 74 Q 26 74 24 68 Z" fill="#20150e" stroke="#8FA89B" strokeOpacity="0.7" strokeWidth="1.6" />
            <path d="M 74 40 Q 90 42 86 52 Q 83 60 68 58" fill="none" stroke="#8FA89B" strokeOpacity="0.7" strokeWidth="1.6" />
            <ellipse cx="46" cy="34" rx="28" ry="5" fill="#5e3d24" stroke="#8FA89B" strokeOpacity="0.5" strokeWidth="1.2" />
          </svg>
          <SteamWisps className="absolute -top-5 left-1/2 w-10 -translate-x-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>
      )}
    </div>
  )
}

const KINDS: ('green' | 'roasted' | 'cafe')[] = ['green', 'roasted', 'cafe']

function ServicesSection() {
  const s = useSections()

  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#ECE3D2_55%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(860px_540px_at_85%_20%,rgba(200,155,91,0.07),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.services.heading} description={s.services.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
          {s.services.cards.map((card, index) => (
            <motion.article
              key={card.title}
              {...reveal(index * 0.12)}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.45),rgba(230,220,199,0.85))] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_80px_-24px_rgba(200,155,91,0.22)] ${
                index === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-display text-sm italic text-gold/60">{String(index + 1).padStart(2, '0')}</p>
              <CardVisual kind={KINDS[index]} />
              <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-cream">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/60">{card.text}</p>
              <a
                href={card.href}
                className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-gold transition-colors duration-300 hover:text-gold-bright"
              >
                {card.button}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5"
                  aria-hidden="true"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
