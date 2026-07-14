import { memo } from 'react'
import type { OriginId } from '../../i18n/translations'
import type { OriginMeta } from '../origins/data'
import ethiopiaImg from '../../assets/explore/etiopien.webp'
import colombiaImg from '../../assets/explore/colombia-coffee.webp'
import brazilImg from '../../assets/explore/brazil.jpg'
import kenyaImg from '../../assets/explore/Kenya.jpg'
import guatemalaImg from '../../assets/explore/Guatemala.webp'
import costaricaImg from '../../assets/explore/costar rica.webp'

interface OriginArtProps {
  origin: OriginMeta
  index: number
  className?: string
}

const ORIGIN_IMAGES: Record<OriginId, string> = {
  ethiopia: ethiopiaImg,
  colombia: colombiaImg,
  brazil: brazilImg,
  kenya: kenyaImg,
  guatemala: guatemalaImg,
  costarica: costaricaImg,
}

/** Photographic origin artwork with a soft vignette so overlaid labels stay readable. */
const OriginArt = memo(function OriginArt({ origin, className }: OriginArtProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <img src={ORIGIN_IMAGES[origin.id]} alt="" className="h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  )
})

export default OriginArt
