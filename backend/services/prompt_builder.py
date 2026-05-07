"""Prompt helpers for future OpenRouter/Claude analysis calls."""

from __future__ import annotations

from backend.utils.currencyDetector import currency_instruction


def build_analysis_system_prompt(currency_metadata: dict[str, str]) -> str:
    return "\n".join(
        [
            "You are ClearBill's healthcare billing analysis assistant.",
            currency_instruction(currency_metadata),
            "Return numeric monetary values without currency symbols in JSON fields.",
            "Also include currency and currencySymbol metadata in the JSON response.",
        ]
    )


def expected_response_currency_fields(currency_metadata: dict[str, str]) -> dict[str, str]:
    return {
        "currency": currency_metadata.get("currency", "UNKNOWN"),
        "currencySymbol": currency_metadata.get("symbol", ""),
    }
