import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuizHeroSection from '../components/sections/QuizHeroSection'
import QuizSection from '../components/sections/QuizSection'
import { scrollToHash } from '../lib/scroll'
import type { OriginId } from '../i18n/translations'

function QuizPage() {
  const navigate = useNavigate()
  const { hash } = useLocation()

  // '/quiz#quiz' lands straight on the questions; a plain '/quiz' starts at the hero.
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash))
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash])

  const handleExplore = useCallback(
    (id: OriginId) => {
      navigate('/coffee', { state: { selectedOrigin: id, fromGlobe: false } })
    },
    [navigate],
  )

  return (
    <main>
      <QuizHeroSection />
      <QuizSection onExplore={handleExplore} />
    </main>
  )
}

export default QuizPage
