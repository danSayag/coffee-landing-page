import { motion, useReducedMotion } from 'framer-motion'
import CoffeeBean from './CoffeeBean'
import Particles from './Particles'

function HeroBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#1b1410_0%,#15110f_55%,#110d0b_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_720px_at_78%_30%,rgba(200,155,91,0.08),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(820px_620px_at_6%_88%,rgba(46,34,26,0.65),transparent_60%)]" />

      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.07, 1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-[10%] top-[4%] h-[34rem] w-[34rem] rounded-full bg-gold/[0.08] blur-[130px]"
      />

      <CoffeeBean className="absolute -left-8 top-[20%] w-36 -rotate-[24deg] opacity-[0.05] blur-[2px]" />
      <CoffeeBean className="absolute bottom-[8%] left-[38%] w-24 rotate-[38deg] opacity-[0.04] blur-[2px]" />
      <CoffeeBean className="absolute right-[4%] top-[64%] w-16 rotate-[70deg] opacity-[0.05] blur-[1px]" />

      <Particles />

      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_38%,transparent_52%,rgba(8,5,3,0.62)_100%)]" />
    </div>
  )
}

export default HeroBackground
