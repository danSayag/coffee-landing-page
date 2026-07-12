import { type CSSProperties, type ReactNode } from 'react'
import { motion, useTransform } from 'framer-motion'
import CoffeeBean from './CoffeeBean'
import CoffeeCup from './CoffeeCup'
import Steam from './Steam'
import { useMouseParallax, type ParallaxSprings } from './useMouseParallax'
import { useStopAnimations } from '../a11y/useStopAnimations'

interface ParallaxLayerProps {
  depth: number
  springs: ParallaxSprings
  className?: string
  style?: CSSProperties
  children: ReactNode
}

function ParallaxLayer({ depth, springs, className, style, children }: ParallaxLayerProps) {
  const x = useTransform(springs.springX, (value) => value * depth)
  const y = useTransform(springs.springY, (value) => value * depth)

  return (
    <motion.div style={{ ...style, x, y }} className={className}>
      {children}
    </motion.div>
  )
}

interface FloatingBean {
  left: string
  top: string
  size: number
  depth: number
  tilt: number
  spin: 1 | -1
  floatDuration: number
  spinDuration: number
  delay: number
}

const FLOATING_BEANS: FloatingBean[] = [
  { left: '4%', top: '14%', size: 42, depth: 26, tilt: -18, spin: 1, floatDuration: 5.6, spinDuration: 52, delay: 0 },
  { left: '76%', top: '3%', size: 32, depth: -22, tilt: 40, spin: -1, floatDuration: 6.4, spinDuration: 46, delay: 0.8 },
  { left: '89%', top: '44%', size: 50, depth: 32, tilt: 12, spin: 1, floatDuration: 7.2, spinDuration: 58, delay: 0.4 },
  { left: '0%', top: '56%', size: 28, depth: -28, tilt: 65, spin: -1, floatDuration: 6, spinDuration: 50, delay: 1.2 },
  { left: '70%', top: '86%', size: 38, depth: 24, tilt: -35, spin: 1, floatDuration: 5.2, spinDuration: 48, delay: 0.6 },
  { left: '16%', top: '88%', size: 26, depth: -18, tilt: 20, spin: -1, floatDuration: 6.8, spinDuration: 54, delay: 1 },
]

function CoffeeComposition() {
  const springs = useMouseParallax()
  const reduceMotion = useStopAnimations()

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[420px] select-none sm:max-w-[500px] lg:max-w-[600px]"
    >
      <ParallaxLayer springs={springs} depth={-8} className="absolute inset-0">
        <div className="absolute -left-[8%] top-[8%] h-56 w-56 rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="absolute -right-[6%] bottom-[4%] h-64 w-64 rounded-full bg-espresso-800/60 blur-3xl" />
      </ParallaxLayer>

      <ParallaxLayer springs={springs} depth={10} className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.05]" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.1]" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.16] bg-[radial-gradient(circle,rgba(200,155,91,0.07),transparent_70%)]" />
        <div className="absolute right-[2%] top-[6%] aspect-square w-[30%] rounded-full border border-gold/[0.12]" />
      </ParallaxLayer>

      <ParallaxLayer springs={springs} depth={6} className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-[72%] w-[72%] rounded-full bg-[radial-gradient(circle,rgba(200,155,91,0.2),transparent_65%)] blur-2xl"
        />
      </ParallaxLayer>

      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <div className="absolute -top-[14%] left-[58%] h-[76%] w-16 rotate-[26deg] bg-gradient-to-b from-gold/15 via-gold/[0.05] to-transparent blur-xl" />
        <div className="absolute -top-[10%] left-[40%] h-[62%] w-9 rotate-[26deg] bg-gradient-to-b from-gold-soft/10 via-gold-soft/[0.04] to-transparent blur-lg" />
      </motion.div>

      <ParallaxLayer springs={springs} depth={20} className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={reduceMotion ? undefined : { y: [-10, 8], rotate: [-0.6, 0.8] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          className="relative w-[76%]"
        >
          <Steam className="absolute left-1/2 top-[-24%] w-[34%] -translate-x-1/2" />
          <CoffeeCup className="w-full" />
        </motion.div>
      </ParallaxLayer>

      {FLOATING_BEANS.map((bean) => (
        <ParallaxLayer
          key={`${bean.left}-${bean.top}`}
          springs={springs}
          depth={bean.depth}
          className="absolute"
          style={{ left: bean.left, top: bean.top, width: bean.size }}
        >
          <motion.div
            style={{ rotate: bean.tilt }}
            animate={
              reduceMotion
                ? undefined
                : { y: [-9, 9], rotate: [bean.tilt, bean.tilt + 360 * bean.spin] }
            }
            transition={{
              y: {
                duration: bean.floatDuration,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: bean.delay,
              },
              rotate: { duration: bean.spinDuration, repeat: Infinity, ease: 'linear' },
            }}
            className="drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
          >
            <CoffeeBean className="w-full" />
          </motion.div>
        </ParallaxLayer>
      ))}
    </div>
  )
}

export default CoffeeComposition
