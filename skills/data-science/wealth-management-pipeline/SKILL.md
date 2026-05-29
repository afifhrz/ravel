---
name: wealth-management-pipeline
description: Orchestrate a multi-agent pipeline for total wealth management, covering multi-asset portfolios (stocks, funds, gold, currency) with a long-term fundamental investment lens.
tags: [finance, portfolio, fundamental-analysis, multi-agent, idx]
---

# Wealth Management Pipeline

This skill governs the orchestration of a specialized agent network (Scraper $\rightarrow$ Analyst $\rightarrow$ Orchestrator) to provide comprehensive wealth reports and strategic asset reallocation advice.

## Trigger Conditions
- User requests a "portfolio report," "wealth analysis," or "asset reallocation plan."
- User provides updates to their asset holdings (stocks, gold, funds, FX).
- Periodic (cron) wealth status updates.

## Workflow

### 1. Asset State Management
Maintain a `master_assets.json` file containing the full wealth stack.
- **Stocks:** Track by ticker, quantity, and average price.
- **Mutual Funds:** Track by name, units, and current market value.
- **Gold:** Track by buy price, weight (grams), and purchase date.
- **Currency:** Track by fund/currency, NAV, units, and market value.

### 2. Data Acquisition (The "Empulso" Phase)
Delegate a task to a data-gathering agent to scrape:
- **Live Prices:** Current market prices for all holdings and relevant exchange rates (e.g., USD/IDR, GBP/IDR).
- **Curated News:** Material headlines affecting the specific tickers and global macro trends (e.g., interest rates, geopolitical shifts).
- **Output:** Save to `live_data.json` and `curated_news.json`.

### 3. Immediate Intelligence Delivery
The main agent (Ravel) should immediately extract the `curated_news.json` and send a concise "Market News" summary to the user's preferred channel (e.g., Telegram) before the deep analysis begins.

### 4. Fundamental Strategic Analysis (The "Rubeeo" Phase)
Delegate a task to an analytical agent to perform a deep-dive review:
- **Valuation:** Calculate total wealth in IDR and USD, including true unrealized P&L.
- **Fundamental Review:** Evaluate holdings based on news and structural trends. Distinguish between cyclical dips and structural declines (e.g., permanent shifts in consumer behavior).
- **Reallocation Advice:** Identify "Dead Weight" to exit and "Growth Engines" to accumulate. Propose specific "Move Your Asset" instructions.
- **Target Mapping:** Propose a target allocation % (e.g., 35% Stocks / 30% Funds / 25% Gold / 10% Other).
- **Output:** Save a professional report to `strategic_analysis_v2.md`.

### 5. Final Delivery
The main agent (Ravel) sends a high-level a summarized "Executive Summary" to the user's preferred channel, including the top 3 action items.

## Pitfalls & Domain Rules
- **IDX Lot Sizing:** In the Indonesian Stock Exchange (IDX), 1 Lot = 100 shares. Always multiply quantity by 100 when calculating market value.
- **Fundamental Lens:** Analysis must focus on a 3–5 year horizon. Avoid overreacting to daily noise; focus on earnings, structural shifts, and macro-hedging (e.g., Gold as an IDR hedge).
- **News Integration:** News should not just be listed; it must be used by the Analyst agent to justify "Buy/Sell/Hold" recommendations.
- **Currency Drag:** High currency exposure without a strategic purpose is often "cash drag." Suggest rotating excess FX into growth assets or gold.

## Verification Steps
- [ ] `master_assets.json` is current.
- [ ] Live prices and news were successfully scraped.
- [ ] News summary delivered to user.
- [ ] Analysis includes specific "Move Your Asset" instructions.
- [ ] Final summary delivered to preferred channel.
