/**
 * Billing Issues Tab Component
 * Displays flagged billing items with expandable details and confidence
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import ConfidenceBar from './ConfidenceBar'
import ExpandableRow from './ExpandableRow'
import { formatCurrency, formatCurrencyRange } from '../../utils/formatCurrency'

/**
 * @typedef {object} BillingIssue
 * @property {number} id - Unique identifier
 * @property {string} title - Item name/description
 * @property {number} amount - Billed amount
 * @property {object} expectedRange - Expected range {min, max}
 * @property {string} status - Status text (e.g., "⚠ Duplicate?")
 * @property {string} severity - 'high' | 'medium' | 'low'
 * @property {number} confidence - Confidence (0-1)
 * @property {string} explanation - Recommended action
 */

/**
 * BillingIssuesTab - Expandable billing concerns view
 * @param {object} props
 * @property {BillingIssue[]} [props.issues] - Billing issues to display
 * @property {number} [props.estimatedOvercharge] - Total estimated overcharge
 * @property {string} [props.currencySymbol] - Currency symbol to display
 * @returns {JSX.Element}
 */
export function BillingIssuesTab({
  issues = [],
  estimatedOvercharge = 1245,
  currencySymbol = '₹',
}) {
  const [expanded, setExpanded] = useState(null)

  // Default issues if not provided
  const defaultIssues = issues.length
    ? issues
    : [
        {
          id: 1,
          title: 'Room Charge',
          amount: 220,
          expectedRange: { min: 110, max: 180 },
          status: '⚠ Duplicate?',
          severity: 'high',
          confidence: 0.92,
          explanation: 'Ask for admission/discharge timeline.',
        },
        {
          id: 2,
          title: 'Antibiotic (Ceftriaxone)',
          amount: 430,
          expectedRange: { min: 30, max: 120 },
          status: '⚠ Expensive',
          severity: 'high',
          confidence: 0.78,
          explanation: 'Request pharmacy invoice and dosage confirmation.',
        },
        {
          id: 3,
          title: 'MRI Scan',
          amount: 850,
          expectedRange: { min: 600, max: 1200 },
          status: '✓ Normal',
          severity: 'low',
          confidence: 0.95,
          explanation: 'Verified – no concerns.',
        },
        {
          id: 4,
          title: 'Facility Fee',
          amount: 150,
          expectedRange: { min: 100, max: 150 },
          status: '⚠ Duplicate?',
          severity: 'medium',
          confidence: 0.64,
          explanation: 'Clarify which event(s) triggered fee.',
        },
      ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 text-red-700'
      case 'medium':
        return 'bg-amber-50 text-amber-700'
      default:
        return 'bg-emerald-50 text-emerald-700'
    }
  }

  return (
    <div className="space-y-2">
      {defaultIssues.map((issue) => (
        <ExpandableRow
          key={issue.id}
          id={`issue-${issue.id}`}
          title={issue.title}
          subtitle={`${formatCurrency(issue.amount, currencySymbol)} (expected: ${formatCurrencyRange(issue.expectedRange?.min, issue.expectedRange?.max, currencySymbol)})`}
          rightContent={
            <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}>
              {issue.status}
            </span>
          }
          content={
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-2">{issue.explanation}</p>
              </div>
              <div>
                <ConfidenceBar value={issue.confidence * 100} label="Confidence" size="sm" />
              </div>
              <button className="text-xs bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition">
                Copy question
              </button>
            </div>
          }
          expanded={expanded === issue.id}
          onToggle={() => setExpanded(expanded === issue.id ? null : issue.id)}
          contentBg="bg-slate-50"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg"
      >
        <p className="text-xs font-semibold text-amber-900">Estimated Overcharge</p>
        <p className="text-lg font-bold text-amber-900 mt-1">
          {formatCurrency(estimatedOvercharge, currencySymbol)}+
        </p>
      </motion.div>
    </div>
  )
}

export default BillingIssuesTab
