import { motion } from 'framer-motion'
import { Upload, Zap, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Files',
      description: 'Drag and drop your hospital bills and medical reports',
      icon: Upload,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'AI Reads Documents',
      description: 'Our advanced AI processes and understands your documents',
      icon: Zap,
      color: 'from-cyan-500 to-teal-500',
    },
    {
      number: '03',
      title: 'Detects Issues',
      description: 'Identifies suspicious charges, errors, and red flags',
      icon: AlertCircle,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      number: '04',
      title: 'Clear Insights',
      description: 'Get actionable recommendations and plain-language summaries',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-green-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { y: -10, transition: { duration: 0.3 } },
  }

  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, fast, and transparent. Your documents are analyzed in seconds.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                whileHover="hover"
                className="glass rounded-2xl p-8 relative group overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative space-y-4">
                  {/* Step Number */}
                  <motion.div
                    className="text-6xl font-bold opacity-10 text-gray-900"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Arrow - except for last item */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={24} className="text-blue-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">Ready to analyze your documents?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg py-4 px-10"
          >
            Start Analyzing →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
