import type { OriginId } from '../../i18n/translations'

export interface OriginMeta {
  id: OriginId
  lat: number
  lon: number
  /** Which side of the globe the scroll-story card appears on (desktop). */
  side: 'left' | 'right'
  /** Duotone palette for the generative collection artwork. */
  art: {
    sky: [string, string]
    ridge: string
    accent: string
  }
  similar: [OriginId, OriginId, OriginId]
}

export const ORIGINS: OriginMeta[] = [
  {
    id: 'ethiopia',
    lat: 6.16,
    lon: 38.2,
    side: 'right',
    art: { sky: ['#3a2417', '#191009'], ridge: '#120b07', accent: '#d9a05b' },
    similar: ['kenya', 'colombia', 'costarica'],
  },
  {
    id: 'colombia',
    lat: 2.54,
    lon: -75.52,
    side: 'left',
    art: { sky: ['#3b2020', '#180e0c'], ridge: '#110a08', accent: '#d98b7a' },
    similar: ['ethiopia', 'costarica', 'kenya'],
  },
  {
    id: 'brazil',
    lat: -18.51,
    lon: -46.05,
    side: 'right',
    art: { sky: ['#33210f', '#170f08'], ridge: '#100905', accent: '#c1854a' },
    similar: ['guatemala', 'costarica', 'colombia'],
  },
  {
    id: 'kenya',
    lat: -0.42,
    lon: 36.95,
    side: 'left',
    art: { sky: ['#3a1d14', '#180d09'], ridge: '#120906', accent: '#d97c5b' },
    similar: ['ethiopia', 'colombia', 'costarica'],
  },
  {
    id: 'guatemala',
    lat: 14.56,
    lon: -90.73,
    side: 'right',
    art: { sky: ['#2e2113', '#150f09'], ridge: '#0f0a06', accent: '#caa05e' },
    similar: ['brazil', 'costarica', 'colombia'],
  },
  {
    id: 'costarica',
    lat: 9.66,
    lon: -84.02,
    side: 'left',
    art: { sky: ['#282412', '#131007'], ridge: '#0d0b05', accent: '#d4b36a' },
    similar: ['guatemala', 'colombia', 'kenya'],
  },
]

export const ORIGIN_INDEX: Record<OriginId, number> = ORIGINS.reduce(
  (acc, origin, index) => {
    acc[origin.id] = index
    return acc
  },
  {} as Record<OriginId, number>,
)
