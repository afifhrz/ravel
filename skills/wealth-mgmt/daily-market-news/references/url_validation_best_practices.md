# Daily Market News Skill - URL Verification and Best Practices

## URL Validation Guidelines

When scraping news for the daily market brief, every news item MUST include a verifiable direct article URL. Follow these validation steps:

### 1. URL Structure Requirements
Valid article URLs MUST:
- Point to a specific article (not a homepage, category page, or search results page)
- Contain date patterns or article identifiers in the path
- Load successfully when accessed (HTTP 200 status)
- Display the full article content matching the headline/source

### 2. Indonesian News Site URL Patterns
**Valid patterns** (examples):
- kontan.co.id: `/read/`, `/news/`, `/indeks/`, `/analisis/`
- bisnis.com: `/read/[YYYY]/[MM]/[DD]/[slug]` on market.bisnis.com or ekonomi.bisnis.com
- detik.com: `/news/`, `/finance/`, `/[category]/[YYYY]/[MM]/[DD]/[slug]`
- investor.id: `/[category]/[slug]`
- emitennews.com: `/news/[slug]` or `/read/[slug]`
- stockwatch.id: `/news/[slug]` or `/berita/[slug]`

**Invalid patterns** (DO NOT USE):
- Homepage/domain only: `https://www.kontan.co.id`
- Category pages: `https://www.kontan.co.id/market`, `https://www.bisnis.com/market`
- Search results: `https://www.kontan.co.id/search/?q=...`
- Quote pages: `https://finance.yahoo.com/quote/ADRO.JK/`
- Tag pages: `https://www.cnbcindonesia.com/tag/...`
- Author pages: `https://www.kompas.com/penulis/...`

### 3. Verification Process
For each potential news item:
1. Extract the URL from the source
2. Verify it matches a valid article pattern for that site
3. Attempt to access the URL (if possible in your scraping context)
4. Confirm the content matches the headline and is a complete article
5. If verification fails, mark as `url: "NOT_FOUND"` and omit the item

### 4. Common Pitfalls to Avoid
- **Assuming all links on a news site are article links** - many are navigation, ads, or widgets
- **Using section/category page URLs** as if they were article URLs
- **Using search result page URLs** instead of the actual articles they link to
- **Not checking for 404 errors** on cnbcindonesia.com and other sites known for URL rot
- **Using mobile/AMP URLs** when desktop canonical URLs are preferred
- **Including URLs with tracking parameters** that may break or change (clean them when possible)

### 5. Special Notes for Problematic Sites
**CNBC Indonesia (cnbcindonesia.com):**
- Direct article URLs frequently 404
- Preferred approach: Scrape from market page (`/market`) or use search results
- Always verify each URL before including - if uncertain, omit

**Detik.com (detik.com):**
- Some article links may redirect or require JavaScript
- Use browser tools to follow redirects and get final URL
- Verify final URL loads article content

**Bloomberg Indonesia (bloombergtechnoz.com):**
- May require specific user-agent headers
- Check for paywall indicators in scraped content

### 6. URL Cleaning Guidelines
When possible, clean URLs by:
- Removing tracking parameters (`utm_source`, `fbclid`, `igshid`, etc.)
- Removing session IDs
- Converting mobile URLs (`m.site.com`) to desktop when equivalent content exists
- Ensuring consistent use of www/non-www (choose one standard)

### 7. Error Handling
If a URL cannot be verified:
- Do NOT guess or construct a URL
- Do NOT use a homepage/category URL as substitute
- Mark the item with `url: "NOT_FOUND"` in internal data
- Omit unverified items from the final Telegram brief
- Log the failure for debugging but do not deliver uncertain information

## Implementation Example (Pseudocode)
```python
def validate_and_clean_url(raw_url, source_site):
    # 1. Basic validation
    if not raw_url or not raw_url.startswith('http'):
        return None
    
    # 2. Remove obvious tracking parameters
    cleaned = remove_tracking_params(raw_url)
    
    # 3. Check against invalid patterns for this site
    if is_invalid_pattern(cleaned, source_site):
        return None
    
    # 4. Check against valid article patterns
    if not is_valid_article_pattern(cleaned, source_site):
        return None
    
    # 5. If possible, verify by attempting to access
    # (This may be done in a separate verification step)
    
    return cleaned

def is_valid_article_pattern(url, site):
    patterns = {
        'kontan.co.id': ['/read/', '/news/', '/indeks/', '/analisis/'],
        'bisnis.com': ['/read/'],  # Plus date validation for market/ekonomi subdomains
        'detik.com': ['/news/', '/finance/'],
        # ... etc for other sites
    }
    return any(pattern in url for pattern in patterns.get(site, []))
```