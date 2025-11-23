# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install bash for better shell support
RUN apk add --no-cache bash

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma schema and generated client from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma/

# Copy application source
COPY src ./src

# Create startup script
RUN echo '#!/bin/bash\n\
echo "Running Prisma migrations..."\n\
npx prisma migrate deploy\n\
echo "Starting application..."\n\
exec npm start' > /app/start.sh && chmod +x /app/start.sh

# Expose port
EXPOSE 5050

# Start the application with migration
CMD ["/app/start.sh"]
