import Footer from '../components/Footer'
import Features from '../components/Features'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [billFile, setBillFile] = useState(null)
  const [reportFile, setReportFile] = useState(null)

  const handleAnalyze = () => {
    if (!billFile && !reportFile) {
      return
    }

    navigate('/analysis', {
      state: {
        uploads: {
          billFile,
          reportFile,
        },
      },
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero
        billFile={billFile}
        reportFile={reportFile}
        onBillChange={setBillFile}
        onReportChange={setReportFile}
        onBillRemove={() => setBillFile(null)}
        onReportRemove={() => setReportFile(null)}
        onAnalyze={handleAnalyze}
      />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  )
}

// handle scrollTo on initial load after navigation
export function LandingPageWrapper(props) {
  const location = useLocation()
  useEffect(() => {
    const id = location.state?.scrollTo
    if (id) {
      const nav = document.querySelector('nav')
      const offset = (nav?.offsetHeight ?? 80) + 12
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
        // remove state so repeated navigations don't auto-scroll
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }
  }, [location])

  return <LandingPage {...props} />
}
