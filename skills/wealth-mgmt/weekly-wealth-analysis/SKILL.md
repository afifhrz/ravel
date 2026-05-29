---
name: weekly-wealth-analysis
description: Weekly deep fundamental analysis of the multi-asset portfolio.
---

# Weekly Wealth Analysis Workflow

## Trigger
Scheduled every Sunday morning.

## Steps
1. **Market Data Refresh**: Delegate to Empulso to scrape current live prices for all assets in `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\master_assets.json`.
2. **Data Persistence**: Save prices to `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\live_data.json`.
3. **Strategic Analysis**: Delegate to Rubeeo to perform a "Private Banker" level audit.
    - **Inputs**: `master_assets.json`, `live_data.json`, and the **entire `weekly_news_archive.json`**.
    - **Reference**: Must follow the persona and rules in `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\AGENTS.md`.
    - **Trend Analysis**: Rubeeo MUST analyze the news from the past 7 days to identify evolving narratives, consistent bearish/bullish signals, and structural shifts.
    - **Long-Term Advice**: Provide reallocation moves based on this weekly trend analysis.
4. **Report Generation**: Save the full markdown report to `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\strategic_analysis_v2.md`.
5. **Telegram Delivery**:
    - Send a high-level summary to Telegram.
    - Attach the full `strategic_analysis_v2.md` file as a native document.

## Verification
- Report must explicitly reference news events from earlier in the week to justify the Sunday strategy.
- Verify the `.md` file is attached to the Telegram message.
