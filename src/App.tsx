import { useSyncExternalStore } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/sections/Footer'
import AccessibilityWidget from './components/a11y/AccessibilityWidget'
import { getA11ySettings, subscribeA11y } from './components/a11y/a11yStore'
import { I18nProvider } from './i18n'
import HomePage from './pages/HomePage'
import CoffeePage from './pages/CoffeePage'
import CoffeeOriginsPage from './pages/coffeeOrigins/CoffeeOriginsPage'

function App() {
  const a11y = useSyncExternalStore(subscribeA11y, getA11ySettings)

  return (
    <I18nProvider>
      <MotionConfig reducedMotion={a11y.stopAnimations ? 'always' : 'user'}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coffee" element={<CoffeePage />} />
            <Route path="/coffee-origins" element={<CoffeeOriginsPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>

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
