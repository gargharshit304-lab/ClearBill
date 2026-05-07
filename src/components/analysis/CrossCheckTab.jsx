/**
 * Cross-Check Tab Component
 * Displays bill vs report alignment items with confidence bars
 */

import { motion } from 'framer-motion'
import ConfidenceBar from './ConfidenceBar'

/**
 * @typedef {object} CrossCheckItem
 * @property {string} name - Item name
 * @property {'match' | 'mismatch'} status - Match status
 * @property {string} note - Brief note/description
 * @property {number} pct - Match percentage (0-100)
 */

/**
 * CrossCheckTab - Bill vs Report alignment view
 * @param {object} props
 * @property {CrossCheckItem[]} [props.items] - Items to check
 * @property {number} [props.overallMatch] - Overall match percentage
 * @returns {JSX.Element}
 */
export function CrossCheckTab({ items = [], overallMatch = 84 }) {
  // Default items if not provided
  const defaultItems = items.length
    ? items
    : [
        { name: 'MRI Scan', status: 'match', note: 'Mentioned in both', pct: 98 },
        { name: 'Nebulization', status: 'mismatch', note: 'Billed but unclear', pct: 42 },
        { name: 'Physician Note', status: 'match', note: 'Provider in both', pct: 88 },
        { name: 'Facility Fee', status: 'mismatch', note: 'Possible duplicate', pct: 54 },
      ]

  return (
    <div className="space-y-3">
      {defaultItems.map((item, idx) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg"
        >
          <div className={`h-2 w-2 mt-1.5 rounded-full flex-shrink-0 ${item.status === 'match' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">{item.name}</p>
            <p className="text-xs text-slate-600 mt-0.5">{item.note}</p>
            <div className="mt-2">
              <ConfidenceBar value={item.pct} showValue={true} animated={false} size="sm" />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-slate-50 border border-slate-200 rounded-lg"
      >
        <p className="text-xs font-semibold text-slate-600">Overall Alignment</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                initial={{ width: '0%' }}
                animate={{ width: `${overallMatch}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-slate-900 min-w-fit">{overallMatch}%</span>
        </div>
      </motion.div>
    </div>
  )
}

export default CrossCheckTab
