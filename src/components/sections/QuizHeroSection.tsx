import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import HeroBackground from '../hero/HeroBackground'
import { useStopAnimations } from '../a11y/useStopAnimations'
import CtaArrowIcon from '../ui/CtaArrowIcon'
import { fadeUp } from '../../lib/motion'
import { useSections } from './shared'

function QuizHeroSection() {
  const s = useSections()
  const reduce = useStopAnimations()
  const hero = s.quiz.hero

  const scrollToQuiz = () => {
    const target = document.getElementById('quiz')
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden lg:h-svh lg:min-h-[720px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-32 text-center sm:px-8 lg:py-0 lg:pt-20">
        <motion.p {...fadeUp(0.1, 26)} className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-gold">
          {hero.kicker}
        </motion.p>
        <motion.h1
          {...fadeUp(0.28, 26)}
          className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.01em]"
        >
          {hero.heading}
        </motion.h1>
        <motion.p {...fadeUp(0.5, 26)} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
          {hero.supporting}
        </motion.p>

        <motion.div {...fadeUp(0.7, 26)} className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToQuiz}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright hover:shadow-[0_16px_44px_-10px_rgba(200,155,91,0.65)] sm:w-auto"
          >
            {hero.cta}
            <CtaArrowIcon />
          </button>
        </motion.div>
      </div>

      {/* scroll indicator */}
      {!reduce && (
        <motion.button
          type="button"
          onClick={scrollToQuiz}
          aria-label={hero.scrollHint}
          {...fadeUp(1.1, 26)}
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

export default QuizHeroSection
