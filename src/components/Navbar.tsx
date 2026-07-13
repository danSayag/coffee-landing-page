import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useI18n } from '../i18n'
import LanguageSwitcher from './a11y/LanguageSwitcher'

const SECTION_IDS = ['home', 'origins', 'coffee', 'cafe', 'story', 'contact']

function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollY } = useScroll()

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.origins, href: '#origins' },
    { label: t.nav.coffee, href: '#coffee' },
    { label: t.nav.cafe, href: '#cafe' },
    { label: t.nav.story, href: '#story' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  // Highlight the nav item of the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-cream/5 bg-espresso-950/80 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Terra Roasters ג€” home">
          <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true" focusable="false">
            <g transform="rotate(24 32 32)">
              <ellipse cx="32" cy="32" rx="14" ry="20" fill="#8FA89B" />
              <path
                d="M32 13 C 22 25, 42 40, 32 51"
                stroke="#2B2625"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </svg>
          <span className="font-display text-[1.45rem] font-semibold tracking-[0.04em]">
            Terra <span className="text-gold-soft">Roasters</span>
          </span>
        </a>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = link.href === `#${active}`
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-[width] after:duration-300 hover:text-cream hover:after:w-full ${
                  isActive ? 'text-gold after:w-full' : 'text-cream/70 after:w-0'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <a
            href="#cafe"
            className="hidden rounded-full border border-cta/70 px-5 py-2.5 text-sm font-semibold text-cta transition-colors duration-300 hover:border-cta hover:bg-cta hover:text-espresso-950 sm:inline-flex"
          >
            {t.nav.visitCafe}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition-colors hover:text-cream lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-cream/5 bg-espresso-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map((link) => {
                const isActive = link.href === `#${active}`
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`rounded-lg px-3 py-2.5 text-base transition-colors hover:bg-espresso-800/60 hover:text-cream ${
                      isActive ? 'bg-espresso-800/40 text-gold' : 'text-cream/75'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <div className="mt-3 flex justify-center md:hidden">
                <LanguageSwitcher />
              </div>
              <a
                href="#cafe"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-full border border-cta/70 px-5 py-3 text-center text-sm font-semibold text-cta transition-colors hover:bg-cta hover:text-espresso-950 sm:hidden"
              >
                {t.nav.visitCafe}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
