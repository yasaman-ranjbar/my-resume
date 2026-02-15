# Setup and Test Database Script

Write-Host "=== Checking Docker containers ===" -ForegroundColor Cyan
docker compose -f docker-compose.dev.yml ps

Write-Host "`n=== Waiting for database to be ready ===" -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "`n=== Running Prisma migrations ===" -ForegroundColor Cyan
docker exec next-dev npx prisma migrate dev --name init

Write-Host "`n=== Generating Prisma client ===" -ForegroundColor Cyan
docker exec next-dev npx prisma generate

Write-Host "`n=== Testing category creation API ===" -ForegroundColor Cyan
$body = @{
    name = "Test Category"
    slug = "test-category"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/categories" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing

Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
Write-Host "Response: $($response.Content)" -ForegroundColor Yellow

if ($response.StatusCode -eq 201) {
    Write-Host "`n✅ SUCCESS! Category created successfully" -ForegroundColor Green
} else {
    Write-Host "`n❌ Unexpected status code" -ForegroundColor Red
}

Write-Host "`n=== Opening Prisma Studio ===" -ForegroundColor Cyan
Write-Host "Opening in browser... Check the database at http://localhost:5555"
docker exec -d next-dev npx prisma studio

Write-Host "`nSetup complete! Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
