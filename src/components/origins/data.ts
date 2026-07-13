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
    art: { sky: ['#f3ddb0', '#e9c98f'], ridge: '#c99a5e', accent: '#d9a05b' },
    similar: ['kenya', 'colombia', 'costarica'],
  },
  {
    id: 'colombia',
    lat: 2.54,
    lon: -75.52,
    side: 'left',
    art: { sky: ['#f2d9c9', '#e8c3ac'], ridge: '#c98f74', accent: '#d98b7a' },
    similar: ['ethiopia', 'costarica', 'kenya'],
  },
  {
    id: 'brazil',
    lat: -18.51,
    lon: -46.05,
    side: 'right',
    art: { sky: ['#f0dcb8', '#e3c495'], ridge: '#b98a52', accent: '#c1854a' },
    similar: ['guatemala', 'costarica', 'colombia'],
  },
  {
    id: 'kenya',
    lat: -0.42,
    lon: 36.95,
    side: 'left',
    art: { sky: ['#f2d4b8', '#e6bd94'], ridge: '#c17f55', accent: '#d97c5b' },
    similar: ['ethiopia', 'colombia', 'costarica'],
  },
  {
    id: 'guatemala',
    lat: 14.56,
    lon: -90.73,
    side: 'right',
    art: { sky: ['#eeddb0', '#e0c88e'], ridge: '#b99457', accent: '#caa05e' },
    similar: ['brazil', 'costarica', 'colombia'],
  },
  {
    id: 'costarica',
    lat: 9.66,
    lon: -84.02,
    side: 'left',
    art: { sky: ['#eee0bb', '#e2cc98'], ridge: '#bb9a5f', accent: '#d4b36a' },
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
