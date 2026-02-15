# Docker Setup and Testing Instructions

## Current Status
✅ Docker containers are UP and RUNNING
✅ Prisma schema is configured
✅ Test scripts are ready

## Step-by-Step Instructions

### Option 1: Run PowerShell Script (Recommended)

Open PowerShell in the project directory and run:

```powershell
.\setup-and-test.ps1
```

This script will:
1. Check Docker container status
2. Run Prisma migrations
3. Generate Prisma client
4. Test the API with a POST request
5. Open Prisma Studio to view the database

### Option 2: Manual Steps

#### 1. Verify Docker Containers

```bash
docker compose -f docker-compose.dev.yml ps
```

You should see two containers running:
- `postgres-db-dev` - PostgreSQL database
- `next-dev` - Next.js application

#### 2. Run Prisma Migration

```bash
docker exec next-dev npx prisma migrate dev --name init
```

#### 3. Generate Prisma Client

```bash
docker exec next-dev npx prisma generate
```

#### 4. Wait for App to Start

Check the Next.js app logs:
```bash
docker logs next-dev --follow
```

Wait until you see "Ready" or similar message.

#### 5. Test API with CURL

Run the test script:
```bash
.\test-api.bat
```

Or manually:
```bash
curl -X POST http://localhost:3000/api/admin/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Technology\",\"slug\":\"technology\"}" \
  -w "\nHTTP Status: %{http_code}\n"
```

**Expected Result:** HTTP Status 201 with JSON response containing the created category.

#### 6. View Database with Prisma Studio

```bash
docker exec -it next-dev npx prisma studio
```

Then open: http://localhost:5555

### Troubleshooting

#### Issue: 500 Error (Hot Reload Problem)

If you get a 500 error, this might be due to hot reload issues. Restart the containers:

```bash
# Stop containers
docker compose -f docker-compose.dev.yml down

# Start containers again
docker compose -f docker-compose.dev.yml up -d

# Wait 10 seconds for startup
# Then run migrations again
docker exec next-dev npx prisma migrate dev --name init

# Test API again
.\test-api.bat
```

#### Issue: Database Connection Error

Check if the database is ready:
```bash
docker exec postgres-db-dev pg_isready -U postgres
```

#### Issue: App Container Not Starting

View app logs:
```bash
docker logs next-dev
```

## API Testing Details

### Endpoint
`POST http://localhost:3000/api/admin/categories`

### Request Body
```json
{
  "name": "Technology",
  "slug": "technology"
}
```

### Expected Response (201 Created)
```json
{
  "id": 1,
  "createdAt": "2026-02-15T...",
  "name": "Technology",
  "slug": "technology"
}
```

### Validation Rules
- `name`: Required, non-empty string
- `slug`: Required, lowercase letters, numbers, and hyphens only (no spaces)
- `slug` must be unique

## Database Details

- **Host:** localhost:5433 (from host machine)
- **Database:** mydb
- **User:** postgres
- **Password:** postgres
- **Connection String:** `postgresql://postgres:postgres@localhost:5433/mydb?schema=public`

## Docker Services

### Next.js App
- Container: `next-dev`
- Port: 3000
- URL: http://localhost:3000

### PostgreSQL
- Container: `postgres-db-dev`
- Port: 5433 (external), 5432 (internal)
- Data Volume: `pgdata-dev`

## Quick Commands Reference

```bash
# View all containers
docker compose -f docker-compose.dev.yml ps

# View app logs
docker logs next-dev --follow

# View database logs
docker logs postgres-db-dev --follow

# Stop all services
docker compose -f docker-compose.dev.yml down

# Start all services
docker compose -f docker-compose.dev.yml up -d

# Restart app only
docker restart next-dev

# Access database directly
docker exec -it postgres-db-dev psql -U postgres -d mydb

# Run Prisma Studio
docker exec -it next-dev npx prisma studio
```
