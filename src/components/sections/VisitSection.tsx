import { motion } from 'framer-motion'
import { Accessibility, Car, Clock, Dog, Mail, MapPin, Phone, Sofa, Sun, Wifi } from 'lucide-react'
import { SectionHeading, reveal, useSections } from './shared'

const GOLD = '#c89b5b'
const FEATURE_ICONS = [Sofa, Sun, Accessibility, Wifi, Car, Dog]

/**
 * Stylized map placeholder.
 * PLACEHOLDER: replace this panel with a live map embed (Google Maps / Leaflet)
 * pointing at the real café address before launch.
 */
function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-[2rem] border border-gold/15 bg-[#150f0b]">
      <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        {/* topographic-style lines */}
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M -20 ${30 + i * 34} C 80 ${8 + i * 34}, 160 ${58 + i * 34}, 240 ${26 + i * 34} S 380 ${52 + i * 34}, 420 ${30 + i * 34}`}
            fill="none"
            stroke={GOLD}
            strokeOpacity={0.08 + (i % 3) * 0.03}
            strokeWidth="1.2"
          />
        ))}
        {/* roads */}
        <path d="M 0 210 L 400 150" stroke="#f5f0e8" strokeOpacity="0.1" strokeWidth="5" />
        <path d="M 150 320 L 230 0" stroke="#f5f0e8" strokeOpacity="0.08" strokeWidth="4" />
        {/* pin glow */}
        <circle cx="205" cy="165" r="34" fill={GOLD} opacity="0.12" />
        <circle cx="205" cy="165" r="14" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.4" className="animate-ping-slow" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <MapPin className="h-9 w-9 text-gold drop-shadow-[0_6px_14px_rgba(200,155,91,0.5)]" aria-hidden="true" />
      </div>
      <p className="absolute bottom-4 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full border border-cream/15 bg-espresso-950/80 px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-cream/55 backdrop-blur-sm">
        {label}
      </p>
    </div>
  )
}

function VisitSection() {
  const s = useSections()

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#15110f_0%,#1a130e_50%,#120d0a_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(880px_560px_at_20%_20%,rgba(200,155,91,0.07),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.visit.heading} description={s.visit.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <motion.div
            {...reveal(0.05)}
            className="rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(46,34,26,0.5),rgba(17,13,11,0.82))] p-8 sm:p-9"
          >
            {/* PLACEHOLDER business info — replace address/hours/phone/email before launch */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {s.visit.addressLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">
                  {s.visit.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {s.visit.hoursLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">
                  {s.visit.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="mt-7 border-t border-cream/10 pt-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">{s.visit.contactLabel}</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-cream/75">
                <a href={`tel:${s.visit.phone.replace(/[^+\d]/g, '')}`} className="inline-flex w-fit items-center gap-2.5 transition-colors hover:text-gold" dir="ltr">
                  <Phone className="h-4 w-4 text-gold/70" aria-hidden="true" />
                  {s.visit.phone}
                </a>
                <a href={`mailto:${s.visit.email}`} className="inline-flex w-fit items-center gap-2.5 transition-colors hover:text-gold" dir="ltr">
                  <Mail className="h-4 w-4 text-gold/70" aria-hidden="true" />
                  {s.visit.email}
                </a>
              </div>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5 border-t border-cream/10 pt-6">
              {s.visit.features.map((feature, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length]
                return (
                  <li
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/12 bg-espresso-900/50 px-3.5 py-1.5 text-[0.72rem] text-cream/70"
                  >
                    <Icon className="h-3.5 w-3.5 text-gold/80" aria-hidden="true" />
                    {feature}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-bright"
              >
                {s.visit.directions}
              </a>
              <a
                href={`mailto:${s.visit.email}`}
                className="inline-flex items-center justify-center rounded-full border border-gold/60 px-7 py-3.5 text-sm font-bold text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
              >
                {s.visit.contact}
              </a>
            </div>
          </motion.div>

          <motion.div {...reveal(0.15)}>
            <MapPlaceholder label={s.visit.mapLabel} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisitSection
