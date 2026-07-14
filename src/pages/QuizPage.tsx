import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuizSection from '../components/sections/QuizSection'
import type { OriginId } from '../i18n/translations'

function QuizPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExplore = useCallback(
    (id: OriginId) => {
      navigate('/coffee', { state: { selectedOrigin: id, fromGlobe: false } })
    },
    [navigate],
  )

  return (
    <main>
      <QuizSection onExplore={handleExplore} />
    </main>
  )
}

export default QuizPage
