/**
 * Report Summary Tab Component
 * Displays medical report analysis in expandable rows
 */

import { useState } from 'react'
import ExpandableRow from './ExpandableRow'

/**
 * @typedef {object} ReportSummaryTabProps
 * @property {object} data - Report data (diagnosis, treatment, observations)
 * @property {string} [data.diagnosis] - Diagnosis summary
 * @property {string} [data.diagnosisDetail] - Detailed diagnosis
 * @property {string} [data.treatment] - Treatment summary
 * @property {string} [data.treatmentDetail] - Detailed treatment
 * @property {string} [data.observations] - Observations/labs summary
 * @property {string} [data.observationsDetail] - Detailed observations
 */

/**
 * ReportSummaryTab - Expandable medical report view
 * @param {ReportSummaryTabProps} props
 * @returns {JSX.Element}
 */
export function ReportSummaryTab({ data = {} }) {
  const [expanded, setExpanded] = useState(null)

  // Default data if not provided
  const defaultData = {
    diagnosis: 'Chest X-ray showed mild inflammation, no serious abnormality.',
    diagnosisDetail:
      'The imaging suggests localized inflammation consistent with mild infection. No consolidation or effusion was seen. Recommended: monitoring and symptomatic treatment.',
    treatment: 'Standard antibiotic treatment with clinical monitoring.',
    treatmentDetail:
      'Treatment included medication to reduce inflammation and observation. No invasive procedures necessary. Suggested follow-up in 7-14 days.',
    observations: 'Lab markers trending down. Oxygen saturation normal.',
    observationsDetail:
      'All clinical markers align with expected recovery trajectory. No immediate interventions required beyond current medication.',
    ...data,
  }

  const items = [
    {
      id: 'diagnosis',
      label: 'Diagnosis',
      detail: defaultData.diagnosis,
      content: defaultData.diagnosisDetail,
    },
    {
      id: 'treatment',
      label: 'Treatment Provided',
      detail: defaultData.treatment,
      content: defaultData.treatmentDetail,
    },
    {
      id: 'observations',
      label: 'Lab Results & Notes',
      detail: defaultData.observations,
      content: defaultData.observationsDetail,
    },
  ]

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ExpandableRow
          key={item.id}
          id={item.id}
          title={item.label}
          subtitle={item.detail}
          content={<p className="text-sm text-slate-700">{item.content}</p>}
          expanded={expanded === item.id}
          onToggle={() => setExpanded(expanded === item.id ? null : item.id)}
          contentBg="bg-slate-50"
        />
      ))}
    </div>
  )
}

export default ReportSummaryTab
