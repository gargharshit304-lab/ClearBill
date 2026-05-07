/**
 * Data Validators
 * Validate analysis results and API responses
 */

/**
 * Validate analysis result structure
 * @param {object} result - Analysis result to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validateAnalysisResult(result) {
  const errors = []

  if (!result) {
    errors.push('Analysis result is null or undefined')
    return { valid: false, errors }
  }

  // Required top-level fields
  if (!result.analysisType || !['bill', 'report', 'cross_verification'].includes(result.analysisType)) {
    errors.push('Invalid analysisType: must be bill, report, or cross_verification')
  }

  if (typeof result.riskScore !== 'number' || result.riskScore < 0 || result.riskScore > 10) {
    errors.push('Invalid riskScore: must be number between 0 and 10')
  }

  if (typeof result.estimatedOvercharge !== 'number' || result.estimatedOvercharge < 0) {
    errors.push('Invalid estimatedOvercharge: must be non-negative number')
  }

  if (!Array.isArray(result.billIssues)) {
    errors.push('billIssues must be an array')
  } else {
    result.billIssues.forEach((issue, i) => {
      if (!issue.id || !issue.title || !issue.severity) {
        errors.push(`billIssues[${i}] missing required fields: id, title, severity`)
      }
      if (!['high', 'medium', 'low'].includes(issue.severity)) {
        errors.push(`billIssues[${i}] invalid severity: must be high, medium, or low`)
      }
      if (typeof issue.confidence !== 'number' || issue.confidence < 0 || issue.confidence > 1) {
        errors.push(`billIssues[${i}] invalid confidence: must be between 0 and 1`)
      }
    })
  }

  if (!result.reportSummary || typeof result.reportSummary !== 'object') {
    errors.push('reportSummary must be an object')
  } else {
    const { diagnosis, treatment, observations } = result.reportSummary
    if (!diagnosis || typeof diagnosis !== 'string') {
      errors.push('reportSummary.diagnosis must be a non-empty string')
    }
    if (!treatment || typeof treatment !== 'string') {
      errors.push('reportSummary.treatment must be a non-empty string')
    }
    if (!observations || typeof observations !== 'string') {
      errors.push('reportSummary.observations must be a non-empty string')
    }
  }

  if (!Array.isArray(result.questions)) {
    errors.push('questions must be an array')
  }

  if (!result.confidenceScores || typeof result.confidenceScores !== 'object') {
    errors.push('confidenceScores must be an object')
  } else {
    const { analysis, billing } = result.confidenceScores
    if (typeof analysis !== 'number' || analysis < 0 || analysis > 100) {
      errors.push('confidenceScores.analysis must be between 0 and 100')
    }
    if (typeof billing !== 'number' || billing < 0 || billing > 100) {
      errors.push('confidenceScores.billing must be between 0 and 100')
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate API response format
 * @param {object} response - API response
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validateApiResponse(response) {
  const errors = []

  if (!response) {
    errors.push('Response is null or undefined')
    return { valid: false, errors }
  }

  if (response.error) {
    errors.push(`API Error: ${response.error}`)
    return { valid: false, errors }
  }

  if (!response.data) {
    errors.push('Response missing "data" field')
    return { valid: false, errors }
  }

  // Validate the data is a proper analysis result
  const dataValidation = validateAnalysisResult(response.data)
  if (!dataValidation.valid) {
    errors.push(...dataValidation.errors)
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Sanitize analysis result (remove sensitive data, normalize formats)
 * @param {object} result - Raw analysis result
 * @returns {object} Sanitized result
 */
export function sanitizeAnalysisResult(result) {
  if (!result) return null

  // Create a deep copy
  const sanitized = JSON.parse(JSON.stringify(result))

  // Remove any internal/temporary fields
  delete sanitized._internal
  delete sanitized._debug
  delete sanitized._raw

  // Normalize numbers
  if (sanitized.riskScore !== undefined) {
    sanitized.riskScore = Math.round(sanitized.riskScore * 10) / 10
  }

  // Ensure confidence scores are capped at 100
  if (sanitized.confidenceScores) {
    Object.keys(sanitized.confidenceScores).forEach((key) => {
      sanitized.confidenceScores[key] = Math.min(100, Math.max(0, sanitized.confidenceScores[key]))
    })
  }

  return sanitized
}
