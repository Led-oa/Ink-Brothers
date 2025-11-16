@echo off
cls
echo ========================================
echo  SERVEURS DE DEVELOPPEMENT - InkBrothers
echo ========================================
echo.

set PROJECT_ROOT=D:\WORK\InkBrothers

REM Vérifier l'existence des dossiers
if not exist "%PROJECT_ROOT%\backend" (
    echo ERREUR: Dossier backend non trouve!
    pause
    exit /b 1
)
if not exist "%PROJECT_ROOT%\frontend" (
    echo ERREUR: Dossier frontend non trouve!
    pause
    exit /b 1
)

echo Demarrage des serveurs...
echo.
echo Backend API: http://localhost:3000
echo Frontend Dev: http://localhost:5173
echo.
echo Appuyez sur Ctrl+C dans chaque fenetre pour arreter.
echo.

REM Démarrer le backend
start "InkBrothers - Backend" cmd /k "cd /d %PROJECT_ROOT%\backend && npm run dev"

REM Attendre 2 secondes avant de démarrer le frontend
timeout /t 2 /nobreak >nul

REM Démarrer le frontend
start "InkBrothers - Frontend" cmd /k "cd /d %PROJECT_ROOT%\frontend && npm run dev"

echo.
echo ========================================
echo  SERVEURS DEMARRES!
echo ========================================
echo.
echo Deux fenetres ont ete ouvertes:
echo - Backend (Node.js/Express)
echo - Frontend (Vue.js/Vite)
echo.
echo Fermez les fenetres pour arreter les serveurs.
echo.
pause