# Himalaya Email Sending Reference

## Config Location
`~/.config/himalaya/config.toml`

## Current Account: Gmail
- **From**: `afif.sclit@gmail.com`
- **To**: `ahmadafif.hariz@gmail.com`
- **SMTP**: `smtp.gmail.com:465` (TLS)
- **IMAP**: `imap.gmail.com:993` (TLS)

## Sending a Report with Attachment

### Step 1: Build MIME message with attachment

Use Python (execute_code) to build the MIME message:

```python
import base64

report_path = r"C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\strategic_analysis_v2.md"
output_path = r"C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\market_data\email_mime.txt"

with open(report_path, "rb") as f:
    report_content = f.read()

b64_content = base64.b64encode(report_content).decode("utf-8")

boundary = "----=_Part_OWL_" + datetime.now().strftime("%Y%m%d")

lines = [
    "From: OWL Wealth Reports <afif.sclit@gmail.com>",
    "To: ahmadafif.hariz@gmail.com",
    "Subject: Weekly Wealth Analysis Report — [DATE]",
    f'Content-Type: multipart/mixed; boundary="{boundary}"',
    "MIME-Version: 1.0",
    "",
    f"--{boundary}",
    "Content-Type: text/plain; charset=utf-8",
    "",
    "[Summary text here]",
    "",
    f"--{boundary}",
    'Content-Type: text/plain; charset=utf-8; name="strategic_analysis_v2.md"',
    'Content-Disposition: attachment; filename="strategic_analysis_v2.md"',
    "Content-Transfer-Encoding: base64",
    "",
]

for i in range(0, len(b64_content), 76):
    lines.append(b64_content[i:i+76])

lines.append(f"--{boundary}--")
lines.append("")

with open(output_path, "w") as f:
    f.write("\r\n".join(lines))
```

### Step 2: Send via Himalaya

```bash
export PATH="/c/Users/afifs/AppData/Local/hermes/profiles/ravel/home/.local/bin:$PATH"
cat [output_path] | himalaya.exe message send --
```

### Expected output:
`Message successfully sent!`

### Common errors:
- `550 SPAM` — Wrong SMTP config or unauthorized sender. Use Gmail account with App Password.
- `cannot parse MML body` — Don't use MML `<#part>` tags with `template send`. Build raw MIME manually and use `message send` instead.
- `No Such User Here` — Wrong recipient email or SMTP server rejects external domain.
- `authentication failed` — IMAP password wrong. Note: `message send` only needs SMTP, but himalaya requires IMAP config too even if unused.
