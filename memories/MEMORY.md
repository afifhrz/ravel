User wants to test the full pipeline: empulso scrapes stock data → rubeeo does deep analysis → report sent to user.
§
After empulso + rubeeo pipeline completes, Ravel (main agent) must send the summarized report to Telegram. This is the primary delivery channel.
§
Portfolio Pipeline V2: 
1. Empulso: Scrapes live data + market news. News $\rightarrow$ Ravel $\rightarrow$ Telegram.
2. Rubeeo: Long-term fundamental analysis of master_assets.json (Stocks in LOTS, Mutual Funds, Gold, Currency). Integrates news into asset reallocation advice.
3. Ravel: Delivers both News and Analysis to Telegram.
Asset Master File: C:\Users\afifs\market_data\master_assets.json
§
Wealth Management System Path: C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data. This contains master_assets.json, AGENTS.md, and the portfolio pipeline files.
§
Delivery: Email via Himalaya preferred. Telegram MEDIA unreliable for file attachments.
News must include clickable URLs for every item.
§
TalentForge CV: pre-extracted text at C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\talent_forge\cv_text.txt. Primary source for subagent — faster than PDF extraction. Fallback to GDrive PDF if missing.
§
D: drive MSYS path is /d/ not D:/. Use /d/ prefix for all D: drive access. Terminal with bash/MSYS converts D: to /d/.
§
Cron job `run` cooldown: `cronjob(action='run')` silently does NOT trigger a run if the job recently completed (~1-2hr cooldown). Returns `success: true` but job stays "scheduled" and `last_run_at` unchanged. No error. Workaround: execute pipeline manually as main agent, or wait for cooldown.
§
Email Delivery (ACTIVE):
- From: afif.sclit@gmail.com | To: ahmadafif.hariz@gmail.com
- SMTP: smtp.gmail.com:465 TLS | IMAP: imap.gmail.com:993 TLS
- Config: ~/.config/himalaya/config.toml (account: gmail)
- Method: Python base64 → MIME temp file → `himalaya.exe message send --`
- OLD harizcorp config DEPRECATED (SMTP blocked external delivery)