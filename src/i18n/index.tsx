import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from './translations'

const STORAGE_KEY = 'terra-lang'

interface I18nValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Translation
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'fr' || stored === 'he') return stored
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  const value = useMemo<I18nValue>(() => ({ lang, dir: t.dir, t, setLang }), [lang, t, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
