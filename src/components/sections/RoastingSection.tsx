import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../lib/gsap'
import { useMediaQuery } from '../origins/OriginsSection'
import { SectionHeading, SteamWisps, reveal, useSections } from './shared'
import greenBeanImg from '../../assets/beans/coffee bean green.webp'
import brownBeanImg from '../../assets/beans/brown coffee bean.webp'
import drumImg from '../../assets/drum cutout.webp'

/** Vintage roasting machine photo with animated beans flying in and out. */
function RoasterIllustration({
  refs,
}: {
  refs: {
    flyingBean: React.RefObject<SVGGElement | null>
    outBean: React.RefObject<SVGGElement | null>
  }
}) {
  return (
    <svg viewBox="0 0 420 460" className="h-auto w-full" aria-hidden="true" focusable="false">
      <image href={drumImg} x="0" y="0" width="420" height="460" preserveAspectRatio="xMidYMid meet" />

      {/* incoming green bean */}
      <g ref={refs.flyingBean} opacity="0">
        <image href={greenBeanImg} x="-29" y="-29" width="58" height="58" preserveAspectRatio="xMidYMid meet" />
      </g>

      {/* finished roasted bean */}
      <g ref={refs.outBean} opacity="0">
        <image href={brownBeanImg} x="-27" y="-27" width="54" height="54" preserveAspectRatio="xMidYMid meet" />
      </g>
    </svg>
  )
}

function RoastingSection() {
  const s = useSections()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const sticky = isDesktop && !prefersReduced

  const trackRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const curveRef = useRef<SVGPathElement>(null)
  const tempRef = useRef<HTMLDivElement>(null)
  const airRef = useRef<HTMLDivElement>(null)
  const devRef = useRef<HTMLDivElement>(null)
  const svgRefs = {
    flyingBean: useRef<SVGGElement>(null),
    outBean: useRef<SVGGElement>(null),
  }

  useLayoutEffect(() => {
    if (!sticky) return
    const track = trackRef.current
    if (!track) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: track, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })

      const curve = curveRef.current
      if (curve) {
        const length = curve.getTotalLength()
        gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length })
        tl.to(curve, { strokeDashoffset: 0, duration: 60, ease: 'power1.inOut' }, 25)
      }

      // green bean floats in and drops into the hopper
      gsap.set(svgRefs.flyingBean.current, { x: 210, y: -60, opacity: 0 })
      tl.to(svgRefs.flyingBean.current, { opacity: 1, duration: 4 }, 2)
      tl.to(svgRefs.flyingBean.current, { y: 30, rotation: 160, duration: 14, ease: 'power1.inOut' }, 2)
      tl.to(svgRefs.flyingBean.current, { y: 80, scale: 0.55, opacity: 0, duration: 6, ease: 'power2.in' }, 16)

      // indicators
      if (tempRef.current) tl.fromTo(tempRef.current, { width: '12%' }, { width: '92%', duration: 52, ease: 'power1.inOut' }, 26)
      if (airRef.current) tl.fromTo(airRef.current, { width: '35%' }, { width: '70%', duration: 52, ease: 'sine.inOut' }, 26)
      if (devRef.current) tl.fromTo(devRef.current, { width: '0%' }, { width: '85%', duration: 34, ease: 'power1.in' }, 52)

      // stage narration
      const windows = [22, 42, 62, 80]
      stageRefs.current.forEach((stage, i) => {
        if (!stage) return
        gsap.set(stage, { opacity: 0.28 })
        tl.to(stage, { opacity: 1, x: 0, duration: 5, ease: 'power2.out' }, windows[i])
        if (i < windows.length - 1) tl.to(stage, { opacity: 0.28, duration: 5 }, windows[i + 1])
      })

      // the finished bean leaves the drum
      gsap.set(svgRefs.outBean.current, { x: 285, y: 372 })
      tl.to(svgRefs.outBean.current, { opacity: 1, duration: 3 }, 88)
      tl.to(svgRefs.outBean.current, { x: 322, y: 408, rotation: 120, duration: 8, ease: 'power1.in' }, 89)

      tl.set({}, {}, 100)
    }, trackRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sticky])

  const indicators = (
    <div className="mt-4 grid grid-cols-3 gap-4 lg:mt-[clamp(0.5rem,1.5vh,1.25rem)]">
      {[
        { label: s.roasting.curveLabels.temperature, ref: tempRef, base: '92%' },
        { label: s.roasting.curveLabels.airflow, ref: airRef, base: '70%' },
        { label: s.roasting.curveLabels.development, ref: devRef, base: '85%' },
      ].map((item) => (
        <div key={item.label}>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/45">{item.label}</p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-cream/10">
            <div ref={item.ref} className="h-full rounded-full bg-gradient-to-r from-gold/50 to-gold" style={{ width: sticky ? '12%' : item.base }} />
          </div>
        </div>
      ))}
    </div>
  )

  const narrative = (
    <div className="flex flex-col gap-3 lg:gap-[clamp(0.5rem,1.2vh,1rem)]">
      {s.roasting.stages.map((stage, i) => (
        <div
          key={stage.num}
          ref={(el) => {
            stageRefs.current[i] = el
          }}
          className="border-gold/30 ltr:border-l-2 ltr:pl-5 rtl:border-r-2 rtl:pr-5"
        >
          <p className="font-display text-sm italic text-gold">
            {stage.num} — <span className="not-italic font-body text-[0.72rem] font-bold uppercase tracking-[0.24em]">{stage.title}</span>
          </p>
          <p className="mt-1 text-[0.85rem] leading-snug text-cream/65 lg:leading-normal">{stage.text}</p>
        </div>
      ))}
    </div>
  )

  const curvePanel = (
    <div className="rounded-2xl border border-cream/10 bg-espresso-900/50 p-4 lg:p-[clamp(0.75rem,2vh,1.25rem)]">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/45">{s.roasting.curveLabels.temperature}</span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/45">{s.roasting.curveLabels.time} ג†’</span>
      </div>
      <svg viewBox="0 0 220 66" className="mt-2 w-full" aria-hidden="true">
        <line x1="8" y1="58" x2="212" y2="58" stroke="#f5f0e8" strokeOpacity="0.12" />
        <line x1="8" y1="58" x2="8" y2="4" stroke="#f5f0e8" strokeOpacity="0.12" />
        <path
          ref={curveRef}
          d="M 8 58 C 60 53, 105 34, 145 22 C 172 13, 196 11, 212 10"
          fill="none"
          stroke="#8FA89B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {indicators}
    </div>
  )

  const illustration = (
    <div className={`relative mx-auto w-full ${sticky ? 'max-w-[260px] lg:max-w-[300px]' : 'max-w-md'}`}>
      <div aria-hidden="true" className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,155,91,0.1),transparent_65%)] blur-2xl" />
      <RoasterIllustration refs={svgRefs} />
      <SteamWisps className="pointer-events-none absolute -top-6 left-[24%] w-14 opacity-70" />
    </div>
  )

  return (
    <section id="roasting" className="relative bg-[linear-gradient(180deg,#F4F0EA_0%,#F4F0EA_50%,#F1EBDF_100%)]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_30%,rgba(200,155,91,0.06),transparent_60%)]" />

      {sticky ? (
        <div ref={trackRef} className="relative h-[270vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-6 lg:py-[clamp(1rem,3vh,2rem)]">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
              <SectionHeading eyebrow={s.roasting.eyebrow} heading={s.roasting.heading} description={s.roasting.description} />
              <div className="mt-6 grid grid-cols-[1fr_1.15fr] items-center gap-8 lg:mt-[clamp(0.75rem,2.5vh,2rem)] lg:gap-12">
                {illustration}
                <div>
                  {curvePanel}
                  <div className="mt-4 lg:mt-[clamp(0.5rem,1.5vh,1.25rem)]">{narrative}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <SectionHeading eyebrow={s.roasting.eyebrow} heading={s.roasting.heading} description={s.roasting.description} />
          <motion.div {...reveal(0.1)} className="mx-auto mt-10 max-w-md">
            {illustration}
          </motion.div>
          <motion.div {...reveal(0.15)} className="mx-auto mt-8 max-w-xl">
            {curvePanel}
          </motion.div>
          <motion.div {...reveal(0.2)} className="mx-auto mt-8 max-w-xl">
            {narrative}
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default RoastingSection
