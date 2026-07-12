import { Languages } from 'lucide-react'
import { useI18n } from '../../i18n'
import { LANGS } from '../../i18n/translations'

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-gold/30 bg-espresso-900/80 p-1 backdrop-blur-md"
    >
      <span className="flex h-7 w-7 items-center justify-center text-gold" aria-hidden="true">
        <Languages className="h-4 w-4" />
      </span>
      {LANGS.map((entry) => (
        <button
          key={entry.code}
          type="button"
          lang={entry.code}
          onClick={() => setLang(entry.code)}
          aria-pressed={lang === entry.code}
          aria-label={entry.name}
          className={`h-7 min-w-9 rounded-full px-2 text-[0.82rem] font-semibold transition-all duration-300 ${
            lang === entry.code
              ? 'bg-gold text-espresso-950 shadow-[0_4px_14px_rgba(200,155,91,0.4)]'
              : 'text-cream/70 hover:bg-espresso-800 hover:text-cream'
          }`}
        >
          {entry.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
