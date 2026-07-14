import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading, reveal, useSections } from './shared'
import danaImg from '../../assets/staff/Dana Rivera.png'
import omerImg from '../../assets/staff/Omer Katz.png'
import mayaImg from '../../assets/staff/Maya Chen.png'

const MEMBER_IMAGES: Record<string, string> = {
  'Dana Rivera': danaImg,
  'Omer Katz': omerImg,
  'Maya Chen': mayaImg,
}

const GOLD = '#8FA89B'

function TeamSection() {
  const s = useSections()

  return (
    <section id="story" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#EFE7D8_55%,#F4F0EA_100%)]" />
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
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.42),rgba(230,220,199,0.85))] transition-all duration-500 hover:border-gold/45 ${
                index === 1 ? 'md:-translate-y-5' : ''
              }`}
            >
              <div className="relative h-60 shrink-0 overflow-hidden">
                <div className="h-[112%] w-full transition-transform duration-[1400ms] ease-out group-hover:-translate-y-3">
                  <img
                    src={MEMBER_IMAGES[member.name]}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-transparent to-transparent" />
                <p className="absolute bottom-4 font-display text-xl font-medium text-cream ltr:left-5 rtl:right-5">
                  {member.name}
                  <span className="mt-0.5 block text-[0.62rem] font-bold uppercase tracking-[0.26em] text-gold not-italic">{member.role}</span>
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* handwritten-feel quote */}
                <p className="relative flex-1 font-display text-lg italic leading-snug text-gold-soft">
                  {member.philosophy}
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

        <motion.div {...reveal(0.3)} className="mt-12 flex justify-center">
          <a
            href="#cafe"
            className="group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
          >
            {s.team.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default TeamSection
