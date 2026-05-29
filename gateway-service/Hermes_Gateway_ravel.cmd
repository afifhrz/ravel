@echo off
rem Hermes Agent Gateway - Messaging Platform Integration
cd /d C:\Users\afifs\AppData\Local\hermes\hermes-agent
set "HERMES_HOME=C:\Users\afifs\AppData\Local\hermes\profiles\ravel"
set "PYTHONIOENCODING=utf-8"
set "HERMES_GATEWAY_DETACHED=1"
set "VIRTUAL_ENV=C:\Users\afifs\AppData\Local\hermes\hermes-agent\venv"
C:\Users\afifs\AppData\Local\hermes\hermes-agent\venv\Scripts\pythonw.exe -m hermes_cli.main --profile ravel gateway run
exit /b 0
