/**
 * API Configuration
 * Placeholder for future FastAPI + OpenRouter integration
 *
 * Future Backend Stack:
 * - FastAPI server
 * - OpenRouter API (Claude Sonnet)
 * - Real analysis processing
 * - OCR text extraction followed by currency detection/preservation
 *
 * Currently uses mock data with simulated delays
 */

// API Configuration
export const API_CONFIG = {
  // Base URL (will be set to FastAPI server)
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',

  // OpenRouter configuration (will be used by backend)
  OPENROUTER: {
    API_KEY: process.env.REACT_APP_OPENROUTER_KEY || '',
    MODEL: 'openrouter/auto',
    BASE_URL: 'https://openrouter.ai/api/v1',
  },

  // API endpoints (will be implemented)
  ENDPOINTS: {
    ANALYZE_BILL: '/api/analyze/bill',
    ANALYZE_REPORT: '/api/analyze/report',
    ANALYZE_CROSS_VERIFY: '/api/analyze/cross-verify',
    UPLOAD_FILE: '/api/files/upload',
    GET_ANALYSIS: '/api/analysis/:id',
  },

  // Request defaults
  TIMEOUT: 60000, // 60 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second

  // Simulation config (for mock mode)
  SIMULATE_DELAY: true,
  MOCK_DELAY_MS: 5500, // Simulate 5.5 second analysis
}

// Future backend responses include:
// {
//   currency: 'INR',
//   currencySymbol: '₹',
//   estimatedOvercharge: 1245
// }

/**
 * Make HTTP request to API
 * (Placeholder - will be implemented when backend is ready)
 *
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request payload
 * @param {object} options - Request options
 * @returns {Promise<object>} API response
 */
export async function apiRequest(method, endpoint, data = null, options = {}) {
  // TODO: Implement actual API request when backend is ready
  // This is a placeholder that shows the expected structure

  const url = `${API_CONFIG.BASE_URL}${endpoint}`

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  // PLACEHOLDER: Remove when implementing real API
  throw new Error(
    'Backend API not implemented yet. Use analysisService.js for mock responses.'
  )

  // Real implementation will look like:
  // const response = await fetch(url, config)
  // if (!response.ok) throw new Error(`API Error: ${response.status}`)
  // return response.json()
}

/**
 * Upload file to API
 * (Placeholder - will be implemented when backend is ready)
 *
 * @param {File} file - File to upload
 * @param {string} fileType - 'bill' or 'report'
 * @returns {Promise<object>} Upload response
 */
export async function uploadFile(file, fileType) {
  // TODO: Implement file upload when backend is ready

  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', fileType)

  // PLACEHOLDER: Remove when implementing real API
  throw new Error(
    'File upload not implemented yet. Files are processed locally.'
  )

  // Real implementation will look like:
  // return apiRequest('POST', API_CONFIG.ENDPOINTS.UPLOAD_FILE, formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // })
}

/**
 * Health check - verify API is ready
 * (Placeholder - will be implemented when backend is ready)
 *
 * @returns {Promise<boolean>} True if API is healthy
 */
export async function checkApiHealth() {
  // TODO: Implement health check when backend is ready

  // PLACEHOLDER:
  if (process.env.NODE_ENV === 'development') {
    console.log('API health check: Using mock data (backend not connected)')
    return false // Using mock data, not real backend
  }

  // Real implementation will check /api/health
  return false
}

export default API_CONFIG
