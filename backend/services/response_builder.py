"""Response helpers that preserve detected billing currency metadata."""

from __future__ import annotations


def attach_currency_metadata(
    analysis: dict[str, object],
    currency_metadata: dict[str, str],
) -> dict[str, object]:
    """Return an analysis response with stable currency metadata.

    Monetary fields stay numeric and remain in the detected source currency.
    """

    return {
        **analysis,
        "currency": currency_metadata.get("currency", "UNKNOWN"),
        "currencySymbol": currency_metadata.get("symbol", ""),
    }
