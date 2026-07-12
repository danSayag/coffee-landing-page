import { memo, useId } from 'react'

interface CoffeeBeanProps {
  className?: string
}

const CoffeeBean = memo(function CoffeeBean({ className }: CoffeeBeanProps) {
  const id = useId()
  const bodyId = `${id}-body`
  const sheenId = `${id}-sheen`

  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={bodyId} cx="38%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#8a5c36" />
          <stop offset="55%" stopColor="#5e3d24" />
          <stop offset="100%" stopColor="#382415" />
        </radialGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9c087" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e9c087" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="40" rx="26" ry="36" fill={`url(#${bodyId})`} />
      <path
        d="M32 6 C 18 26, 46 52, 32 74"
        stroke="#241610"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M35 7 C 21 27, 49 53, 35 73"
        stroke="#a4744a"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <ellipse cx="22" cy="24" rx="10" ry="14" fill={`url(#${sheenId})`} />
    </svg>
  )
})

export default CoffeeBean
