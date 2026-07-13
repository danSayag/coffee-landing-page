import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n'
import { scrollToHash } from '../../lib/scroll'
import SourcingSection from '../../components/sections/SourcingSection'
import { coffeeOriginsContent } from './content'
import HeroSection from './HeroSection'
import OriginsStorySection from './OriginsStorySection'

function CoffeeOriginsPage() {
  const { lang } = useI18n()
  const content = coffeeOriginsContent[lang]
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const raf = requestAnimationFrame(() => scrollToHash(location.hash))
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <HeroSection content={content.hero} />
      <OriginsStorySection />
      <SourcingSection />
    </main>
  )
}

export default CoffeeOriginsPage
