import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage, { LandingPageWrapper } from './pages/LandingPage'
import Rights from './pages/Rights'
import AnalysisFlowPage from './pages/AnalysisFlowPage'
import './index.css'

function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/analysis" element={<AnalysisFlowPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
