# Indonesian News Site DOM Selectors

Tested 2026-06-01. Selectors change when sites redesign — update when extraction detik.com

detik.com

## Article Content Extraction

All three of these work; try in order:

```

// Primary

document.querySelector('article')?.innerText

// Backup 1

document.querySelector('.detail__body-text')?.innerText

// Backup 2

document.querySelector('[data-testid="article-body"]')?.innerText

```

## Search Results

```
// Search result links
document.querySelectorAll('article a')

// Result headings
document.querySelectorAll('article h3 a')

```

## Key Observations

- Article content is inside `<article>` tags after successful navigation
- `browser_console` extraction is more reliable than `browser_snapshot` for full text
- Snapshot truncates at ~8000 chars; use JS extraction for complete articles
- Search result pages use `article` elements for each result item

---

## kompas.com

## Tag/Browse Pages

```
// Article cards on tag pages
document.querySelectorAll('article')

// Headings
document.querySelectorAll('article h2 a, article h3 a')

```

## Key Observations

- Direct article URLs from search engines often return 404
- Tag pages (`/tag/<topic>`) are more reliable entry points
- Article bodies extractable via `document.querySelector('article')?.innerText`

---

## antaranews.com

## Tag Pages

```
// Article links on tag pages
document.querySelectorAll('article a')

```

## Key Observations

- Direct article URLs frequently redirect to homepage
- Tag pages (`/tag/<slug>`) are the most reliable access method
- Search within site via parameter: `/search?search=<query>`

---

## cnnindonesia.com / cnbcindonesia.com

## Key Observations

- Both sites have high 404 rates for direct article URLs
- Use Google or other search engines to discover working URLs
- If direct URL fails, go to site homepage and navigate

---

## General Browser Tips for Indonesian News

1. **Always use `browser_console` with JS** — `browser_snapshot` truncates long articles
2. **Wait for page load** — navigate, then before extracting, verify the article title appears in snapshot
3. **Scroll if needed** — some sites lazy-load content below the fold
4. **Anti-bot detection** — Google blocks automated access; go to news sites directly
