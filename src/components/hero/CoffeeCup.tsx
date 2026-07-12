import { memo } from 'react'

interface CoffeeCupProps {
  className?: string
}

const CoffeeCup = memo(function CoffeeCup({ className }: CoffeeCupProps) {
  return (
    <svg viewBox="0 0 480 460" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tr-cup-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#96805f" />
          <stop offset="0.16" stopColor="#d9cbae" />
          <stop offset="0.42" stopColor="#f3ecdc" />
          <stop offset="0.68" stopColor="#e0d3b7" />
          <stop offset="1" stopColor="#8a7356" />
        </linearGradient>
        <linearGradient id="tr-cup-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8f2e4" />
          <stop offset="1" stopColor="#d2c4a4" />
        </linearGradient>
        <linearGradient id="tr-cup-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b3a281" />
          <stop offset="1" stopColor="#e8dfc9" />
        </linearGradient>
        <radialGradient id="tr-coffee" cx="0.5" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#57381f" />
          <stop offset="0.55" stopColor="#3b2513" />
          <stop offset="1" stopColor="#22140b" />
        </radialGradient>
        <linearGradient id="tr-saucer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#836c4f" />
          <stop offset="0.22" stopColor="#d5c7a9" />
          <stop offset="0.5" stopColor="#efe7d5" />
          <stop offset="0.78" stopColor="#cfc0a0" />
          <stop offset="1" stopColor="#7c6549" />
        </linearGradient>
        <linearGradient id="tr-handle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecdfc5" />
          <stop offset="1" stopColor="#9d8767" />
        </linearGradient>
        <linearGradient id="tr-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="tr-blur-lg" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="tr-blur-md" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="tr-blur-sm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <ellipse cx="240" cy="404" rx="168" ry="22" fill="#000000" opacity="0.5" filter="url(#tr-blur-lg)" />

      <ellipse cx="240" cy="378" rx="158" ry="34" fill="url(#tr-saucer)" />
      <ellipse cx="240" cy="378" rx="158" ry="34" fill="none" stroke="#c89b5b" strokeOpacity="0.3" strokeWidth="1.5" />
      <ellipse cx="240" cy="373" rx="118" ry="22" fill="#c3b493" opacity="0.65" />
      <ellipse cx="240" cy="371" rx="92" ry="16" fill="#000000" opacity="0.28" filter="url(#tr-blur-md)" />

      <path
        d="M334 214 C 406 202, 418 296, 324 302"
        fill="none"
        stroke="#6d5940"
        strokeWidth="21"
        strokeLinecap="round"
        transform="translate(3 4)"
        opacity="0.55"
      />
      <path
        d="M334 214 C 406 202, 418 296, 324 302"
        fill="none"
        stroke="url(#tr-handle)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      <path
        d="M140 170 C 143 246 162 306 188 337 C 204 355 276 355 292 337 C 318 306 337 246 340 170 A 100 30 0 0 1 140 170 Z"
        fill="url(#tr-cup-body)"
      />
      <ellipse cx="193" cy="252" rx="15" ry="60" fill="url(#tr-sheen)" opacity="0.5" filter="url(#tr-blur-md)" />

      <g opacity="0.75">
        <circle cx="240" cy="262" r="30" fill="none" stroke="#a98552" strokeWidth="1.2" />
        <text
          x="240"
          y="274"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="34"
          fill="#a98552"
          letterSpacing="1"
        >
          TR
        </text>
      </g>

      <ellipse cx="240" cy="170" rx="100" ry="30" fill="url(#tr-cup-rim)" />
      <ellipse cx="240" cy="170" rx="100" ry="30" fill="none" stroke="#c89b5b" strokeOpacity="0.5" strokeWidth="1.8" />
      <ellipse cx="240" cy="171" rx="89" ry="25" fill="url(#tr-cup-wall)" />
      <ellipse cx="240" cy="173" rx="81" ry="21" fill="url(#tr-coffee)" />

      <g fill="none" stroke="#c89b5b" filter="url(#tr-blur-sm)">
        <ellipse cx="243" cy="173" rx="58" ry="13" strokeOpacity="0.28" strokeWidth="3" />
        <ellipse cx="236" cy="174" rx="36" ry="8" strokeOpacity="0.34" strokeWidth="2.5" />
        <ellipse cx="242" cy="173" rx="16" ry="3.5" strokeOpacity="0.4" strokeWidth="2" />
      </g>
    </svg>
  )
})

export default CoffeeCup
