import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { BookOpen, FileText, MessageCircle, Shield, Users, FileSearch, AlertCircle } from 'lucide-react'

const rights = [
  { title: 'Right to an Itemized Bill', desc: 'Patients can request detailed billing breakdowns.', icon: FileText },
  { title: 'Right to Understand Charges', desc: 'Hospitals should explain procedures and pricing clearly.', icon: BookOpen },
  { title: 'Right to Ask Questions', desc: 'Patients can question suspicious or duplicate charges.', icon: MessageCircle },
  { title: 'Right to Medical Records', desc: 'Patients can access their reports and treatment records.', icon: FileSearch },
  { title: 'Right to Insurance Transparency', desc: 'Patients should understand what insurance covers.', icon: Shield },
  { title: 'Right to Second Opinion', desc: 'Patients can seek another medical opinion.', icon: Users },
  { title: 'Right to Billing Clarification', desc: 'Hospitals should explain unclear costs before payment.', icon: MessageCircle },
  { title: 'Right to File Complaints', desc: 'Patients can escalate unfair billing practices.', icon: AlertCircle },
]

export default function Rights() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold">Patient Rights & Billing Transparency</h1>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Clear, fair, and actionable rights so patients can confidently navigate healthcare billing.</p>
          </motion.header>

          <motion.section className="grid grid-cols-1 md:grid-cols-2 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {rights.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.article key={i} className="glass rounded-2xl p-6" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-3 bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                      <p className="mt-2 text-slate-600">{r.desc}</p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.section>

          <motion.div className="mt-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-slate-600 mb-4">Learn more by analyzing your documents — our AI highlights the areas most likely to need attention.</p>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.03 }}
              className="btn-premium btn-primary px-6 py-3 rounded-full"
            >
              Analyze Your Documents
            </motion.button>
          </motion.div>

          <motion.div className="mt-14 text-sm text-slate-500">
            <p className="mb-2">Privacy: Files are processed in-session and not stored.</p>
            <p>Education: Understanding your rights helps you make better healthcare decisions.</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
