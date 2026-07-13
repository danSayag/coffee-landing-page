import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CoffeeBean from '../../components/hero/CoffeeBean'
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

const FLOAT_BEANS = [
  { left: '9%', top: '22%', size: 30, delay: 0, rotate: -20 },
  { left: '86%', top: '16%', size: 22, delay: 0.8, rotate: 35 },
  { left: '92%', top: '66%', size: 34, delay: 0.4, rotate: -35 },
  { left: '6%', top: '72%', size: 20, delay: 1.3, rotate: 55 },
]

/** Stylized dusk farm illustration — rolling rows on a hillside under a warm sky. */
function FarmScene() {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="origins-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c1d13" />
          <stop offset="55%" stopColor="#3a2416" />
          <stop offset="100%" stopColor="#1a1109" />
        </linearGradient>
        <radialGradient id="origins-sun" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#e9c078" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e9c078" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="origins-hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3320" />
          <stop offset="100%" stopColor="#33220f" />
        </linearGradient>
        <linearGradient id="origins-hill-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1c10" />
          <stop offset="100%" stopColor="#160e07" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#origins-sky)" />
      <circle cx="600" cy="320" r="360" fill="url(#origins-sun)" />

      {/* far ridgeline */}
      <path d="M0 460 C 200 400, 380 430, 560 400 S 900 380, 1200 430 L 1200 800 L 0 800 Z" fill="url(#origins-hill-far)" opacity="0.85" />

      {/* coffee-row terraces on the near hillside */}
      <path d="M0 560 C 240 500, 480 540, 720 500 S 1040 470, 1200 510 L 1200 800 L 0 800 Z" fill="url(#origins-hill-near)" />
      {Array.from({ length: 7 }, (_, row) => {
        const y = 590 + row * 32
        return (
          <path
            key={row}
            d={`M -20 ${y} C 220 ${y - 26}, 480 ${y + 18}, 740 ${y - 12} S 1040 ${y + 14}, 1220 ${y - 8}`}
            fill="none"
            stroke="#8FA89B"
            strokeOpacity={0.14 + row * 0.01}
            strokeWidth="2.5"
          />
        )
      })}

      <rect width="1200" height="800" fill="none" />
    </svg>
  )
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
      {/* cinematic background */}
      <div aria-hidden="true" className="absolute inset-0">
        <motion.div
          initial={reduce ? undefined : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <FarmScene />
        </motion.div>
        {/* readability scrim */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,7,0.45)_0%,rgba(18,12,7,0.5)_55%,rgba(18,12,7,0.82)_100%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
      </div>

      {/* floating coffee-bean particles */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {FLOAT_BEANS.map((bean, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: bean.left, top: bean.top, width: bean.size, rotate: bean.rotate }}
              animate={{ y: [-10, 10] }}
              transition={{ duration: 5 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: bean.delay }}
            >
              <CoffeeBean className="w-full opacity-50" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-32 text-center sm:px-8 lg:py-0 lg:pt-20">
        <motion.p {...fadeUp(0.1)} className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[#cfe0d6]">
          {content.label}
        </motion.p>
        <motion.h1
          {...fadeUp(0.28)}
          className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.01em] text-[#f7f3ea]"
        >
          {content.heading}
        </motion.h1>
        <motion.p {...fadeUp(0.5)} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#f7f3ea]/75 sm:text-lg">
          {content.supporting}
        </motion.p>

        <motion.div {...fadeUp(0.7)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={scrollToStory}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright sm:w-auto"
          >
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/coffee')}
            className="inline-flex w-full items-center justify-center rounded-full border border-[#f7f3ea]/50 px-8 py-4 text-sm font-bold tracking-wide text-[#f7f3ea] transition-colors duration-300 hover:border-[#f7f3ea] hover:bg-[#f7f3ea]/10 sm:w-auto"
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
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#f7f3ea]/70 transition-colors hover:text-[#f7f3ea]"
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
