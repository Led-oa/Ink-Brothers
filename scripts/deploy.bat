@echo off
cls
echo ========================================
echo  DEPLOIEMENT PRODUCTION - InkBrothers
echo ========================================
echo.

set PROJECT_ROOT=D:\WORK\InkBrothers
set NGINX_PATH=C:\Developpement\server_ink

echo ATTENTION: Ce script va deployer en production!
echo.
echo Etapes:
echo 1. Tests
echo 2. Build
echo 3. Deploiement vers Nginx
echo 4. Redemarrage des services
echo.
set /p CONFIRM=Continuer? (O/N): 

if /i not "%CONFIRM%"=="O" (
    echo Deploiement annule.
    pause
    exit /b 0
)

echo.
echo [1/4] Execution des tests...
cd /d "%PROJECT_ROOT%"
call scripts\test.bat
if errorlevel 1 (
    echo.
    echo ERREUR: Les tests ont echoue!
    echo Deploiement annule pour des raisons de securite.
    pause
    exit /b 1
)

echo.
echo [2/4] Build de l'application...
call scripts\build.bat
if errorlevel 1 (
    echo ERREUR: Build echoue!
    pause
    exit /b 1
)

echo.
echo [3/4] Verification Nginx...
cd /d "%NGINX_PATH%"
nginx -t
if errorlevel 1 (
    echo ERREUR: Configuration Nginx invalide!
    pause
    exit /b 1
)

echo.
echo [4/4] Demarrage Backend en production...
cd /d "%PROJECT_ROOT%\backend"

REM Vérifier si PM2 est installé
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo INFO: PM2 non detecte. Demarrage normal...
    start "InkBrothers - Backend Production" cmd /k "npm start"
) else (
    echo INFO: Demarrage avec PM2...
    pm2 delete inkbrothers 2>nul
    pm2 start src\server.js --name inkbrothers
    pm2 save
)

cd /d "%PROJECT_ROOT%"

echo.
echo ========================================
echo  DEPLOIEMENT TERMINE!
echo ========================================
echo.
echo Application disponible sur: http://localhost
echo.
pause