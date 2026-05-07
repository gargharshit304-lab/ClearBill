import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function scrollToSection(id) {
    const el = document.getElementById(id)
    const nav = document.querySelector('nav')
    const offset = (nav?.offsetHeight ?? 80) + 12
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function handleLinkClick(e, id, route) {
    e.preventDefault()
    setIsOpen(false)
    if (location.pathname === route || !route) {
      // same page -> just scroll
      scrollToSection(id)
    } else {
      // navigate then scroll after short delay
      navigate(route, { state: { scrollTo: id } })
      setTimeout(() => scrollToSection(id), 450)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold gradient-text">ClearBill</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={(e) => handleLinkClick(e, 'features', '/') } className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</button>
            <button onClick={(e) => handleLinkClick(e, 'how-it-works', '/') } className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</button>
            <button onClick={() => navigate('/rights')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Rights</button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => {
                // if on landing page, scroll to hero; otherwise navigate
                if (location.pathname === '/') {
                  const el = document.querySelector('section')
                  const nav = document.querySelector('nav')
                  const offset = (nav?.offsetHeight ?? 80) + 12
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - offset
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                } else {
                  navigate('/')
                }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-premium btn-primary px-6 py-3 rounded-full"
            >
              Analyze Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="md:hidden pb-4 border-t border-gray-100"
          >
            <button onClick={(e) => { handleLinkClick(e, 'features', '/'); }} className="block w-full text-left py-3 text-gray-600 hover:text-blue-600 font-medium">Features</button>
            <button onClick={(e) => { handleLinkClick(e, 'how-it-works', '/'); }} className="block w-full text-left py-3 text-gray-600 hover:text-blue-600 font-medium">How It Works</button>
            <button onClick={() => { setIsOpen(false); navigate('/rights'); }} className="block w-full text-left py-3 text-gray-600 hover:text-blue-600 font-medium">Rights</button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium btn-primary w-full mt-4 rounded-full px-6 py-3"
              onClick={() => { setIsOpen(false); if (location.pathname === '/') { const el = document.querySelector('section'); const nav = document.querySelector('nav'); const offset = (nav?.offsetHeight ?? 80) + 12; if (el) { const top = el.getBoundingClientRect().top + window.scrollY - offset; window.scrollTo({ top, behavior: 'smooth' }) } } else { navigate('/') } }}
            >
              Analyze Now
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
