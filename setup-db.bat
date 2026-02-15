@echo off
echo Waiting for database to be ready...
timeout /t 5 /nobreak >nul

echo Running Prisma migrations...
docker exec next-dev npx prisma migrate dev --name init

echo Generating Prisma client...
docker exec next-dev npx prisma generate

echo Done!
pause
