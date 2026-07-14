import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import HeroBackground from '../../components/hero/HeroBackground'
import { useStopAnimations } from '../../components/a11y/useStopAnimations'
import type { CoffeeOriginsContent } from './content'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  }
}

interface HeroSectionProps {
  content: CoffeeOriginsContent['hero']
}

function HeroSection({ content }: HeroSectionProps) {
  const navigate = useNavigate()
  const reduce = useStopAnimations()

  const scrollToStory = () => {
    const target = document.getElementById('coffee-origins-story')
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden lg:h-svh lg:min-h-[720px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-32 text-center sm:px-8 lg:py-0 lg:pt-20">
        <motion.p {...fadeUp(0.1)} className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-gold">
          {content.label}
        </motion.p>
        <motion.h1
          {...fadeUp(0.28)}
          className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.01em]"
        >
          {content.heading}
        </motion.h1>
        <motion.p {...fadeUp(0.5)} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
          {content.supporting}
        </motion.p>

        <motion.div {...fadeUp(0.7)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={scrollToStory}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright hover:shadow-[0_16px_44px_-10px_rgba(200,155,91,0.65)] sm:w-auto"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/coffee')}
            className="inline-flex w-full items-center justify-center rounded-full border border-cta/70 px-8 py-4 text-sm font-bold tracking-wide text-cta transition-colors duration-300 hover:border-cta hover:bg-cta hover:text-espresso-950 sm:w-auto"
          >
            {content.ctaSecondary}
          </button>
        </motion.div>
      </div>

      {/* scroll indicator */}
      {!reduce && (
        <motion.button
          type="button"
          onClick={scrollToStory}
          aria-label={content.scrollHint}
          {...fadeUp(1.1)}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/50 transition-colors hover:text-gold"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="h-6 w-6" aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </section>
  )
}

export default HeroSection
