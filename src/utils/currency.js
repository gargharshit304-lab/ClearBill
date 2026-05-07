export const DEFAULT_CURRENCY = {
  currency: 'UNKNOWN',
  currencySymbol: '',
}

export function getCurrencySymbol(resultOrSymbol) {
  if (typeof resultOrSymbol === 'string') return resultOrSymbol
  return resultOrSymbol?.currencySymbol ?? resultOrSymbol?.symbol ?? DEFAULT_CURRENCY.currencySymbol
}

export function formatCurrencyAmount(amount, resultOrSymbol = DEFAULT_CURRENCY) {
  const symbol = getCurrencySymbol(resultOrSymbol)

  if (amount === null || amount === undefined || amount === '') return ''
  if (typeof amount === 'string') return amount

  const formatted = Number(amount).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })

  return symbol ? `${symbol}${formatted}` : formatted
}

export function formatCurrencyRange(range, resultOrSymbol = DEFAULT_CURRENCY) {
  if (!range) return ''
  if (typeof range === 'string') return range

  const min = formatCurrencyAmount(range.min, resultOrSymbol)
  const max = formatCurrencyAmount(range.max, resultOrSymbol)

  if (min && max) return `${min}-${max}`
  return min || max
}
