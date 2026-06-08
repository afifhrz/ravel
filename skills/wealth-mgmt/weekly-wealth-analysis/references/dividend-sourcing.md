# Yahoo Finance Dividend Sourcing — Lessons Learned

## Problem
`browser_console` JS extraction returns `null` on Yahoo Finance pages for complex expressions.

## What Works
- **`browser_navigate`** → returns compact accessibility tree with key data
- **`browser_snapshot`** → returns full page content including quote statistics
- The snapshot contains "Forward Dividend & Yield" and "Ex-Dividend Date"

## What Doesn't Work
- `browser_console` with JS (returns `null` on Yahoo Finance)
- Direct Yahoo Finance API (returns 401 Unauthorized)
- Investing.com (blocked by Cloudflare)

## Technique
1. Navigate to `https://finance.yahoo.com/quote/TICKER.JK/`
2. Use `browser_snapshot` (full=false)
3. Find "Forward Dividend & Yield" line — value is on the next line
4. Find "Ex-Dividend Date" line — value is on the next line

## Alternative Sources
- Company IDX filings (reliable but slower)
- Manual user input (most reliable for dividend data)
