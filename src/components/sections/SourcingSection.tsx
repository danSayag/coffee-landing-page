import { motion } from 'framer-motion'
import { Handshake, Leaf, MapPin, Package } from 'lucide-react'
import { EASE, SectionHeading, reveal, useSections } from './shared'

const GOLD = '#8FA89B'
const ICONS = [Handshake, MapPin, Leaf, Package]

/** Thin animated journey: farm ג†’ roastery ג†’ cafֳ©. */
function JourneyPath() {
  const s = useSections()
  const stops = [
    { y: 30, label: s.sourcing.path.farm },
    { y: 150, label: s.sourcing.path.roastery },
    { y: 270, label: s.sourcing.path.cafe },
  ]
  return (
    <div className="relative mx-auto h-[320px] w-40" aria-hidden="true">
      <svg viewBox="0 0 80 320" className="absolute inset-y-0 left-1/2 h-full w-20 -translate-x-1/2 rtl:translate-x-1/2">
        <motion.path
          d="M 40 30 C 10 70, 70 110, 40 150 C 10 190, 70 230, 40 270"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.6"
          strokeOpacity="0.6"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        {stops.map((stop, i) => (
          <motion.circle
            key={stop.y}
            cx="40"
            cy={stop.y}
            r="6"
            fill="#2B2625"
            stroke={GOLD}
            strokeWidth="1.8"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.7 }}
          />
        ))}
      </svg>
      {stops.map((stop, i) => (
        <motion.span
          key={stop.label}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.7 }}
          className="absolute text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-soft ltr:left-[calc(50%+18px)] rtl:right-[calc(50%+18px)]"
          style={{ top: stop.y - 7 }}
        >
          {stop.label}
        </motion.span>
      ))}
    </div>
  )
}

function SourcingSection() {
  const s = useSections()

  return (
    <section id="sourcing" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#F1EBDF_50%,#F1EBDF_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(760px_520px_at_12%_25%,rgba(200,155,91,0.06),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <JourneyPath />
          </div>

          <div>
            <SectionHeading align="start" heading={s.sourcing.heading} description={s.sourcing.description} />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {s.sourcing.principles.map((principle, index) => {
                const Icon = ICONS[index]
                return (
                  <motion.div
                    key={principle.title}
                    {...reveal(index * 0.1)}
                    className="group rounded-3xl border border-cream/10 bg-espresso-900/40 p-6 transition-colors duration-500 hover:border-gold/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-transform duration-500 group-hover:scale-110">
                        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm italic text-gold/60">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-medium text-cream">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{principle.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SourcingSection
