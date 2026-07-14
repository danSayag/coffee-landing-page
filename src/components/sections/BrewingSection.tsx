import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { BrewId } from '../../i18n/sections'
import HashLink from '../HashLink'
import { EASE, Meter, SectionHeading, SteamWisps, reveal, useSections } from './shared'

const BREW_ORDER: BrewId[] = ['espresso', 'v60', 'frenchpress', 'moka', 'coldbrew', 'cappuccino']

const BREW_META: Record<BrewId, { texture: number; intensity: number; clarity: number }> = {
  espresso: { texture: 4, intensity: 5, clarity: 2 },
  v60: { texture: 2, intensity: 2, clarity: 5 },
  frenchpress: { texture: 5, intensity: 4, clarity: 2 },
  moka: { texture: 4, intensity: 4, clarity: 2 },
  coldbrew: { texture: 3, intensity: 2, clarity: 4 },
  cappuccino: { texture: 5, intensity: 3, clarity: 2 },
}

const GOLD = '#8FA89B'
const line = { fill: 'none', stroke: GOLD, strokeWidth: 2, strokeLinecap: 'round' as const, strokeOpacity: 0.85 }
const dark = { fill: '#20150e', stroke: GOLD, strokeWidth: 1.6, strokeOpacity: 0.6 }

function BrewIllustration({ id }: { id: BrewId }) {
  switch (id) {
    case 'espresso':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 30 30 L 130 30 L 130 58 L 30 58 Z" {...dark} />
          <path d="M 62 58 L 98 58 L 94 74 L 66 74 Z" {...dark} />
          <line x1="72" y1="74" x2="70" y2="96" {...line} strokeOpacity="0.5" />
          <line x1="88" y1="74" x2="90" y2="96" {...line} strokeOpacity="0.5" />
          <path d="M 58 100 L 102 100 L 97 126 Q 96 132 88 132 L 72 132 Q 64 132 63 126 Z" {...dark} />
          <ellipse cx="80" cy="100" rx="22" ry="4" fill="#7a4b2c" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
        </svg>
      )
    case 'v60':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 40 36 L 120 36 L 84 92 L 76 92 Z" {...dark} />
          <line x1="56" y1="46" x2="76" y2="80" {...line} strokeOpacity="0.3" />
          <line x1="104" y1="46" x2="84" y2="80" {...line} strokeOpacity="0.3" />
          <line x1="80" y1="92" x2="80" y2="106" {...line} strokeDasharray="3 5" />
          <path d="M 52 110 L 108 110 L 104 134 Q 103 140 95 140 L 65 140 Q 57 140 56 134 Z" {...dark} />
        </svg>
      )
    case 'frenchpress':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 50 48 L 110 48 L 110 132 Q 110 138 102 138 L 58 138 Q 50 138 50 132 Z" {...dark} />
          <rect x="58" y="92" width="44" height="40" fill="#5e3d24" opacity="0.6" />
          <line x1="80" y1="24" x2="80" y2="86" {...line} />
          <circle cx="80" cy="20" r="7" {...dark} />
          <line x1="56" y1="86" x2="104" y2="86" {...line} strokeOpacity="0.6" />
          <path d="M 110 60 Q 128 64 124 78 Q 121 90 110 88" {...line} strokeOpacity="0.5" />
        </svg>
      )
    case 'moka':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 60 24 L 100 24 L 106 62 L 54 62 Z" {...dark} />
          <path d="M 54 66 L 106 66 L 100 76 L 60 76 Z" fill="#160f0a" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M 56 80 L 104 80 L 112 130 Q 113 138 104 138 L 56 138 Q 47 138 48 130 Z" {...dark} />
          <path d="M 104 34 Q 122 40 118 56 L 106 54" {...line} strokeOpacity="0.5" />
          <path d="M 74 12 L 86 12 L 82 22 L 78 22 Z" {...dark} />
        </svg>
      )
    case 'coldbrew':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 54 30 L 106 30 L 106 132 Q 106 140 98 140 L 62 140 Q 54 140 54 132 Z" {...dark} />
          <rect x="60" y="72" width="40" height="62" rx="4" fill="#5e3d24" opacity="0.55" />
          <rect x="66" y="46" width="12" height="16" rx="2" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.4" transform="rotate(12 72 54)" />
          <rect x="84" y="82" width="12" height="16" rx="2" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.4" transform="rotate(-10 90 90)" />
          <line x1="54" y1="30" x2="106" y2="30" {...line} strokeOpacity="0.6" />
        </svg>
      )
    case 'cappuccino':
      return (
        <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
          <path d="M 36 70 L 124 70 L 114 126 Q 112 136 100 136 L 60 136 Q 48 136 46 126 Z" {...dark} />
          <path d="M 124 78 Q 146 82 140 98 Q 135 110 116 106" {...line} strokeOpacity="0.6" />
          <ellipse cx="80" cy="70" rx="44" ry="8" fill="#e9dcc3" opacity="0.85" />
          <path d="M 62 70 Q 80 60 98 70" fill="none" stroke="#7a4b2c" strokeWidth="1.6" strokeOpacity="0.7" />
          <path d="M 70 70 Q 80 65 90 70" fill="none" stroke="#7a4b2c" strokeWidth="1.2" strokeOpacity="0.6" />
        </svg>
      )
  }
}

function BrewingSection() {
  const s = useSections()
  const [active, setActive] = useState<BrewId>('espresso')
  const info = s.brewing.methods[active]
  const meta = BREW_META[active]

  return (
    <section id="brewing" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#F1EBDF_60%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_540px_at_15%_75%,rgba(200,155,91,0.06),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.brewing.heading} description={s.brewing.description} />

        {/* horizontal selector with a traveling liquid underline */}
        <div
          role="tablist"
          aria-label={s.brewing.heading}
          className="scrollbar-none mx-auto mt-12 flex max-w-full justify-start gap-2 overflow-x-auto pb-2 sm:justify-center"
        >
          {BREW_ORDER.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                active === id ? 'text-espresso-950' : 'text-cream/60 hover:text-cream'
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="brew-pill"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gold shadow-[0_8px_24px_-8px_rgba(200,155,91,0.6)]"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{s.brewing.methods[id].name}</span>
            </button>
          ))}
        </div>
        {/* thin liquid path under the selector */}
        <div aria-hidden="true" className="mx-auto mt-1 h-px max-w-2xl bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 items-center gap-10 rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.45),rgba(230,220,199,0.8))] p-8 sm:grid-cols-[220px_1fr] sm:p-10">
          <div className="relative mx-auto h-48 w-48">
            <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,155,91,0.12),transparent_66%)] blur-lg" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative h-full w-full"
              >
                <BrewIllustration id={active} />
                {(active === 'espresso' || active === 'moka' || active === 'cappuccino') && (
                  <SteamWisps className="absolute -top-4 left-1/2 w-10 -translate-x-1/2" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="font-display text-3xl font-medium text-cream">{info.name}</h3>
                <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-cream/65">{info.desc}</p>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <p>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream/45">{s.brewing.meterLabels.roast}</span>
                    <span className="mt-0.5 block font-display italic text-gold-soft">{info.roast}</span>
                  </p>
                  <p>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream/45">{s.brewing.meterLabels.time}</span>
                    <span className="mt-0.5 block font-display italic text-gold-soft">{info.time}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 grid max-w-md grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-5">
              <Meter label={s.brewing.meterLabels.texture} value={meta.texture} animateKey={active} />
              <Meter label={s.brewing.meterLabels.intensity} value={meta.intensity} animateKey={active} />
              <Meter label={s.brewing.meterLabels.clarity} value={meta.clarity} animateKey={active} />
            </div>
          </div>
        </div>

        <motion.div {...reveal(0.2)} className="mt-12 flex justify-center">
          <HashLink
            href="/quiz"
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
          >
            {s.brewing.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </HashLink>
        </motion.div>
      </div>
    </section>
  )
}

export default BrewingSection
