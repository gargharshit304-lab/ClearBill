/**
 * Analysis Types and Interfaces
 * Define the structure of analysis data throughout the app
 */

/**
 * @typedef {object} AnalysisBillIssue
 * @property {string} id - Unique identifier
 * @property {string} title - Item title (e.g., "Room Charge")
 * @property {string} amount - Billed amount
 * @property {string} expectedRange - Expected price range
 * @property {string} status - Status indicator (e.g., "⚠ Duplicate?")
 * @property {"high" | "medium" | "low"} severity - Issue severity
 * @property {number} confidence - Confidence score (0-1)
 * @property {string} explanation - Why this was flagged
 */

/**
 * @typedef {object} AnalysisReportSummary
 * @property {string} diagnosis - Diagnosis findings
 * @property {string} treatment - Treatment provided
 * @property {string} observations - Lab results and observations
 * @property {string[]} recommendations - Follow-up recommendations
 */

/**
 * @typedef {object} AnalysisCrossCheckItem
 * @property {string} name - Item name
 * @property {"match" | "mismatch"} status - Match status
 * @property {string} note - Explanation
 * @property {number} matchPercentage - Match % (0-100)
 */

/**
 * @typedef {object} AnalysisQuestion
 * @property {string} question - Question text
 * @property {"high" | "medium" | "low"} priority - Question priority
 * @property {string} explanation - Why to ask this
 */

/**
 * @typedef {object} AnalysisConfidenceScores
 * @property {number} analysis - Overall analysis confidence (0-100)
 * @property {number} medical - Medical summary confidence (0-100)
 * @property {number} billing - Billing analysis confidence (0-100)
 * @property {number} crossVerification - Cross-verification confidence (0-100)
 */

/**
 * @typedef {object} AnalysisResult
 * @property {"bill" | "report" | "cross_verification"} analysisType - Type of analysis
 * @property {string} title - Analysis title
 * @property {string} subtitle - Analysis subtitle
 * @property {string} summary - Executive summary
 * @property {number} riskScore - Risk score (0-10)
 * @property {number} estimatedOvercharge - Estimated overcharge amount ($)
 * @property {number} totalIssues - Total issues found
 * @property {AnalysisBillIssue[]} billIssues - Flagged billing issues
 * @property {AnalysisReportSummary} reportSummary - Medical report summary
 * @property {AnalysisCrossCheckItem[]} crossCheckFindings - Cross-verification findings
 * @property {AnalysisQuestion[]} questions - Recommended questions
 * @property {AnalysisConfidenceScores} confidenceScores - Confidence metrics
 * @property {number} overallAlignment - Overall document alignment % (0-100)
 */

/**
 * @typedef {object} AnalysisState
 * @property {File | null} billFile - Uploaded bill file
 * @property {File | null} reportFile - Uploaded report file
 * @property {"idle" | "uploading" | "analyzing" | "complete" | "error"} status - Analysis status
 * @property {number} progress - Progress percentage (0-100)
 * @property {string} currentStage - Current processing stage label
 * @property {number} currentStageIndex - Current stage index (0-8)
 * @property {AnalysisResult | null} analysisResult - Completed analysis result
 * @property {string | null} error - Error message if any
 * @property {boolean} isReprocessing - Is doing second-stage reprocessing
 */

// Export for JSDoc type checking
export const types = {
  AnalysisBillIssue: {},
  AnalysisReportSummary: {},
  AnalysisCrossCheckItem: {},
  AnalysisQuestion: {},
  AnalysisConfidenceScores: {},
  AnalysisResult: {},
  AnalysisState: {},
}
