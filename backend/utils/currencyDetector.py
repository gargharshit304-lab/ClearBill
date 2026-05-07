"""Currency detection for OCR-extracted hospital bill text.

The detector preserves the bill's original currency. It never converts values
or infers exchange rates.
"""

from __future__ import annotations

import re
from collections import Counter
from dataclasses import dataclass


@dataclass(frozen=True)
class CurrencyMetadata:
    currency: str
    symbol: str

    def to_dict(self) -> dict[str, str]:
        return {"currency": self.currency, "symbol": self.symbol}


UNKNOWN_CURRENCY = CurrencyMetadata(currency="UNKNOWN", symbol="")

_CURRENCIES = {
    "INR": CurrencyMetadata("INR", "₹"),
    "USD": CurrencyMetadata("USD", "$"),
    "EUR": CurrencyMetadata("EUR", "€"),
    "AED": CurrencyMetadata("AED", "AED"),
    "GBP": CurrencyMetadata("GBP", "£"),
    "CAD": CurrencyMetadata("CAD", "CAD"),
}

_TOKEN_PATTERNS = {
    "INR": [
        r"₹\s?\d",
        r"\bINR\b",
        r"\bRs\.?\b",
        r"\bRupees?\b",
    ],
    "USD": [
        r"\$\s?\d",
        r"\bUSD\b",
        r"\bUS\s+Dollars?\b",
    ],
    "EUR": [
        r"€\s?\d",
        r"\bEUR\b",
        r"\bEuros?\b",
    ],
    "AED": [
        r"\bAED\b",
        r"\bDhs\.?\b",
        r"\bDirhams?\b",
    ],
    "GBP": [
        r"£\s?\d",
        r"\bGBP\b",
        r"\bPounds?\b",
        r"\bSterling\b",
    ],
    "CAD": [
        r"\bCAD\b",
        r"\bCA\$\s?\d",
        r"\bC\$\s?\d",
        r"\bCanadian\s+Dollars?\b",
    ],
}

_LOCALE_PATTERNS = [
    (re.compile(r"\bGSTIN\b|\bCGST\b|\bSGST\b|\bPAN\b", re.IGNORECASE), _CURRENCIES["INR"]),
    (re.compile(r"\bVAT\b|\bEmirates?\b|\bDubai\b|\bAbu\s*Dhabi\b", re.IGNORECASE), _CURRENCIES["AED"]),
    (re.compile(r"\bNHS\b|\bUnited\s+Kingdom\b|\bUK\b", re.IGNORECASE), _CURRENCIES["GBP"]),
    (re.compile(r"\bCanada\b|\bOntario\b|\bQuebec\b|\bBritish\s+Columbia\b", re.IGNORECASE), _CURRENCIES["CAD"]),
    (re.compile(r"\bMedicare\b|\bEIN\b|\bUnited\s+States\b|\bUSA\b", re.IGNORECASE), _CURRENCIES["USD"]),
]


def detect_currency(text: str | None) -> dict[str, str]:
    """Return detected currency metadata from OCR text.

    Returns:
        {"currency": "INR", "symbol": "₹"} when detected, otherwise
        {"currency": "UNKNOWN", "symbol": ""}.
    """

    if not text:
        return UNKNOWN_CURRENCY.to_dict()

    normalized = str(text)
    scores: Counter[str] = Counter()

    for code, patterns in _TOKEN_PATTERNS.items():
        for pattern in patterns:
            matches = re.findall(pattern, normalized, flags=re.IGNORECASE)
            if matches:
                scores[code] += len(matches)

    if scores:
        currency, _ = scores.most_common(1)[0]
        return _CURRENCIES[currency].to_dict()

    for pattern, metadata in _LOCALE_PATTERNS:
        if pattern.search(normalized):
            return metadata.to_dict()

    return UNKNOWN_CURRENCY.to_dict()


def currency_instruction(currency_metadata: dict[str, str]) -> str:
    """Build the AI prompt instruction that preserves detected currency."""

    currency = currency_metadata.get("currency") or "UNKNOWN"
    symbol = currency_metadata.get("symbol") or ""

    if currency == "UNKNOWN":
        return (
            "The billing currency could not be confidently detected. "
            "Do not convert currencies or estimate exchange rates. "
            "Preserve any currency symbols or codes exactly as they appear in the source bill."
        )

    display = f"{symbol} / {currency}" if symbol and symbol != currency else currency
    return (
        f"The detected billing currency is {currency} ({display}). "
        f"All amounts, summaries, overcharge estimates, and billing references must remain in {currency} only. "
        "Do not convert currencies, estimate exchange rates, or mix currencies."
    )
