# Quick CURL Test for Category API
Write-Host "Testing Category Creation API..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/admin/categories" `
        -Method POST `
        -Body (@{name="Technology"; slug="technology"} | ConvertTo-Json) `
        -ContentType "application/json" `
        -StatusCodeVariable statusCode

    Write-Host "`n✅ SUCCESS! Status Code: $statusCode" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 5
    
} catch {
    $errorStatus = $_.Exception.Response.StatusCode.value__
    Write-Host "`n❌ Status Code: $errorStatus" -ForegroundColor Red
    
    if ($errorStatus -eq 500) {
        Write-Host "`n⚠️  Got 500 error - This is the hot reload issue!" -ForegroundColor Yellow
        Write-Host "Run this to fix:" -ForegroundColor Cyan
        Write-Host "  docker compose -f docker-compose.dev.yml restart" -ForegroundColor White
    }
    
    Write-Host "`nError details:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
