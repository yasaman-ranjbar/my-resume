FROM node:20-alpine

WORKDIR /app

# Install netcat for database connection checking
RUN apk add --no-cache netcat-openbsd

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# نصب dependencies
COPY package.json package-lock.json* ./
RUN npm install

# کپی کل پروژه
COPY . .

# Prisma generate
RUN npx prisma generate

# Build پروژه
RUN npm run build

# پورت Next.js
EXPOSE 3000

# Start production
CMD ["./wait-for-it.sh", "db:5432", "--", "sh", "-c", "npx prisma migrate deploy && npm run start"]