import { motion } from 'framer-motion'
import { SectionHeading, reveal, useSections } from './shared'

const GOLD = '#c89b5b'

/** Abstract editorial portrait — silhouette with warm rim light. */
function Portrait({ variant }: { variant: number }) {
  const hair = [
    'M 60 58 Q 58 30 90 26 Q 124 24 122 56 Q 121 44 104 40 Q 74 36 68 58 Z',
    'M 58 62 Q 54 24 90 22 Q 128 22 126 64 L 118 60 Q 120 34 92 32 Q 66 34 66 62 Z',
    'M 62 54 Q 62 26 90 24 Q 120 24 120 58 Q 112 78 108 60 Q 108 38 88 36 Q 70 38 70 60 Z',
  ][variant % 3]
  return (
    <svg viewBox="0 0 180 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`portrait-bg-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#332216" />
          <stop offset="100%" stopColor="#170f0a" />
        </linearGradient>
      </defs>
      <rect width="180" height="200" fill={`url(#portrait-bg-${variant})`} />
      <circle cx={variant === 1 ? 140 : 40} cy="42" r="52" fill="#e8c88f" opacity="0.09" />
      {/* shoulders */}
      <path d="M 34 200 Q 40 138 90 134 Q 140 138 146 200 Z" fill="#0f0a06" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.4" />
      {/* apron strap */}
      <path d="M 66 152 Q 90 164 114 152" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.4" />
      {/* head */}
      <circle cx="90" cy="86" r="34" fill="#140d08" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.4" />
      <path d={hair} fill="#0b0704" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1.2" />
      {/* rim light */}
      <path d="M 118 62 Q 128 84 116 106" fill="none" stroke="#e8c88f" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TeamSection() {
  const s = useSections()

  return (
    <section id="story" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#110d0b_0%,#17110d_55%,#15110f_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_520px_at_80%_70%,rgba(200,155,91,0.06),transparent_60%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading eyebrow={s.team.eyebrow} heading={s.team.heading} description={s.team.description} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
          {s.team.members.map((member, index) => (
            <motion.article
              key={member.name}
              {...reveal(index * 0.12)}
              className={`group relative overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(165deg,rgba(46,34,26,0.42),rgba(17,13,11,0.85))] transition-all duration-500 hover:border-gold/45 ${
                index === 1 ? 'md:-translate-y-5' : ''
              }`}
            >
              <div className="relative h-60 overflow-hidden">
                <div className="h-[112%] w-full transition-transform duration-[1400ms] ease-out group-hover:-translate-y-3">
                  <Portrait variant={index} />
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-transparent to-transparent" />
                <p className="absolute bottom-4 font-display text-xl font-medium text-cream ltr:left-5 rtl:right-5">
                  {member.name}
                  <span className="mt-0.5 block text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold not-italic">{member.role}</span>
                </p>
              </div>

              <div className="p-6">
                {/* handwritten-feel quote */}
                <p className="relative font-display text-lg italic leading-snug text-gold-soft">
                  <span aria-hidden="true" className="text-gold/60">“</span>
                  {member.philosophy}
                  <span aria-hidden="true" className="text-gold/60">”</span>
                </p>
                <svg viewBox="0 0 120 8" className="mt-2 w-24 opacity-50" aria-hidden="true">
                  <path d="M2 6 C 30 1, 70 1, 118 5" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
                </svg>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-cream/10 pt-4 text-sm">
                  <div>
                    <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{s.team.favOrigin}</dt>
                    <dd className="mt-0.5 text-cream/80">{member.origin}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{s.team.favBrew}</dt>
                    <dd className="mt-0.5 text-cream/80">{member.brew}</dd>
                  </div>
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
