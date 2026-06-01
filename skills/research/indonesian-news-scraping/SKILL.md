---
name: indonesian-news-scraping
description: Scrape and extract article content from major Indonesian news websites (detik.com, kompas.com, antaranews.com, cnnindonesia.com, cnbcindonesia.com) using browser tools. Use when the user asks for Indonesian news content, summaries of Indonesian media coverage, or current events from Indonesian sources.
---

# Indonesian News Scraping

## Strategy

Indonesian news sites are heavily JavaScript-rendered and often resist direct URL navigation. Use this multi-site approach:

### 1. Search First, Navigate Second

Most Indonesian news sites have working search even when direct article URLs fail:

- **detik.com**: `https://www.detik.com/search/searchall?query=<keywords>` — most reliable search
- **kompas.com**: `https://www.kompas.com/tag/<topic>` or search via `https://search.kompas.com/search/?q=<keywords>`
- **antaranews.com**: `https://www.antaranews.com/tag/<tag-slug>`

### 2. Extract Article Content via JavaScript

After navigating to an article page, extract content using `browser_console`:

```javascript
document.querySelector('article')?.innerText
  || document.querySelector('.detail__body-text')?.innerText
  || document.querySelector('[data-testid="article-body"]')?.innerText
  || 'Not found'
```

### 3. Site-Specific Notes

See `references/dom-selectors.md` for detailed DOM selectors and extraction patterns per site.

| Site | Search URL | Article Selector | Notes |
|------|-----------|-----------------|-------|
| detik.com | `/search/searchall?query=` | `article` or `.detail__body-text` | Most reliable. Search results link directly to articles. |
| kompas.com | `/tag/<topic>` | `article` | Tag pages work well. Direct article URLs often 404. |
| antaranews.com | `/tag/<slug>` | `article` | Tag pages list articles. Direct URLs may redirect to homepage. |
| cnnindonesia.com | — | — | URLs frequently 404. Use search engines to find working URLs. |
| cnbcindonesia.com | — | — | URLs frequently 404. Use search engines to find working URLs. |

### 4. Fallback Pattern

When direct navigation fails:
1. Try the site's search or tag pages
2. Click on search result links
3. If all else fails, use `browser_navigate` to the site homepage and navigate manually

### 5. Google Blocked?

Google search may block automated access. If so, go directly to the news site's search/tag pages instead of using Google.

## Output Format

When summarizing Indonesian news for the user:
- Use **Indonesian language** for the summary (unless user requests otherwise)
- Include **source URLs** for each article referenced
- Use bullet points for key takeaways
- Bold key terms and quotes
