# Cron Job `run` Action — Silent Failure Debugging

## Problem
`cronjob(action='run')` returns `success: true` but does NOT actually trigger the job if it recently ran (cooldown period ~1-2 hours). No error is returned.

## Detection
After calling `run`, immediately call `cronjob(action='list')` and verify:
- `last_run_at` updated to current time
- `state` changed from `"scheduled"`
- `next_run_at` pushed forward

## Workaround
If `run` didn't fire, execute the pipeline manually:
1. Read `master_assets.json`, `AGENTS.md`, and the skill file
2. Check if `live_data.json` exists and is recent
3. If markets are closed (weekend/holiday), existing prices are still valid
4. Delegate directly to Rubeeo with full context inline
5. Deliver report to Telegram

## Root Cause
The cron scheduler enforces a cooldown between runs. The `run` API does not override this — it silently no-ops.
