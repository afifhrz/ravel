---
name: daily-market-news
description: Daily scrape of material market news and delivery to Telegram.
---

# Daily Market News Workflow

## Trigger
Scheduled daily at 07:00 WIB.

## Steps
1. **Data Acquisition**: Delegate to Empulso to scrape material news for:
    - IDX Tickers (ADRO, PTBA, AADI, IKBI, RIGS, ASII, UNTR, MYOH, KMDS, SIDO).
    - Global Macro trends affecting Gold and Currencies (GBP, CNY, SGD).
2. **Persistence (Archive Mode)**: 
    - Instead of overwriting, **APPEND** today's curated news to `weekly_news_archive.json`.
    - If it is Monday, start a fresh archive for the new week.
    - Archive path: `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\weekly_news_archive.json`.
3. **Telegram Delivery**: 
    - Format a concise "Morning Brief" summary of *today's* news.
    - **Every news item MUST include a clickable URL** — never send news without its source link.
    - Send via `send_message` to the Telegram home channel.

## Verification
- Check if `weekly_news_archive.json` contains an increasing list of news items throughout the week.
- Verify Telegram message contains today's material items with clickable links.
- Verify archive starts fresh each Monday.