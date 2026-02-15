# Complete Docker Setup and Test Script
# This script handles setup, testing, and troubleshooting

$ErrorActionPreference = "Continue"

function Write-Step {
    param($Message)
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
}

function Test-CategoryAPI {
    param($TestName, $Attempt = 1)
    
    Write-Host "Testing API (Attempt $Attempt)..." -ForegroundColor Yellow
    
    $body = @{
        name = "$TestName"
        slug = $TestName.ToLower() -replace '\s+', '-'
    } | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/categories" `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -UseBasicParsing `
            -TimeoutSec 10
        
        Write-Host "✅ Status Code: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "✅ Response: $($response.Content)" -ForegroundColor Green
        
        if ($response.StatusCode -eq 201) {
            Write-Host "`n🎉 SUCCESS! Category '$TestName' created successfully!" -ForegroundColor Green
            return $true
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ Status Code: $statusCode" -ForegroundColor Red
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        
        if ($statusCode -eq 500) {
            Write-Host "`n⚠️  Got 500 error - likely hot reload issue" -ForegroundColor Yellow
            return $false
        }
        elseif ($statusCode -eq 409) {
            Write-Host "`n⚠️  Category already exists - this is OK!" -ForegroundColor Yellow
            return $true
        }
    }
    
    return $false
}

# Step 1: Check Docker containers
Write-Step "STEP 1: Checking Docker Containers"
docker compose -f docker-compose.dev.yml ps

# Step 2: Check if containers are running
Write-Step "STEP 2: Verifying Container Health"
$appRunning = docker inspect -f '{{.State.Running}}' next-dev 2>$null
$dbRunning = docker inspect -f '{{.State.Running}}' postgres-db-dev 2>$null

if ($appRunning -ne "true" -or $dbRunning -ne "true") {
    Write-Host "⚠️  Containers not running properly. Starting them..." -ForegroundColor Yellow
    docker compose -f docker-compose.dev.yml up -d
    Write-Host "Waiting 10 seconds for containers to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

# Step 3: Run migrations
Write-Step "STEP 3: Running Prisma Migrations"
docker exec next-dev npx prisma migrate deploy

# Step 4: Generate Prisma Client
Write-Step "STEP 4: Generating Prisma Client"
docker exec next-dev npx prisma generate

# Step 5: Wait for app to be ready
Write-Step "STEP 5: Waiting for Next.js App to be Ready"
Write-Host "Waiting 15 seconds for app to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Step 6: First API Test
Write-Step "STEP 6: Testing API Endpoint (First Attempt)"
$testPassed = Test-CategoryAPI -TestName "Technology" -Attempt 1

# Step 7: Handle 500 error with restart
if (-not $testPassed) {
    Write-Step "STEP 7: Restarting Containers (Hot Reload Fix)"
    Write-Host "Stopping containers..." -ForegroundColor Yellow
    docker compose -f docker-compose.dev.yml down
    
    Write-Host "Starting containers..." -ForegroundColor Yellow
    docker compose -f docker-compose.dev.yml up -d
    
    Write-Host "Waiting 20 seconds for full startup..." -ForegroundColor Yellow
    Start-Sleep -Seconds 20
    
    Write-Host "Running migrations again..." -ForegroundColor Yellow
    docker exec next-dev npx prisma migrate deploy
    docker exec next-dev npx prisma generate
    
    Write-Host "Waiting 10 more seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    # Test again
    Write-Step "STEP 8: Testing API Endpoint (Second Attempt)"
    $testPassed = Test-CategoryAPI -TestName "Programming" -Attempt 2
}

# Final Results
Write-Step "FINAL RESULTS"

if ($testPassed) {
    Write-Host "✅✅✅ ALL TESTS PASSED! ✅✅✅" -ForegroundColor Green
    Write-Host "`nYour Docker setup is working correctly!" -ForegroundColor Green
    Write-Host "Database connection: OK" -ForegroundColor Green
    Write-Host "API endpoint: OK" -ForegroundColor Green
    Write-Host "Category creation: OK" -ForegroundColor Green
    
    Write-Host "`n📊 You can view your database with Prisma Studio:" -ForegroundColor Cyan
    Write-Host "   Run: docker exec -it next-dev npx prisma studio" -ForegroundColor White
    Write-Host "   Then open: http://localhost:5555" -ForegroundColor White
    
    Write-Host "`n🔍 Or access PostgreSQL directly:" -ForegroundColor Cyan
    Write-Host "   Run: docker exec -it postgres-db-dev psql -U postgres -d mydb" -ForegroundColor White
    Write-Host "   Then: SELECT * FROM ""Category"";" -ForegroundColor White
}
else {
    Write-Host "❌ TESTS FAILED" -ForegroundColor Red
    Write-Host "`nPlease check the logs:" -ForegroundColor Yellow
    Write-Host "   docker logs next-dev" -ForegroundColor White
    Write-Host "   docker logs postgres-db-dev" -ForegroundColor White
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
