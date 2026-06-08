---
name: weekly-wealth-analysis
description: Weekly deep fundamental analysis of the multi-asset portfolio.
---

# Weekly Wealth Analysis Workflow

## Trigger
Scheduled every Sunday at 08:00 WIB.

## Steps
1. **Market Data Refresh**: Delegate to Empulso to scrape current live prices for all assets in `master_assets.json`.
    - Path: `C:\\Users\\afifs\\AppData\\Local\\hermes\\profiles\\ravel\\household\\market_data\\master_assets.json`.
    - Save prices to `live_data.json` (same directory).
2. **Quarterly Financial Report Scraping**: Before analysis, ensure the latest quarterly financial report PDF is available for each IDX stock in the portfolio.
    - Check if the PDF already exists in `C:\\Users\\afifs\\AppData\\Local\\hermes\\profiles\\ravel\\household\\market_data\reports\`.
    - If missing or stale (older than the latest filed quarter), download the newest report.
    - Sources (in order of preference):
      a. Company Investor Relations page (direct PDF link)
      b. IDX financial statements page: `https://www.idx.co.id/en-us/listed-companies/financial-statements-and-annual-reports/`
    - Save as: `reports/<TICKER>_<QUARTER>.pdf` (e.g., `reports/SIDO_Q1_2026.pdf`)
    - If a report cannot be found/downloaded, note this — the analysis will rely on news instead.
    - **PDF Reading**: Use `ocr-and-documents` skill (pymupdf/marker-pdf) to extract text from the quarterly report PDFs. The financial statements are in Indonesian — key terms: "Pendapatan" (Revenue), "Laba Bersih" (Net Profit), "Laba per Saham" (EPS), "Arus Kas" (Cash Flow). Extract the consolidated income statement and balance sheet tables.
3. **Strategic Analysis**: Delegate to Rubeeo to perform a "Private Banker" level audit.
    - **Inputs**: `master_assets.json`, `live_data.json`, and the **entire `weekly_news_archive.json`**.
    - **Reference `AGENTS.md`** at `C:\\Users\\afifs\\AppData\\Local\\hermes\\profiles\\ravel\\household\\market_data\\AGENTS.md` for Rubeeo's persona, rules, and constraints.
    - **Trend Analysis**: Rubeeo MUST analyze the accumulated news from the past 7 days to identify evolving narratives, consistent bearish/bullish signals, and structural shifts. Same-day price data alone is insufficient — the weekly news arc drives the strategy.
    - **RECENCY RULE: All evidence used in the analysis MUST be from the current quarter (published within the last 90 days).** Rubeeo must NOT cite articles, surveys, or reports older than 90 days as justification for buy/sell/hold recommendations. If no recent evidence exists for an asset, explicitly state "No recent fundamental data — recommendation based on price action only" rather than using stale news. When researching, always use date-restricted searches (e.g., `after:2026-03-01`).
    - **Multi-Asset Scope**: Evaluate ALL asset classes: Stocks (qty in LOTS × 100 × price), Mutual Funds, Gold (grams × current IDR/gram), and Currency positions.
    - **Goal-Bucket Analysis (MANDATORY)**: Rubeeo MUST analyze each asset in the context of its goal bucket (Emergency Fund / Education Fund / Pension Fund) as defined in AGENTS.md. Every recommendation must state which goal bucket it serves and why the action is appropriate for that bucket's time horizon.
    - **Long-Term Advice**: Provide specific "Move Your Asset" reallocation instructions with fundamental justification AND goal-bucket rationale for each move.
    - **Reporting Structure**: The report MUST include a Goal-Bucket Health Check section covering: Emergency Fund adequacy (months of expenses covered), Education Fund progress vs. 2041/2044 targets, and Pension Fund long-term trajectory.
    - Persona: Conservative Private Banker advising a father of two (son 4.5yo, daughter 1yo) planning for family's future across multiple time horizons.
4. **Report Generation**: Save the full markdown report to `strategic_analysis_v2.md`.
5. **Email Delivery (PRIMARY for file attachment)**:
    - Use Himalaya CLI to send the full report as an email attachment
    - Config: `~/.config/himalaya/config.toml` (account: `gmail`)
    - From: `afif.sclit@gmail.com` | To: `ahmadafif.hariz@gmail.com`
    - Subject: `Weekly Wealth Analysis Report — [date]`
    - Build MIME message with MML attachment, save to temp file, pipe to `himalaya.exe message send`
    - See `references/himalaya-setup.md` for the full send procedure
6. **Telegram Delivery**:
    - Send a high-level executive summary to Telegram (P&L, top movers, 3 priority actions)
    - Paste a link to the full report or note that it was sent via email

## Verification
- Report must explicitly reference news events from earlier in the week to justify the Sunday strategy.
- Verify the `.md` file is attached to the Telegram message (not just linked as text).
- Verify all asset classes are included in the valuation (stocks, funds, gold, currency).
- Verify stock quantities are correctly multiplied by 100 (lot-to-share conversion).
- **Verify the latest quarterly financial report PDF exists in `reports/` for each IDX stock.** If missing, the report must note "Quarterly financial report not available — analysis based on secondary sources only."
- **Rubeeo's analysis MUST reference actual figures from the quarterly report PDF** (revenue, net profit, YoY growth) rather than only citing news headlines.
- **Verify the report includes a Goal-Bucket Health Check section** covering Emergency Fund adequacy, Education Fund progress, and Pension Fund trajectory.
- **Verify every recommendation states which goal bucket it serves** (Emergency / Education / Pension).

## Related Skills
- For ad-hoc deep research on specific assets (e.g., "give me evidence for SIDO"), use the `asset-research` skill.
