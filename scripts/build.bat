@echo off
cls
echo ========================================
echo  BUILD ET DEPLOIEMENT - InkBrothers
echo ========================================
echo.

REM Configuration des chemins
set PROJECT_ROOT=D:\WORK\InkBrothers
set NGINX_PATH=C:\Developpement\server_ink
set NGINX_HTML=%NGINX_PATH%\html\dist

REM Vérifier que nous sommes dans le bon dossier
if not exist "%PROJECT_ROOT%\frontend" (
    echo ERREUR: Dossier frontend non trouve!
    echo Verifiez que vous etes dans: %PROJECT_ROOT%
    pause
    exit /b 1
)

echo Projet: %PROJECT_ROOT%
echo Nginx: %NGINX_PATH%
echo.

echo [1/4] Nettoyage des anciens builds...
if exist "%PROJECT_ROOT%\frontend\dist" (
    rmdir /s /q "%PROJECT_ROOT%\frontend\dist"
    echo      - Build frontend supprime
)
if exist "%NGINX_HTML%" (
    rmdir /s /q "%NGINX_HTML%"
    echo      - Fichiers Nginx supprimes
)
echo      Done!
echo.

echo [2/4] Installation des dependances frontend...
cd /d "%PROJECT_ROOT%\frontend"
call npm install
if errorlevel 1 (
    echo ERREUR: Installation des dependances echouee!
    pause
    exit /b 1
)
echo      Done!
echo.

echo [3/4] Build du frontend Vue.js...
call npm run build
if errorlevel 1 (
    echo ERREUR: Build echoue!
    cd /d "%PROJECT_ROOT%"
    pause
    exit /b 1
)
echo      Done!
echo.

echo [4/4] Copie vers Nginx (%NGINX_HTML%)...
if not exist "%NGINX_PATH%" (
    echo ERREUR: Nginx non trouve dans %NGINX_PATH%
    echo Verifiez que Nginx est bien installe.
    pause
    exit /b 1
)

REM Créer le dossier de destination s'il n'existe pas
if not exist "%NGINX_HTML%" (
    mkdir "%NGINX_HTML%"
)

REM Copier tous les fichiers du build
xcopy /E /I /Y "%PROJECT_ROOT%\frontend\dist\*" "%NGINX_HTML%\"
if errorlevel 1 (
    echo ERREUR: Copie vers Nginx echouee!
    pause
    exit /b 1
)
echo      Done!
echo.

echo [5/5] Redemarrage de Nginx...
cd /d "%NGINX_PATH%"

REM Tester la configuration
nginx -t
if errorlevel 1 (
    echo ATTENTION: Configuration Nginx invalide!
    echo Verifiez le fichier nginx.conf
    pause
)

REM Recharger Nginx
nginx -s reload
if errorlevel 1 (
    echo INFO: Nginx n'est peut-etre pas demarre.
    echo Tentative de demarrage...
    start nginx
    timeout /t 2 /nobreak >nul
)
echo      Done!
echo.

cd /d "%PROJECT_ROOT%"

echo ========================================
echo  DEPLOIEMENT TERMINE AVEC SUCCES!
echo ========================================
echo.
echo Frontend disponible sur: http://localhost
echo Backend disponible sur: http://localhost/api
echo.
echo Fichiers deployes dans: %NGINX_HTML%
echo.
pause