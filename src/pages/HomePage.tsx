import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToHash } from '../lib/scroll'
import Hero from '../components/Hero'
import OriginsSection from '../components/origins/OriginsSection'
import RoastingSection from '../components/sections/RoastingSection'
import BrewingSection from '../components/sections/BrewingSection'
import MatchSection from '../components/sections/MatchSection'
import DrinksSection from '../components/sections/DrinksSection'
import ServicesSection from '../components/sections/ServicesSection'
import CafeSection from '../components/sections/CafeSection'
import TeamSection from '../components/sections/TeamSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import VisitSection from '../components/sections/VisitSection'
import FaqSection from '../components/sections/FaqSection'
import FinalCtaSection from '../components/sections/FinalCtaSection'
import type { OriginId } from '../i18n/translations'

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Entering the home page fresh: land at the top, or scroll to a requested section (e.g. coming from /coffee).
  useEffect(() => {
    if (location.hash) {
      const raf = requestAnimationFrame(() => scrollToHash(location.hash))
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectFromMap = useCallback(
    (id: OriginId) => {
      navigate('/coffee', { state: { selectedOrigin: id, fromGlobe: true } })
    },
    [navigate],
  )

  const handleFinalExplore = useCallback(() => {
    navigate('/coffee')
  }, [navigate])

  return (
    <main>
      {/* Discover: where coffee begins */}
      <Hero />
      <OriginsSection onSelectOrigin={handleSelectFromMap} />

      {/* Craft: how a bean becomes a cup */}
      <RoastingSection />
      <BrewingSection />

      {/* Personalize: find your cup */}
      <MatchSection />

      {/* Choose: what to drink, how to buy it */}
      <DrinksSection />
      <ServicesSection />

      {/* Experience: the people and the place */}
      <CafeSection />
      <TeamSection />
      <TestimonialsSection />

      {/* Convert: visit, ask, act */}
      <VisitSection />
      <FaqSection />
      <FinalCtaSection onExplore={handleFinalExplore} />
    </main>
  )
}

export default HomePage
