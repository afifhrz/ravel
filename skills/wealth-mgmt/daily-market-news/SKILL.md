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
    - **CRITICAL: Every news item must include the DIRECT ARTICLE URL** — the full link to the specific news page (e.g., `https://finance.yahoo.com/news/adro-stock-rises-today-1234567890.html`), NOT a generic domain (`https://finance.yahoo.com`), NOT a quote page (`https://finance.yahoo.com/quote/ADRO.JK/`), and NOT a category page (`https://www.cnbcindonesia.com/market`). If no article URL can be found, mark the source as `"url": "NOT_FOUND"` and do NOT fabricate a URL.
2. **Persistence (Archive Mode)**: 
    - Instead of overwriting, **APPEND** today's curated news to `weekly_news_archive.json`.
    - If it is Monday, start a fresh archive for the new week.
    - Archive path: `C:\\Users\\afifs\\AppData\\Local\\hermes\\profiles\\ravel\\household\\market_data\\weekly_news_archive.json`.
3. **Telegram Delivery**: 
    - Format a concise "Morning Brief" summary of *today's* news.
    - **Every news item MUST include a clickable URL** — never send news without its source link.
    - URLs must point to the **specific article**, not a homepage or category page.
    - Send via `send_message` to the Telegram home channel.

## Verification
- Check if `weekly_news_archive.json` contains an increasing list of news items throughout the week.
- Verify Telegram message contains today's material items with clickable links.
- Verify archive starts fresh each Monday.
- **Verify all URLs are direct article links** — reject any URL that is just a domain root or category page (e.g., `finance.yahoo.com` without a `/news/...` path, or `cnbcindonesia.com/market` without a specific article slug).