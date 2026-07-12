// Global accessibility settings store (framework-free so GSAP/three code can read it too).

export interface A11ySettings {
  fontStep: number // 0..4
  highContrast: boolean
  underlineLinks: boolean
  stopAnimations: boolean
}

export const MAX_FONT_STEP = 4

const STORAGE_KEY = 'terra-a11y'

const DEFAULTS: A11ySettings = {
  fontStep: 0,
  highContrast: false,
  underlineLinks: false,
  stopAnimations: false,
}

type Listener = () => void

let settings: A11ySettings = load()
const listeners = new Set<Listener>()

function load(): A11ySettings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw) as Partial<A11ySettings>
    return {
      fontStep: Math.min(Math.max(Number(parsed.fontStep) || 0, 0), MAX_FONT_STEP),
      highContrast: Boolean(parsed.highContrast),
      underlineLinks: Boolean(parsed.underlineLinks),
      stopAnimations: Boolean(parsed.stopAnimations),
    }
  } catch {
    return { ...DEFAULTS }
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* storage unavailable */
  }
}

export function applyA11yToDocument() {
  const root = document.documentElement
  root.style.fontSize = settings.fontStep > 0 ? `${100 + settings.fontStep * 6.25}%` : ''
  root.classList.toggle('a11y-contrast', settings.highContrast)
  root.classList.toggle('a11y-underline', settings.underlineLinks)
  root.classList.toggle('a11y-no-motion', settings.stopAnimations)
}

export function getA11ySettings(): A11ySettings {
  return settings
}

export function setA11ySettings(patch: Partial<A11ySettings>) {
  settings = { ...settings, ...patch }
  persist()
  applyA11yToDocument()
  listeners.forEach((listener) => listener())
}

export function resetA11ySettings() {
  settings = { ...DEFAULTS }
  persist()
  applyA11yToDocument()
  listeners.forEach((listener) => listener())
}

export function subscribeA11y(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

if (typeof window !== 'undefined') {
  applyA11yToDocument()
}
