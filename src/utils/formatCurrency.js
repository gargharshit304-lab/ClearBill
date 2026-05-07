/**
 * Currency Formatting Utility
 * Dynamic currency rendering for backend-driven analysis responses
 */

/**
 * Format currency amount with symbol
 * @param {number} amount - Amount to format
 * @param {string} [currencySymbol='$'] - Currency symbol (₹, $, €, £, etc.)
 * @param {number} [decimals=0] - Number of decimal places
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currencySymbol = '$', decimals = 0) {
  if (amount === null || amount === undefined) return `${currencySymbol}0`

  // Format number with proper localization
  const formatted = Math.abs(amount).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Add currency symbol and handle negative values
  const sign = amount < 0 ? '-' : ''
  return `${sign}${currencySymbol}${formatted}`
}

/**
 * Get currency symbol from currency code
 * @param {string} currencyCode - ISO 4217 currency code (USD, INR, EUR, etc.)
 * @returns {string} Currency symbol
 */
export function getCurrencySymbol(currencyCode) {
  const symbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    SEK: 'kr',
    NZD: 'NZ$',
    MXN: '$',
    SGD: 'S$',
    HKD: 'HK$',
    NOK: 'kr',
    KRW: '₩',
    TRY: '₺',
    RUB: '₽',
    BRL: 'R$',
    ZAR: 'R',
  }

  return symbols[currencyCode?.toUpperCase()] || currencyCode || '$'
}

/**
 * Get currency info from code or symbol
 * @param {string} currencyCodeOrSymbol - Currency code or symbol
 * @returns {object} Currency information
 */
export function getCurrencyInfo(currencyCodeOrSymbol) {
  const codes = {
    USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  }

  const upper = currencyCodeOrSymbol?.toUpperCase()
  return codes[upper] || { code: upper || 'USD', symbol: '$', name: 'Currency' }
}

/**
 * Format percentage change with currency
 * @param {number} amount - Amount
 * @param {number} percentage - Percentage
 * @param {string} [currencySymbol='$'] - Currency symbol
 * @returns {string} Formatted string
 */
export function formatCurrencyWithPercentage(amount, percentage, currencySymbol = '$') {
  const formatted = formatCurrency(amount, currencySymbol)
  const percentFormatted = percentage.toFixed(1)
  return `${formatted} (${percentFormatted}%)`
}

/**
 * Format currency range
 * @param {number} min - Minimum amount
 * @param {number} max - Maximum amount
 * @param {string} [currencySymbol='$'] - Currency symbol
 * @returns {string} Formatted range
 */
export function formatCurrencyRange(min, max, currencySymbol = '$') {
  const minFormatted = formatCurrency(min, currencySymbol)
  const maxFormatted = formatCurrency(max, currencySymbol)
  return `${minFormatted} - ${maxFormatted}`
}

export default formatCurrency
