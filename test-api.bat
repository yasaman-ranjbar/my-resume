@echo off
echo Testing Category Creation API...
echo.

curl -X POST http://localhost:3000/api/admin/categories ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Technology\",\"slug\":\"technology\"}" ^
  -w "\nHTTP Status: %%{http_code}\n" ^
  -v

echo.
echo ========================
echo.
echo If you see HTTP Status: 201, the test passed!
echo.
pause
