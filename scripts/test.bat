@echo off
cls
echo ========================================
echo  TESTS - InkBrothers
echo ========================================
echo.

set PROJECT_ROOT=D:\WORK\InkBrothers

echo [1/2] Tests Backend...
cd /d "%PROJECT_ROOT%\backend"
call npm test
set BACKEND_RESULT=%errorlevel%
echo.

echo [2/2] Tests Frontend...
cd /d "%PROJECT_ROOT%\frontend"
call npm test
set FRONTEND_RESULT=%errorlevel%
echo.

cd /d "%PROJECT_ROOT%"

echo ========================================
echo  RESULTATS DES TESTS
echo ========================================
echo.

if %BACKEND_RESULT% equ 0 (
    echo Backend:  [OK]
) else (
    echo Backend:  [ECHEC]
)

if %FRONTEND_RESULT% equ 0 (
    echo Frontend: [OK]
) else (
    echo Frontend: [ECHEC]
)

echo.

if %BACKEND_RESULT% equ 0 if %FRONTEND_RESULT% equ 0 (
    echo ========================================
    echo  TOUS LES TESTS SONT PASSES! ✓
    echo ========================================
) else (
    echo ========================================
    echo  CERTAINS TESTS ONT ECHOUE! ✗
    echo ========================================
)

echo.
pause