# Indonesian News Sources + Financial Report Sources for Asset Research

## CNBC Indonesia
- **Search URL:** `https://www.cnbcindonesia.com/search?query=<query>&p=1`
- **Article URL pattern:** `/<channel>/<YYYYMMDDHHMMSS>-<numeric-id>-<slug>`
  - Example: `/market/20260331145802-17-722832/bos-sido-tanggapi-konten-negatif-yang-muncul-di-media-sosial`
- **Works well for:** Indonesian stock-specific news, market analysis, company financials
- **Language:** Indonesian
- **Date format on articles:** DD Month YYYY HH:MM (e.g., "31 March 2026 15:12")
- **Tip:** Click the article link from search results to get the full URL. The search page shows relative links.

## Yahoo Finance
- **Quote URL:** `https://finance.yahoo.com/quote/<TICKER>.JK/`
- **News tab:** `https://finance.yahoo.com/quote/<TICKER>.JK/news/`
- **Works well for:** Live price data, key statistics (PE, EPS, 52-week range, dividend yield, market cap)
- **Language:** English
- **Tip:** The news tab often shows generic/irrelevant headlines. Better for price data than news.

## Bing
- **Search URL:** `https://www.bing.com/search?q="<ticker>"+<topic>+2026&freshness=Month`
- **Works well as:** Fallback when CNBC Indonesia doesn't have coverage
- **Tip:** May not render results in accessibility tree. Use browser_vision if snapshot is empty.

## Detik Finance
- **Search URL:** `https://finance.detik.com/search?query=<query>`
- **Works well for:** Indonesian financial news, earnings reports
- **Language:** Indonesian

## Katadata
- **Search URL:** `https://www.katadata.co.id/search?q=<query>`
- **Works well for:** Data-driven business analysis, market research
- **Language:** Indonesian

---

## Quarterly Financial Reports (Laporan Keuangan)

### IDX (Bursa Efek Indonesia) — Primary Source
- **Financial Statements page:** `https://www.idx.co.id/en-us/listed-companies/financial-statements-and-annual-reports/`
- **How to navigate:**
  1. Go to the URL above
  2. Use the search/filter to find the company by ticker code
  3. Select the most recent quarter (Q1/I, Q2/II, Q3/III, or Annual/IV)
  4. Download the PDF
- **Quarter notation:** IDX uses Roman numerals — "I" = Q1, "II" = Q2, "III" = Q3, "IV" = Annual
- **Reporting deadline:** Companies must file within 3 months after quarter-end (Q1 due end of April, Q2 end of July, Q3 end of October)
- **Tip:** The IDX page links through to the company's announcement on the IDX notification system. You may need to click through to find the actual PDF link.

### Company Investor Relations — Secondary Source
- **General pattern:** `https://www.<company-domain>.co.id/investor-relations` or `/investor`
- **Known IR pages:**
  - Sido Muncul: `https://www.sidomuncul.com/investor-relations`
  - Astra International: `https://www.astra.co.id/investor-relations`
  - Adaro Energy: `https://www.adaroenergy.co.id/investor-relations`
  - Bukit Asam: `https://www.ptba.co.id/investor-relations`
  - United Tractors: `https://www.unitedtractors.com/investor-relations`
  - Alamtri Resources (ADRO): `https://www.alamtri.com/investor-relations`
- **Look for:** "Laporan Keuangan", "Financial Reports", "Quarterly Results", "Presentasi Kinerja", "Earnings Presentation"
- **Tip:** Companies often publish a PDF of the earnings presentation alongside the audited financial statements. The presentation usually has better visual summaries.

### KSEI
- **URL:** `https://www.ksei.co.id`
- **Works well for:** Some issuer reports are hosted here alongside corporate actions

### Downloaded Report Storage
- **Save path:** `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\reports\<TICKER>_<QUARTER>.pdf`
- **Examples:**
  - `reports/SIDO_Q1_2026.pdf`
  - `reports/ASII_Q1_2026.pdf`
  - `reports/ADRO_Q4_2025.pdf`
- This directory is where Rubeeo expects to find PDFs during weekly analysis
