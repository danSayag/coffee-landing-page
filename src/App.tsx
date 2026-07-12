import { useCallback, useState, useSyncExternalStore } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OriginsSection from './components/origins/OriginsSection'
import CollectionsSection, { type OriginSelection } from './components/collections/CollectionsSection'
import SimilarRoasts from './components/collections/SimilarRoasts'
import RoastingSection from './components/sections/RoastingSection'
import ServicesSection from './components/sections/ServicesSection'
import BrewingSection from './components/sections/BrewingSection'
import CafeSection from './components/sections/CafeSection'
import DrinksSection from './components/sections/DrinksSection'
import TeamSection from './components/sections/TeamSection'
import SourcingSection from './components/sections/SourcingSection'
import QuizSection from './components/sections/QuizSection'
import GallerySection from './components/sections/GallerySection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import VisitSection from './components/sections/VisitSection'
import FinalCtaSection from './components/sections/FinalCtaSection'
import Footer from './components/sections/Footer'
import AccessibilityWidget from './components/a11y/AccessibilityWidget'
import { getA11ySettings, subscribeA11y } from './components/a11y/a11yStore'
import { I18nProvider } from './i18n'
import type { OriginId } from './i18n/translations'
import { gsap } from './lib/gsap'

function App() {
  const a11y = useSyncExternalStore(subscribeA11y, getA11ySettings)
  const [selection, setSelection] = useState<OriginSelection | null>(null)

  const handleSelectFromMap = useCallback((id: OriginId) => {
    setSelection({ id, fromGlobe: true, at: Date.now() })
  }, [])

  const handleExplore = useCallback((id: OriginId) => {
    setSelection({ id, fromGlobe: false, at: Date.now() })
    gsap.to(window, {
      scrollTo: { y: '#similar', offsetY: 20 },
      duration: 1,
      ease: 'power2.inOut',
    })
  }, [])

  // Quiz result → highlight the matching collection card.
  const handleQuizExplore = useCallback((id: OriginId) => {
    setSelection({ id, fromGlobe: false, at: Date.now() })
    gsap.to(window, {
      scrollTo: { y: `#coffee-${id}`, offsetY: Math.max(80, window.innerHeight * 0.5 - 300) },
      duration: 1.3,
      ease: 'power2.inOut',
    })
  }, [])

  const handleFinalExplore = useCallback(() => {
    gsap.to(window, { scrollTo: { y: '#coffee', offsetY: 40 }, duration: 1.3, ease: 'power2.inOut' })
  }, [])

  return (
    <I18nProvider>
      <MotionConfig reducedMotion={a11y.stopAnimations ? 'always' : 'user'}>
        <Navbar />
        <main>
          <Hero />
          <OriginsSection onSelectOrigin={handleSelectFromMap} />
          <CollectionsSection selection={selection} onExplore={handleExplore} />
          <SimilarRoasts selectedId={selection?.id ?? 'ethiopia'} />
          <RoastingSection />
          <ServicesSection />
          <BrewingSection />
          <CafeSection />
          <DrinksSection />
          <TeamSection />
          <SourcingSection />
          <QuizSection onExplore={handleQuizExplore} />
          <GallerySection />
          <TestimonialsSection />
          <VisitSection />
          <FinalCtaSection onExplore={handleFinalExplore} />
        </main>
        <Footer />

        {/* Always-available accessibility button (required by Israeli accessibility law) */}
        <div className="pointer-events-none fixed bottom-5 left-5 z-70">
          <div className="relative">
            <AccessibilityWidget />
          </div>
        </div>
      </MotionConfig>
    </I18nProvider>
  )
}

export default App
