---
name: asset-research
description: Ad-hoc deep research on specific portfolio assets — evidence gathering, fundamental analysis, and source verification for buy/sell/hold decisions.
---

# Asset Research Workflow

## Trigger
User asks for evidence, research, or deep analysis on a specific asset (stock, fund, gold, currency) in the portfolio. Examples:
- "Give me evidence for SIDO consumer behavior decline"
- "Research ASII's EV strategy"
- "Is there recent news about ADRO?"
- "Find me data supporting a reallocation out of X"

## Steps

### 1. Define Scope
- Identify the specific asset(s) and the research question
- Determine the **current quarter date range** (e.g., Q2 2026 = April 1 – June 30, 2026)
- If the user asks about a specific claim (e.g., "consumer behavior decline"), focus the search on that specific angle

### 2.5 Quarterly Financial Report Scraping (Mandatory)
**Every research task MUST attempt to download the latest quarterly financial report (laporan keuangan) for each stock being analyzed.** This is the single most important source for fundamental analysis.

**Where to find quarterly reports:**

**A. IDX (Bursa Efek Indonesia) — Primary source**
- URL pattern: `https://www.idx.co.id/en-us/listed-companies/financial-statements-and-annual-reports/`
- Search by ticker code, filter by the most recent quarter
- Reports are published as PDF
- Steps:
  1. Navigate to the IDX financial statements page
  2. Search for the ticker (e.g., `SIDO`, `ASII`)
  3. Filter by the most recent reporting period (e.g., Q1 2026 / "I 2026" / "TW1 2026")
  4. Download the PDF

**B. Company Investor Relations page — Secondary source**
- Search: `<company website>/investor-relations` or `<company website>/investor`
- Known IR pages:
  - Sido Muncul: `https://www.sidomuncul.com/investor-relations`
  - Astra International: `https://www.astra.co.id/investor-relations`
  - Adaro Energy: `https://www.adaroenergy.co.id/investor-relations`
  - Bukit Asam: `https://www.ptba.co.id/investor-relations`
  - United Tractors: `https://www.unitedtractors.com/investor-relations`
  - etc.
- Look for "Laporan Keuangan", "Financial Reports", "Quarterly Results", or "Presentasi Kinerja"

**C. Alternative: KSEI (Scripless) or rt.rapat.co.id**
- `https://www.ksei.co.id` sometimes hosts issuer report PDFs
- Some companies upload to their own portals with direct PDF links

**Download protocol:**
1. Use `curl` or browser to download the PDF to the local reports directory
2. Save path: `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\reports\<TICKER>_<QUARTER>.pdf`
   - Example: `reports/SIDO_Q1_2026.pdf`, `reports/ASII_Q1_2026.pdf`
3. Create the `reports/` directory if it doesn't exist
4. The PDF must be saved locally so Rubeeo can open and read the actual financial data during weekly analysis
5. If the download fails (404, paywall, etc.), note the failure and try the alternative source
6. Record the download result in the evidence output

**What to extract from the PDF (report to user):**
- Revenue (Pendapatan) — current quarter vs same quarter last year
- Net profit (Laba bersih) — current quarter vs same quarter last year
- Key operational metrics (segment breakdown if available)
- Management commentary on outlook
- Any material one-off items or write-downs

**How to extract PDF text:**
- Use `ocr-and-documents` skill (pymupdf/marker-pdf) for text extraction
- Key Indonesian financial terms: "Pendapatan" (Revenue), "Laba Bersih" (Net Profit), "Laba per Saham" (EPS), "Arus Kas" (Cash Flow), "Laporan Laba Rugi" (Income Statement), "Neraca" (Balance Sheet)
- Focus on the consolidated financial statements (Keuangan Konsolidasian) section

**Important IDX notes:**
- IDX uses Roman numerals for quarters: "I" = Q1, "II" = Q2, "III" = Q3, "IV" = Q4 / annual
- Reporting lag: companies have up to 3 months after quarter-end to file (Q1 report due end of April)
- The IDX page may require navigating through multiple links to find the actual PDF
- If IDX navigation fails, try: `https://www.idx.co.id/StaticData/ListedCompanies/Corporate_Actions/Report/pdf/<YEAR>/<TICKER>.pdf` or similar direct patterns

### 2. Search Strategy (Browser-Based)
**Do NOT rely solely on delegate_task for research** — subagents frequently timeout or return empty results. Use the browser directly.

**Primary sources for Indonesian stocks:**
- **CNBC Indonesia search:** `https://www.cnbcindonesia.com/search?query=<ticker>+<topic>&p=1`
  - Works well, returns full article listings with dates
  - Click individual articles to get direct URLs and full text
- **Yahoo Finance:** `https://finance.yahoo.com/quote/<TICKER>.JK/`
  - For live price data, key statistics (PE, EPS, 52-week range, dividend yield)
  - News tab for recent headlines
- **Bing:** `https://www.bing.com/search?q="<ticker>"+<topic>+2026&freshness=Month`
  - Fallback when CNBC Indonesia doesn't have coverage

**Search query patterns:**
- `"<ticker>" <topic> 2026` — always include the year
- `<company name> kinerja keuangan 2026` — Indonesian language for financial performance
- `<company name> <topic> Q2 2026` — quarter-specific

### 3. URL Precision Rules
- **Only use DIRECT ARTICLE URLs** — the full link to the specific news page
- ✅ `https://www.cnbcindonesia.com/market/20260331145802-17-722832/bos-sido-tanggapi-konten-negatif`
- ❌ `https://www.cnbcindonesia.com/market` (category page)
- ❌ `https://finance.yahoo.com` (homepage)
- ❌ `https://finance.yahoo.com/quote/SIDO.JK/` (quote page, not an article)
- If no direct article URL can be found, state "No specific article URL found" — never fabricate

### 4. Recency Rules
- **Only use articles published within the current quarter (last 90 days)**
- Anything older is stale and must be discarded
- If search results only return articles older than 90 days, state "No recent coverage found for <asset> on <topic>" rather than using outdated material
- Always check the article's publication date before citing it

### 5. Evidence Format
For each piece of evidence, provide:
- **Direct URL** to the specific article
- **Title** of the article
- **Publication date**
- **1-2 sentence summary** of the relevant finding
- **Why it matters** for the portfolio decision

### 6. Quarterly Financial Report Status
- State whether the latest quarterly report was found and downloaded
- If downloaded: provide the local file path and key findings (revenue, net profit, YoY comparison)
- If not found: state which sources were tried and why it failed
- Quarterly report data takes priority over news articles for fundamental analysis

### 7. Honest Assessment
- If the evidence is weak or inconclusive, say so explicitly
- Distinguish between **confirmed facts** (from articles) and **inferences** (your interpretation)
- If no recent evidence exists, state: "No recent fundamental data — current recommendation based on price action only"

## Pitfalls
- **Subagent timeout:** Research subagents frequently timeout (600s) or return empty results. Use browser directly for reliability.
- **Stale results:** Search engines often return old articles. Always verify the publication date on the article page itself, not just the search snippet.
- **CNBC Indonesia URL structure:** Article URLs follow the pattern `/<channel>/<YYYYMMDDHHMMSS>-<id>-<slug>`. The search result page shows relative links — you must click through to get the full URL.
- **Yahoo Finance news:** The news tab on Yahoo Finance often shows generic/irrelevant headlines. CNBC Indonesia is more reliable for Indonesia-specific stock news.
- **Bing stealth mode:** Bing may not render search results in the accessibility tree. Use CNBC Indonesia or Yahoo Finance as primary sources.

## Output Format
Present findings as:

**Evidence for <Asset> — <Topic>**

1. 📰 **<Article Title>**
   🔗 <direct URL>
   📅 <date>
   <1-2 sentence summary>
   **Relevance:** <why this matters>

**Assessment:** <honest summary of what the evidence supports and what it doesn't>

## Reference
- For Indonesian news source URLs, financial report sources, and IR page patterns, see: `references/indonesian-news-sources.md`
- For PDF text extraction, use the `ocr-and-documents` skill (pymupdf/marker-pdf)
