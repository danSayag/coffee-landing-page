import { motion } from 'framer-motion'
import { ArrowRight, Coffee, Sparkles, Target } from 'lucide-react'
import { EASE, SectionHeading, reveal, useSections } from './shared'

const ICONS = [Coffee, Sparkles, Target]

function MatchSection() {
  const s = useSections()

  return (
    <section id="match" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#F4F0EA_60%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_540px_at_85%_20%,rgba(200,155,91,0.07),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading eyebrow={s.match.eyebrow} heading={s.match.heading} description={s.match.description} />

        <div className="mx-auto mt-16 max-w-2xl">
          {s.match.steps.map((step, index) => {
            const Icon = ICONS[index]
            const isLast = index === s.match.steps.length - 1
            return (
              <motion.div key={step.title} {...reveal(index * 0.15)} className="group relative flex gap-6 pb-12 last:pb-0">
                {!isLast && (
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: index * 0.15 + 0.35 }}
                    style={{ transformOrigin: 'top' }}
                    className="absolute top-14 bottom-0 w-px bg-gradient-to-b from-gold/40 to-gold/10 ltr:left-7 rtl:right-7"
                  />
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="pt-1.5">
                  <p className="font-display text-sm italic text-gold/60">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 font-display text-xl font-medium text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...reveal(0.6)} className="mt-8 flex justify-center">
          <a
            href="#quiz"
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
          >
            {s.match.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default MatchSection
