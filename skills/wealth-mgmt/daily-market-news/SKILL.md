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
    - **RECENCY RULE: Only include news published within the current quarter (last 90 days).** Anything older is stale and must be discarded. For daily news, prefer items from the last 1-3 days. For weekly analysis, the entire weekly archive should only contain items from the current week. If a search result points to an article older than 90 days, skip it and search again with a date filter.

    ### News Sources (Priority Order)
    **Indonesian Portals (scrape first for IDX/local context):**
    - **kontan.co.id** — Market & business news. Use Google search `site:kontan.co.id [ticker/topic]` or navigate to `https://www.kontan.co.id/search/?q=[query]`. Extract article URLs from search results.
    - **bloombergtechnoz.com** — Bloomberg Indonesia tech & market coverage. Navigate to `https://www.bloombergtechnoz.com/` and scrape latest headlines. Use search: `https://www.bloombergtechnoz.com/search?q=[query]`.
    - **katadata.co.id** — Data-driven economic & business journalism. Navigate to `https://katadata.co.id/` or use `https://katadata.co.id/search?q=[query]`. Good for macro/sector analysis.
    - **bisnis.com** — Bisnis Indonesia group, covers both `market.bisnis.com` (IDX market news) and `ekonomi.bisnis.com` (broader economy). Scrape both subdomains for comprehensive coverage. Use `https://market.bisnis.com/` for ticker-specific news and `https://ekonomi.bisnis.com/` for macro/economic context. Search: `https://www.bisnis.com/search?k=[query]`. Article URLs typically follow `/read/[YYYY]/[MM]/[DD]/[slug]` on both subdomains.
    - **emitennews.com** — Dedicated IDX stock news portal with per-ticker news feeds. Navigate to `https://emitennews.com/` for latest headlines, or use `https://emitennews.com/saham/[TICKER_CODE]` (e.g., `https://emitennews.com/saham/ADRO`) for ticker-specific news. Article URLs typically follow `/news/[slug]` or `/read/[slug]`.
    - **stockwatch.id** — IDX stock market data & news. Navigate to `https://stockwatch.id/` for market news and analysis. Use `https://stockwatch.id/emiten/[TICKER_CODE]` (e.g., `https://stockwatch.id/emiten/ADRO`) for ticker-specific news and financial data. Article URLs typically follow `/news/[slug]` or `/berita/[slug]`.
    - **investor.id** — Investment-focused news & analysis portal. Navigate to `https://investor.id/` for latest market headlines. Use `https://investor.id/search/[query]` for specific tickers/topics. Good for retail investor sentiment and stock picks. Article URLs typically follow `/[category]/[slug]`.
    - **cnbcindonesia.com** — CNBC Indonesia market & business news. Navigate to `https://www.cnbcindonesia.com/market` for latest headlines. Use `https://www.cnbcindonesia.com/search?query=[query]` for specific tickers/topics. **WARNING: Direct article URLs frequently 404** — prefer scraping from the market page or search results, and always verify the URL before including it. Article URLs typically follow `/market/[YYYY]/[MM]/[DD]/[slug]`.

    **International Sources (for global macro/gold/currency):**
    - Yahoo Finance, Reuters, CNBC, Bloomberg, FXStreet, Kitco.

    **Scraping Notes for Indonesian Portals:**
    - These sites may use JavaScript rendering — use `browser_navigate` + `browser_console` with JS extraction for article content.
    - If a direct article URL 404s, fall back to the search result snippet and mark URL as `NOT_FOUND`.
    - For kontan.co.id, prefer the `/read/` or `/news/` path patterns for article links.
    - For katadata.co.id, article URLs typically follow `/news/read/[slug]` or `/analisis/read/[slug]`.
    - For bloombergtechnoz.com, article URLs typically follow `/news/[category]/[slug]`.
    - For bisnis.com (market & ekonomi), article URLs typically follow `/read/[YYYY]/[MM]/[DD]/[slug]`.
    - For investor.id, article URLs typically follow `/[category]/[slug]`.
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

## Related Skills
- For ad-hoc deep research on specific assets (e.g., "give me evidence for SIDO"), use the `asset-research` skill.
