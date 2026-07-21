import { motion } from 'framer-motion'
import { Coffee, Sparkles, Target } from 'lucide-react'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { formatIndex } from '../../lib/format'
import GoldCtaLink from '../ui/GoldCtaLink'
import SectionBackground from '../ui/SectionBackground'
import { EASE, SectionHeading, reveal, useSections } from './shared'

const ICONS = [Coffee, Sparkles, Target]

function MatchSection() {
  const s = useSections()
  const reduce = useStopAnimations()

  return (
    <section id="match" className="relative overflow-hidden py-24 lg:py-32">
      <SectionBackground
        gradient="linear-gradient(180deg,#F1EBDF 0%,#F4F0EA 60%,#F4F0EA 100%)"
        overlays={['radial-gradient(820px 540px at 85% 20%,rgba(200,155,91,0.07),transparent 62%)']}
      />

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
                    initial={reduce ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: index * 0.15 + 0.35 }}
                    style={{ transformOrigin: 'top' }}
                    className="absolute top-14 bottom-0 w-px bg-gradient-to-b from-gold/40 to-gold/10 ltr:left-7 rtl:right-7"
                  />
                )}
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="pt-1.5">
                  <p className="font-display text-sm italic text-gold/60">{formatIndex(index)}</p>
                  <h3 className="mt-1 font-display text-xl font-medium text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...reveal(0.6)} className="mt-8 flex justify-center">
          <GoldCtaLink href="/quiz#quiz">{s.match.cta}</GoldCtaLink>
        </motion.div>
      </div>
    </section>
  )
}

export default MatchSection
