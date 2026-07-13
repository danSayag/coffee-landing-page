import { Pause, Play } from 'lucide-react'

interface MotionControlProps {
  paused: boolean
  onToggle: () => void
  pauseLabel: string
  playLabel: string
  className?: string
}

/** Lets the visitor pause/resume just this section's motion, independent of the site-wide a11y setting. */
function MotionControl({ paused, onToggle, pauseLabel, playLabel, className = '' }: MotionControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? playLabel : pauseLabel}
      aria-pressed={paused}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-espresso-900/85 text-gold backdrop-blur-md transition-colors duration-300 hover:bg-gold hover:text-espresso-950 ${className}`}
    >
      {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
    </button>
  )
}

export default MotionControl
