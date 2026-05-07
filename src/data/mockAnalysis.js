/**
 * Mock Analysis Data
 * Realistic structured analysis responses
 * These will be replaced with real AI responses from OpenRouter Claude API
 */

export const billAnalysisMock = {
  analysisType: 'bill',
  title: 'Hospital Billing Analysis',
  subtitle: 'Focused on overcharges, duplicates, and suspicious line items.',
  summary: 'Your hospital bill contains 4 flagged items requiring attention. Estimated recoverable overcharge: $1,245+',
  riskScore: 7.6,
  estimatedOvercharge: 1245,
  totalIssues: 12,
  billIssues: [
    {
      id: 1,
      title: 'Room Charge',
      amount: '$220',
      expectedRange: '$110-$180',
      status: '⚠ Duplicate?',
      severity: 'high',
      confidence: 0.92,
      explanation: 'Ask for admission/discharge timeline to verify single room stay.'
    },
    {
      id: 2,
      title: 'Antibiotic (Ceftriaxone)',
      amount: '$430',
      expectedRange: '$30-$120',
      status: '⚠ Expensive',
      severity: 'high',
      confidence: 0.78,
      explanation: 'Request pharmacy invoice and dosage confirmation.'
    },
    {
      id: 3,
      title: 'MRI Scan',
      amount: '$850',
      expectedRange: '$600-$1,200',
      status: '✓ Normal',
      severity: 'low',
      confidence: 0.95,
      explanation: 'Verified – no concerns.'
    },
    {
      id: 4,
      title: 'Facility Fee',
      amount: '$150',
      expectedRange: '$100-$150',
      status: '⚠ Duplicate?',
      severity: 'medium',
      confidence: 0.64,
      explanation: 'Clarify which event(s) triggered fee.'
    }
  ],
  reportSummary: {
    diagnosis: 'Chest X-ray showed mild inflammation, no serious abnormality. Vitals stable.',
    treatment: 'Standard antibiotic treatment with clinical monitoring.',
    observations: 'Lab markers trending down. Oxygen saturation normal.',
    recommendations: ['Follow-up in 7-14 days', 'Monitor symptoms', 'Continue medication as prescribed']
  },
  crossCheckFindings: [],
  questions: [
    {
      question: 'Why was room charge billed twice?',
      priority: 'high',
      explanation: 'Ask for timeline showing two separate room usages.'
    },
    {
      question: 'Can I see the pharmacy invoice?',
      priority: 'high',
      explanation: 'Need unit price and quantity for the antibiotic charge.'
    },
    {
      question: 'Which clinical note references the MRI?',
      priority: 'high',
      explanation: 'Procedure notes confirm medical necessity.'
    },
    {
      question: 'Was facility fee charged twice?',
      priority: 'medium',
      explanation: 'Clarify if fee applies at admission and/or discharge.'
    }
  ],
  confidenceScores: {
    analysis: 91,
    medical: 89,
    billing: 78,
    crossVerification: 0
  },
  overallAlignment: 0
}

export const reportAnalysisMock = {
  analysisType: 'report',
  title: 'Medical Report Analysis',
  subtitle: 'Focused on plain-language explanations and follow-up guidance.',
  summary: 'Your medical report shows mild inflammation responding well to treatment. Continue current medication and schedule follow-up.',
  riskScore: 4.2,
  estimatedOvercharge: 0,
  totalIssues: 0,
  billIssues: [],
  reportSummary: {
    diagnosis: 'Chest X-ray showed mild inflammation, no serious abnormality. Vitals stable and responding to treatment.',
    treatment: 'Antibiotic treatment with clinical monitoring. No invasive procedures necessary during this stay.',
    observations: 'All clinical markers align with expected recovery trajectory. Lab work trending positively.',
    recommendations: ['Outpatient review in 7-14 days', 'Continue current medication', 'Return if symptoms worsen']
  },
  crossCheckFindings: [],
  questions: [
    {
      question: 'What should I do if symptoms return?',
      priority: 'high',
      explanation: 'Get guidance on when to seek immediate care.'
    },
    {
      question: 'Can I resume normal activities?',
      priority: 'medium',
      explanation: 'Understand activity restrictions during recovery.'
    }
  ],
  confidenceScores: {
    analysis: 94,
    medical: 92,
    billing: 0,
    crossVerification: 0
  },
  overallAlignment: 0
}

export const crossVerificationMock = {
  analysisType: 'cross_verification',
  title: 'Cross-Verification Analysis',
  subtitle: 'Your hospital bill and medical report are mostly aligned, but several billing inconsistencies were detected.',
  summary: 'Bill and report align 84% overall. 4 procedures billed without clear clinical justification. Estimated overcharge: $1,245+',
  riskScore: 7.6,
  estimatedOvercharge: 1245,
  totalIssues: 12,
  billIssues: [
    {
      id: 1,
      title: 'Room Charge',
      amount: '$220',
      expectedRange: '$110-$180',
      status: '⚠ Duplicate?',
      severity: 'high',
      confidence: 0.92,
      explanation: 'Billed twice but only mentioned once in report.'
    },
    {
      id: 2,
      title: 'Antibiotic (Ceftriaxone)',
      amount: '$430',
      expectedRange: '$30-$120',
      status: '⚠ Expensive',
      severity: 'high',
      confidence: 0.78,
      explanation: 'Dosage mismatch between billing and clinical notes.'
    },
    {
      id: 3,
      title: 'MRI Scan',
      amount: '$850',
      expectedRange: '$600-$1,200',
      status: '✓ Normal',
      severity: 'low',
      confidence: 0.95,
      explanation: 'Mentioned in both report and bill – verified.'
    },
    {
      id: 4,
      title: 'Facility Fee',
      amount: '$150',
      expectedRange: '$100-$150',
      status: '⚠ Duplicate?',
      severity: 'medium',
      confidence: 0.64,
      explanation: 'Charged on both admission and discharge dates.'
    }
  ],
  reportSummary: {
    diagnosis: 'Chest X-ray showed mild inflammation, no serious abnormality.',
    treatment: 'Antibiotic treatment and monitoring provided.',
    observations: 'Lab markers trending down. Oxygen saturation normal.',
    recommendations: ['Follow-up in 7-14 days', 'Monitor symptoms']
  },
  crossCheckFindings: [
    {
      name: 'MRI Scan',
      status: 'match',
      note: 'Mentioned in both report and bill',
      matchPercentage: 98
    },
    {
      name: 'Nebulization',
      status: 'mismatch',
      note: 'Billed but unclear in report',
      matchPercentage: 42
    },
    {
      name: 'Physician Note',
      status: 'match',
      note: 'Provider in both documents',
      matchPercentage: 88
    },
    {
      name: 'Facility Fee',
      status: 'mismatch',
      note: 'Possible duplicate charge',
      matchPercentage: 54
    }
  ],
  questions: [
    {
      question: 'Why was room charge billed twice?',
      priority: 'high',
      explanation: 'Only one room mentioned in medical notes.'
    },
    {
      question: 'Can I see the pharmacy invoice?',
      priority: 'high',
      explanation: 'Need unit price matching clinical dosage.'
    },
    {
      question: 'Which clinical note references the MRI?',
      priority: 'high',
      explanation: 'Verify medical necessity.'
    },
    {
      question: 'Was facility fee charged twice?',
      priority: 'medium',
      explanation: 'Clarify admission vs. discharge fees.'
    }
  ],
  confidenceScores: {
    analysis: 91,
    medical: 89,
    billing: 78,
    crossVerification: 84
  },
  overallAlignment: 84
}

/**
 * Get mock analysis based on uploaded files
 * @param {boolean} hasBill - Whether bill was uploaded
 * @param {boolean} hasReport - Whether report was uploaded
 * @returns {AnalysisResult} Mock analysis result
 */
export function getMockAnalysis(hasBill, hasReport) {
  if (hasBill && hasReport) {
    return crossVerificationMock
  } else if (hasBill) {
    return billAnalysisMock
  } else if (hasReport) {
    return reportAnalysisMock
  }
  return crossVerificationMock // default
}
