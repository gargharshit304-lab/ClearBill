import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Shield, Upload } from 'lucide-react'
import { useState } from 'react'

function formatBytes(bytes) {
  if (!bytes) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

export default function Hero({
  billFile,
  reportFile,
  onBillChange,
  onReportChange,
  onBillRemove,
  onReportRemove,
  onAnalyze,
}) {
  const [draggedArea, setDraggedArea] = useState(null)
  const hasUploads = Boolean(billFile || reportFile)

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

  const UploadCard = ({
    icon: Icon,
    title,
    description,
    type,
    file,
    onFileChange,
    onRemove,
  }) => (
    <motion.label
      variants={uploadCardVariants}
      whileHover="hover"
      onDragEnter={() => setDraggedArea(type)}
      onDragLeave={() => setDraggedArea(null)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) {
          onFileChange(droppedFile)
        }
        setDraggedArea(null)
      }}
      className={`group relative block cursor-pointer overflow-hidden rounded-2xl border p-8 transition-all ${
        file
          ? 'border-emerald-200 bg-emerald-50/70'
          : draggedArea === type
            ? 'border-cyan-400 bg-blue-50/50 ring-2 ring-cyan-300/60'
            : 'glass'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,127,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,212,255,0.10),transparent_38%)] opacity-80" />
      <motion.div
        animate={{ y: draggedArea === type ? -10 : 0 }}
        className="relative flex flex-col items-center gap-4"
      >
        <div className="p-4 bg-gradient-soft rounded-xl">
          <Icon size={32} className="text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-center text-sm">{description}</p>

        {!file ? (
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 w-full text-center bg-white/70">
            <Upload size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PDF or image files</p>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-emerald-200 bg-white/90 p-4 text-left shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                  <CheckCircle2 size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">{file.name}</p>
                  <p className="mt-1 text-xs text-emerald-700">{formatBytes(file.size)} • Ready for analysis</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full bg-white p-1.5 text-gray-500 shadow-sm transition hover:text-gray-900"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  onRemove()
                }}
                aria-label={`Remove ${title}`}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.heic,.webp"
          className="sr-only"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0]
            if (selectedFile) {
              onFileChange(selectedFile)
            }
          }}
        />
      </motion.div>
    </motion.label>
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
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">Understand Your Hospital Bill</span>
                <br />
                Before You Pay
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed">
              AI-powered analysis for hospital bills and medical reports. Detect
              suspicious charges, simplify medical jargon, and understand your
              healthcare documents in seconds.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <UploadCard
                icon={FileText}
                title="Hospital Bill"
                description="Upload your itemized bill"
                type="bill"
                file={billFile}
                onFileChange={onBillChange}
                onRemove={onBillRemove}
              />
              <UploadCard
                icon={FileText}
                title="Medical Report"
                description="Upload any medical document"
                type="report"
                file={reportFile}
                onFileChange={onReportChange}
                onRemove={onReportRemove}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 text-sm text-gray-600">
              <Shield size={18} className="text-blue-600" />
              <span>No signup required • Files are not permanently stored</span>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={hasUploads ? { scale: 1.05 } : undefined}
              whileTap={hasUploads ? { scale: 0.95 } : undefined}
              onClick={onAnalyze}
              disabled={!hasUploads}
              className={`btn-primary w-full sm:w-auto text-lg py-4 px-10 ${!hasUploads ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              Analyze Documents →
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block relative w-full h-[600px]"
          >
            {/* Background Gradient Orbs */}
            <motion.div
              animate={{ float: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ float: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-0 right-1/3 w-40 h-40 bg-cyan-100 rounded-full opacity-20 blur-3xl pointer-events-none"
            />

            {/* Floating Document Previews */}
            <div className="relative h-full">
              {/* Bill Document Preview */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 left-0 w-48 h-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 h-full p-4 space-y-3">
                  <div className="h-3 w-16 bg-slate-300 rounded opacity-60" />
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full opacity-40" />
                    <div className="h-2 bg-slate-200 rounded w-5/6 opacity-40" />
                    <div className="h-2 bg-slate-200 rounded w-4/5 opacity-40" />
                  </div>

                  {/* Animated Scan Line */}
                  <motion.div
                    animate={{ y: [0, 120, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-70"
                  />

                  {/* Highlighted Terms */}
                  <div className="space-y-1 pt-2">
                    {['Facility Fee', 'Charge Item'].map((term, i) => (
                      <motion.div
                        key={term}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        className="text-xs px-2 py-1 bg-yellow-200/50 rounded text-yellow-900 inline-block"
                      >
                        {term}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Label Badge */}
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-sky-600 text-white text-xs font-semibold rounded-full shadow-md"
                >
                  Hospital Bill
                </motion.div>
              </motion.div>

              {/* Report Document Preview */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute top-32 right-0 w-48 h-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 h-full p-4 space-y-3">
                  <div className="h-3 w-20 bg-slate-300 rounded opacity-60" />
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-full opacity-40" />
                    <div className="h-2 bg-slate-200 rounded w-5/6 opacity-40" />
                    <div className="h-2 bg-slate-200 rounded w-4/5 opacity-40" />
                  </div>

                  {/* Animated Scan Line */}
                  <motion.div
                    animate={{ y: [0, 120, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70"
                  />

                  {/* Highlighted Terms */}
                  <div className="space-y-1 pt-2">
                    {['Procedure', 'Medication'].map((term, i) => (
                      <motion.div
                        key={term}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 + i * 0.3 }}
                        className="text-xs px-2 py-1 bg-green-200/50 rounded text-green-900 inline-block"
                      >
                        {term}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Label Badge */}
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                  className="absolute -top-3 right-1/2 translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-md"
                >
                  Medical Report
                </motion.div>
              </motion.div>

              {/* Floating AI Processing Labels */}
              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-md text-xs font-medium text-slate-700 whitespace-nowrap pointer-events-none"
              >
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                Procedure Detected
              </motion.div>

              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                className="absolute top-40 right-12 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-md text-xs font-medium text-slate-700 whitespace-nowrap pointer-events-none"
              >
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                Cross-check Complete
              </motion.div>

              <motion.div
                animate={{ opacity: [0, 1, 0], y: [0, -20, -40] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.6 }}
                className="absolute bottom-16 left-1/4 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-md text-xs font-medium text-slate-700 whitespace-nowrap pointer-events-none"
              >
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                Medical Summary Generated
              </motion.div>

              {/* Security Badge at Bottom */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-xs font-medium text-slate-700">
                  Secure Session • Files Not Stored
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
