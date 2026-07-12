import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Origins', href: '#origins' },
  { label: 'Our Coffee', href: '#coffee' },
  { label: 'Café', href: '#cafe' },
  { label: 'Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Terra Roasters — home">
          <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true" focusable="false">
            <g transform="rotate(24 32 32)">
              <ellipse cx="32" cy="32" rx="14" ry="20" fill="#c89b5b" />
              <path
                d="M32 13 C 22 25, 42 40, 32 51"
                stroke="#15110f"
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

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-cream/70 transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:text-cream hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cafe"
            className="hidden rounded-full border border-gold/70 px-5 py-2.5 text-sm font-semibold text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-espresso-950 sm:inline-flex"
          >
            Visit Our Café
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
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-cream/75 transition-colors hover:bg-espresso-800/60 hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cafe"
                onClick={() => setMenuOpen(false)}
                className="mt-3 rounded-full border border-gold/70 px-5 py-3 text-center text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-espresso-950 sm:hidden"
              >
                Visit Our Café
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
