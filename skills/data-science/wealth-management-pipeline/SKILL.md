---
name: wealth-management-pipeline
description: Orchestrate a multi-agent pipeline for total wealth management, covering multi-asset portfolios (stocks, funds, gold, currency) with a long-term fundamental investment lens.
tags: [finance, portfolio, fundamental-analysis, multi-agent, idx]
---

# Wealth Management Pipeline

This skill governs the orchestration of a specialized agent network (Scraper → Analyst → Orchestrator) to provide comprehensive wealth reports and strategic asset reallocation advice.

## Trigger Conditions
- User requests a "portfolio report," "wealth analysis," or "asset reallocation plan."
- User provides updates to their asset holdings (stocks, gold, funds, FX).
- Scheduled cron runs (daily news at 07:00 WIB, weekly analysis at Sunday 08:00 WIB).
- User says "run the pipeline" or similar.

## Architecture

The pipeline uses three agent roles:
1. **Empulso** — Intelligence agent: scrapes live prices + material news.
2. **Rubeeo** — Strategic analyst: deep fundamental analysis, multi-asset audit.
3. **Ravel** — Main orchestrator: delegates, collects, and delivers to Telegram.

Output directory: `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\`

## Workflow

### 1. Asset State Management
Maintain a `master_assets.json` file containing the full wealth stack.
- **Stocks:** Track by ticker, quantity (in LOTS), and average price. **1 Lot = 100 shares.**
- **Mutual Funds:** Track by name, units, and current market value.
- **Gold:** Track by buy price, weight (grams), and purchase date.
- **Currency:** Track by code (GBP, CNY, SGD), average NAV, current NAV, units, and market value.

### 2. Daily News Cycle (Empulso → Ravel → Telegram)
Every day at 07:00 WIB:
1. Empulso scrapes material news for IDX tickers, gold, currencies, and macro trends.
2. News is **appended** to `weekly_news_archive.json` (fresh archive each Monday).
3. Ravel sends a concise "Morning Brief" to Telegram with **clickable source URLs** for every item.

### 3. Weekly Strategic Cycle (Empulso → Rubeeo → Ravel → Telegram)
Every Sunday at 08:00 WIB:
1. Empulso scrapes live prices for all assets → saves to `live_data.json`.
2. Rubeeo performs deep fundamental audit using:
   - `master_assets.json` (portfolio holdings)
   - `live_data.json` (current prices)
   - `weekly_news_archive.json` (full week of curated news — **must analyze the 7-day trend, not just Sunday's snapshot**)
   - `AGENTS.md` (persona and rule constraints)
3. Rubeeo saves professional report to `strategic_analysis_v2.md`.
4. Ravel sends executive summary + **attaches the full .md file** to Telegram.

### 4. On-Demand (User-Triggered)
When the user requests an ad-hoc run:
1. Spawn Empulso and Rubeeo in **parallel** using `delegate_task`.
2. Read outputs, send news first, then analysis summary + file attachment to Telegram.

## Delivery Standards
- **News**: Always include clickable URLs. Never send raw news without source links.
- **Strategic Report**: Always attach the full `.md` file as a native Telegram document — never just paste the full report as inline text.
- **Summaries**: Keep Telegram summaries concise (P&L, top 3-5 action items, key movers). The full report is the attachment.
- **Tone**: Professional, direct, authoritative. Private Banker advising an HNWI.

## Pitfalls & Domain Rules
- **IDX Lot Sizing:** 1 Lot = 100 shares. Always multiply quantity by 100 for market value.
- **Fundamental Lens:** 3–5 year horizon. Focus on structural health, not daily noise.
- **Dead Weight Principle:** Assets in structural decline (not cyclical dips) should be exited regardless of unrealized loss.
- **Weekly News Trend:** Sunday's analysis MUST reference the week's accumulated news, not just same-day data.
- **File Attachment:** Always use Telegram file attachment for the full report, never inline markdown dumps.

## Related Skills
- `daily-market-news` — Step-by-step daily news workflow
- `weekly-wealth-analysis` — Step-by-step weekly analysis workflow