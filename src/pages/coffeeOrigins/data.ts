export type CoffeeOriginId = 'ethiopia' | 'colombia' | 'brazil' | 'guatemala'

export interface CoffeeOriginPoint {
  id: CoffeeOriginId
  /** Degrees, -90..90 */
  lat: number
  /** Degrees, -180..180 */
  lon: number
}

// Approximate coordinates for each growing region (not exact farm locations).
export const COFFEE_ORIGIN_POINTS: CoffeeOriginPoint[] = [
  { id: 'ethiopia', lat: 6.16, lon: 38.21 },
  { id: 'colombia', lat: 2.53, lon: -75.98 },
  { id: 'brazil', lat: -18.51, lon: -44.55 },
  { id: 'guatemala', lat: 14.56, lon: -90.73 },
]

export const COFFEE_ORIGIN_ORDER: CoffeeOriginId[] = ['ethiopia', 'colombia', 'brazil', 'guatemala']
