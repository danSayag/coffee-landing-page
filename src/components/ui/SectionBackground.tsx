interface SectionBackgroundProps {
  /** CSS `background-image` value for the base layer, e.g. `linear-gradient(...)`. */
  gradient: string
  /** Additional full-bleed `background-image` layers (radial glows) drawn above the base gradient. */
  overlays?: string[]
}

/**
 * The layered backdrop repeated at the top of most sections: a base gradient,
 * one or two soft radial glows, and a noise texture on top for grain.
 */
function SectionBackground({ gradient, overlays = [] }: SectionBackgroundProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundImage: gradient }} />
      {overlays.map((overlay) => (
        <div key={overlay} className="absolute inset-0" style={{ backgroundImage: overlay }} />
      ))}
      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
    </div>
  )
}

export default SectionBackground
