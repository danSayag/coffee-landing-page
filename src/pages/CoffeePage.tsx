import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CollectionsSection, { type OriginSelection } from '../components/collections/CollectionsSection'
import SimilarRoasts from '../components/collections/SimilarRoasts'
import type { OriginId } from '../i18n/translations'
import { gsap } from '../lib/gsap'

interface IncomingState {
  selectedOrigin?: OriginId
  fromGlobe?: boolean
}

function CoffeePage() {
  const location = useLocation()
  const [selection, setSelection] = useState<OriginSelection | null>(null)

  // Arriving from the origins map, the quiz result, or a plain "explore" CTA.
  useEffect(() => {
    const state = (location.state ?? null) as IncomingState | null
    const id = state?.selectedOrigin

    if (id) {
      setSelection({ id, fromGlobe: Boolean(state?.fromGlobe), at: Date.now() })
      const raf = requestAnimationFrame(() => {
        // The deck brings the selected card to the middle itself; just reach the section.
        gsap.to(window, {
          scrollTo: { y: '#coffee', offsetY: 0 },
          duration: 1.2,
          ease: 'power2.inOut',
        })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExplore = useCallback((id: OriginId) => {
    setSelection({ id, fromGlobe: false, at: Date.now() })
    gsap.to(window, {
      scrollTo: { y: '#similar', offsetY: 20 },
      duration: 1,
      ease: 'power2.inOut',
    })
  }, [])

  return (
    <main>
      <CollectionsSection selection={selection} onExplore={handleExplore} />
      <SimilarRoasts selectedId={selection?.id ?? 'ethiopia'} />
    </main>
  )
}

export default CoffeePage
