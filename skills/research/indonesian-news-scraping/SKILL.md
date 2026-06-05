---
name: indonesian-news-scraping
description: Scrape and extract article content from major Indonesian news websites (detik.com, kompas.com, antaranews.com, cnnindonesia.com, cnbcindonesia.com) using browser tools. Use when the user asks for Indonesian news content, summaries of Indonesian media coverage, or current events from Indonesian sources.
---

# Indonesian News Scraping

## Strategy

Indonesian news sites are heavily JavaScript-rendered and often resist direct URL navigation. Use this multi-site approach:

### 1. Search First, Navigate Second (User Preference: Start with Google)

**User preference confirmed**: Begin with Google search for news discovery, then navigate to identified sources. This approach successfully found Kontan.co.id as a reliable source for market news.

Most Indonesian news sites have working search even when direct article URLs fail:

- **Google Search**: Start here for broad discovery (e.g., "Berita pasar Indonesia hari ini")
- **detik.com**: `https://www.detik.com/search/searchall?query=<keywords>` — most reliable search
- **kompas.com**: `https://www.kompas.com/tag/<topic>` or search via `https://search.kompas.com/search/?q=<keywords>`
- **antaranews.com**: `https://www.antaranews.com/tag/<tag-slug>`

### 2. Source Selection for Market News

For **market/financial news specifically**, prioritize:
- **kontan.co.id** - Most reliable for Indonesian market/finance news (user-validated)
- **detikFinance** section of detik.com
- **bisnis.com** (market and economy sections)

### 3. Extract Article Content via JavaScript

After navigating to an article page, extract content using `browser_console`:

```javascript
document.querySelector('article')?.innerText
  || document.querySelector('.detail__body-text')?.innerText
  || document.querySelector('[data-testid="article-body"]')?.innerText
  || 'Not found'
```

**Session-discovered technique**: For listing pages, use:
```javascript
Array.from(document.querySelectorAll('article, .media__title, .title, h2, h3')).map(el => {
  var link = el.closest('a') || (el.tagName === 'A' ? el : el.querySelector('a'));
  if (link && link.href) {
    return {title: el.innerText.trim(), link: link.href};
  }
}).filter(Boolean);
```

### 4. Site-Specific Notes

See `references/dom-selectors.md` for detailed DOM selectors and extraction patterns per site.

| Site | Search URL | Article Selector | Notes |
|------|-----------|-----------------|-------|
| detik.com | `/search/searchall?query=` | `article` or `.detail__body-text` | Most reliable. Search results link directly to articles. |
| kompas.com | `/tag/<topic>` | `article` | Tag pages work well. Direct article URLs often 404. |
| antaranews.com | `/tag/<slug>` | `article` | Tag pages list articles. Direct URLs may redirect to homepage. |
| kontan.co.id | Site search or section navigation | `article` or `.detail__body-text` | Highly reliable for market/finance news. Clean article structures. |
| cnnindonesia.com | — | — | URLs frequently 404. Use search engines to find working URLs. |
| cnbcindonesia.com | — | — | URLs frequently 404. Use search engines to find working URLs. |

### 5. Critical Pitfalls (Session Learned)

- **URL Verification Required**: Always verify article URLs before navigation as cnbcindonesia.com, kompas.com, and similar sites frequently return 404 for direct links
- **Detik.com Specific**: Article pages often have complex JavaScript rendering; prefer search results which link to stable article URLs
- **Kontan.co.id Advantage**: Provides cleaner article listings with consistent patterns - ideal for market news scraping
- **Google Blocking**: Automated Google searches may trigger CAPTCHAs or blocking; have fallback to direct site search ready

### 6. Fallback Pattern

When direct navigation fails:
1. Try the site's search or tag pages
2. Click on search result links
3. If all else fails, use `browser_navigate` to the site homepage and navigate manually

### 7. Google Blocked?

Google search may block automated access. If so, go directly to the news site's search/tag pages instead of using Google.

## Output Format

When summarizing Indonesian news for the user:
- Use **Indonesian language** for the summary (unless user requests otherwise)
- Include **source URLs** for each article referenced
- Use bullet points for key takeaways
- Bold key terms and quotes
