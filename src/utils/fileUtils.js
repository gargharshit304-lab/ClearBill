/**
 * File Handling Utilities
 * Validation, preview, and file management helpers
 */

const SUPPORTED_FORMATS = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const VALID_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png']

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @returns {object} { valid: boolean, error: string | null }
 */
export function validateFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  const fileName = file.name.toLowerCase()
  const hasValidExtension = VALID_EXTENSIONS.some((ext) => fileName.endsWith(ext))
  if (!hasValidExtension) {
    return {
      valid: false,
      error: `Invalid file type. Supported: PDF, JPG, PNG`
    }
  }

  const isValidMimeType = SUPPORTED_FORMATS.includes(file.type)
  if (!isValidMimeType) {
    return {
      valid: false,
      error: `Invalid file type (${file.type}). Supported: PDF, images`
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Max: 10MB, Got: ${(file.size / 1024 / 1024).toFixed(1)}MB`
    }
  }

  return { valid: true, error: null }
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size (e.g., "2.5 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Get file display name
 * @param {File} file - File object
 * @returns {string} Display name
 */
export function getFileName(file) {
  if (!file) return ''
  const name = file.name
  // Truncate if too long
  return name.length > 30 ? name.substring(0, 27) + '...' : name
}

/**
 * Check if file is PDF
 * @param {File} file - File object
 * @returns {boolean}
 */
export function isPdfFile(file) {
  return file?.type === 'application/pdf' || file?.name?.toLowerCase().endsWith('.pdf')
}

/**
 * Check if file is image
 * @param {File} file - File object
 * @returns {boolean}
 */
export function isImageFile(file) {
  return file?.type?.startsWith('image/')
}

/**
 * Create file preview URL (for images)
 * @param {File} file - File object
 * @returns {string} Object URL (should be revoked with URL.revokeObjectURL)
 */
export function createFilePreview(file) {
  if (!isImageFile(file)) return null
  return URL.createObjectURL(file)
}

/**
 * Get file icon name for display
 * @param {File} file - File object
 * @returns {string} Icon name
 */
export function getFileIcon(file) {
  if (isPdfFile(file)) return 'FileText'
  if (isImageFile(file)) return 'Image'
  return 'File'
}
