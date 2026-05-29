# Ravel — Hermes Agent Profile

**Role:** Gateway Multi-Agent Orchestrator & Personal Assistant  
**Platform:** [Hermes](https://hermes.sh) AI Agent Runtime  
**Delivery Channel:** Telegram

---

## Overview

Ravel is the central intelligence layer of a multi-agent system. It manages the Telegram I/O stream, maintains long-term context, and orchestrates a network of specialized sub-agents — delegating domain-specific work and synthesizing results for delivery.

---

## Sub-Agent Network

| Agent | Role | Responsibility |
|---|---|---|
| **Empulso** | Market Intelligence | Scrapes live prices (IDX, USD/IDR, Gold, GBP, CNY, SGD) and curates high-impact market news into `live_data.json` / `curated_news.json` |
| **Rubeeo** | Strategic Wealth Analyst | Performs 3–5 year fundamental analysis on `master_assets.json`; issues buy/sell/reallocation recommendations as a Private Banker |
| **TalentForge** | Career Agent | Scrapes global remote job portals (LinkedIn, WWR, arc.dev, etc.), filters visa-free roles, and produces tailored CVs and cover letters |

> **Orchestration rule:** Ravel never performs deep scraping or raw financial tracking itself. It delegates to sub-agents and synthesizes their output for the user.

---

## Pipeline: Wealth Management

```
Empulso → live_data.json + curated_news.json
    ↓
Ravel → News Summary → Telegram (with clickable URLs)
    ↓
Rubeeo → Strategic Analysis Report
    ↓
Ravel → Analysis file attachment → Telegram
```

Asset master file: `household/market_data/master_assets.json`  
All stock quantities are in **LOTS** (1 Lot = 100 Shares). Primary reporting currency: **IDR**.

---

## Pipeline: Career / TalentForge

```
TalentForge → Scrape portals → Filter global-remote roles
    ↓
CV & Cover Letter tailored from main CV (with datetime suffix)
    ↓
Ravel → Job link + materials → Telegram (for user review)
```

No automatic applications are submitted. All materials are routed to the user for review first.

---

## Directory Structure

```
config.yaml          # Agent runtime configuration
SOUL.md              # Identity, role, and orchestration rules
memories/            # Long-term context and user notes
household/
  market_data/       # Wealth management pipeline files
  talent_forge/      # Career pipeline outputs
cron/                # Scheduled jobs and output logs
skills/              # Modular skill packs (creative, devops, research, etc.)
sessions/            # Conversation session history
gateway-service/     # Telegram gateway launcher
hooks/               # Event-driven hooks
plugins/             # Achievement tracking and other plugins
sandboxes/           # Isolated execution environments
```

---

## Configuration Highlights

- **Approval mode:** `manual` — destructive actions require confirmation
- **Compression:** Enabled with context hygiene rules (protects first 3 and last 20 messages)
- **Cron:** Automated scheduled tasks with configurable parallelism
- **Browser:** Chromium-based, configured for Windows with sandbox flags
- **Checkpoints:** Auto-prune enabled, max 20 snapshots

---

## Delivery Preferences

- **Strategic analysis** reports are sent as **file attachments** via Telegram.
- **Curated news** items include **clickable source URLs**.
- **Job application materials** include a datetime suffix for versioning (e.g., `_20260525_0700`).
