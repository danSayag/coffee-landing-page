import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EASE, SectionHeading, reveal, useSections } from './shared'

function FaqSection() {
  const s = useSections()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F4F0EA_0%,#F1EBDF_55%,#F4F0EA_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_540px_at_15%_20%,rgba(200,155,91,0.06),transparent_62%)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <SectionHeading heading={s.faq.heading} align="start" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 lg:mt-0">
          {s.faq.items.map((item, index) => {
            const isOpen = index === openIndex
            return (
              <motion.div
                key={item.q}
                {...reveal((index % 6) * 0.06)}
                className={`overflow-hidden border-t transition-colors duration-500 ${
                  isOpen ? 'border-gold/40' : 'border-cream/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 ltr:text-left rtl:text-right"
                >
                  <span className="font-display text-lg font-medium text-cream">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold transition-transform duration-400 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-cream/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
