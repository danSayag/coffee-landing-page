import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translation } from './translations'

const STORAGE_KEY = 'terra-lang'
const URL_PARAM = 'lang'

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'fr' || value === 'he'
}

interface I18nValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Translation
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

/** URL ?lang= takes priority so links can be shared in a specific language; falls back to the
 *  last choice stored locally, and defaults to English when neither is set. */
function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const fromUrl = new URLSearchParams(window.location.search).get(URL_PARAM)
  if (isLang(fromUrl)) return fromUrl
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isLang(stored)) return stored
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
    const url = new URL(window.location.href)
    if (next === 'en') {
      url.searchParams.delete(URL_PARAM)
    } else {
      url.searchParams.set(URL_PARAM, next)
    }
    window.history.replaceState(window.history.state, '', url)
  }, [])

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  useEffect(() => {
    const onPopState = () => {
      const fromUrl = new URLSearchParams(window.location.search).get(URL_PARAM)
      setLangState(isLang(fromUrl) ? fromUrl : 'en')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const value = useMemo<I18nValue>(() => ({ lang, dir: t.dir, t, setLang }), [lang, t, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
