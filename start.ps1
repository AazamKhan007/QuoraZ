# QuoraZ - Gen Z Q&A Platform Startup Script
Write-Host "🚀 Starting QuoraZ - Gen Z Q&A Platform..." -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
npm install

Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green

# Check if MongoDB is running (optional since we're using mock data)
Write-Host "🔍 Checking MongoDB connection..." -ForegroundColor Yellow
try {
    $mongoCheck = mongo --eval "db.adminCommand('ismaster')" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MongoDB not detected - using mock data" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  MongoDB not detected - using mock data" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 QuoraZ is ready to launch!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "1. Backend server: npm run server" -ForegroundColor White
Write-Host "2. Frontend client: npm run client" -ForegroundColor White
Write-Host "3. Both together: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Application will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to start the development server..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Start the development server
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
npm run client