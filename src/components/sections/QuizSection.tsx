import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { useI18n } from '../../i18n'
import type { OriginId } from '../../i18n/translations'
import { scoreQuiz } from '../../i18n/sections'
import { ORIGINS, ORIGIN_INDEX } from '../origins/data'
import OriginArt from '../collections/OriginArt'
import CtaArrowIcon from '../ui/CtaArrowIcon'
import SectionBackground from '../ui/SectionBackground'
import { ROAST_META } from './roastMeta'
import { EASE, Meter, SectionHeading, useSections } from './shared'

interface QuizSectionProps {
  onExplore: (id: OriginId) => void
}

function QuizSection({ onExplore }: QuizSectionProps) {
  const { t } = useI18n()
  const s = useSections()
  const [answers, setAnswers] = useState<(number | undefined)[]>([])
  const [step, setStep] = useState(0)
  const done = step >= 3

  const pick = (optionIndex: number) => {
    if (done) return
    setAnswers((current) => {
      const next = [...current]
      next[step] = optionIndex
      return next
    })
    setStep((current) => current + 1)
  }
  const back = () => setStep((current) => Math.max(0, current - 1))
  const forward = () => {
    if (answers[step] !== undefined) setStep((current) => current + 1)
  }
  const reset = () => {
    setAnswers([])
    setStep(0)
  }

  const resultId = done ? scoreQuiz(answers as number[]) : null
  const result = resultId ? t.origins.items[resultId] : null
  const roastMeta = resultId ? ROAST_META[ORIGINS[ORIGIN_INDEX[resultId]].roastLevel] : null
  const brewAnswer = answers[0]
  const brewLabel =
    brewAnswer === undefined
      ? ''
      : brewAnswer === 5
        ? s.quiz.labels.cafeBrew
        : (s.quiz.questions[0]?.options[brewAnswer] ?? '')
  const flavorLabel = done && answers[1] !== undefined ? s.quiz.questions[1].options[answers[1]] : ''
  const explanation = s.quiz.explanation.replace('{flavor}', flavorLabel.toLowerCase()).replace('{method}', brewLabel)

  return (
    <section id="quiz" className="relative overflow-hidden py-24 lg:py-32">
      <SectionBackground
        gradient="linear-gradient(180deg,#F1EBDF 0%,#ECE3D2 50%,#F4F0EA 100%)"
        overlays={['radial-gradient(900px 560px at 50% 0%,rgba(200,155,91,0.08),transparent 62%)']}
      />

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
                      aria-pressed={answers[step] === optionIndex}
                      className={`group rounded-2xl border px-5 py-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10 hover:text-cream ltr:text-left rtl:text-right ${
                        answers[step] === optionIndex
                          ? 'border-gold/70 bg-gold/15 text-cream'
                          : 'border-cream/12 bg-espresso-900/40 text-cream/75'
                      }`}
                    >
                      <span className="me-3 font-display italic text-gold/60 transition-colors group-hover:text-gold">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                {/* step navigation */}
                <div className="mt-7 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold text-cream/70 transition-all duration-300 hover:border-gold/60 hover:text-cream disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                    {s.quiz.back}
                  </button>
                  <button
                    type="button"
                    onClick={forward}
                    disabled={answers[step] === undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-espresso-950 disabled:pointer-events-none disabled:opacity-30"
                  >
                    {s.quiz.next}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                  </button>
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

                    {roastMeta && (
                      <div className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:mx-0">
                        <Meter label={s.roasting.meterLabels.acidity} value={roastMeta.acidity} animateKey={resultId} />
                        <Meter label={s.roasting.meterLabels.sweetness} value={roastMeta.sweetness} animateKey={resultId} />
                        <Meter label={s.roasting.meterLabels.body} value={roastMeta.body} animateKey={resultId} />
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                      <button
                        type="button"
                        onClick={() => onExplore(resultId)}
                        className="group inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-bold text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
                      >
                        {s.quiz.explore}
                        <CtaArrowIcon />
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-full border border-cta/50 px-7 py-3.5 text-sm font-bold text-cta transition-colors duration-300 hover:bg-cta hover:text-espresso-950"
                      >
                        <RotateCcw className="h-4 w-4" aria-hidden="true" />
                        {s.quiz.tryAgain}
                      </button>
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-sm font-bold text-cream/70 transition-colors duration-300 hover:border-gold/60 hover:text-cream"
                      >
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                        {s.quiz.back}
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
