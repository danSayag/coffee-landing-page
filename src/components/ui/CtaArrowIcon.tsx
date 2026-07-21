import { ArrowRight } from 'lucide-react'

/**
 * The small arrow that slides right on hover (and flips for RTL) used on
 * every gold call-to-action across the site.
 */
function CtaArrowIcon({ className = '' }: { className?: string }) {
  return (
    <ArrowRight
      className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 ${className}`}
      aria-hidden="true"
    />
  )
}

export default CtaArrowIcon
