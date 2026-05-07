import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, TrendingDown, HelpCircle } from 'lucide-react'
import { formatCurrency } from '../utils/formatCurrency'

export default function DemoPreview() {
  const currencySymbol = '₹'
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here's what your analysis dashboard looks like
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-200">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">HealthCity Hospital Bill</h3>
              <p className="text-gray-600">Analysis completed on May 7, 2026</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-6 py-2 whitespace-nowrap"
            >
              Download Report
            </motion.button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {/* Risk Score */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Risk Score</h4>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle size={20} className="text-red-500" />
                </motion.div>
              </div>
              <motion.div
                className="text-4xl font-bold gradient-text"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                7.2/10
              </motion.div>
              <p className="text-sm text-gray-600 mt-2">High Risk - Review Recommended</p>
            </motion.div>

            {/* Potential Overcharge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Overcharge</h4>
                <TrendingDown size={20} className="text-yellow-600" />
              </div>
              <motion.div
                className="text-3xl font-bold text-yellow-600"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {formatCurrency(1245, currencySymbol)}
              </motion.div>
              <p className="text-sm text-gray-600 mt-2">Est. Potential Savings</p>
            </motion.div>

            {/* Charges Reviewed */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Charges</h4>
                <CheckCircle2 size={20} className="text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600">127</div>
              <p className="text-sm text-gray-600 mt-2">Line items analyzed</p>
            </motion.div>

            {/* Issues Found */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Issues Found</h4>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AlertCircle size={20} className="text-red-500" />
                </motion.div>
              </div>
              <div className="text-3xl font-bold text-red-600">12</div>
              <p className="text-sm text-gray-600 mt-2">Flagged for review</p>
            </motion.div>
          </div>

          {/* Red Flags Section */}
          <div className="mt-12 space-y-4">
            <h4 className="font-bold text-lg text-gray-900">🚩 Red Flags Detected</h4>
            <motion.div className="space-y-3">
              {[
                {
                  title: 'Duplicate Ultrasound Charge',
                  amount: 450,
                  description: 'Billed twice on different dates for same procedure',
                  severity: 'high',
                },
                {
                  title: 'Inflated Medication Cost',
                  amount: 320,
                  description: 'MRI scan cost 40% above market average',
                  severity: 'medium',
                },
                {
                  title: 'Unclear Facility Fee',
                  amount: 500,
                  description: 'No itemization provided for facility charge',
                  severity: 'medium',
                },
              ].map((flag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    flag.severity === 'high'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">{flag.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                    </div>
                    <span className="text-lg font-bold text-red-600 whitespace-nowrap ml-4">
                      {formatCurrency(flag.amount, currencySymbol)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Questions to Ask */}
          <div className="mt-12 p-6 bg-gradient-soft rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={20} className="text-blue-600" />
              <h4 className="font-bold text-gray-900">Questions to Ask Your Hospital</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                'Why are there two ultrasound charges on May 2nd?',
                `Can you itemize what is included in the ${formatCurrency(500, currencySymbol)} facility fee?`,
                'How does the MRI cost compare to your standard rate?',
              ].map((question, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{question}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center pt-8 border-t border-gray-200"
          >
            <p className="text-gray-600 mb-4">Ready to analyze your bills?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg py-4 px-10"
            >
              Upload Your Bill Today →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
