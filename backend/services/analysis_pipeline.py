"""Backend analysis pipeline scaffold.

This module shows where OCR text, currency detection, and future Claude/OpenRouter
analysis connect. It intentionally performs no currency conversion.
"""

from __future__ import annotations

from backend.services.prompt_builder import (
    build_analysis_system_prompt,
    expected_response_currency_fields,
)
from backend.services.response_builder import attach_currency_metadata
from backend.utils.currencyDetector import detect_currency


def prepare_analysis_request(extracted_bill_text: str | None) -> dict[str, object]:
    currency_metadata = detect_currency(extracted_bill_text)

    return {
        "currency": expected_response_currency_fields(currency_metadata),
        "systemPrompt": build_analysis_system_prompt(currency_metadata),
    }


def normalize_analysis_response(
    ai_analysis: dict[str, object],
    extracted_bill_text: str | None,
) -> dict[str, object]:
    currency_metadata = detect_currency(extracted_bill_text)
    return attach_currency_metadata(ai_analysis, currency_metadata)
