/**
 * Confidence Bar Component
 * Reusable animated progress bar for confidence scores
 */

import { motion } from 'framer-motion'

/**
 * @typedef {object} ConfidenceBarProps
 * @property {number} value - Confidence percentage (0-100)
 * @property {string} [label] - Optional label text
 * @property {boolean} [showValue] - Show percentage text (default: true)
 * @property {boolean} [animated] - Animate on mount (default: true)
 * @property {string} [size] - Size: 'sm' | 'md' | 'lg' (default: 'md')
 */

/**
 * ConfidenceBar - Animated progress indicator
 * @param {ConfidenceBarProps} props
 * @returns {JSX.Element}
 */
export function ConfidenceBar({ value, label, showValue = true, animated = true, size = 'md' }) {
  const getColor = () => {
    if (value > 80) return 'bg-emerald-500'
    if (value > 60) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return { bar: 'h-1', label: 'text-xs', value: 'text-xs' }
      case 'lg':
        return { bar: 'h-3', label: 'text-sm', value: 'text-sm' }
      default:
        return { bar: 'h-1.5', label: 'text-xs', value: 'text-xs' }
    }
  }

  const classes = getSizeClasses()

  return (
    <div>
      {label && <p className={`${classes.label} font-semibold text-slate-600 mb-1`}>{label}</p>}
      <div className={`${classes.bar} rounded-full bg-slate-200 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${getColor()}`}
          initial={animated ? { width: '0%' } : { width: `${value}%` }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      {showValue && <p className={`${classes.value} font-semibold text-slate-600 mt-1`}>{Math.round(value)}%</p>}
    </div>
  )
}

export default ConfidenceBar
