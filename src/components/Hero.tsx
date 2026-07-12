import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import HeroBackground from './hero/HeroBackground'
import CoffeeComposition from './hero/CoffeeComposition'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const HEADLINE: { text: string; accent?: boolean; breakBefore?: boolean }[] = [
  { text: 'Every' },
  { text: 'Bean' },
  { text: 'Has', breakBefore: true },
  { text: 'a' },
  { text: 'Story.', accent: true },
]

const TRUST_BADGES = ['Sourced From 40+ Countries', 'Roasted In House', 'Specialty Grade Coffee']

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  }
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden lg:h-svh lg:min-h-[760px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-0 lg:pt-20">
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0.35)}
            className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold lg:justify-start"
          >
            Specialty Coffee From Around the World
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.25rem,8vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.015em]">
            {HEADLINE.map((word, index) => (
              <Fragment key={`${index}-${word.text}`}>
                {word.breakBefore && <br />}
                <span className="relative inline-block">
                  <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1, ease: EASE, delay: 0.5 + index * 0.11 }}
                      className={`inline-block ${word.accent ? 'italic text-gold' : ''}`}
                    >
                      {word.text}
                    </motion.span>
                  </span>
                  {word.accent && (
                    <motion.svg
                      viewBox="0 0 140 12"
                      className="absolute -bottom-1 left-0 w-full"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <motion.path
                        d="M4 9 C 38 3, 102 3, 136 7"
                        fill="none"
                        stroke="#c89b5b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.65 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 1.55 }}
                      />
                    </motion.svg>
                  )}
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            {...fadeUp(1.1)}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg lg:mx-0"
          >
            Anyone can serve coffee. We source rare beans from the world&rsquo;s finest farms, roast them in house,
            and craft every cup into a moment worth savoring.
          </motion.p>

          <motion.div {...fadeUp(1.25)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#coffee"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright hover:shadow-[0_16px_44px_-10px_rgba(200,155,91,0.65)] sm:w-auto"
            >
              Explore Our Coffee
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#cafe"
              className="inline-flex w-full items-center justify-center rounded-full border border-gold/70 px-8 py-4 text-sm font-bold tracking-wide text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-espresso-950 sm:w-auto"
            >
              Visit Our Café
            </a>
          </motion.div>

          <motion.ul
            {...fadeUp(1.4)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-cream/10 pt-7 lg:justify-start"
          >
            {TRUST_BADGES.map((badge) => (
              <li key={badge} className="flex items-center gap-2.5">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10"
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3 text-gold" strokeWidth={3} />
                </span>
                <span className="text-[0.8125rem] text-cream/65">{badge}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.55 }}
        >
          <CoffeeComposition />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
