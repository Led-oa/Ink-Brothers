@echo off
setlocal

set NGINX_PATH=C:\Developpement\server_ink

REM Tuer tous les processus nginx existants
taskkill /F /IM nginx.exe >NUL 2>&1

REM Attendre un peu
timeout /t 1 /nobreak >nul

REM Démarrer nginx en mode foreground pour PM2
cd /d "%NGINX_PATH%"
nginx.exe -g "daemon off;"