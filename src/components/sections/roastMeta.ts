import type { RoastId } from '../../i18n/sections'

// Bean color through the roast: green → yellow → cinnamon → medium → deep brown
export const ROAST_COLORS = ['#94a06b', '#c2a75f', '#a9744a', '#7a4b2c', '#432815']

export const ROAST_META: Record<RoastId, { bean: string; seam: string; acidity: number; sweetness: number; body: number; curve: string }> = {
  light: {
    bean: '#b08154',
    seam: '#6d4a2c',
    acidity: 5,
    sweetness: 3,
    body: 2,
    curve: 'M 8 88 C 60 82, 110 58, 150 40 C 175 29, 195 26, 212 25',
  },
  medium: {
    bean: '#7a4b2c',
    seam: '#3d2413',
    acidity: 3,
    sweetness: 4,
    body: 3,
    curve: 'M 8 88 C 60 80, 105 52, 145 33 C 172 20, 196 17, 212 16',
  },
  dark: {
    bean: '#432815',
    seam: '#1e1007',
    acidity: 1,
    sweetness: 4,
    body: 5,
    curve: 'M 8 88 C 55 76, 100 44, 138 25 C 168 10, 196 8, 212 7',
  },
}
