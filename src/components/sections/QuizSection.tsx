import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { scoreQuiz } from '../../i18n/sections'
import { ORIGINS, ORIGIN_INDEX } from '../origins/data'
import OriginArt from '../collections/OriginArt'
import { EASE, SectionHeading, useSections } from './shared'

interface QuizSectionProps {
  onExplore: (id: OriginId) => void
}

function QuizSection({ onExplore }: QuizSectionProps) {
  const { t } = useI18n()
  const s = useSections()
  const [answers, setAnswers] = useState<number[]>([])
  const step = answers.length
  const done = step >= 3

  const pick = (optionIndex: number) => {
    if (done) return
    setAnswers((current) => [...current, optionIndex])
  }
  const reset = () => setAnswers([])

  const resultId = done ? scoreQuiz(answers) : null
  const result = resultId ? t.origins.items[resultId] : null
  const brewAnswer = answers[0]
  const brewLabel =
    brewAnswer === 5 ? s.quiz.labels.cafeBrew : (s.quiz.questions[0]?.options[brewAnswer] ?? '')
  const flavorLabel = done ? s.quiz.questions[1].options[answers[1]] : ''
  const explanation = s.quiz.explanation.replace('{flavor}', flavorLabel.toLowerCase()).replace('{method}', brewLabel)

  return (
    <section id="quiz" className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1EBDF_0%,#ECE3D2_50%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_0%,rgba(200,155,91,0.08),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeading heading={s.quiz.heading} description={s.quiz.description} />

        <div
          aria-live="polite"
          className="relative mx-auto mt-12 max-w-4xl min-h-[380px] rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.5),rgba(230,220,199,0.82))] p-7 shadow-[0_36px_100px_-30px_rgba(0,0,0,0.75)] sm:p-10"
        >
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {/* progress */}
                <div className="flex items-center justify-between">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
                    {s.quiz.stepLabel.replace('{n}', String(step + 1))}
                  </p>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-8 bg-gold' : 'w-4 bg-cream/15'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="mt-5 font-display text-2xl font-medium leading-snug text-cream sm:text-3xl">
                  {s.quiz.questions[step].q}
                </h3>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {s.quiz.questions[step].options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => pick(optionIndex)}
                      className="group rounded-2xl border border-cream/12 bg-espresso-900/40 px-5 py-4 text-sm font-medium text-cream/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10 hover:text-cream ltr:text-left rtl:text-right"
                    >
                      <span className="me-3 font-display italic text-gold/60 transition-colors group-hover:text-gold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              result &&
              resultId && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-[240px_1fr]"
                >
                  <div className="relative mx-auto h-44 w-full max-w-[240px] overflow-hidden rounded-3xl border border-gold/25 md:h-56">
                    <OriginArt origin={ORIGINS[ORIGIN_INDEX[resultId]]} index={ORIGIN_INDEX[resultId]} className="h-full w-full" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 to-transparent" />
                    <p className="absolute bottom-3 w-full text-center text-[0.62rem] font-bold uppercase tracking-[0.28em] text-gold">
                      {result.country}
                    </p>
                  </div>

                  <div className="text-center md:ltr:text-left md:rtl:text-right">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-gold">{s.quiz.resultKicker}</p>
                    <h3 className="mt-2 font-display text-3xl font-medium text-cream">{result.coffeeName}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/65">{explanation}</p>

                    <dl className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm md:justify-start">
                      <div>
                        <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{s.quiz.labels.roast}</dt>
                        <dd className="mt-0.5 text-cream/80">{result.roast}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{s.quiz.labels.notes}</dt>
                        <dd className="mt-0.5 font-display italic text-gold-soft">{result.notes.join(' • ')}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">{s.quiz.labels.brew}</dt>
                        <dd className="mt-0.5 text-cream/80">{brewLabel}</dd>
                      </div>
                    </dl>

                    <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                      <button
                        type="button"
                        onClick={() => onExplore(resultId)}
                        className="group inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
                      >
                        {s.quiz.explore}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-full border border-cta/50 px-7 py-3.5 text-sm font-bold text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        {s.quiz.tryAgain}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default QuizSection
