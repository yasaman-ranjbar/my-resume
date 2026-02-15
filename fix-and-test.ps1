# Fix and Test Script - Rebuilds Docker with Prisma fix

Write-Host "=== FIXING PRISMA CLIENT ISSUE ===" -ForegroundColor Cyan
Write-Host "Stopping containers..." -ForegroundColor Yellow
docker compose -f docker-compose.dev.yml down

Write-Host "`nRebuilding containers with Prisma fix..." -ForegroundColor Yellow
docker compose -f docker-compose.dev.yml up -d --build

Write-Host "`nWaiting 15 seconds for containers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host "`n=== Running database migration ===" -ForegroundColor Cyan
docker exec next-dev npx prisma migrate deploy

Write-Host "`nWaiting 10 seconds for app to be fully ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "`n=== Testing API Endpoint ===" -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/categories" `
        -Method POST `
        -Body (@{name="Technology"; slug="technology"} | ConvertTo-Json) `
        -ContentType "application/json" `
        -StatusCodeVariable statusCode

    Write-Host "`n✅✅✅ SUCCESS! ✅✅✅" -ForegroundColor Green
    Write-Host "Status Code: $statusCode" -ForegroundColor Green
    Write-Host "`nResponse:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 5
    
    Write-Host "`n🎉 Category created successfully!" -ForegroundColor Green
    Write-Host "`n📊 View your data at:" -ForegroundColor Cyan
    Write-Host "   Run: docker exec -it next-dev npx prisma studio" -ForegroundColor White
    Write-Host "   URL: http://localhost:5555" -ForegroundColor White
    
} catch {
    $errorStatus = $_.Exception.Response.StatusCode.value__
    Write-Host "`n❌ Failed with Status Code: $errorStatus" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    Write-Host "`nChecking container logs..." -ForegroundColor Yellow
    docker logs next-dev --tail 30
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor White
Read-Host "Press Enter to continue"
