import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import VisitSection from '../components/sections/VisitSection'
import SectionBackground from '../components/ui/SectionBackground'
import { reveal, useSections } from '../components/sections/shared'

const inputClasses =
  'w-full rounded-2xl border border-cream/15 bg-espresso-950/60 px-5 py-3.5 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-gold focus:outline-none'

function ContactForm() {
  const s = useSections()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    // Front-end validation only — no backend is wired up on purpose.
    const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email.trim()) && message.trim().length > 3
    setStatus(valid ? 'success' : 'error')
    if (valid) {
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  const clearStatus = () => {
    if (status !== 'idle') setStatus('idle')
  }

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
            {s.contactPage.form.nameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              clearStatus()
            }}
            placeholder={s.contactPage.form.namePlaceholder}
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
            {s.contactPage.form.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              clearStatus()
            }}
            placeholder={s.contactPage.form.emailPlaceholder}
            aria-invalid={status === 'error'}
            className={`mt-2 ${inputClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-gold">
          {s.contactPage.form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            clearStatus()
          }}
          placeholder={s.contactPage.form.messagePlaceholder}
          className={`mt-2 resize-y ${inputClasses}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright"
        >
          {s.contactPage.form.submit}
          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
        </button>
        <p
          aria-live="polite"
          className={`text-sm transition-opacity duration-300 ${
            status === 'success' ? 'text-gold-soft' : status === 'error' ? 'text-[#b3532a]' : 'opacity-0'
          }`}
        >
          {status === 'success' ? s.contactPage.form.success : status === 'error' ? s.contactPage.form.error : ''}
        </p>
      </div>
    </form>
  )
}

function ContactPage() {
  const s = useSections()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <section className="relative overflow-hidden pb-16 pt-36 lg:pt-44">
        <SectionBackground
          gradient="linear-gradient(180deg,#F4F0EA 0%,#F1EBDF 70%,#F4F0EA 100%)"
          overlays={['radial-gradient(900px 500px at 50% 0%,rgba(200,155,91,0.09),transparent 62%)']}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
          <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-[clamp(2.6rem,6vw,4.2rem)] font-medium leading-[1.06] text-cream">
              {s.contactPage.heading}
            </h1>
            <p className="mt-5 text-[0.97rem] leading-relaxed text-cream/60">{s.contactPage.description}</p>
          </motion.div>

          <motion.div
            {...reveal(0.12)}
            className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(255,255,255,0.5),rgba(230,220,199,0.82))] p-7 sm:p-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* café address, hours, phone and map */}
      <VisitSection />
    </main>
  )
}

export default ContactPage
