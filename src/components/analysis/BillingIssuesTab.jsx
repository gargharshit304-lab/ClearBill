/**
 * Billing Issues Tab Component
 * Displays flagged billing items with expandable details and confidence
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import ConfidenceBar from './ConfidenceBar'
import ExpandableRow from './ExpandableRow'

/**
 * @typedef {object} BillingIssue
 * @property {number} id - Unique identifier
 * @property {string} item - Item name/description
 * @property {string} amount - Billed amount
 * @property {string} expected - Expected range
 * @property {string} status - Status text (e.g., "⚠ Duplicate?")
 * @property {string} severity - 'high' | 'medium' | 'low'
 * @property {number} confidence - Confidence (0-1)
 * @property {string} suggestion - Recommended action
 */

/**
 * BillingIssuesTab - Expandable billing concerns view
 * @param {object} props
 * @property {BillingIssue[]} [props.issues] - Billing issues to display
 * @property {number} [props.estimatedOvercharge] - Total estimated overcharge
 * @returns {JSX.Element}
 */
export function BillingIssuesTab({ issues = [], estimatedOvercharge = 1245 }) {
  const [expanded, setExpanded] = useState(null)

  // Default issues if not provided
  const defaultIssues = issues.length
    ? issues
    : [
        {
          id: 1,
          item: 'Room Charge',
          amount: '$220',
          expected: '$110-$180',
          status: '⚠ Duplicate?',
          severity: 'high',
          confidence: 0.92,
          suggestion: 'Ask for admission/discharge timeline.',
        },
        {
          id: 2,
          item: 'Antibiotic (Ceftriaxone)',
          amount: '$430',
          expected: '$30-$120',
          status: '⚠ Expensive',
          severity: 'high',
          confidence: 0.78,
          suggestion: 'Request pharmacy invoice and dosage confirmation.',
        },
        {
          id: 3,
          item: 'MRI Scan',
          amount: '$850',
          expected: '$600-$1,200',
          status: '✓ Normal',
          severity: 'low',
          confidence: 0.95,
          suggestion: 'Verified – no concerns.',
        },
        {
          id: 4,
          item: 'Facility Fee',
          amount: '$150',
          expected: '$100-$150',
          status: '⚠ Duplicate?',
          severity: 'medium',
          confidence: 0.64,
          suggestion: 'Clarify which event(s) triggered fee.',
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
          title={issue.item}
          subtitle={`${issue.amount} (expected: ${issue.expected})`}
          rightContent={
            <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(issue.severity)}`}>
              {issue.status}
            </span>
          }
          content={
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-2">{issue.suggestion}</p>
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
        <p className="text-lg font-bold text-amber-900 mt-1">${estimatedOvercharge}+</p>
      </motion.div>
    </div>
  )
}

export default BillingIssuesTab
