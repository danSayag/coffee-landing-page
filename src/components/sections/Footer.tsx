import { useCallback, useEffect, useRef, useState, type FormEvent, type SVGProps } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ChevronDown } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { useI18n } from '../../i18n'
import { getA11ySettings, subscribeA11y } from '../a11y/a11yStore'
import LanguageSwitcher from '../a11y/LanguageSwitcher'
import HashLink from '../HashLink'
import { useMediaQuery } from '../origins/OriginsSection'
import { reveal, useSections } from './shared'

const GOLD = '#8FA89B'

function iconProps(props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  }
}

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(props)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.3" y1="6.7" x2="17.31" y2="6.7" />
  </svg>
)

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(props)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(props)}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
)

const TiktokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...iconProps(props)}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const SOCIALS = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon },
  { label: 'TikTok', href: '#', Icon: TiktokIcon },
]

function NewsletterForm() {
  const s = useSections()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    // Front-end validation only — no backend is wired up on purpose.
    const valid = /^\S+@\S+\.\S+$/.test(email.trim())
    setStatus(valid ? 'success' : 'error')
    if (valid) setEmail('')
  }

  return (
    <form onSubmit={submit} noValidate className="mt-6 max-w-md">
      <div className="flex overflow-hidden rounded-full border border-gold/30 bg-espresso-950/70 backdrop-blur-sm transition-colors focus-within:border-gold">
        <label htmlFor="newsletter-email" className="sr-only">
          {s.footer.newsletter.emailLabel}
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          placeholder={s.footer.newsletter.placeholder}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-status"
          className="w-full bg-transparent px-5 py-3.5 text-sm text-cream placeholder:text-cream/35 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 whitespace-nowrap bg-cta px-6 text-sm font-bold text-espresso-950 transition-colors duration-300 hover:bg-cta-bright"
        >
          {s.footer.newsletter.submit}
        </button>
      </div>
      <p
        id="newsletter-status"
        aria-live="polite"
        className={`mt-2.5 min-h-5 text-sm transition-opacity duration-300 ltr:pl-5 rtl:pr-5 ${
          status === 'success' ? 'text-gold-soft' : status === 'error' ? 'text-[#e08f6a]' : 'opacity-0'
        }`}
      >
        {status === 'success' ? s.footer.newsletter.success : status === 'error' ? s.footer.newsletter.error : ''}
      </p>
    </form>
  )
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [open, setOpen] = useState(false)
  const expanded = isDesktop || open

  return (
    <div className="border-b border-cream/10 py-3 md:border-none md:py-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={expanded}
        disabled={isDesktop}
        className="flex w-full items-center justify-between text-[0.72rem] font-bold uppercase tracking-[0.3em] text-gold md:pointer-events-none"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 md:hidden ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <ul className={`flex flex-col gap-2.5 overflow-hidden pt-4 md:flex ${expanded ? 'flex' : 'hidden'}`}>
        {links.map((link) => (
          <li key={link.label}>
            <HashLink href={link.href} className="text-sm text-cream/60 transition-colors duration-300 hover:text-gold">
              {link.label}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const { t } = useI18n()
  const s = useSections()
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const footerRef = useRef<HTMLElement>(null)
  const beanRef = useRef<SVGGElement>(null)
  const beanPathRef = useRef<SVGPathElement>(null)

  // A small coffee bean endlessly wandering along the top divider curve.
  useEffect(() => {
    if (prefersReduced) return
    const bean = beanRef.current
    const path = beanPathRef.current
    if (!bean || !path) return
    const tween = gsap.to(bean, {
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true },
      duration: 26,
      repeat: -1,
      ease: 'none',
      paused: getA11ySettings().stopAnimations,
    })
    const unsubscribe = subscribeA11y(() => {
      if (getA11ySettings().stopAnimations) tween.pause()
      else tween.play()
    })
    return () => {
      unsubscribe()
      tween.kill()
    }
  }, [prefersReduced])

  // Soft cursor-reactive glow (desktop).
  const handleMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const footer = footerRef.current
    if (!footer) return
    const rect = footer.getBoundingClientRect()
    footer.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    footer.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }, [])

  const backToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1.2, ease: 'power2.inOut' })
  }

  return (
    <footer
      id="footer"
      ref={footerRef}
      onMouseMove={handleMove}
      className="group/footer relative overflow-hidden bg-[linear-gradient(180deg,#F4F0EA_0%,#ECE3D2_45%,#E4DAC4_100%)]"
    >
      {/* decorative layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_0%,rgba(200,155,91,0.06),transparent_65%)]" />
        {/* topographic texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
          {Array.from({ length: 10 }, (_, i) => (
            <path
              key={i}
              d={`M -20 ${60 + i * 60} C 160 ${20 + i * 60}, 320 ${100 + i * 60}, 480 ${50 + i * 60} S 760 ${90 + i * 60}, 820 ${60 + i * 60}`}
              fill="none"
              stroke={GOLD}
              strokeWidth="1"
            />
          ))}
        </svg>
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        {/* cursor glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/footer:opacity-100 max-lg:hidden"
          style={{
            background: 'radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 20%), rgba(200,155,91,0.07), transparent 70%)',
          }}
        />
      </div>

      {/* top divider with traveling bean */}
      <div aria-hidden="true" className="relative h-14">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path ref={beanPathRef} d="M 0 40 C 250 12, 480 52, 700 28 C 880 10, 1050 40, 1200 24" fill="none" stroke={GOLD} strokeOpacity="0.22" strokeWidth="1.2" />
          <g ref={beanRef}>
            <ellipse rx="7" ry="9.5" fill="#5e3d24" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1" />
            <path d="M0 -8 C -3.5 -3, 3.5 3, 0 8.5" stroke="#241610" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-10 sm:px-8">
        {/* brand + newsletter */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <motion.div {...reveal()}>
            <HashLink href="#home" className="flex items-center gap-2.5" aria-label="Terra Roasters — home">
              <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true" focusable="false">
                <g transform="rotate(24 32 32)">
                  <ellipse cx="32" cy="32" rx="14" ry="20" fill={GOLD} />
                  <path d="M32 13 C 22 25, 42 40, 32 51" stroke="#2B2625" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              </svg>
              <span className="font-display text-2xl font-semibold tracking-[0.04em] text-cream">
                Terra <span className="text-gold-soft">Roasters</span>
              </span>
            </HashLink>
            <p className="mt-5 max-w-md font-display text-xl italic leading-relaxed text-cream/75">{s.footer.statement}</p>

            <div className="mt-7 flex items-center gap-3">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream/40">{s.footer.followUs}</span>
              <span aria-hidden="true" className="h-px w-8 bg-gold/30" />
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal(0.12)}>
            <h2 className="font-display text-2xl font-medium text-cream">{s.footer.newsletter.heading}</h2>
            <p className="mt-2.5 max-w-md text-sm leading-relaxed text-cream/55">{s.footer.newsletter.description}</p>
            <NewsletterForm />
          </motion.div>
        </div>

        {/* link columns */}
        <motion.nav
          {...reveal(0.1)}
          aria-label={t.nav.origins}
          className="mt-12 grid grid-cols-1 gap-2 border-t border-cream/10 pt-8 md:grid-cols-3 md:gap-10"
        >
          {s.footer.columns.map((column) => (
            <LinkColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </motion.nav>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-6 border-t border-cream/10 pt-7 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-self-start">
            {s.footer.legal.map((item) => (
              <a key={item.label} href={item.href} className="text-[0.72rem] text-cream/45 transition-colors hover:text-gold">
                {item.label}
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-sm italic text-gold-soft/80">{s.footer.closing}</p>
            <p className="mt-2 text-[0.72rem] text-cream/40">{s.footer.copyright}</p>
          </div>

          <div className="flex items-center gap-4 lg:justify-self-end">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={backToTop}
              aria-label={s.footer.backToTop}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-espresso-950"
            >
              <ArrowUp className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
