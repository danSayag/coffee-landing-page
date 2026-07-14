import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { EASE, SectionHeading, SteamWisps, reveal, useSections } from './shared'
import cafeShopImg from '../../assets/coffee shop pic.png'
import dripCoffeeImg from '../../assets/drip coffee.png'
import capuchinoImg from '../../assets/capuchino.png'

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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#ECE3D2_45%,#F1EBDF_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_640px_at_70%_30%,rgba(200,155,91,0.08),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div ref={wrapRef} className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading align="start" eyebrow={s.cafe.eyebrow} heading={s.cafe.heading} description={s.cafe.description} />
          <motion.div {...reveal(0.2)} className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
            >
              {s.cafe.visit}
            </a>
            <a
              href="#drinks"
              className="inline-flex items-center justify-center rounded-full border border-cta/60 px-7 py-3.5 text-sm font-bold text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
            >
              {s.cafe.menu}
            </a>
          </motion.div>
        </div>

        {/* editorial composition */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
          <motion.figure
            initial={reduce ? false : { clipPath: 'inset(12% 8% 12% 8% round 32px)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={reduce ? { duration: 0 } : { duration: 1.2, ease: EASE }}
            className="relative h-[340px] overflow-hidden rounded-[2rem] border border-gold/15 sm:h-[440px] lg:h-[520px]"
          >
            <motion.div style={reduce ? undefined : { y: yMain }} className="absolute -inset-y-10 inset-x-0">
              <img src={cafeShopImg} alt="" className="h-full w-full object-cover" aria-hidden="true" />
            </motion.div>
            <SteamWisps className="absolute left-[63%] top-[38%] w-10 opacity-80" />

            {/* floating detail labels */}
            {s.cafe.labels.slice(0, 2).map((label, i) => (
              <motion.p
                key={label}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: 0.5 + i * 0.2 }}
                className={`absolute rounded-full border border-gold/30 bg-espresso-950/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-soft backdrop-blur-md ${
                  i === 0 ? 'left-6 top-6' : 'bottom-6 ltr:right-6 rtl:left-6 rtl:right-auto'
                }`}
              >
                {label}
              </motion.p>
            ))}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(120%_120%_at_50%_50%,transparent_65%,rgba(43,38,37,0.06)_100%)]" />
          </motion.figure>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-1 lg:gap-6">
            {[dripCoffeeImg, capuchinoImg].map((src, i) => (
              <motion.figure
                key={i}
                initial={reduce ? false : { clipPath: 'inset(16% 10% 16% 10% round 24px)', opacity: 0.4 }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
                className="relative h-[160px] overflow-hidden rounded-3xl border border-gold/15 sm:h-[210px] lg:h-[248px]"
              >
                <motion.div style={reduce ? undefined : { y: ySide }} className="absolute -inset-y-12 inset-x-0">
                  <img src={src} alt="" className="h-full w-full object-cover" aria-hidden="true" />
                </motion.div>
                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.7 + i * 0.2 }}
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
