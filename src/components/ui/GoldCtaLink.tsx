import type { ReactNode } from 'react'
import HashLink from '../HashLink'
import CtaArrowIcon from './CtaArrowIcon'

interface GoldCtaLinkProps {
  href: string
  children: ReactNode
  className?: string
}

/**
 * The solid gold pill link with a sliding arrow, used as the primary call to
 * action at the end of most home-page sections.
 */
function GoldCtaLink({ href, children, className = '' }: GoldCtaLinkProps) {
  return (
    <HashLink
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-sm font-bold tracking-wide text-espresso-950 shadow-[0_8px_28px_-10px_rgba(200,155,91,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-bright ${className}`}
    >
      {children}
      <CtaArrowIcon />
    </HashLink>
  )
}

export default GoldCtaLink
