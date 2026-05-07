/**
 * Risk Gauge Component
 * Circular progress indicator for risk score (0-10 scale)
 */

/**
 * @typedef {object} RiskGaugeProps
 * @property {number} score - Risk score (0-10)
 * @property {string} [label] - Optional label (e.g., "Moderate")
 * @property {string} [description] - Optional description
 * @property {number} [size] - Gauge size in pixels (default: 64)
 */

/**
 * RiskGauge - Circular risk indicator
 * @param {RiskGaugeProps} props
 * @returns {JSX.Element}
 */
export function RiskGauge({ score, label, description, size = 64 }) {
  const getRiskLevel = () => {
    if (score < 3) return { level: 'Low', color: '#10b981', bg: 'bg-emerald-50' }
    if (score < 6) return { level: 'Moderate', color: '#f59e0b', bg: 'bg-amber-50' }
    return { level: 'High', color: '#ef4444', bg: 'bg-red-50' }
  }

  const riskInfo = getRiskLevel()
  const circumference = Math.PI * 90
  const offset = circumference - (score / 10) * circumference

  return (
    <div className={`flex items-center gap-3 p-4 border border-slate-200 rounded-lg ${riskInfo.bg}`}>
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="absolute">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={riskInfo.color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-slate-900 text-sm">{score.toFixed(1)}</span>
        </div>
      </div>

      <div>
        <p className="font-semibold text-slate-900">{label || riskInfo.level}</p>
        {description && <p className="text-xs text-slate-600 mt-0.5">{description}</p>}
      </div>
    </div>
  )
}

export default RiskGauge
