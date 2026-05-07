/**
 * Expandable Row Component
 * Reusable collapsible row/item with expand/collapse animation
 */

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

/**
 * @typedef {object} ExpandableRowProps
 * @property {string} id - Unique identifier
 * @property {React.ReactNode} title - Row title/summary
 * @property {React.ReactNode} subtitle - Optional subtitle/detail
 * @property {React.ReactNode} content - Expandable content
 * @property {string} [contentBg] - Background color class for expanded content (default: 'bg-slate-50')
 * @property {boolean} [expanded] - Controlled expansion state (optional)
 * @property {Function} [onToggle] - Callback when toggled
 * @property {React.ReactNode} [rightContent] - Content in top-right corner
 * @property {React.ReactNode} [icon] - Optional icon before title
 */

/**
 * ExpandableRow - Collapsible list item
 * @param {ExpandableRowProps} props
 * @returns {JSX.Element}
 */
export function ExpandableRow({
  id,
  title,
  subtitle,
  content,
  contentBg = 'bg-slate-50',
  expanded,
  onToggle,
  rightContent,
  icon,
}) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isExpanded = expanded !== undefined ? expanded : internalExpanded

  const handleToggle = () => {
    if (expanded === undefined) {
      setInternalExpanded(!internalExpanded)
    }
    onToggle?.()
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-start justify-between gap-3 transition"
      >
        <div className="flex items-start gap-3 flex-1">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">{title}</p>
            {subtitle && <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {rightContent}
          <div className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`px-4 py-3 border-t ${contentBg}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExpandableRow
