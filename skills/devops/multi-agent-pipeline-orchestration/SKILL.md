---
name: multi-agent-pipeline-orchestration
description: Orchestrate multi-agent financial data pipelines — delegate scraping to specialized agents, collect results, and deliver summarized reports to the user's preferred channel (Telegram). Use when the user asks to run a pipeline involving empulso (market data scraper), rubeeo (quantitative analyst), or similar sub-agent workflows.
---

# Multi-Agent Pipeline Orchestration

## Trigger Conditions
- User asks to "run the pipeline", "get market data", "analyze portfolio", or similar
- User references empulso, rubeeo, or other named sub-agents by role
- A task requires delegating to 2+ sub-agents and synthesizing output
- Scheduled cron runs for daily news or weekly analysis

## Output Directory
All pipeline outputs go under:
`C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\`

Key files:
- `master_assets.json` — Full wealth stack (stocks in lots, funds, gold, currency)
- `live_data.json` — Empulso's scraped market data
- `curated_news.json` — Today's news snapshot
- `weekly_news_archive.json` — Accumulated weekly news (refreshed each Monday)
- `strategic_analysis_v2.md` — Rubeeo's full professional report
- `AGENTS.md` — Persona/rule definitions for Empulso and Rubeeo

## Agent Roles
- **empulso**: Market data + news scraper. Saves to JSON.
- **rubeeo**: Strategic fundamental analyst. Produces markdown reports.
- **ravel** (main agent): Orchestrates, collects results, delivers to Telegram.

## Pipeline Pattern

### 1. Check Memory First
- Portfolio path, delivery channel, and agent output paths are stored in memory across sessions.
- **Never ask for the portfolio path** — retrieve from memory.

### 2. Delegate Tasks
Use `delegate_task` to spawn agents in **parallel** where possible:
- Empulso always runs (data collection).
- Rubeeo polls for Empulso's output file if run in parallel, or runs sequentially after.

### 3. Delivery (Critical)
The user expects **proactive Telegram delivery**, not just in-session output.
- **News**: Send a concise "Morning Brief" with clickable source URLs.
- **Reports**: Always attach the full `.md` file as a **native Telegram document**.
- **Summaries**: Concise — key metrics, top movers, 3-5 action items.

## Pitfalls
- **Don't ask for paths every session** — check memory.
- **Don't execute scraping/analysis yourself** — always delegate.
- **Don't paste long markdown into Telegram** — attach as file.
- **Don't send news without URLs** — every item needs a clickable source link.
- **Don't skip memory updates** — after config changes, save to memory immediately.

## Browser/Chrome Crashes on Windows
If `browser_navigate` fails with "Chrome exited early" or "DevToolsActivePort":
- Fix: add `--no-sandbox --disable-gpu --disable-dev-shm-usage` to `browser.args` in config.yaml.
- Use Python's `yaml` module to write the list (hermes config set serializes as string).
- Chromium is at `C:\Users\afifs\AppData\Local\ms-playwright\chromium-1223\chrome-win64\chrome.exe`.