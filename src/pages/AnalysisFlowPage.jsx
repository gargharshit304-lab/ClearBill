import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Heart,
  Shield,
  Sparkles,
  Stethoscope,
  TrendingDown,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatCurrency, formatCurrencyRange } from '../utils/formatCurrency'

const processingStages = [
  { label: 'Uploading securely', phase: 'upload' },
  { label: 'Scanning hospital bill', phase: 'bill-scan' },
  { label: 'Reading medical report', phase: 'report-scan' },
  { label: 'Extracting line items', phase: 'extraction' },
  { label: 'Detecting anomalies', phase: 'detection' },
  { label: 'Cross-verifying procedures', phase: 'verification' },
  { label: 'Generating patient summary', phase: 'summary' },
  { label: 'Finalizing AI insights', phase: 'finalize' },
]

const MOCK_CURRENCY = {
  currency: 'INR',
  currencySymbol: '₹',
}

function getFileName(file, fallback) {
  return file?.name ?? fallback
}

// DOCUMENT SCANNING ANIMATION COMPONENT
function DocumentScannerAnimation({ phase, progress }) {
  return (
    <div className="relative flex h-80 w-full max-w-sm items-center justify-center" aria-label={`Document scan ${progress}% complete`}>
      {/* Stacked documents */}
      <div className="absolute h-48 w-full">
        {/* Bill Document */}
        <motion.div
          className="absolute left-0 top-0 h-48 w-full rounded-lg border-2 border-sky-300/40 bg-gradient-to-br from-sky-50 to-blue-50 p-4 shadow-lg"
          animate={{
            rotateZ: phase === 'bill-scan' ? [-8, 0, 2] : -12,
            opacity: phase === 'bill-scan' ? 1 : 0.6,
            y: phase === 'bill-scan' ? 0 : 20,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-2 h-2 w-16 rounded bg-slate-300" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-slate-200" />
            <div className="h-1 w-5/6 rounded bg-slate-200" />
            <div className="h-1 w-4/5 rounded bg-slate-200" />
          </div>
          {phase === 'bill-scan' && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Report Document */}
        <motion.div
          className="absolute right-0 top-0 h-48 w-full rounded-lg border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-lg"
          animate={{
            rotateZ: phase === 'report-scan' ? [8, 0, -2] : 12,
            opacity: phase === 'report-scan' ? 1 : 0.6,
            y: phase === 'report-scan' ? 0 : 20,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-2 h-2 w-16 rounded bg-slate-300" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-slate-200" />
            <div className="h-1 w-5/6 rounded bg-slate-200" />
            <div className="h-1 w-4/5 rounded bg-slate-200" />
          </div>
          {phase === 'report-scan' && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Floating extracted text particles */}
      {phase === 'extraction' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {['220', 'Room', 'Med', 'Proc', 'Fee'].map((text, i) => (
            <motion.div
              key={text}
              className="absolute text-xs font-mono text-sky-500 opacity-60"
              animate={{
                y: [0, -60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: '60%',
              }}
            >
              {text === '220' ? `${MOCK_CURRENCY.currencySymbol}${text}` : text}
            </motion.div>
          ))}
        </div>
      )}

      {/* AI detection highlights */}
      {(phase === 'detection' || phase === 'verification') && (
        <div className="absolute inset-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-12 w-32 rounded-lg border-2 border-orange-400/60 bg-orange-400/10"
              animate={{
                x: [0, 40, 0],
                y: [-40 + i * 40, -40 + i * 40, 0],
                opacity: [0, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
              }}
              style={{
                top: `${20 + i * 30}%`,
                left: `${10 + i * 30}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProcessingScreen({ progress, activeStageIndex, billFile, reportFile }) {
  const currentPhase = processingStages[activeStageIndex]?.phase || 'upload'

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
      {/* LEFT: Document Scanner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-white/90 to-white/85 p-8 shadow-[0_20px_100px_rgba(15,127,255,0.12)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,127,255,0.08),transparent_40%)]" />

        <div className="relative">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">
                AI Processing
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Reading Your Documents
              </h2>
            </div>
            <div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              {progress}%
            </div>
          </div>

          {/* Document Scanner */}
          <div className="mb-8 rounded-[24px] border border-slate-200/60 bg-slate-50/50 p-6">
            <DocumentScannerAnimation phase={currentPhase} progress={progress} />
          </div>

          {/* Progress Bar */}
          <div className="mb-6 rounded-full bg-slate-200/50 p-1">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Current Stage */}
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Current Stage</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {processingStages[activeStageIndex]?.label || 'Processing...'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Processing Status & Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-5"
      >
        {/* Uploaded Files */}
        <motion.div
          className="rounded-[24px] border border-white/70 bg-white/85 p-6 shadow-[0_16px_60px_rgba(15,127,255,0.10)] backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
              <FileText size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Files Being Analyzed</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-slate-700">
                Hospital Bill: {getFileName(billFile, 'Not uploaded')}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-700">
                Medical Report: {getFileName(reportFile, 'Not uploaded')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Processing Steps */}
        <motion.div
          className="rounded-[24px] border border-white/70 bg-white/85 p-6 shadow-[0_16px_60px_rgba(15,127,255,0.10)] backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Analysis Steps</h3>
          <div className="space-y-2">
            {processingStages.map((stage, idx) => {
              const isCompleted = idx < activeStageIndex
              const isActive = idx === activeStageIndex

              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-50/60'
                      : isActive
                        ? 'bg-cyan-50/80'
                        : 'bg-slate-50/60'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isActive
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{stage.label}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="flex items-start gap-3 rounded-[20px] border border-sky-200/60 bg-sky-50/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Shield size={16} className="mt-0.5 flex-shrink-0 text-sky-600" />
          <div>
            <p className="text-xs font-semibold text-sky-700">Secure Session</p>
            <p className="text-xs text-sky-600">Your data is analyzed locally. Nothing is stored.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// REPORT SUMMARY CARD
function ReportSummaryCard({ profile }) {
  const [open, setOpen] = useState({ diagnosis: false, treatment: false, observations: false })
  const keywords = ['inflammation', 'MRI', 'antibiotic', 'nebulization', 'lab']

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/70 bg-gradient-to-br from-white/90 to-white/85 p-7 shadow-[0_16px_70px_rgba(15,127,255,0.10)] backdrop-blur-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
            <Heart size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Medical Summary</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">What We Understood From Your Report</h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Diagnosis Summary</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Chest X-ray showed <span className="font-semibold text-emerald-700">mild inflammation</span> but no serious abnormality. Vitals stable and responding to treatment.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button onClick={() => setOpen((s) => ({ ...s, diagnosis: !s.diagnosis }))} className="text-sm text-sky-600">{open.diagnosis ? 'Hide' : 'Explain'}</button>
            </div>
          </div>

          <AnimatePresence>
            {open.diagnosis && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden text-sm text-slate-700">
                <p>The imaging suggests localized inflammation consistent with mild infection or irritation. No consolidation or effusion was seen. Recommended: short course of monitoring and symptomatic treatment.</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-emerald-100 px-2 py-1">Confidence: High</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1">Source: Chest X-ray</span>
                </div>
                <div className="mt-3 text-xs">
                  <button className="rounded-md bg-emerald-50 px-3 py-1 text-emerald-700">Explain in simpler language</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl bg-blue-50/70 px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Treatment Explanation</p>
              <p className="mt-2 text-sm font-medium text-slate-900">Standard antibiotic treatment and monitoring were provided; vitals improved.</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button onClick={() => setOpen((s) => ({ ...s, treatment: !s.treatment }))} className="text-sm text-sky-600">{open.treatment ? 'Hide' : 'Explain'}</button>
            </div>
          </div>
          <AnimatePresence>
            {open.treatment && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden text-sm text-slate-700">
                <p>Treatment included medication to reduce inflammation and observation. No invasive procedures were necessary during this stay.</p>
                <div className="mt-2 text-xs text-slate-500">Suggested follow-up: outpatient review in 7-14 days.</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="rounded-2xl border border-yellow-200/60 bg-yellow-50/70 px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Doctor Observations & Tests</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>Lab markers trending down after therapy.</li>
                <li>Oxygen saturation within normal range.</li>
              </ul>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button onClick={() => setOpen((s) => ({ ...s, observations: !s.observations }))} className="text-sm text-sky-600">{open.observations ? 'Hide' : 'Explain'}</button>
            </div>
          </div>
          <AnimatePresence>
            {open.observations && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 overflow-hidden text-sm text-slate-700">
                <p>The clinician notes align with test trends; no immediate interventions required beyond medication and observation.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="text-xs text-slate-500">Highlighted keywords: {keywords.map((k) => <span key={k} className="mr-2 rounded px-2 py-0.5 bg-slate-100">{k}</span>)}</div>
      </div>
    </motion.div>
  )
}

// BILLING CONCERNS CARD
function BillingConcernsCard({ profile }) {
  const currencySymbol = profile?.currencySymbol || MOCK_CURRENCY.currencySymbol
  const rows = [
    { id: 1, item: 'Room Charge (2026-03-12)', amount: 220, expected: { min: 110, max: 180 }, status: '⚠ Possible Duplicate', severity: 'high', confidence: 0.92, related: ['Room change log missing'], suggestion: 'Ask for an itemized timeline showing admission/discharge room types.' },
    { id: 2, item: 'Antibiotic (Ceftriaxone)', amount: 430, expected: { min: 30, max: 120 }, status: '⚠ Unusually Expensive', severity: 'high', confidence: 0.78, related: ['Dosage mismatch'], suggestion: 'Request pharmacy invoice and dosage confirmation.' },
    { id: 3, item: 'MRI Scan', amount: 850, expected: { min: 600, max: 1200 }, status: '✓ Appears Normal', severity: 'low', confidence: 0.95, related: ['Matched to report'], suggestion: 'No action needed.' },
    { id: 4, item: 'Facility Fee', amount: 150, expected: { min: 100, max: 150 }, status: '⚠ Possible Duplicate', severity: 'medium', confidence: 0.64, related: ['Charged on both admission & discharge'], suggestion: 'Ask which event triggered each fee.' },
  ]

  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[28px] border border-white/70 bg-gradient-to-br from-white/90 to-white/85 p-7 shadow-[0_16px_70px_rgba(15,127,255,0.10)] backdrop-blur-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600"><AlertTriangle size={20} /></div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">What We Found In Your Bill</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">AI Highlighted Billing Concerns</h3>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Bill Item</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Expected Range</th>
              <th className="px-4 py-3 text-right">AI Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <motion.tr key={r.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + idx * 0.03 }} className="cursor-pointer hover:bg-slate-50" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.item}</div>
                  <div className="mt-1 text-xs text-slate-500">Related: {r.related.join(', ')}</div>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-slate-900">{formatCurrency(r.amount, currencySymbol)}</td>
                <td className="px-4 py-3 text-right text-xs text-slate-600">{formatCurrencyRange(r.expected.min, r.expected.max, currencySymbol)}</td>
                <td className="px-4 py-3 text-right">
                  <div className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold ${r.severity === 'high' ? 'bg-red-50 text-red-600' : r.severity === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{r.status}</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        {rows.map((r) => (
          <AnimatePresence key={r.id}>
            {expanded === r.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">Why AI flagged this</p>
                    <p className="mt-1 text-sm text-slate-700">{r.suggestion}</p>
                    <p className="mt-2 text-xs text-slate-500">Related lines: {r.related.join(', ')}</p>
                  </div>
                  <div className="w-48">
                    <p className="text-xs text-slate-500">Confidence</p>
                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <motion.div className={`h-full rounded-full ${r.confidence > 0.8 ? 'bg-emerald-500' : r.confidence > 0.6 ? 'bg-amber-500' : 'bg-red-500'}`} initial={{ width: 0 }} animate={{ width: `${Math.round(r.confidence * 100)}%` }} transition={{ duration: 0.6 }} />
                    </div>
                    <p className="mt-2 text-xs text-slate-600">{Math.round(r.confidence * 100)}% confident</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="rounded-md bg-sky-600 px-3 py-1 text-xs text-white">Copy question</button>
                  <button className="rounded-md border px-3 py-1 text-xs">Request invoice</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
        <p className="text-xs font-semibold text-slate-300">Estimated Recoverable</p>
        <p className="mt-2 text-2xl font-semibold">{formatCurrency(1245, currencySymbol)}+</p>
        <p className="text-xs text-slate-400">If flagged items are resolved</p>
      </div>
    </motion.div>
  )
}

// CROSS-VERIFICATION CARD
function CrossVerificationCard({ profile }) {
  const items = [
    { name: 'MRI Scan', status: 'match', note: 'Mentioned in both report and bill', pct: 98 },
    { name: 'Nebulization', status: 'mismatch', note: 'Charged in bill but unclear in report', pct: 42 },
    { name: 'Physician Consultation', status: 'match', note: 'Provider noted in both', pct: 88 },
    { name: 'Facility Fee', status: 'mismatch', note: 'Duplicate charge suspicion', pct: 54 },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="rounded-[28px] border border-white/70 bg-gradient-to-br from-white/90 to-white/85 p-7 shadow-[0_16px_70px_rgba(15,127,255,0.10)] backdrop-blur-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-sky-100 p-3 text-sky-600"><Stethoscope size={20} /></div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Verification</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">Bill vs Report Cross-Check</h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((it, idx) => (
          <motion.div key={it.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 + idx * 0.04 }} className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-slate-50/70 px-4 py-3">
            <div className={`h-3 w-3 rounded-full ${it.status === 'match' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
            <div className="flex-1">
              <p className="font-medium text-slate-900">{it.name}</p>
              <p className="text-xs text-slate-600">{it.note}</p>
              <div className="mt-2 w-40">
                <div className="h-2 rounded-full bg-slate-200"><motion.div className={`h-full rounded-full ${it.pct > 85 ? 'bg-emerald-500' : it.pct > 60 ? 'bg-amber-500' : 'bg-red-500'}`} initial={{ width: 0 }} animate={{ width: `${it.pct}%` }} transition={{ duration: 0.6 }} /></div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${it.status === 'match' ? 'text-emerald-700' : 'text-orange-600'}`}>{it.status === 'match' ? '✓' : '⚠'}</p>
              <p className="text-xs text-slate-600">{it.pct}%</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Match Percentage</p>
        <div className="mt-3 flex items-end gap-3">
          <div className="flex-1">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <motion.div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" initial={{ width: '0%' }} animate={{ width: '84%' }} transition={{ duration: 1, delay: 0.5 }} />
            </div>
          </div>
          <span className="text-lg font-semibold text-emerald-700">84%</span>
        </div>
      </div>
    </motion.div>
  )
}

// RECOMMENDED NEXT STEPS
function NextStepsCard() {
  const steps = [
    { title: 'Request an itemized invoice', desc: 'Ask for line-level invoices for the flagged items to verify service dates and charges.', badge: 'High' },
    { title: 'Confirm medication dosage', desc: 'Ask the pharmacy for unit pricing and dosage confirmation for expensive meds.', badge: 'Medium' },
    { title: 'Ask for procedure notes', desc: 'Request clinical notes that reference the billed procedure to confirm medical necessity.', badge: 'High' },
    { title: 'Schedule follow-up', desc: 'Book a follow-up with your provider if symptoms persist.', badge: 'Low' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] border border-white/70 bg-gradient-to-br from-white/95 to-white/90 p-6 shadow-md">
      <h3 className="text-sm font-semibold text-slate-900">Recommended Next Steps</h3>
      <div className="mt-3 space-y-3">
        {steps.map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.01 }} className="flex items-start justify-between gap-4 rounded-lg border p-3">
            <div>
              <p className="font-semibold text-slate-900">{s.title}</p>
              <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
            </div>
            <div className="text-right">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${s.badge === 'High' ? 'bg-red-50 text-red-600' : s.badge === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{s.badge}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// QUESTIONS YOU SHOULD ASK
function QuestionsCard() {
  const questions = [
    { q: 'Why was the room charge billed twice on the same date?', cat: 'billing clarification', priority: 'High', explanation: 'Ask for timeline and supporting documentation to show two separate room usages.' },
    { q: 'Can you provide the pharmacy invoice for the antibiotic?', cat: 'medicine pricing', priority: 'Medium', explanation: 'Invoice will show unit price and quantity to validate the charge.' },
    { q: 'Which note references the MRI procedure?', cat: 'missing procedures', priority: 'High', explanation: 'Procedure notes confirm medical necessity and link to imaging.' },
    { q: 'Was the facility fee charged at both admission and discharge?', cat: 'duplicate charges', priority: 'Medium', explanation: 'Request clarification on fee application rules for your stay.' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] border border-white/70 bg-gradient-to-br from-white/95 to-white/90 p-6 shadow-md">
      <h3 className="text-sm font-semibold text-slate-900">Questions You Should Ask The Hospital</h3>
      <div className="mt-3 space-y-3">
        {questions.map((qs, i) => (
          <motion.div key={i} className="flex items-start justify-between gap-3 rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">{qs.q}</p>
              <p className="mt-1 text-xs text-slate-600">{qs.explanation}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => navigator.clipboard?.writeText(qs.q)} className="rounded-md bg-sky-600 px-3 py-1 text-xs text-white">Copy</button>
              <span className={`text-xs font-semibold ${qs.priority === 'High' ? 'text-red-600' : qs.priority === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>{qs.priority}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// CONTINUE UPLOAD PROMPT (shown when only one document was provided)
function ContinueUploadPrompt({ missingType, onUpload }) {
  const [chosen, setChosen] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const isReportMissing = missingType === 'report'
  const title = isReportMissing
    ? 'Add Medical Report for Deeper Verification'
    : 'Upload Hospital Bill for Pricing Analysis'
  const subtitle = isReportMissing
    ? 'Cross-check billed procedures against treatment records and detect mismatches.'
    : 'Detect duplicate charges, inflated medicine costs, and suspicious billing patterns.'
  const benefits = isReportMissing
    ? ['Verify procedures', 'Detect mismatches', 'Improve analysis confidence']
    : ['Detect duplicate charges', 'Analyze medicine pricing', 'Estimate overcharges']
  const cta = isReportMissing ? 'Run Cross-Verification' : 'Analyze Bill & Compare'
  const inputId = `continue-upload-${missingType}`

  function handleSelectedFile(file) {
    if (file) setChosen(file)
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-5 shadow-[0_16px_60px_rgba(14,116,144,0.10)]"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-xl bg-white p-3 text-sky-600 shadow-sm">
              {isReportMissing ? <Stethoscope size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-950">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 rounded-lg border border-white bg-white/75 px-3 py-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 size={15} className="text-emerald-600" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <Shield size={14} />
            Secure session, no files stored
          </div>
        </div>
        <div>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(event) => handleSelectedFile(event.target.files?.[0])}
              className="hidden"
              id={inputId}
            />
            <label
              htmlFor={inputId}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                handleSelectedFile(event.dataTransfer.files?.[0])
              }}
              className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-5 text-center transition ${
                isDragging
                  ? 'border-sky-400 bg-sky-50'
                  : 'border-sky-200 bg-white/80 hover:border-sky-300'
              }`}
            >
              <FileText size={26} className="text-sky-600" />
              <span className="mt-3 max-w-52 truncate text-sm font-semibold text-slate-900">
                {chosen ? chosen.name : 'Drag and drop or browse'}
              </span>
              <span className="mt-1 text-xs text-slate-500">PDF or image document</span>
            </label>
            <button
              onClick={() => {
                if (chosen) onUpload(chosen)
              }}
              disabled={!chosen}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                chosen
                  ? 'bg-sky-600 text-white hover:bg-sky-700'
                  : 'cursor-not-allowed bg-slate-200 text-slate-500'
              }`}
            >
              {cta}
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">Privacy: session-based, no files stored</p>
        </div>
    </motion.div>
  )
}

// Compact Report Summary Tab
function ReportSummaryTab() {
  const [expanded, setExpanded] = useState(null)
  const items = [
    { id: 'diagnosis', label: 'Diagnosis', detail: 'Chest X-ray showed mild inflammation, no serious abnormality.', content: 'The imaging suggests localized inflammation consistent with mild infection. No consolidation or effusion was seen. Recommended: monitoring and symptomatic treatment.' },
    { id: 'treatment', label: 'Treatment Provided', detail: 'Standard antibiotic treatment with clinical monitoring.', content: 'Treatment included medication to reduce inflammation and observation. No invasive procedures necessary. Suggested follow-up in 7-14 days.' },
    { id: 'observations', label: 'Lab Results & Notes', detail: 'Lab markers trending down. Oxygen saturation normal.', content: 'All clinical markers align with expected recovery trajectory. No immediate interventions required beyond current medication.' },
  ]
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
          <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
            </div>
            <div className={`text-slate-400 transition-transform ${expanded === item.id ? 'rotate-180' : ''}`}>▼</div>
          </button>
          <AnimatePresence>
            {expanded === item.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 py-3 bg-slate-50 border-t text-sm text-slate-700">
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// Compact Billing Issues Tab
function BillingIssuesTab({ currencySymbol = '$', estimatedOvercharge = 1245 }) {
  const [expanded, setExpanded] = useState(null)
  const rows = [
    { id: 1, item: 'Room Charge', amount: 220, expected: { min: 110, max: 180 }, status: '⚠ Duplicate?', severity: 'high', confidence: 0.92, suggestion: 'Ask for admission/discharge timeline.' },
    { id: 2, item: 'Antibiotic (Ceftriaxone)', amount: 430, expected: { min: 30, max: 120 }, status: '⚠ Expensive', severity: 'high', confidence: 0.78, suggestion: 'Request pharmacy invoice and dosage confirmation.' },
    { id: 3, item: 'MRI Scan', amount: 850, expected: { min: 600, max: 1200 }, status: '✓ Normal', severity: 'low', confidence: 0.95, suggestion: 'Verified – no concerns.' },
    { id: 4, item: 'Facility Fee', amount: 150, expected: { min: 100, max: 150 }, status: '⚠ Duplicate?', severity: 'medium', confidence: 0.64, suggestion: 'Clarify which event(s) triggered fee.' },
  ]
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.id} className="border border-slate-200 rounded-lg">
          <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-slate-900 text-sm">{r.item}</p>
              <p className="text-xs text-slate-600 mt-0.5">
                {formatCurrencyAmount(r.amount, currencySymbol)} (expected: {formatCurrencyRange(r.expected, currencySymbol)})
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${r.severity === 'high' ? 'bg-red-50 text-red-700' : r.severity === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{r.status}</span>
              <div className={`text-slate-400 transition-transform ${expanded === r.id ? 'rotate-180' : ''}`}>▼</div>
            </div>
          </button>
          <AnimatePresence>
            {expanded === r.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 py-3 bg-slate-50 border-t">
                <p className="text-xs text-slate-600 mb-2">{r.suggestion}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${r.confidence > 0.8 ? 'bg-emerald-500' : r.confidence > 0.6 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.round(r.confidence * 100)}%` }} />
                  </div>
                  <span className="text-xs text-slate-600">{Math.round(r.confidence * 100)}% confident</span>
                </div>
                <button className="text-xs bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700">Copy question</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-xs font-semibold text-amber-900">Estimated Overcharge</p>
        <p className="text-lg font-bold text-amber-900 mt-1">{formatCurrencyAmount(estimatedOvercharge, currencySymbol)}+</p>
      </div>
    </div>
  )
}

// Compact Cross-Check Tab
function CrossCheckTab() {
  const items = [
    { name: 'MRI Scan', status: 'match', note: 'Mentioned in both', pct: 98 },
    { name: 'Nebulization', status: 'mismatch', note: 'Billed but unclear', pct: 42 },
    { name: 'Physician Note', status: 'match', note: 'Provider in both', pct: 88 },
    { name: 'Facility Fee', status: 'mismatch', note: 'Possible duplicate', pct: 54 },
  ]
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.name} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
          <div className={`h-2 w-2 mt-1.5 rounded-full flex-shrink-0 ${it.status === 'match' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">{it.name}</p>
            <p className="text-xs text-slate-600 mt-0.5">{it.note}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${it.pct > 85 ? 'bg-emerald-500' : it.pct > 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${it.pct}%` }} />
              </div>
              <span className="text-xs text-slate-600 min-w-fit">{it.pct}%</span>
            </div>
          </div>
        </div>
      ))}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <p className="text-xs font-semibold text-slate-600">Overall Alignment</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '84%' }} />
          </div>
          <span className="text-lg font-bold text-slate-900 min-w-fit">84%</span>
        </div>
      </div>
    </div>
  )
}

// Compact Questions Tab
function QuestionsTab() {
  const questions = [
    { q: 'Why was room charge billed twice?', priority: 'High', explanation: 'Ask for timeline showing two separate room usages.' },
    { q: 'Can I see the pharmacy invoice?', priority: 'High', explanation: 'Need unit price and quantity for the antibiotic charge.' },
    { q: 'Which clinical note references the MRI?', priority: 'High', explanation: 'Procedure notes confirm medical necessity.' },
    { q: 'Was facility fee charged twice?', priority: 'Medium', explanation: 'Clarify if fee applies at admission and/or discharge.' },
  ]
  return (
    <div className="space-y-2">
      {questions.map((q, i) => (
        <div key={i} className="p-3 border border-slate-200 rounded-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-semibold text-slate-900 text-sm">{q.q}</p>
              <p className="text-xs text-slate-600 mt-1">{q.explanation}</p>
            </div>
            <button onClick={() => navigator.clipboard?.writeText(q.q)} className={`text-xs font-semibold px-2 py-1 rounded flex-shrink-0 ${q.priority === 'High' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}>Copy</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function MedicalReportExplanation() {
  const [open, setOpen] = useState('diagnosis')
  const sections = [
    {
      id: 'diagnosis',
      icon: <Stethoscope size={18} />,
      title: 'Diagnosis Summary',
      summary: 'Mild respiratory infection with dehydration symptoms.',
      detail:
        'The report suggests a manageable respiratory condition. The clinical notes do not point to an emergency pattern, but hydration and symptom tracking matter during recovery.',
    },
    {
      id: 'treatment',
      icon: <Heart size={18} />,
      title: 'Treatment Summary',
      summary: 'The patient was treated using IV fluids, antibiotics, and oxygen observation.',
      detail:
        'This is a typical supportive plan for infection with mild breathing discomfort or dehydration. The treatment appears focused on stabilization and preventing symptoms from worsening.',
    },
    {
      id: 'observations',
      icon: <CheckCircle2 size={18} />,
      title: 'Important Observations',
      summary: 'No major abnormalities detected in chest imaging.',
      detail:
        'Chest imaging and oxygen readings look reassuring in this mock review. Lab markers should still be checked against the final doctor note if symptoms continue.',
    },
    {
      id: 'recovery',
      icon: <Shield size={18} />,
      title: 'Recovery Guidance',
      summary: 'Rest, hydration, and follow-up after one week are recommended.',
      detail:
        'Continue prescribed medication, watch for fever or breathing changes, and schedule a follow-up visit in about 7 days unless the doctor advised a different timeline.',
    },
  ]

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-sky-50/60 p-5"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
          <Stethoscope size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
            Medical explanation
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">What This Medical Report Means</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            A plain-language read of the report, written to help you understand the care plan without medical jargon.
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {sections.map((section) => {
          const expanded = open === section.id
          return (
            <div key={section.id} className="overflow-hidden rounded-xl border border-white bg-white/80">
              <button
                onClick={() => setOpen(expanded ? null : section.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 text-sky-600">{section.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{section.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{section.summary}</p>
                  </div>
                </div>
                <span className={`text-xs text-slate-400 transition ${expanded ? 'rotate-180' : ''}`}>v</span>
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-emerald-50 bg-emerald-50/50 px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {section.detail}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}

function OverviewSummary({ profile, billFile, reportFile }) {
  const mode = billFile && reportFile ? 'both' : billFile ? 'bill' : 'report'
  const summary = {
    both: {
      risk: 'Moderate',
      confidence: '84% aligned',
      conclusion: 'The documents mostly support each other, but a few charges should be reviewed before payment.',
      meaning:
        'Your next step is to focus on the mismatched or weakly supported items, then ask the hospital for an itemized explanation.',
      next: 'Open Cross-Check for comparison details, then use Questions for follow-up.',
    },
    bill: {
      risk: 'Moderate',
      confidence: 'Billing confidence 78%',
      conclusion: 'The bill contains enough pricing signals to justify a careful review.',
      meaning:
        'This is a useful first-pass billing analysis. A medical report will make it stronger by showing whether each billed service is documented in the treatment record.',
      next: 'Add the medical report to run cross-verification.',
    },
    report: {
      risk: 'Low',
      confidence: 'Medical confidence 89%',
      conclusion: 'The report reads as a mild condition with reassuring observations and standard recovery guidance.',
      meaning:
        'This explains the care plan in plain language. A hospital bill is needed before ClearBill can review pricing, duplicate charges, or overcharge estimates.',
      next: 'Upload the hospital bill to analyze charges and compare them with the report.',
    },
  }
  const current = summary[mode]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-xl bg-sky-100 p-3 text-sky-700">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Analysis summary
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">{profile.title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{profile.subtitle}</p>
        </div>
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-500">Risk Level</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{current.risk}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-500">Confidence</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{current.confidence}</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-500">Recommended Next Step</p>
          <p className="mt-1 text-sm font-semibold text-slate-950">{mode === 'both' ? 'Review mismatches' : 'Add missing document'}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Short conclusion</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{current.conclusion}</p>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">What this means</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{current.meaning}</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm text-slate-700">
          <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-sky-600" />
          {current.next}
        </div>
      </div>
    </section>
  )
}

function ResultsScreen({ profile, billFile, reportFile, onReset, onContinueUpload }) {
  const [activeTab, setActiveTab] = useState('overview')
  const currencySymbol = MOCK_CURRENCY.currencySymbol
  const hasBothFiles = Boolean(billFile && reportFile)
  const hasOnlyBill = Boolean(billFile && !reportFile)
  const hasOnlyReport = Boolean(reportFile && !billFile)
  const riskScore = hasOnlyReport ? 3.8 : 7.6
  const estimatedOverchargeValue = hasOnlyReport ? 0 : 1245
  const estimatedOvercharge = `${formatCurrencyAmount(estimatedOverchargeValue, currencySymbol)}${hasOnlyReport ? '' : '+'}`
  const issuesFound = hasOnlyReport ? '2' : '12'
  const actionSummary = hasBothFiles
    ? 'Compare and dispute'
    : hasOnlyBill
      ? 'Review bill and add report'
      : 'Understand report and add bill'

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* TOP HEADER - Compact Summary */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-4 md:px-8 md:py-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Analysis Complete</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">{profile.title}</h1>
            </div>
            <motion.button onClick={onReset} whileHover={{ scale: 1.02 }} className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100">New Analysis</motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold">Risk Score</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{riskScore}<span className="text-xs text-slate-600 font-normal">/10</span></p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold">Est. Overcharge</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">{estimatedOvercharge}</p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold">Issues Found</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{issuesFound}</p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <p className="text-xs text-slate-600 font-semibold">Action Summary</p>
              <p className="text-sm font-semibold text-slate-900 mt-1">{actionSummary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 md:px-8 overflow-x-auto">
        <div className="mx-auto max-w-7xl flex gap-1">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${activeTab === 'overview' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Overview</button>
          {billFile && <button onClick={() => setActiveTab('bill')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${activeTab === 'bill' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Bill Issues</button>}
          {reportFile && <button onClick={() => setActiveTab('report')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${activeTab === 'report' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Report Summary</button>}
          {billFile && reportFile && <button onClick={() => setActiveTab('cross')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${activeTab === 'cross' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Cross-Check</button>}
          <button onClick={() => setActiveTab('questions')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${activeTab === 'questions' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}>Questions</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* LEFT: Tab Content */}
          <div>
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <div className="space-y-4">
                    <OverviewSummary profile={profile} billFile={billFile} reportFile={reportFile} />
                    {hasOnlyBill && (
                      <ContinueUploadPrompt
                        missingType="report"
                        onUpload={(file) => onContinueUpload(file, 'report')}
                      />
                    )}
                    {hasOnlyReport && (
                      <ContinueUploadPrompt
                        missingType="bill"
                        onUpload={(file) => onContinueUpload(file, 'bill')}
                      />
                    )}
                  </div>
                </motion.div>
              )}
              {activeTab === 'bill' && billFile && (
                <motion.div key="bill" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <div className="space-y-5">
                    <BillingIssuesTab
                      currencySymbol={currencySymbol}
                      estimatedOvercharge={estimatedOverchargeValue}
                    />
                    {hasOnlyBill && (
                      <ContinueUploadPrompt
                        missingType="report"
                        onUpload={(file) => onContinueUpload(file, 'report')}
                      />
                    )}
                  </div>
                </motion.div>
              )}
              {activeTab === 'report' && reportFile && (
                <motion.div key="report" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <div className="space-y-5">
                    <MedicalReportExplanation />
                    <ReportSummaryTab />
                    {hasOnlyReport && (
                      <ContinueUploadPrompt
                        missingType="bill"
                        onUpload={(file) => onContinueUpload(file, 'bill')}
                      />
                    )}
                  </div>
                </motion.div>
              )}
              {activeTab === 'cross' && billFile && reportFile && (
                <motion.div key="cross" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <CrossCheckTab />
                </motion.div>
              )}
              {activeTab === 'questions' && (
                <motion.div key="questions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                  <QuestionsTab />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Sticky Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 h-fit space-y-3">
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-xs font-semibold uppercase text-slate-600 mb-3">Risk Level</p>
              <div className="flex items-end gap-3">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute" viewBox="0 0 100 100" style={{ width: 64, height: 64 }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke={hasOnlyReport ? '#059669' : '#dc2626'} strokeWidth="6" strokeDasharray={`${(riskScore / 10) * 283} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <span className="font-bold text-slate-900">{riskScore}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{hasOnlyReport ? 'Low' : 'Moderate'}</p>
                  <p className="text-xs text-slate-600">{hasOnlyReport ? 'Follow-up advised' : 'Review recommended'}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg space-y-3">
              <p className="text-xs font-semibold uppercase text-slate-600">Confidence</p>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600">Analysis</span>
                  <span className="text-xs font-bold text-slate-900">91%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '91%' }} /></div>
              </div>
              {billFile && <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600">Billing</span>
                  <span className="text-xs font-bold text-slate-900">78%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '78%' }} /></div>
              </div>}
              {reportFile && <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600">Medical</span>
                  <span className="text-xs font-bold text-slate-900">89%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '89%' }} /></div>
              </div>}
              {billFile && reportFile && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">Match</span>
                    <span className="text-xs font-bold text-slate-900">84%</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: '84%' }} /></div>
                </div>
              )}
            </div>

            <button className="w-full px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg text-sm hover:bg-sky-700 transition">
              <Download size={16} className="inline mr-2 mb-0.5" />
              Download Report
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const analysisProfiles = {
  bill: {
    title: 'Hospital Billing Analysis',
    subtitle: 'Focused on overcharges, duplicates, and suspicious line items.',
  },
  report: {
    title: 'Medical Report Analysis',
    subtitle: 'Focused on plain-language explanations and follow-up guidance.',
  },
  both: {
    title: 'Cross-Verification Analysis',
    subtitle: 'Your hospital bill and medical report are mostly aligned, but several billing inconsistencies were detected.',
  },
}

export default function AnalysisFlowPage() {
  const [stage, setStage] = useState('processing')
  const [progress, setProgress] = useState(0)
  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [reprocessing, setReprocessing] = useState(false)
  const [reProgress, setReProgress] = useState(0)
  const [reActiveStageIndex, setReActiveStageIndex] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  const uploads = location.state?.uploads ?? {}
  // local editable copies so the UI can evolve without navigation
  const [localBillFile, setLocalBillFile] = useState(uploads.billFile ?? null)
  const [localReportFile, setLocalReportFile] = useState(uploads.reportFile ?? null)

  const profile = useMemo(() => {
    if (localBillFile && localReportFile) return analysisProfiles.both
    if (localBillFile) return analysisProfiles.bill
    if (localReportFile) return analysisProfiles.report
    return analysisProfiles.both
  }, [localBillFile, localReportFile])

  useEffect(() => {
    const schedule = [
      { progress: 12, stage: 0 },
      { progress: 24, stage: 1 },
      { progress: 35, stage: 2 },
      { progress: 48, stage: 3 },
      { progress: 60, stage: 4 },
      { progress: 72, stage: 5 },
      { progress: 85, stage: 6 },
      { progress: 95, stage: 7 },
      { progress: 100, stage: 8 },
    ]

    const timers = schedule.map((entry, idx) =>
      window.setTimeout(() => {
        setProgress(entry.progress)
        setActiveStageIndex(entry.stage)
      }, 480 + idx * 550),
    )

    const completionTimer = window.setTimeout(() => {
      setStage('complete')
    }, 5500)

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(completionTimer)
    }
  }, [])

  // Second-stage reprocessing (shorter, focused comparison)
  const secondStages = [
    { label: 'Reading second document', phase: 'report-scan' },
    { label: 'Mapping procedures', phase: 'extraction' },
    { label: 'Comparing records', phase: 'detection' },
    { label: 'Detecting inconsistencies', phase: 'verification' },
    { label: 'Generating combined insights', phase: 'finalize' },
  ]

  function startReprocessing() {
    setReprocessing(true)
    setReProgress(6)
    setReActiveStageIndex(0)

    const schedule = [10, 30, 55, 80, 100]
    const timers = schedule.map((p, idx) =>
      window.setTimeout(() => {
        setReProgress(p)
        setReActiveStageIndex(idx)
      }, 300 + idx * 650),
    )

    const done = window.setTimeout(() => {
      setReprocessing(false)
      // ensure main stage is complete and profile will reflect both files
      setStage('complete')
    }, 300 + schedule.length * 650 + 300)

    // cleanup helper that returns a cancel function
    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      window.clearTimeout(done)
    }
  }

  // handler when user uploads missing file from the prompt
  function handleContinueUpload(file, type) {
    if (!file) return
    if (type === 'bill') setLocalBillFile(file)
    if (type === 'report') setLocalReportFile(file)
    // kickoff the focused reprocessing animation after a short delay
    setTimeout(() => startReprocessing(), 250)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fcff_0%,#f5fbff_42%,#ffffff_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-200/15 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/50 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-500/20">
              <span className="text-lg font-bold">C</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">ClearBill</p>
              <p className="text-xs text-slate-500">AI healthcare analysis</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <Shield size={16} />
            Session-based • No data stored
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="relative z-10 px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            {reprocessing ? (
              <motion.div key="reprocessing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mx-auto max-w-4xl">
                  <div className="mb-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">AI Processing</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Deep Cross-Verification</h2>
                    <p className="mt-2 text-sm text-slate-600">Comparing documents and highlighting matches & mismatches</p>
                  </div>

                  <div className="rounded-[24px] border border-slate-200/60 bg-slate-50/50 p-6">
                    <DocumentScannerAnimation phase={secondStages[reActiveStageIndex]?.phase || 'report-scan'} progress={reProgress} />

                    <div className="mt-6 rounded-full bg-slate-200/50 p-1">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
                        initial={{ width: '0%' }}
                        animate={{ width: `${reProgress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-semibold text-slate-900">{secondStages[reActiveStageIndex]?.label}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : stage === 'processing' ? (
              <ProcessingScreen
                key="processing"
                progress={progress}
                activeStageIndex={activeStageIndex}
                billFile={localBillFile}
                reportFile={localReportFile}
              />
            ) : (
              <ResultsScreen
                key="results"
                profile={profile}
                billFile={localBillFile}
                reportFile={localReportFile}
                onReset={() => navigate('/')}
                onContinueUpload={handleContinueUpload}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
