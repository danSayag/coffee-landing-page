import { motion } from 'framer-motion'
import { Accessibility, Car, Clock, Dog, Mail, MapPin, Phone, Sofa, Sun, Wifi } from 'lucide-react'
import { getDirectionsUrl } from '../../lib/location'
import SectionBackground from '../ui/SectionBackground'
import { SectionHeading, reveal, useSections } from './shared'
import mapImg from '../../assets/map/Screenshot 2026-07-14 155506.png'

const FEATURE_ICONS = [Sofa, Sun, Accessibility, Wifi, Car, Dog]

/**
 * Café map — clicking it opens directions in Google Maps (desktop),
 * the user's navigation app (Android) or Apple Maps (iOS).
 */
function CafeMap({ label, cta }: { label: string; cta: string }) {
  return (
    <a
      href={getDirectionsUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative block h-full min-h-[320px] w-full overflow-hidden rounded-[2rem] border border-gold/15 bg-[#F4F0EA]"
    >
      <img
        src={mapImg}
        alt={label}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <MapPin className="h-9 w-9 text-cta drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full border border-cream/15 bg-espresso-950/85 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream/70 backdrop-blur-sm transition-colors duration-300 group-hover:text-cream">
        {cta}
      </span>
    </a>
  )
}

function VisitSection() {
  const s = useSections()

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <SectionBackground
        gradient="linear-gradient(180deg,#F4F0EA 0%,#ECE3D2 50%,#F4F0EA 100%)"
        overlays={['radial-gradient(880px 560px at 20% 20%,rgba(200,155,91,0.07),transparent 60%)']}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.visit.heading} description={s.visit.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <motion.div
            {...reveal(0.05)}
            className="rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.5),rgba(230,220,199,0.82))] p-8 sm:p-9"
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
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
              >
                {s.visit.directions}
              </a>
              <a
                href={`mailto:${s.visit.email}`}
                className="inline-flex items-center justify-center rounded-full border border-cta/60 px-7 py-3.5 text-sm font-bold text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
              >
                {s.visit.contact}
              </a>
            </div>
          </motion.div>

          <motion.div {...reveal(0.15)}>
            <CafeMap label={s.visit.mapLabel} cta={s.visit.directions} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisitSection
