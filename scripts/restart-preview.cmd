@echo off
REM SaintVentures phone preview restarter - double-click this file anytime
REM the preview at http://localhost:8188 stops responding.
title SaintVentures phone preview
cd /d "%~dp0.."
echo Stopping any old preview server...
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -match 'serve-dist' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }" >nul 2>&1
echo Starting fresh preview server...
start /min "" node scripts\serve-dist.js dist 8188
echo.
echo Preview running at http://localhost:8188
echo Phone frame: open phone-preview.html from Temp\opencode in your browser.
timeout /t 4 >nul
