Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  DAM FLOOD SIMULATOR — Node.js Express & React System" -ForegroundColor Yellow
Write-Host "  Launching Backend (Port 8080) and Frontend (Port 5173)" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Green

$scriptPath = $PSScriptRoot

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptPath\backend'; node server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptPath\frontend'; npm run dev"

Write-Host ""
Write-Host "Application started!" -ForegroundColor Green
Write-Host "Backend API:  http://localhost:8080" -ForegroundColor White
Write-Host "Frontend Portal: http://localhost:5173" -ForegroundColor White
Write-Host "=================================================================" -ForegroundColor Green
