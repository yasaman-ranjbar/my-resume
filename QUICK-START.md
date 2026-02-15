# Quick Start - Docker Testing

## ✅ What's Already Done

1. ✅ Docker containers are **UP and RUNNING**
   - `next-dev` - Your Next.js app on port 3000
   - `postgres-db-dev` - PostgreSQL database on port 5433

2. ✅ Prisma schema is configured correctly

3. ✅ Migrations are ready

4. ✅ Test scripts are created

## 🚀 Run This ONE Command

Open PowerShell in this directory and run:

```powershell
.\full-test.ps1
```

**This script will:**
- ✓ Verify Docker containers are running
- ✓ Run Prisma migrations
- ✓ Test the API with POST request
- ✓ Automatically restart if 500 error occurs (hot reload fix)
- ✓ Show you the results

## 📝 What You Should See

**Success Output:**
```
✅ Status Code: 201
✅ Response: {"id":1,"createdAt":"...","name":"Technology","slug":"technology"}
🎉 SUCCESS! Category created successfully!
```

## 🧪 Manual CURL Test (Alternative)

If you prefer to test manually with CURL:

```bash
curl -X POST http://localhost:3000/api/admin/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Technology\",\"slug\":\"technology\"}"
```

**Expected:** HTTP 201 with JSON response

## 👀 View Database

### Option 1: Prisma Studio (Web UI)
```bash
docker exec -it next-dev npx prisma studio
```
Then open: **http://localhost:5555**

### Option 2: PostgreSQL CLI
```bash
docker exec -it postgres-db-dev psql -U postgres -d mydb
```
Then run:
```sql
SELECT * FROM "Category";
```

## 🔧 If You Get 500 Error

The `full-test.ps1` script handles this automatically, but if needed manually:

```bash
# Stop containers
docker compose -f docker-compose.dev.yml down

# Start again
docker compose -f docker-compose.dev.yml up -d

# Wait 15 seconds, then run migrations
docker exec next-dev npx prisma migrate deploy

# Test again
.\test-api.bat
```

## 📊 Container Management

```bash
# View logs
docker logs next-dev --follow
docker logs postgres-db-dev --follow

# Restart app only
docker restart next-dev

# Stop all
docker compose -f docker-compose.dev.yml down

# Start all
docker compose -f docker-compose.dev.yml up -d
```

## 🎯 API Endpoint Details

**URL:** `POST http://localhost:3000/api/admin/categories`

**Request Body:**
```json
{
  "name": "Category Name",
  "slug": "category-name"
}
```

**Status Codes:**
- `201` ✅ Success - Category created
- `400` ❌ Bad request - Invalid name/slug
- `409` ⚠️  Conflict - Slug already exists
- `500` ❌ Server error - Usually hot reload issue

**Slug Rules:**
- Lowercase only
- Letters, numbers, and hyphens
- No spaces or special characters

## 💡 Tips

1. The script `full-test.ps1` is **smart** - it will automatically fix hot reload issues
2. Each test creates a category with a unique slug
3. Prisma Studio is the easiest way to view your data
4. The database persists in Docker volume `pgdata-dev`

## 🆘 Troubleshooting

**Script won't run?**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Port already in use?**
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Stop containers and start again
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d
```

**Can't connect to database?**
```bash
# Check database is ready
docker exec postgres-db-dev pg_isready -U postgres
```

---

## 🎉 That's It!

Just run `.\full-test.ps1` and you're done!
