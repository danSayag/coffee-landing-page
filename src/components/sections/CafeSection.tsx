import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { EASE, SectionHeading, SteamWisps, reveal, useSections } from './shared'

const GOLD = '#c89b5b'

/** Large illustrated café interior — window light, counter, barista, lamps. */
function CafeScene() {
  return (
    <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="cafe-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2a1c" />
          <stop offset="100%" stopColor="#1a120c" />
        </linearGradient>
        <linearGradient id="cafe-light" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#e8c88f" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#e8c88f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cafe-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241812" />
          <stop offset="100%" stopColor="#120c08" />
        </linearGradient>
      </defs>

      <rect width="900" height="560" fill="url(#cafe-sky)" />

      {/* window */}
      <rect x="60" y="60" width="300" height="330" rx="8" fill="#0e0a07" stroke={GOLD} strokeOpacity="0.4" strokeWidth="2" />
      <line x1="210" y1="60" x2="210" y2="390" stroke={GOLD} strokeOpacity="0.3" strokeWidth="2" />
      <line x1="60" y1="225" x2="360" y2="225" stroke={GOLD} strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="150" cy="150" r="44" fill="#e8c88f" opacity="0.14" />
      {/* light shaft */}
      <path d="M 70 70 L 350 70 L 560 560 L 200 560 Z" fill="url(#cafe-light)" />

      {/* hanging lamps */}
      {[520, 650, 780].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="96" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1.6" />
          <path d={`M ${x - 26} 96 Q ${x} 76 ${x + 26} 96 L ${x + 18} 116 L ${x - 18} 116 Z`} fill="#20150e" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.6" />
          <circle cx={x} cy="124" r="6" fill="#e8c88f" opacity="0.85" />
          <circle cx={x} cy="128" r="20" fill="#e8c88f" opacity="0.12" />
        </g>
      ))}

      {/* floor */}
      <rect y="440" width="900" height="120" fill="url(#cafe-floor)" />

      {/* counter */}
      <rect x="430" y="330" width="430" height="112" rx="10" fill="#2a1c12" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.6" />
      <line x1="430" y1="356" x2="860" y2="356" stroke={GOLD} strokeOpacity="0.2" strokeWidth="1" />
      {/* espresso machine */}
      <rect x="470" y="272" width="120" height="58" rx="8" fill="#1b120c" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="530" cy="292" r="8" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.4" />
      <rect x="500" y="318" width="18" height="12" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />

      {/* barista silhouette */}
      <g>
        <circle cx="680" cy="228" r="22" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.4" />
        <path d="M 645 330 Q 648 262 680 258 Q 712 262 715 330 Z" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.4" />
        <path d="M 652 290 Q 630 300 622 316" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      {/* pouring kettle + cup */}
      <path d="M 606 300 L 626 300 L 622 316 L 610 316 Z" fill="#1b120c" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.3" />
      <line x1="612" y1="318" x2="612" y2="326" stroke={GOLD} strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="2 3" />
      <path d="M 602 328 L 624 328 L 621 340 L 605 340 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.2" />

      {/* guest at table */}
      <g>
        <circle cx="150" cy="440" r="16" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.2" />
        <path d="M 126 505 Q 128 462 150 460 Q 172 462 174 505 Z" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.25" strokeWidth="1.2" />
        <rect x="190" y="470" width="110" height="8" rx="3" fill="#2a1c12" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" />
        <line x1="242" y1="478" x2="242" y2="540" stroke={GOLD} strokeOpacity="0.25" strokeWidth="2" />
        <path d="M 214 456 L 234 456 L 231 470 L 217 470 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.2" />
      </g>

      {/* plants */}
      <path d="M 852 300 Q 838 260 856 236 M 852 300 Q 866 268 850 240 M 852 300 Q 852 264 862 252" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 838 300 L 868 300 L 862 330 L 844 330 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1.4" />

      <rect width="900" height="560" fill="none" />
    </svg>
  )
}

/** Small panel: pour-over close-up. */
function DetailPour() {
  return (
    <svg viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <rect width="300" height="220" fill="#1c130d" />
      <circle cx="230" cy="40" r="70" fill="#e8c88f" opacity="0.08" />
      <path d="M 100 50 L 200 50 L 158 116 L 142 116 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.8" />
      <line x1="150" y1="116" x2="150" y2="138" stroke={GOLD} strokeOpacity="0.8" strokeWidth="1.6" strokeDasharray="3 5" />
      <path d="M 112 142 L 188 142 L 182 178 Q 181 186 172 186 L 128 186 Q 119 186 118 178 Z" fill="#20150e" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.8" />
      <rect x="122" y="158" width="56" height="20" fill="#5e3d24" opacity="0.5" />
    </svg>
  )
}

/** Small panel: cup by the window. */
function DetailCup() {
  return (
    <svg viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <rect width="300" height="220" fill="#191009" />
      <rect x="180" y="20" width="120" height="200" fill="#e8c88f" opacity="0.07" />
      <ellipse cx="150" cy="188" rx="80" ry="10" fill="#000" opacity="0.4" />
      <path d="M 96 110 L 204 110 L 192 176 Q 190 186 178 186 L 122 186 Q 110 186 108 176 Z" fill="#22150d" stroke={GOLD} strokeOpacity="0.65" strokeWidth="2" />
      <path d="M 204 120 Q 230 124 224 144 Q 219 158 196 154" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="2" />
      <ellipse cx="150" cy="110" rx="54" ry="9" fill="#5e3d24" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1.2" />
      <path d="M 128 108 Q 150 96 172 108" fill="none" stroke="#e9dcc3" strokeOpacity="0.6" strokeWidth="1.6" />
    </svg>
  )
}

function CafeSection() {
  const s = useSections()
  const reduce = useStopAnimations()
  const wrapRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const yMain = useTransform(scrollYProgress, [0, 1], [30, -30])
  const ySide = useTransform(scrollYProgress, [0, 1], [60, -40])

  return (
    <section id="cafe" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#15110f_0%,#1b1410_45%,#140f0c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_640px_at_70%_30%,rgba(200,155,91,0.08),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div ref={wrapRef} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading align="start" eyebrow={s.cafe.eyebrow} heading={s.cafe.heading} description={s.cafe.description} />
          <motion.div {...reveal(0.2)} className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright"
            >
              {s.cafe.visit}
            </a>
            <a
              href="#drinks"
              className="inline-flex items-center justify-center rounded-full border border-gold/60 px-7 py-3.5 text-sm font-bold text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              {s.cafe.menu}
            </a>
          </motion.div>
        </div>

        {/* editorial composition */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
          <motion.figure
            initial={{ clipPath: 'inset(12% 8% 12% 8% round 32px)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative h-[340px] overflow-hidden rounded-[2rem] border border-gold/15 sm:h-[440px] lg:h-[520px]"
          >
            <motion.div style={reduce ? undefined : { y: yMain }} className="absolute -inset-y-10 inset-x-0">
              <CafeScene />
            </motion.div>
            <SteamWisps className="absolute left-[63%] top-[38%] w-10 opacity-80" />

            {/* floating detail labels */}
            {s.cafe.labels.slice(0, 2).map((label, i) => (
              <motion.p
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 + i * 0.2 }}
                className={`absolute rounded-full border border-gold/30 bg-espresso-950/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-soft backdrop-blur-md ${
                  i === 0 ? 'left-6 top-6' : 'bottom-6 ltr:right-6 rtl:left-6 rtl:right-auto'
                }`}
              >
                {label}
              </motion.p>
            ))}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(120%_120%_at_50%_50%,transparent_65%,rgba(8,5,3,0.5)_100%)]" />
          </motion.figure>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-1 lg:gap-6">
            {[DetailPour, DetailCup].map((Panel, i) => (
              <motion.figure
                key={i}
                initial={{ clipPath: 'inset(16% 10% 16% 10% round 24px)', opacity: 0.4 }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
                className="relative h-[160px] overflow-hidden rounded-3xl border border-gold/15 sm:h-[210px] lg:h-[248px]"
              >
                <motion.div style={reduce ? undefined : { y: ySide }} className="absolute -inset-y-12 inset-x-0">
                  <Panel />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.2 }}
                  className="absolute bottom-4 rounded-full border border-gold/30 bg-espresso-950/80 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-soft backdrop-blur-md ltr:left-4 rtl:right-4"
                >
                  {s.cafe.labels[2 + i]}
                </motion.p>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CafeSection
