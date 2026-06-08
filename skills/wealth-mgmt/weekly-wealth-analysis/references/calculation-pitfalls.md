# Calculation Pitfalls — Weekly Wealth Analysis

## Lot-to-Share Conversion
**WRONG**: `market_value = lots × 100 × 100 × price` (doubled the multiplier)
**RIGHT**: `market_value = lots × 100 × price`

The master asset file stores quantities in LOTS. 1 lot = 100 shares.

## Mutual Fund P&L
**WRONG**: Treating mutual funds as flat/at NAV with Rp0 P&L
**RIGHT**: `P&L = (current_nav - avg_nav) × units`

- Cost basis = `units × avg_nav`
- Market value = `units × current_nav`

## Currency P&L
**WRONG**: Using old `market_value` field from master_assets.json
**RIGHT**: `P&L = (current_nav - avg_nav) × units`

## Gold P&L
**WRONG**: Using a single average cost for all gold lots
**RIGHT**: Calculate P&L per lot based on individual buy prices, then sum

## Verification Checklist (June 2026 baseline)
- Stock market value: ~Rp72.9M (not Rp146M)
- Mutual fund P&L: ~+Rp6.4M (not Rp0)
- Total portfolio: ~Rp238M (not Rp304M)
- Total P&L: ~+Rp24M (not −Rp3M)
- Blended dividend yield: ~9.3%
- Annual dividend income: ~Rp6.8M
