import { motion } from 'framer-motion'
import { FileText, Upload, Shield, AlertCircle, TrendingDown, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [draggedArea, setDraggedArea] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const uploadCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  }

  const UploadCard = ({ icon: Icon, title, description, type }) => (
    <motion.div
      variants={uploadCardVariants}
      whileHover="hover"
      onDragEnter={() => setDraggedArea(type)}
      onDragLeave={() => setDraggedArea(null)}
      className={`glass rounded-2xl p-8 cursor-pointer transition-all ${
        draggedArea === type ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''
      }`}
    >
      <motion.div
        animate={{ y: draggedArea === type ? -10 : 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="p-4 bg-gradient-soft rounded-xl">
          <Icon size={32} className="text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-center text-sm">{description}</p>
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 w-full text-center">
          <Upload size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
          <p className="text-xs text-gray-400 mt-1">PDF or image files</p>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Understand Your Hospital Bill</span>
                <br />
                Before You Pay
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              AI-powered analysis for hospital bills and medical reports. Detect
              suspicious charges, simplify medical jargon, and understand your
              healthcare documents in seconds.
            </motion.p>

            {/* Upload Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <UploadCard
                icon={FileText}
                title="Hospital Bill"
                description="Upload your itemized bill"
                type="bill"
              />
              <UploadCard
                icon={FileText}
                title="Medical Report"
                description="Upload any medical document"
                type="report"
              />
            </motion.div>

            {/* Privacy Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <Shield size={18} className="text-blue-600" />
              <span>No signup required • Files are not permanently stored</span>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary w-full sm:w-auto text-lg py-4 px-10"
            >
              Analyze Documents →
            </motion.button>
          </div>

          {/* Right Side - AI Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block space-y-6"
          >
            {/* Main Preview Card */}
            <motion.div
              whileHover={{ scale: 1.02, shadow: 'lg' }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Analysis Results</h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertCircle size={20} className="text-yellow-500" />
                  </motion.div>
                </div>

                {/* Risk Score */}
                <div className="bg-gradient-soft rounded-xl p-4 space-y-3">
                  <p className="text-sm text-gray-600">Overall Risk Score</p>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl font-bold gradient-text"
                    >
                      7.2
                    </motion.div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: '72%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">High Risk</p>
                    </div>
                  </div>
                </div>

                {/* Red Flags */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900">Potential Issues Found</p>
                  {[
                    'Duplicate charge detected',
                    'Inflated medication cost',
                    'Facility fee mismatch',
                  ].map((flag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">{flag}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ float: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"
            />
            <motion.div
              animate={{ float: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-0 right-1/3 w-40 h-40 bg-cyan-100 rounded-full opacity-20 blur-3xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
