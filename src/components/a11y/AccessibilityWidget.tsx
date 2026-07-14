import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Accessibility, CirclePause, Contrast, Minus, Plus, RotateCcw, Underline, X } from 'lucide-react'
import { useI18n } from '../../i18n'
import {
  MAX_FONT_STEP,
  getA11ySettings,
  resetA11ySettings,
  setA11ySettings,
  subscribeA11y,
  type A11ySettings,
} from './a11yStore'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 ${
        checked ? 'border-gold bg-gold' : 'border-cream/25 bg-espresso-800'
      }`}
    >
      <span
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full shadow-md transition-all duration-300 ${
          checked ? 'bg-espresso-950 ltr:left-6 rtl:right-6' : 'bg-cream/80 ltr:left-1 rtl:right-1'
        }`}
      />
    </button>
  )
}

function SettingRow({ icon, label, control }: { icon: ReactNode; label: string; control: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="flex items-center gap-3 text-sm text-cream/85">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          {icon}
        </span>
        {label}
      </span>
      {control}
    </div>
  )
}

function AccessibilityWidget() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const settings = useSyncExternalStore(subscribeA11y, getA11ySettings)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    // Close when clicking anywhere outside the widget (button or panel).
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const set = (patch: Partial<A11ySettings>) => setA11ySettings(patch)

  return (
    <div ref={rootRef} className="contents">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t.a11y.open}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-espresso-900/90 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold hover:text-espresso-950"
      >
        <Accessibility className="h-6 w-6" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t.a11y.title}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="pointer-events-auto absolute bottom-16 left-0 w-[320px] max-w-[calc(100vw-2.5rem)] rounded-3xl border border-gold/25 bg-espresso-900/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-cream">{t.a11y.title}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.a11y.close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-cream/60 transition-colors hover:bg-espresso-800 hover:text-cream"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-b border-cream/10 pb-4">
              <span className="text-sm text-cream/85">{t.a11y.fontSize}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={`${t.a11y.fontSize} −`}
                  disabled={settings.fontStep <= 0}
                  onClick={() => set({ fontStep: Math.max(0, settings.fontStep - 1) })}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-espresso-950 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-cream" aria-live="polite">
                  {settings.fontStep}/{MAX_FONT_STEP}
                </span>
                <button
                  type="button"
                  aria-label={`${t.a11y.fontSize} +`}
                  disabled={settings.fontStep >= MAX_FONT_STEP}
                  onClick={() => set({ fontStep: Math.min(MAX_FONT_STEP, settings.fontStep + 1) })}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-espresso-950 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-cream/5">
              <SettingRow
                icon={<Contrast className="h-4 w-4" aria-hidden="true" />}
                label={t.a11y.highContrast}
                control={
                  <Toggle
                    checked={settings.highContrast}
                    onChange={(next) => set({ highContrast: next })}
                    label={t.a11y.highContrast}
                  />
                }
              />
              <SettingRow
                icon={<Underline className="h-4 w-4" aria-hidden="true" />}
                label={t.a11y.underlineLinks}
                control={
                  <Toggle
                    checked={settings.underlineLinks}
                    onChange={(next) => set({ underlineLinks: next })}
                    label={t.a11y.underlineLinks}
                  />
                }
              />
              <SettingRow
                icon={<CirclePause className="h-4 w-4" aria-hidden="true" />}
                label={t.a11y.stopAnimations}
                control={
                  <Toggle
                    checked={settings.stopAnimations}
                    onChange={(next) => set({ stopAnimations: next })}
                    label={t.a11y.stopAnimations}
                  />
                }
              />
            </div>

            <button
              type="button"
              onClick={resetA11ySettings}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-espresso-950"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t.a11y.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccessibilityWidget
