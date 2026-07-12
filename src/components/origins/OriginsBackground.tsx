import { memo } from 'react'
import CoffeeBean from '../hero/CoffeeBean'
import Particles from '../hero/Particles'

/**
 * Deep-espresso cinematic backdrop for the Origins experience:
 * radial gold glows, faint bean silhouettes, drifting particles, vignette.
 */
const OriginsBackground = memo(function OriginsBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#110d0b_0%,#15110f_30%,#1b1410_68%,#140f0c_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_50%_58%,rgba(200,155,91,0.10),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_520px_at_12%_16%,rgba(46,34,26,0.6),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(760px_560px_at_88%_82%,rgba(46,34,26,0.55),transparent_62%)]" />

      <div data-parallax="slow" className="absolute inset-0">
        <CoffeeBean className="absolute left-[6%] top-[12%] w-40 -rotate-[32deg] opacity-[0.04] blur-[2px]" />
        <CoffeeBean className="absolute right-[8%] top-[30%] w-24 rotate-[54deg] opacity-[0.05] blur-[1px]" />
        <CoffeeBean className="absolute bottom-[14%] left-[16%] w-28 rotate-[16deg] opacity-[0.04] blur-[2px]" />
        <CoffeeBean className="absolute bottom-[6%] right-[20%] w-16 -rotate-[64deg] opacity-[0.05] blur-[1px]" />
      </div>

      {/* Decorative orbit rings behind the globe */}
      <div data-parallax="rings" className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-[min(96vh,60vw)] w-[min(96vh,60vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[min(82vh,50vw)] w-[min(82vh,50vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.08]" />
        <div className="absolute left-1/2 top-1/2 h-[min(70vh,42vw)] w-[min(70vh,42vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.12] bg-[radial-gradient(circle,rgba(200,155,91,0.06),transparent_70%)]" />
      </div>

      <Particles />

      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_45%,transparent_50%,rgba(8,5,3,0.68)_100%)]" />
    </div>
  )
})

export default OriginsBackground
