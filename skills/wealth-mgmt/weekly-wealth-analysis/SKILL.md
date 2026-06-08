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
    - **Multi-Asset Scope**: Evaluate ALL asset classes: Stocks (qty in LOTS × 100 × price), Mutual Funds (units × current_nav), Gold (grams × current IDR/gram), and Currency positions (units × current_nav).
    - **Dividend Yield Analysis (MANDATORY)**: For each stock, report the forward dividend per share, dividend yield %, and annual dividend income. Use the `dividend_data` section of `master_assets.json` as the primary source. If data is missing or stale, scrape from Yahoo Finance summary pages (e.g., `https://finance.yahoo.com/quote/TICKER.JK/` — look for "Forward Dividend & Yield" in the quote statistics panel). Include a dividend-focused section in the report ranking stocks by yield and identifying avg-down candidates based on high yield + strong fundamentals.
    - **Mutual Fund P&L**: Calculate mutual fund P&L using (current_nav - avg_nav) × units. Do NOT treat mutual funds as flat/at NAV — always show the unrealized gain/loss.
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
- Verify the `.md` file is saved to the market_data directory.
- Verify all asset classes are included in the valuation (stocks, funds, gold, currency).
- Verify stock quantities are correctly multiplied by 100 (lot-to-share conversion). **DOUBLE-CHECK: market_value = lots × 100 × price. Do NOT multiply by 100 twice.**
- **Verify mutual fund P&L is calculated using NAV, not treated as flat.** Cost basis = units × avg_nav. Market value = units × current_nav.
- **Verify the latest quarterly financial report PDF exists in `reports/` for each IDX stock.** If missing, the report must note "Quarterly financial report not available — analysis based on secondary sources only."
- **Rubeeo's analysis MUST reference actual figures from the quarterly report PDF** (revenue, net profit, YoY growth) rather than only citing news headlines.
- **Verify the report includes a Goal-Bucket Health Check section** covering Emergency Fund adequacy, Education Fund progress, and Pension Fund trajectory.
- **Verify every recommendation states which goal bucket it serves** (Emergency / Education / Pension).
- **Verify email was sent** with the full report attached to `ahmadafif.hariz@gmail.com`.

## Pitfalls

### Cron Job `run` Action — Cooldown Lock
The `cronjob(action='run')` action returns `success: true` but **does NOT actually trigger a run** if the job recently completed (within ~1-2 hours). The job state stays `"scheduled"` and `last_run_at` does not update. There is no error message — it silently no-ops.

**Detection**: After calling `run`, immediately call `cronjob(action='list')` and verify `last_run_at` updated.

**Workaround**: Execute the pipeline manually:
1. Read `master_assets.json`, `AGENTS.md`, and the skill file
2. If markets are closed, existing `live_data.json` prices are still valid — skip re-scraping
3. Delegate directly to Rubeeo with full context inline (don't split into separate Empulso + Rubeeo subagents — Empulso tends to timeout on browser-heavy scraping)
4. Deliver report to Telegram

### Subagent Delegation — Timeout Risk
Delegating browser-heavy scraping to a subagent with 600s timeout is unreliable. **Preferred approach**:
- For data scraping: Do it yourself in the main agent
- For analysis: Delegate to Rubeeo with all data already gathered and passed inline

### Telegram File Attachment via `MEDIA:` Is Unreliable
`send_message` with `MEDIA:` may send file content as inline text instead of a native file attachment, especially for `.md` files.

**Primary delivery**: Use **Himalaya email** (Step 5) to send the full report as a file attachment to `ahmadafif.hariz@gmail.com`.

**Fallback**: Paste the full report inline in Telegram (Telegram supports long messages).

### User Expects Full Report Inline
When file attachment fails, the user expects the **complete report** pasted in chat — not just a summary. Always have a fallback plan to deliver full content as text.

### Yahoo Finance JS Extraction
`browser_console` JS extraction returns `null` on Yahoo Finance pages. Use `browser_snapshot` instead and parse the accessibility tree text. See `references/dividend-sourcing.md`.

## References
- `references/calculation-pitfalls.md` — Lot conversion, NAV, currency, gold calculation rules
- `references/cron-job-run-debugging.md` — What to do when `cronjob action=run` silently fails
- `references/dividend-sourcing.md` — How to scrape dividend data from Yahoo Finance
- `references/himalaya-setup.md` — Email sending via Himalaya CLI (config, MML, common errors)
