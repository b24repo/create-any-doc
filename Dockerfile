# Use Node.js 20 slim image
FROM node:20.18.0-slim AS base

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
    python-is-python3 \
    pkg-config \
    build-essential \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY backend/ .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20.18.0-slim AS production

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY backend/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from build stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma
COPY backend/prisma ./prisma

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/documents/health || exit 1

# Start the application
CMD ["node", "dist/main"] 