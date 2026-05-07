import unittest

from backend.utils.currencyDetector import detect_currency, currency_instruction
from backend.services.analysis_pipeline import normalize_analysis_response


class CurrencyDetectorTest(unittest.TestCase):
    def test_detects_inr_symbol(self):
        self.assertEqual(detect_currency("Total payable ₹12,450")["currency"], "INR")

    def test_detects_aed_code(self):
        self.assertEqual(detect_currency("Grand total AED 800")["symbol"], "AED")

    def test_detects_cad_marker(self):
        self.assertEqual(detect_currency("Amount due C$450")["currency"], "CAD")

    def test_unknown_fallback(self):
        self.assertEqual(detect_currency("Total amount due")["currency"], "UNKNOWN")

    def test_prompt_disallows_conversion(self):
        prompt = currency_instruction({"currency": "EUR", "symbol": "€"})
        self.assertIn("must remain in EUR only", prompt)
        self.assertIn("Do not convert currencies", prompt)

    def test_response_keeps_currency_metadata(self):
        response = normalize_analysis_response(
            {"riskScore": 7.6, "estimatedOvercharge": 1245},
            "Total ₹12,450",
        )
        self.assertEqual(response["currency"], "INR")
        self.assertEqual(response["currencySymbol"], "₹")
        self.assertEqual(response["estimatedOvercharge"], 1245)


if __name__ == "__main__":
    unittest.main()
