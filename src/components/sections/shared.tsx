import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../../i18n'
import { sectionsText, type SectionsText } from '../../i18n/sections'
import { getA11ySettings } from '../a11y/a11yStore'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function useSections(): SectionsText {
  const { lang } = useI18n()
  return sectionsText[lang]
}

const reducedMotionQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

/**
 * Non-hook read of "stop animations" (a11y widget or OS setting) for plain
 * helpers like `reveal()`. Stays in sync because App subscribes to the a11y
 * store and re-renders the whole tree on every change.
 */
function animationsStopped(): boolean {
  return getA11ySettings().stopAnimations || Boolean(reducedMotionQuery?.matches)
}

export function reveal(delay = 0) {
  if (animationsStopped()) {
    // No hidden initial state and no in-view gating — the page loads all at once.
    return { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
  }
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.8, ease: EASE, delay },
  }
}

interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  description?: string
  align?: 'center' | 'start'
  children?: ReactNode
}

export function SectionHeading({ eyebrow, heading, description, align = 'center', children }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'ltr:text-left rtl:text-right'
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <motion.p {...reveal()} className={`text-[0.68rem] font-semibold uppercase tracking-[0.35em] text-gold ${alignment}`}>
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        {...reveal(0.08)}
        className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.01em] text-cream"
      >
        {heading}
      </motion.h2>
      {description && (
        <motion.p {...reveal(0.16)} className="mt-4 text-[0.97rem] leading-relaxed text-cream/60">
          {description}
        </motion.p>
      )}
      {children}
    </div>
  )
}

interface MeterProps {
  label: string
  /** 0..5 */
  value: number
  animateKey?: string | number
}

export function Meter({ label, value, animateKey }: MeterProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream/50">{label}</span>
        <span className="font-display text-sm italic text-gold-soft">{value}/5</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-cream/10">
        <motion.div
          key={animateKey}
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.9, ease: EASE }}
          className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold ltr:origin-left rtl:origin-right"
        />
      </div>
    </div>
  )
}

/** Simple stylized coffee bean shape used across illustrations. */
export function BeanShape({ color, seam, className }: { color: string; seam: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="32" cy="40" rx="26" ry="36" fill={color} />
      <path d="M32 6 C 18 26, 46 52, 32 74" stroke={seam} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
    </svg>
  )
}

/** Animated steam wisps (CSS-driven so "stop animations" can freeze them). */
export function SteamWisps({ className, strength = 1 }: { className?: string; strength?: number }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true" focusable="false">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${18 + i * 12} 74 C ${10 + i * 12} 56, ${26 + i * 12} 44, ${16 + i * 12} 26 C ${10 + i * 12} 14, ${20 + i * 12} 8, ${18 + i * 12} 2`}
          fill="none"
          stroke="#dcc8a1"
          strokeWidth="2"
          strokeLinecap="round"
          className="steam-wisp"
          style={{ animationDelay: `${i * 0.9}s`, opacity: 0.25 * strength }}
        />
      ))}
    </svg>
  )
}
