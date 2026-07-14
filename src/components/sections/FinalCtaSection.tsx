import { motion } from 'framer-motion'
import CoffeeBean from '../hero/CoffeeBean'
import HashLink from '../HashLink'
import { useStopAnimations } from '../a11y/useStopAnimations'
import { EASE, SteamWisps, reveal, useSections } from './shared'
import finalCupImg from '../../assets/footer cup cutout.webp'

/** Large cream ceramic cup under a warm spotlight. */
function FinalCup() {
  return <img src={finalCupImg} alt="" className="h-auto w-full" aria-hidden="true" draggable={false} />
}

const FLOAT_BEANS = [
  { left: '8%', top: '18%', size: 34, delay: 0, rotate: -18 },
  { left: '85%', top: '12%', size: 26, delay: 1.1, rotate: 32 },
  { left: '90%', top: '62%', size: 40, delay: 0.5, rotate: -40 },
  { left: '5%', top: '68%', size: 24, delay: 1.6, rotate: 60 },
]

interface FinalCtaSectionProps {
  onExplore: () => void
}

function FinalCtaSection({ onExplore }: FinalCtaSectionProps) {
  const s = useSections()
  const reduce = useStopAnimations()

  return (
    <section id="finale" className="relative overflow-hidden py-28 lg:py-36">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#F1EBDF_60%,#F4F0EA_100%)]" />
        {/* warm spotlight */}
        <div className="absolute left-1/2 top-0 h-[130%] w-[60rem] max-w-full -translate-x-1/2 bg-[radial-gradient(50%_45%_at_50%_38%,rgba(232,200,143,0.14),transparent_70%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(43,38,37,0.06)_100%)]" />
      </div>

      {/* floating beans */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {FLOAT_BEANS.map((bean, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: bean.left, top: bean.top, width: bean.size, rotate: bean.rotate }}
            animate={reduce ? undefined : { y: [-8, 8] }}
            transition={{ duration: 5 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: bean.delay }}
          >
            <CoffeeBean className="w-full opacity-40" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          {/* the roasted bean returns and becomes the final cup */}
          <div className="relative mx-auto w-56 sm:w-64">
            {!reduce && (
              <motion.div
                initial={{ y: -90, opacity: 0, rotate: -30, scale: 0.7 }}
                whileInView={{ y: -6, opacity: [0, 1, 1, 0], rotate: 40, scale: 0.4 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1.3, ease: 'easeIn', times: [0, 0.25, 0.8, 1] }}
                className="absolute left-1/2 top-6 w-9 -translate-x-1/2"
                aria-hidden="true"
              >
                <CoffeeBean className="w-full" />
              </motion.div>
            )}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 34, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={reduce ? { duration: 0 } : { duration: 1, ease: EASE, delay: 0.2 }}
            >
              <SteamWisps className="absolute -top-12 left-1/2 w-14 -translate-x-1/2" />
              <FinalCup />
            </motion.div>
          </div>

          <motion.h2
            {...reveal(0.3)}
            className="mt-10 font-display text-[clamp(2.3rem,5vw,4rem)] font-medium leading-[1.08] tracking-[-0.01em] text-cream"
          >
            {s.finale.heading}
          </motion.h2>
          <motion.p {...reveal(0.4)} className="mx-auto mt-5 max-w-xl text-[0.97rem] leading-relaxed text-cream/60">
            {s.finale.description}
          </motion.p>

          <motion.div {...reveal(0.5)} className="mt-9 flex flex-wrap justify-center gap-3.5">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
            >
              {s.finale.explore}
            </button>
            <HashLink
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-cta/70 px-8 py-4 text-sm font-bold tracking-wide text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
            >
              {s.finale.visit}
            </HashLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
