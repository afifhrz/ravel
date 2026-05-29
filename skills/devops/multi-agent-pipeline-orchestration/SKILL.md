---
name: multi-agent-pipeline-orchestration
description: Orchestrate multi-agent financial data pipelines — delegate scraping to specialized agents, collect results, and deliver summarized reports to the user's preferred channel (Telegram). Use when the user asks to run a pipeline involving empulso (market data scraper), rubeeo (quantitative analyst), or similar sub-agent workflows.
---

# Multi-Agent Pipeline Orchestration

## Trigger Conditions

Use this skill when:
- User asks to "run the pipeline", "get market data", "analyze portfolio", or similar financial data workflows
- User references empulso, rubeeo, or other named sub-agents by role
- A task requires delegating to 2+ sub-agents and synthesizing their output

## Pipeline Pattern

### 1. Gather Inputs

- **Portfolio file**: Check memory for the portfolio path. Default: `C:\Users\afifs\market_data\portfolio.csv`
- **Delivery target**: Check memory for the user's preferred delivery channel (e.g., Telegram). If not configured, ask once and save to memory.
- **Agent roles**:
  - **empulso**: Market data scraper — scrapes live stock/gold/currency data, saves to JSON
  - **rubeeo**: Quantitative analyst — reads scraped data + portfolio, produces analysis report

### 2. Spawn Agents in Parallel

Use `delegate_task` to spawn both agents concurrently:

**empulso task**:
- Goal: Scrape live market data for all tickers in the portfolio CSV
- Output file: `C:\Users\afifs\market_data\live_data.json`
- Include: current price, day high/low, volume, change %, 52w high/low, market cap
- Also scrape: USD/IDR, gold USD, IDX composite
- Toolsets: `["web", "browser", "terminal", "file"]`

**rubeeo task**:
- Goal: Deep quantitative analysis on the scraped data
- Input files: portfolio CSV + live_data.json (empulso output)
- Output file: `C:\Users\afifs\market_data\analysis_report.md`
- Sections: Portfolio valuation, technical/momentum analysis, risk assessment, buy/sell/hold recommendations, market context
- Toolsets: `["web", "browser", "terminal", "file"]`

### 3. Collect and Deliver

After both agents complete:
1. Read the analysis report from the output file
2. **Send a summarized version to the user's preferred channel** (e.g., Telegram) via `send_message`
3. Also present the summary in the current session

The Telegram summary should be concise — key metrics, top movers, recommendations — not the full report. Link to or note the full report path for reference.

## Output File Convention

All pipeline outputs go under `C:\Users\afifs\market_data\`:
- `portfolio.csv` — user's holdings (CODE, QTY, AVG_PRICE, LAST_PRICE)
- `live_data.json` — empulso's scraped market data
- `analysis_report.md` — rubeeo's full analysis

## Pitfalls

- **Don't ask for the portfolio path every session** — check memory first, only ask if not found
- **Don't execute scraping/analysis yourself** — always delegate to the specialized sub-agents
- **Always deliver to Telegram** (or the user's saved preferred channel) — the user expects proactive delivery, not just in-session output
- **Spawn agents in parallel**, not sequentially — empulso and rubeeo are independent (rubeeo polls for empulso's output file)
- **Save durable facts to memory** after the first run (portfolio path, delivery preferences, agent output paths)

## Verification

After pipeline completes:
- Confirm `live_data.json` exists and contains data for all tickers
- Confirm `analysis_report.md` exists and has all 5 sections
- Confirm Telegram message was sent (check for errors in `send_message` response)
