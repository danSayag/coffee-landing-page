import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import HeroBackground from './hero/HeroBackground'
import CoffeeComposition from './hero/CoffeeComposition'
import HashLink from './HashLink'
import CtaArrowIcon from './ui/CtaArrowIcon'
import { useI18n } from '../i18n'
import { EASE, fadeUp } from '../lib/motion'
import { GOLD_HEX } from '../lib/colors'

function Hero() {
  const { t } = useI18n()

  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden lg:h-svh lg:min-h-[760px]">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-0 lg:pt-20">
        <div className="text-center lg:ltr:text-left lg:rtl:text-right">
          <motion.p
            {...fadeUp(0.35)}
            className="flex items-center justify-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-gold lg:justify-start"
          >
            {t.hero.kicker}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.25rem,8vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.015em]">
            {t.hero.headline.map((word, index) => (
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
                        stroke={GOLD_HEX}
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
            {t.hero.paragraph}
          </motion.p>

          <motion.div {...fadeUp(1.25)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <HashLink
              href="/coffee"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright hover:shadow-[0_16px_44px_-10px_rgba(200,155,91,0.65)] sm:w-auto"
            >
              {t.hero.ctaExplore}
              <CtaArrowIcon />
            </HashLink>
            <HashLink
              href="#cafe"
              className="inline-flex w-full items-center justify-center rounded-full border border-cta/70 px-8 py-4 text-sm font-bold tracking-wide text-cta transition-colors duration-300 hover:border-cta hover:bg-cta hover:text-espresso-950 sm:w-auto"
            >
              {t.hero.ctaCafe}
            </HashLink>
          </motion.div>

          <motion.ul
            {...fadeUp(1.4)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-cream/10 pt-7 lg:justify-start"
          >
            {t.hero.badges.map((badge) => (
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
