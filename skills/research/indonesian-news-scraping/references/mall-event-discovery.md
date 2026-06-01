# Indonesian Mall Event Discovery

## Problem

Finding current events at specific Indonesian malls (e.g., 23 Pascal, CIWALK, PVJ, Tenth Avenue) is difficult because:

1. Mall official websites often have expired/inactive domains
2. Social media (Instagram, Facebook, TikTok) requires login
3. Google search blocks automated access
4. News search returns no results for specific mall events

## What Works

**Detik Search**: `https://www.detik.com/search/searchall?query=<mall+name>+event&sortby=time`
- Filter by kanal for regional coverage
- Returns "nothing here" for many malls (events not news-covered)

**Direct Mall Websites**: Only CIWALK (ciwalk.com) confirmed active as of June 2026

## What Doesn't Work

- Google Search → /sorry/ redirect
- Instagram/Facebook/TikTok → login wall
- Mall official sites → DNS failure (most)
- CNN Indonesia/Tempo/Tribunnews → no results or 403

## Workflow

1. Detik search with mall name + "event" + "anak"
2. Direct mall website if active
3. If all fail, tell user to check Instagram Stories or call mall directly
4. Don't spend more than 3-4 calls — if not online, it's not discoverable

## Key Insight

Indonesian malls announce daily events on Instagram Stories (ephemeral), not news sites. News only covers large-scale events.