import { motion } from 'framer-motion'
import {
  Copy,
  BookOpen,
  TrendingDown,
  AlertTriangle,
  MessageSquare,
  RefreshCw,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: 'Duplicate Charge Detection',
      description: 'Our AI identifies identical charges billed multiple times and flags them immediately.',
      icon: Copy,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Medical Report Explainer',
      description: 'Confusing medical terminology? We translate complex reports into plain language.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Inflated Price Alerts',
      description: 'Get notified when medication or service costs exceed average market rates.',
      icon: TrendingDown,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'AI Risk Score',
      description: 'A comprehensive risk score showing the likelihood of billing errors or overcharges.',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-pink-500',
    },
    {
      title: 'Plain Language Summaries',
      description: 'Get concise, understandable summaries of every charge and finding.',
      icon: MessageSquare,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Bill vs Report Cross-check',
      description: 'Compare your bill against medical records to spot inconsistencies.',
      icon: RefreshCw,
      gradient: 'from-teal-500 to-blue-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  }

  const FeatureCard = ({ feature, index }) => {
    const Icon = feature.icon
    return (
      <motion.div
        variants={featureVariants}
        whileHover="hover"
        className="glass rounded-2xl p-8 group relative overflow-hidden"
      >
        {/* Animated background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        ></div>

        {/* Content */}
        <div className="relative space-y-4">
          {/* Icon with gradient background */}
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Icon size={32} className="text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>

          {/* Learn more link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-blue-600 font-semibold pt-4 border-t border-gray-100"
          >
            <span>Learn more</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl`}
          initial={false}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )
  }

  return (
    <section id="features" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand and challenge your medical bills.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: '2.3M+', label: 'Bills Analyzed' },
            { value: '$1.2B+', label: 'Savings Identified' },
            { value: '98%', label: 'Accuracy Rate' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <motion.div
                className="text-4xl font-bold gradient-text"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
