---
name: weekly-wealth-analysis
description: Weekly deep fundamental analysis of the multi-asset portfolio.
---

# Weekly Wealth Analysis Workflow

## Trigger
Scheduled every Sunday at 08:00 WIB.

## Steps
1. **Market Data Refresh**: Delegate to Empulso to scrape current live prices for all assets in `master_assets.json`.
    - Path: `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\master_assets.json`.
    - Save prices to `live_data.json` (same directory).
2. **Strategic Analysis**: Delegate to Rubeeo to perform a "Private Banker" level audit.
    - **Inputs**: `master_assets.json`, `live_data.json`, and the **entire `weekly_news_archive.json`**.
    - **Reference `AGENTS.md`** at `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\AGENTS.md` for Rubeeo's persona, rules, and constraints.
    - **Trend Analysis**: Rubeeo MUST analyze the accumulated news from the past 7 days to identify evolving narratives, consistent bearish/bullish signals, and structural shifts. Same-day price data alone is insufficient — the weekly news arc drives the strategy.
    - **Multi-Asset Scope**: Evaluate ALL asset classes: Stocks (qty in LOTS × 100 × price), Mutual Funds, Gold (grams × current IDR/gram), and Currency positions.
    - **Long-Term Advice**: Provide specific "Move Your Asset" reallocation instructions with fundamental justification for each move.
    - Persona: Conservative Private Banker advising a High Net Worth Individual. 3–5 year horizon.
3. **Report Generation**: Save the full markdown report to `strategic_analysis_v2.md`.
4. **Telegram Delivery**:
    - Send a high-level executive summary to Telegram (P&L, top movers, 3 priority actions).
    - **Attach the full `strategic_analysis_v2.md` file as a native document** — the user expects to read the professional report in full.
    - Use `send_message` with the file path for the attachment.

## Verification
- Report must explicitly reference news events from earlier in the week to justify the Sunday strategy.
- Verify the `.md` file is attached to the Telegram message (not just linked as text).
- Verify all asset classes are included in the valuation (stocks, funds, gold, currency).
- Verify stock quantities are correctly multiplied by 100 (lot-to-share conversion).