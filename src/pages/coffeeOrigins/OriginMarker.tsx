import { motion } from 'framer-motion'

interface OriginMarkerProps {
  active: boolean
  label?: string
  /** Set false in reduced-motion contexts to skip the pulse ring. */
  animate?: boolean
}

/** A small coffee-bean-style location marker, shared by the globe and the flat-map fallback. */
function OriginMarker({ active, label, animate = true }: OriginMarkerProps) {
  return (
    <div className="relative flex items-center justify-center">
      {active && animate && (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full bg-gold/45"
          style={{ width: 30, height: 30 }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <span
        aria-hidden="true"
        className={`relative rounded-full border shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-all duration-500 ${
          active ? 'h-3.5 w-3.5 border-gold bg-gold' : 'h-2 w-2 border-gold/50 bg-gold/40'
        }`}
      />
      {active && label && (
        <span className="absolute top-full mt-2.5 whitespace-nowrap rounded-full border border-gold/30 bg-espresso-900/95 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cream shadow-[0_8px_20px_rgba(0,0,0,0.15)] backdrop-blur-md">
          {label}
        </span>
      )}
    </div>
  )
}

export default OriginMarker
