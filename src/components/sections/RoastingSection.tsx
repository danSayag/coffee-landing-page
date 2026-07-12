import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../../lib/gsap'
import type { RoastId } from '../../i18n/sections'
import { useMediaQuery } from '../origins/OriginsSection'
import { EASE, Meter, SectionHeading, SteamWisps, reveal, useSections } from './shared'

// Bean color through the roast: green → yellow → cinnamon → medium → deep brown
const ROAST_COLORS = ['#94a06b', '#c2a75f', '#a9744a', '#7a4b2c', '#432815']

const ROAST_META: Record<RoastId, { bean: string; seam: string; acidity: number; sweetness: number; body: number; curve: string }> = {
  light: {
    bean: '#b08154',
    seam: '#6d4a2c',
    acidity: 5,
    sweetness: 3,
    body: 2,
    curve: 'M 8 88 C 60 82, 110 58, 150 40 C 175 29, 195 26, 212 25',
  },
  medium: {
    bean: '#7a4b2c',
    seam: '#3d2413',
    acidity: 3,
    sweetness: 4,
    body: 3,
    curve: 'M 8 88 C 60 80, 105 52, 145 33 C 172 20, 196 17, 212 16',
  },
  dark: {
    bean: '#432815',
    seam: '#1e1007',
    acidity: 1,
    sweetness: 4,
    body: 5,
    curve: 'M 8 88 C 55 76, 100 44, 138 25 C 168 10, 196 8, 212 7',
  },
}

/** Handcrafted roasting drum — thin gold linework over dark metal. */
function RoasterIllustration({
  refs,
}: {
  refs: {
    flyingBean: React.RefObject<SVGGElement | null>
    drum: React.RefObject<SVGGElement | null>
    glow: React.RefObject<SVGCircleElement | null>
    drumBean: React.RefObject<SVGEllipseElement | null>
    drumBeanSeam: React.RefObject<SVGPathElement | null>
    smoke: React.RefObject<SVGGElement | null>
    outBean: React.RefObject<SVGGElement | null>
  }
}) {
  return (
    <svg viewBox="0 0 420 460" className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="roaster-metal" cx="38%" cy="32%" r="90%">
          <stop offset="0%" stopColor="#3a2b1f" />
          <stop offset="60%" stopColor="#241a12" />
          <stop offset="100%" stopColor="#150e09" />
        </radialGradient>
        <radialGradient id="roaster-heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8964a" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#c86a2e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c86a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* hopper funnel */}
      <path d="M 172 40 L 248 40 L 226 96 L 194 96 Z" fill="#1d140d" stroke="#c89b5b" strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M 194 96 L 226 96 L 222 122 L 198 122 Z" fill="#160f0a" stroke="#c89b5b" strokeOpacity="0.35" strokeWidth="1.2" />

      {/* flue pipe */}
      <path d="M 318 150 L 352 150 L 352 60" fill="none" stroke="#c89b5b" strokeOpacity="0.4" strokeWidth="10" strokeLinecap="round" />

      {/* smoke from flue */}
      <g ref={refs.smoke} opacity="0">
        <SmokePath x={352} />
      </g>

      {/* drum body */}
      <circle cx="210" cy="248" r="118" fill="url(#roaster-metal)" stroke="#c89b5b" strokeOpacity="0.55" strokeWidth="1.6" />
      <circle cx="210" cy="248" r="100" fill="none" stroke="#c89b5b" strokeOpacity="0.22" strokeWidth="1" />

      {/* heat glow inside */}
      <circle ref={refs.glow} cx="210" cy="252" r="88" fill="url(#roaster-heat)" opacity="0" />

      {/* rotating paddles */}
      <g ref={refs.drum} style={{ transformOrigin: '210px 248px' }}>
        {[0, 60, 120].map((angle) => (
          <line
            key={angle}
            x1="210"
            y1="162"
            x2="210"
            y2="334"
            stroke="#c89b5b"
            strokeOpacity="0.3"
            strokeWidth="2"
            transform={`rotate(${angle} 210 248)`}
          />
        ))}
        <circle cx="210" cy="248" r="10" fill="#0f0a06" stroke="#c89b5b" strokeOpacity="0.6" strokeWidth="1.4" />
      </g>

      {/* the bean transforming inside the drum */}
      <g style={{ transformOrigin: '210px 258px' }}>
        <ellipse ref={refs.drumBean} cx="210" cy="258" rx="26" ry="36" fill={ROAST_COLORS[0]} opacity="0" />
        <path
          ref={refs.drumBeanSeam}
          d="M210 224 C 196 244, 224 270, 210 292"
          stroke="#241610"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0"
        />
      </g>

      {/* drum window rim */}
      <circle cx="210" cy="248" r="62" fill="none" stroke="#c89b5b" strokeOpacity="0.5" strokeWidth="1.6" />

      {/* control dial + details */}
      <circle cx="96" cy="300" r="16" fill="#160f0a" stroke="#c89b5b" strokeOpacity="0.55" strokeWidth="1.4" />
      <line x1="96" y1="300" x2="104" y2="290" stroke="#c89b5b" strokeOpacity="0.8" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="96" cy="342" r="6" fill="none" stroke="#c89b5b" strokeOpacity="0.4" strokeWidth="1.2" />

      {/* exit chute + tray */}
      <path d="M 268 340 L 316 388 L 296 402 L 258 360 Z" fill="#1d140d" stroke="#c89b5b" strokeOpacity="0.4" strokeWidth="1.3" />
      <ellipse cx="322" cy="416" rx="52" ry="12" fill="#120c08" stroke="#c89b5b" strokeOpacity="0.35" strokeWidth="1.2" />

      {/* legs */}
      <line x1="140" y1="342" x2="118" y2="428" stroke="#c89b5b" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <line x1="280" y1="342" x2="302" y2="428" stroke="#c89b5b" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="428" x2="320" y2="428" stroke="#c89b5b" strokeOpacity="0.25" strokeWidth="2" />

      {/* embers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} className="ember" cx={188 + i * 12} cy={300} r={1.6} fill="#e8964a" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}

      {/* incoming green bean */}
      <g ref={refs.flyingBean} opacity="0">
        <ellipse cx="0" cy="0" rx="15" ry="21" fill={ROAST_COLORS[0]} />
        <path d="M0 -19 C -8 -8, 8 8, 0 20" stroke="#5d6844" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      </g>

      {/* finished roasted bean */}
      <g ref={refs.outBean} opacity="0">
        <ellipse cx="0" cy="0" rx="14" ry="19" fill={ROAST_COLORS[4]} />
        <path d="M0 -17 C -7 -7, 7 7, 0 18" stroke="#1e1007" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

function SmokePath({ x }: { x: number }) {
  return (
    <>
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M ${x + i * 6 - 3} 56 C ${x - 10} 36, ${x + 10} 24, ${x - 4} 4`}
          fill="none"
          stroke="#dcc8a1"
          strokeWidth="2"
          strokeLinecap="round"
          className="steam-wisp"
          style={{ animationDelay: `${i * 1.1}s`, opacity: 0.3 }}
        />
      ))}
    </>
  )
}

function RoastSelector() {
  const s = useSections()
  const [roast, setRoast] = useState<RoastId>('medium')
  const meta = ROAST_META[roast]
  const info = s.roasting.roasts[roast]

  return (
    <motion.div {...reveal(0.1)} className="mx-auto mt-16 max-w-5xl rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(46,34,26,0.5),rgba(17,13,11,0.8))] p-7 shadow-[0_36px_100px_-30px_rgba(0,0,0,0.75)] sm:p-9">
      <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold">{s.roasting.selectorTitle}</p>

      <div role="tablist" aria-label={s.roasting.selectorTitle} className="mt-5 flex flex-wrap justify-center gap-2.5">
        {(Object.keys(s.roasting.roasts) as RoastId[]).map((id) => (
          <button
            key={id}
            role="tab"
            aria-selected={roast === id}
            onClick={() => setRoast(id)}
            className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              roast === id
                ? 'border-gold bg-gold text-espresso-950 shadow-[0_8px_24px_-8px_rgba(200,155,91,0.6)]'
                : 'border-cream/15 text-cream/65 hover:border-gold/50 hover:text-cream'
            }`}
          >
            {s.roasting.roasts[id].name}
          </button>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-1 items-center gap-9 lg:grid-cols-[auto_1fr_1fr] lg:gap-12">
        {/* bean preview */}
        <div className="mx-auto flex flex-col items-center gap-3">
          <motion.svg
            key={roast}
            initial={{ scale: 0.88, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewBox="0 0 64 80"
            className="w-24 drop-shadow-[0_16px_28px_rgba(0,0,0,0.55)]"
            aria-hidden="true"
          >
            <ellipse cx="32" cy="40" rx="26" ry="36" fill={meta.bean} />
            <path d="M32 6 C 18 26, 46 52, 32 74" stroke={meta.seam} strokeWidth="5" strokeLinecap="round" fill="none" />
          </motion.svg>
          {/* roast curve */}
          <svg viewBox="0 0 220 100" className="w-44" aria-hidden="true">
            <line x1="8" y1="88" x2="212" y2="88" stroke="#f5f0e8" strokeOpacity="0.12" />
            <line x1="8" y1="88" x2="8" y2="6" stroke="#f5f0e8" strokeOpacity="0.12" />
            <motion.path
              key={roast}
              d={meta.curve}
              fill="none"
              stroke="#c89b5b"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </svg>
        </div>

        {/* description */}
        <div className="text-center lg:ltr:text-left lg:rtl:text-right">
          <p className="font-display text-2xl font-medium italic leading-snug text-cream">{info.desc}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/60">{info.brew}</p>
          <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cream/45">{s.roasting.meterLabels.notes}</p>
          <p className="mt-1.5 font-display text-lg italic text-gold-soft">{info.notes.join(' • ')}</p>
        </div>

        {/* meters */}
        <div className="flex flex-col gap-4">
          <Meter label={s.roasting.meterLabels.acidity} value={meta.acidity} animateKey={roast} />
          <Meter label={s.roasting.meterLabels.sweetness} value={meta.sweetness} animateKey={roast} />
          <Meter label={s.roasting.meterLabels.body} value={meta.body} animateKey={roast} />
        </div>
      </div>
    </motion.div>
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
    drum: useRef<SVGGElement>(null),
    glow: useRef<SVGCircleElement>(null),
    drumBean: useRef<SVGEllipseElement>(null),
    drumBeanSeam: useRef<SVGPathElement>(null),
    smoke: useRef<SVGGElement>(null),
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

      // drum spins, heat builds
      tl.to(svgRefs.drum.current, { rotation: 660, duration: 76, svgOrigin: '210 248' }, 20)
      tl.to(svgRefs.glow.current, { opacity: 0.95, duration: 18, ease: 'power2.inOut' }, 22)

      // the bean transforms through five roast colors
      tl.to([svgRefs.drumBean.current, svgRefs.drumBeanSeam.current], { opacity: 1, duration: 4 }, 23)
      ROAST_COLORS.slice(1).forEach((color, i) => {
        tl.to(svgRefs.drumBean.current, { attr: { fill: color }, duration: 10 }, 30 + i * 13)
      })

      // indicators
      if (tempRef.current) tl.fromTo(tempRef.current, { width: '12%' }, { width: '92%', duration: 52, ease: 'power1.inOut' }, 26)
      if (airRef.current) tl.fromTo(airRef.current, { width: '35%' }, { width: '70%', duration: 52, ease: 'sine.inOut' }, 26)
      if (devRef.current) tl.fromTo(devRef.current, { width: '0%' }, { width: '85%', duration: 34, ease: 'power1.in' }, 52)

      // smoke appears late in the roast
      tl.to(svgRefs.smoke.current, { opacity: 0.7, duration: 12 }, 60)

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
      tl.to(svgRefs.glow.current, { opacity: 0.35, duration: 8 }, 90)

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
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/45">{s.roasting.curveLabels.time} →</span>
      </div>
      <svg viewBox="0 0 220 66" className="mt-2 w-full" aria-hidden="true">
        <line x1="8" y1="58" x2="212" y2="58" stroke="#f5f0e8" strokeOpacity="0.12" />
        <line x1="8" y1="58" x2="8" y2="4" stroke="#f5f0e8" strokeOpacity="0.12" />
        <path
          ref={curveRef}
          d="M 8 58 C 60 53, 105 34, 145 22 C 172 13, 196 11, 212 10"
          fill="none"
          stroke="#c89b5b"
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
    <section id="roasting" className="relative bg-[linear-gradient(180deg,#110d0b_0%,#15110f_50%,#140f0c_100%)]">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_30%,rgba(200,155,91,0.06),transparent_60%)]" />

      {sticky ? (
        <div ref={trackRef} className="relative h-[270vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 py-6 sm:px-10 lg:py-[clamp(1rem,3vh,2rem)]">
            <SectionHeading eyebrow={s.roasting.eyebrow} heading={s.roasting.heading} description={s.roasting.description} />
            <div className="mx-auto mt-6 grid w-full max-w-6xl grid-cols-[1fr_1.15fr] items-center gap-8 lg:mt-[clamp(0.75rem,2.5vh,2rem)] lg:gap-12">
              {illustration}
              <div>
                {curvePanel}
                <div className="mt-4 lg:mt-[clamp(0.5rem,1.5vh,1.25rem)]">{narrative}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative px-6 py-20">
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

      <div className="relative px-6 pb-24 lg:pb-28">
        <RoastSelector />
      </div>
    </section>
  )
}

export default RoastingSection
