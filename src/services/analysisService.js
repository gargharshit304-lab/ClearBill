/**
 * Analysis Service
 * Handles analysis requests and responses
 * Currently uses mock data, will connect to FastAPI + OpenRouter when backend is ready
 */

import { getMockAnalysis } from '../data/mockAnalysis'
import { validateAnalysisResult, sanitizeAnalysisResult } from '../utils/validators'
import { API_CONFIG } from './api'

/**
 * Simulate network delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function delay(ms = API_CONFIG.MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Analyze hospital bill
 * Currently: Returns mock analysis
 * Future: Sends to FastAPI + Claude for real processing
 *
 * @param {File} billFile - Hospital bill file
 * @returns {Promise<object>} Analysis result
 */
export async function analyzeBill(billFile) {
  if (!billFile) {
    throw new Error('No bill file provided')
  }

  // Simulate processing time
  if (API_CONFIG.SIMULATE_DELAY) {
    await delay()
  }

  // Get mock data
  const mockResult = getMockAnalysis(true, false)

  // Validate structure
  const validation = validateAnalysisResult(mockResult)
  if (!validation.valid) {
    console.error('Mock data validation failed:', validation.errors)
    throw new Error('Invalid mock analysis structure')
  }

  // Sanitize result
  const sanitized = sanitizeAnalysisResult(mockResult)

  // TODO: Replace with real API call:
  // const response = await apiRequest('POST', API_CONFIG.ENDPOINTS.ANALYZE_BILL, {
  //   file: billFile,
  //   filename: billFile.name,
  //   model: 'openrouter/auto'
  // })
  // return validateAndSanitize(response.data)

  return sanitized
}

/**
 * Analyze medical report
 * Currently: Returns mock analysis
 * Future: Sends to FastAPI + Claude for real processing
 *
 * @param {File} reportFile - Medical report file
 * @returns {Promise<object>} Analysis result
 */
export async function analyzeReport(reportFile) {
  if (!reportFile) {
    throw new Error('No report file provided')
  }

  // Simulate processing time
  if (API_CONFIG.SIMULATE_DELAY) {
    await delay()
  }

  // Get mock data
  const mockResult = getMockAnalysis(false, true)

  // Validate structure
  const validation = validateAnalysisResult(mockResult)
  if (!validation.valid) {
    console.error('Mock data validation failed:', validation.errors)
    throw new Error('Invalid mock analysis structure')
  }

  // Sanitize result
  const sanitized = sanitizeAnalysisResult(mockResult)

  // TODO: Replace with real API call:
  // const response = await apiRequest('POST', API_CONFIG.ENDPOINTS.ANALYZE_REPORT, {
  //   file: reportFile,
  //   filename: reportFile.name
  // })
  // return validateAndSanitize(response.data)

  return sanitized
}

/**
 * Analyze cross-verification (bill + report)
 * Currently: Returns mock analysis
 * Future: Sends both files to FastAPI + Claude for real cross-verification
 *
 * @param {File} billFile - Hospital bill file
 * @param {File} reportFile - Medical report file
 * @returns {Promise<object>} Cross-verification analysis result
 */
export async function analyzeCrossVerification(billFile, reportFile) {
  if (!billFile || !reportFile) {
    throw new Error('Both bill and report files required for cross-verification')
  }

  // Simulate processing time (slightly longer for cross-verification)
  if (API_CONFIG.SIMULATE_DELAY) {
    await delay(API_CONFIG.MOCK_DELAY_MS + 500)
  }

  // Get mock data
  const mockResult = getMockAnalysis(true, true)

  // Validate structure
  const validation = validateAnalysisResult(mockResult)
  if (!validation.valid) {
    console.error('Mock data validation failed:', validation.errors)
    throw new Error('Invalid mock analysis structure')
  }

  // Sanitize result
  const sanitized = sanitizeAnalysisResult(mockResult)

  // TODO: Replace with real API call:
  // const response = await apiRequest('POST', API_CONFIG.ENDPOINTS.ANALYZE_CROSS_VERIFY, {
  //   billFile: billFile,
  //   reportFile: reportFile,
  //   billFilename: billFile.name,
  //   reportFilename: reportFile.name
  // })
  // return validateAndSanitize(response.data)

  return sanitized
}

/**
 * Perform analysis based on uploaded files
 * Router that decides which analysis to run
 *
 * @param {File|null} billFile - Hospital bill file or null
 * @param {File|null} reportFile - Medical report file or null
 * @returns {Promise<object>} Analysis result
 */
export async function performAnalysis(billFile, reportFile) {
  if (!billFile && !reportFile) {
    throw new Error('At least one file (bill or report) must be provided')
  }

  if (billFile && reportFile) {
    return analyzeCrossVerification(billFile, reportFile)
  } else if (billFile) {
    return analyzeBill(billFile)
  } else {
    return analyzeReport(reportFile)
  }
}

/**
 * Extract text from file (frontend-only for now)
 * Future: May use backend for OCR
 *
 * @param {File} file - File to extract text from
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromFile(file) {
  // TODO: Implement file text extraction
  // Options:
  // 1. Use PDF.js library for PDF text extraction (client-side)
  // 2. Use tesseract.js for OCR on images (client-side)
  // 3. Send to backend for processing
  // 4. Combination of above

  return 'File text extraction not yet implemented'
}
