@echo off
echo =================================================================
echo   DAM FLOOD SIMULATOR — Node.js Express & React System
echo   Launching Backend (Port 8080) and Frontend (Port 5173)
echo =================================================================

start "Dam Flood Node Backend" cmd /k "cd /d "%~dp0backend" && node server.js"
start "Dam Flood React Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Application started!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo =================================================================
pause
