---
name: daily-market-news
description: Daily scrape of material market news and delivery to Telegram.
---

# Daily Market News Workflow

## Trigger
Scheduled daily at 07:00 WIB.
**MANUAL TRIGGER AVAILABLE:** Use `cronjob(action='run', job_id='<job_id>')` to execute immediately for testing or urgent updates.

## Steps
1. **Data Acquisition**: Delegate to Empulso to scrape material news for:
    - IDX Tickers from `master_assets.json` (stocks in LOTS). Load the ticker list dynamically — do NOT hardcode tickers.
    - Global Macro trends affecting Gold and Currencies (GBP, CNY, SGD).
    - **CRITICAL: Every news item must include the DIRECT ARTICLE URL** — the full link to the specific news page (e.g., `https://finance.yahoo.com/news/adro-stock-rises-today-1234567890.html`), NOT a generic domain (`https://finance.yahoo.com`), NOT a quote page (`https://finance.yahoo.com/quote/ADRO.JK/`), and NOT a category page (`https://www.cnbcindonesia.com/market`). If no article URL can be found, mark the source as `"url": "NOT_FOUND"` and do NOT fabricate a URL.
    - **RECENCY RULE: Only include news published within the current quarter (last 90 days).** Anything older is stale and must be discarded. For daily news, prefer items from the last 1-3 days. For weekly analysis, the entire weekly archive should only contain items from the current week. If a search result points to an article older than 90 days, skip it and search again with a date filter.

    ### Google Search Strategy (Two-Phase Approach)

    **Do NOT query per-ticker per-site.** Instead, use a broad search per site, then intersect results with the ticker list.

    **Phase 1 — Broad Google Search per Portal:**
    For each Indonesian portal, run ONE broad Google search (no ticker code):
    ```
    indonesia market news today site:xxx.com
    ```
    Example queries:
    - `indonesia market news today site:kontan.co.id`
    - `indonesia market news today site:bloombergtechnoz.com`
    - `indonesia market news today site:katadata.co.id`
    - `indonesia market news today site:bisnis.com`
    - `indonesia market news today site:emitennews.com`
    - `indonesia market news today site:stockwatch.id`
    - `indonesia market news today site:investor.id`
    - `indonesia market news today site:cnbcindonesia.com`

    **Phase 2 — Ticker Intersection:**
    From the Google search results, extract all article URLs and headlines. Then check which of our tickers appear in each result's title/snippet/URL:
    - **Ticker list**: ADRO, PTBA, AADI, IKBI, RIGS, ASII, UNTR, MYOH, KMDS, SIDO
    - Also match company name variants (e.g., "Alamtri" for ADRO, "Bukit Asam" for PTBA, "Astra" for ASII, "United Tractors" for UNTR, "Telkom" for TLKM, "Sido Muncul" for SIDO)
    - Only keep articles where at least one ticker/company name intersects
    - Discard articles that don't mention any of our tickers

    **For macro/sector news** (not ticker-specific but affects portfolio):
    - Keep articles about: IHSG, rupiah/USD, Bank Indonesia policy, Danantara, commodity export rules, coal/nickel prices, EV policy, interest rates
    - These don't need a ticker match — include if materially relevant

    **International Sources (for global macro/gold/currency):**
    - `gold price today site:kitco.com` or `gold price today site:reuters.com`
    - `oil price today site:reuters.com` or `brent crude today site:bloomberg.com`
    - `rupiah exchange rate today site:reuters.com` or `USD IDR today site:cnbc.com`
    - `GBP USD today site:fxstreet.com` or `CNY USD today site:fxstreet.com`

    **Scraping Notes:**
    - These sites may use JavaScript rendering — use `browser_navigate` + `browser_console` with JS extraction for article content when necessary.
    - If a direct article URL 404s, fall back to the search result snippet and mark URL as `NOT_FOUND`.
    - Do NOT fabricate URLs — if no verifiable article URL can be found, omit the news item.
    - For kontan.co.id, prefer the `/read/` or `/news/` path patterns for article links.
    - For katadata.co.id, article URLs typically follow `/news/read/[slug]` or `/analisis/read/[slug]`.
    - For bloombergtechnoz.com, article URLs typically follow `/news/[category]/[slug]`.
    - For bisnis.com (market & ekonomi), article URLs typically follow `/read/[YYYY]/[MM]/[DD]/[slug]`.
    - For investor.id, article URLs typically follow `/[category]/[slug]`.
    - For cnbcindonesia.com, article URLs typically follow `/market/[YYYY]/[MM]/[DD]/[slug]`. **WARNING: Direct article URLs frequently 404** — always verify before including.
    - **CRITICAL PITFALL: Direct site navigation often triggers bot detection (CAPTCHAs, access blocks). ALWAYS use Google search first, never navigate directly to news sites.**
    - If Google search returns results predominantly older than 90 days, refine with date restrictions (e.g., add `after:2026-03-01` for Q2 2026) or skip that source.
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
- **CRITICAL: Validate that URLs were obtained through reliable methods** — prefer URLs from broad Google search `indonesia market news today site:xxx.com` with ticker intersection, never from direct site navigation.
- **URL Freshness Check:** Spot-check that URLs in today's news section are from the last 1-3 days for daily briefs.
- **Source Diversity Check:** Verify the brief draws from multiple portals (not just cnbcindonesia). If only one source produced results, note this in the brief.

## Related Skills
- For ad-hoc deep research on specific assets (e.g., "give me evidence for SIDO"), use the `asset-research` skill.

## Supporting Documentation
- See `references/url_validation_best_practices.md` for URL validation guidelines
