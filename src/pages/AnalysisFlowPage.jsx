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

function getFileName(file, fallback) {
  return file?.name ?? fallback
}

// DOCUMENT SCANNING ANIMATION COMPONENT
function DocumentScannerAnimation({ phase, progress }) {
  return (
    <div className="relative flex h-80 w-full max-w-sm items-center justify-center">
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
          {['$220', 'Room', 'Med', 'Proc', 'Fee'].map((text, i) => (
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
              {text}
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
  const rows = [
    { id: 1, item: 'Room Charge (2026-03-12)', amount: '$220', expected: '$110 - $180', status: '⚠ Possible Duplicate', severity: 'high', confidence: 0.92, related: ['Room change log missing'], suggestion: 'Ask for an itemized timeline showing admission/discharge room types.' },
    { id: 2, item: 'Antibiotic (Ceftriaxone)', amount: '$430', expected: '$30 - $120', status: '⚠ Unusually Expensive', severity: 'high', confidence: 0.78, related: ['Dosage mismatch'], suggestion: 'Request pharmacy invoice and dosage confirmation.' },
    { id: 3, item: 'MRI Scan', amount: '$850', expected: '$600 - $1,200', status: '✓ Appears Normal', severity: 'low', confidence: 0.95, related: ['Matched to report'], suggestion: 'No action needed.' },
    { id: 4, item: 'Facility Fee', amount: '$150', expected: '$100 - $150', status: '⚠ Possible Duplicate', severity: 'medium', confidence: 0.64, related: ['Charged on both admission & discharge'], suggestion: 'Ask which event triggered each fee.' },
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
                <td className="px-4 py-3 text-right font-semibold text-slate-900">{r.amount}</td>
                <td className="px-4 py-3 text-right text-xs text-slate-600">{r.expected}</td>
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
        <p className="mt-2 text-2xl font-semibold">$1,245+</p>
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
function ContinueUploadPrompt({ missingType, onUpload, onStart }) {
  const [chosen, setChosen] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-white/60 bg-gradient-to-br from-cyan-50/50 to-white/60 p-6 shadow-lg backdrop-blur-md"
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-300 p-3 text-white">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">Want a deeper verification?</p>
          <p className="mt-1 text-xs text-slate-600">Upload the {missingType === 'report' ? 'medical report' : 'hospital bill'} to enable cross-verification and deeper AI insights. Files are analyzed locally and not stored.</p>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setChosen(e.target.files?.[0] ?? null)}
              className="hidden"
              id={`continue-upload-${missingType}`}
            />
            <label htmlFor={`continue-upload-${missingType}`} className="rounded-2xl cursor-pointer border px-4 py-2 text-sm font-semibold text-sky-700 bg-white/80">
              {chosen ? chosen.name : 'Select File'}
            </label>
            <button
              onClick={() => {
                if (chosen) onUpload(chosen)
                onStart && onStart(chosen)
              }}
              className="ml-auto rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
            >
              {missingType === 'report' ? 'Run Cross-Verification' : 'Analyze Bill & Compare'}
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500">Privacy: Session-based • No files stored</p>
        </div>
      </div>
    </motion.div>
  )
}

function ResultsScreen({ profile, billFile, reportFile, onReset, onContinueUpload }) {
  const confidenceData = { analysis: 91, medical: 89, billing: 78, crossVerif: 84 }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* HEADER */}
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14 }}
          className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_50px_rgba(16,185,129,0.4)]"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Analysis Complete
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
          {profile.title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {profile.subtitle}
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_280px]">
        {/* LEFT: Narrative Flow */}
        <div className="space-y-6">
          {/* If only one document was analyzed, show the relevant analysis first and a ContinueUploadPrompt */}
          {billFile && !reportFile && (
            <>
              <BillingConcernsCard profile={profile} />
              <NextStepsCard />
              <QuestionsCard />
              <div>
                <ContinueUploadPrompt
                  missingType="report"
                  onUpload={(file) => onContinueUpload(file, 'report')}
                  onStart={(file) => onContinueUpload(file, 'report')}
                />
              </div>
            </>
          )}

          {reportFile && !billFile && (
            <>
              <ReportSummaryCard profile={profile} />
              <NextStepsCard />
              <QuestionsCard />
              <div className="mt-2">
                <ContinueUploadPrompt
                  missingType="bill"
                  onUpload={(file) => onContinueUpload(file, 'bill')}
                  onStart={(file) => onContinueUpload(file, 'bill')}
                />
              </div>
            </>
          )}

          {billFile && reportFile && (
            <>
              <ReportSummaryCard profile={profile} />
              <BillingConcernsCard profile={profile} />
              <CrossVerificationCard profile={profile} />
              <NextStepsCard />
              <QuestionsCard />
            </>
          )}
        </div>

        {/* RIGHT: AI Confidence Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-8 space-y-3"
        >
          <motion.div
            className="rounded-[24px] border border-white/70 bg-gradient-to-br from-white/95 to-white/90 p-5 shadow-[0_16px_60px_rgba(15,127,255,0.10)] backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Analysis Overview</p>

            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-3">
                <div className="relative flex h-14 w-14 items-center justify-center flex-shrink-0">
                  <svg className="h-14 w-14" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#riskGrad)"
                      strokeWidth="3"
                      strokeDasharray="283"
                      strokeDashoffset="283"
                      animate={{ strokeDashoffset: 283 - (7.6 / 10) * 283 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-sm font-bold text-slate-900">7.6</p>
                    <p className="text-xs text-slate-600">/10</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600">Risk Score</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">Moderate</p>
                  <p className="text-xs text-slate-600">Review recommended</p>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Analysis Confidence</span>
                    <span className="font-semibold text-slate-900">{confidenceData.analysis}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                    <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${confidenceData.analysis}%` }} transition={{ duration: 0.8 }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Medical Summary</span>
                    <span className="font-semibold text-slate-900">High</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Billing Analysis</span>
                    <span className="font-semibold text-slate-900">{confidenceData.billing}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                    <motion.div className="h-full rounded-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${confidenceData.billing}%` }} transition={{ duration: 0.8 }} />
                  </div>
                </div>

                {billFile && reportFile && (
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600">Cross-Verification</span>
                      <span className="font-semibold text-slate-900">{confidenceData.crossVerif}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-200">
                      <motion.div className="h-full rounded-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${confidenceData.crossVerif}%` }} transition={{ duration: 0.8 }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-amber-200/60 bg-amber-50/70 p-3">
                <p className="text-xs font-semibold text-amber-700">Est. Overcharge</p>
                <p className="mt-1.5 text-xl font-bold text-amber-700">$1,245</p>
                <p className="text-xs text-amber-600">If all flagged items resolved</p>
              </div>

              <div className="rounded-xl border border-slate-200/60 bg-slate-50/70 p-3">
                <p className="text-xs font-semibold text-slate-600">Issues Found</p>
                <p className="mt-1.5 text-xl font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-600">Requiring attention</p>
              </div>

              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full rounded-lg border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:border-sky-300">
                <Download size={14} className="mb-0.5 mr-1 inline" />
                Download Report
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FOOTER: Call to Action */}
      <div className="mx-auto flex max-w-6xl justify-center pt-4">
        <motion.button
          type="button"
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
        >
          <ArrowRight size={16} className="mb-0.5 mr-2 inline" />
          Analyze Another Session
        </motion.button>
      </div>
    </motion.div>
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
  const billFile = uploads.billFile ?? null
  const reportFile = uploads.reportFile ?? null
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
