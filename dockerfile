# 🔹 Stage 1: Builder
FROM node:23-alpine AS builder

# Install dependencies
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy application source code
COPY . .

# Generate Prisma client & build application
RUN npx prisma generate
RUN npm run build

# Remove development dependencies to reduce image size
RUN npm prune --production

# 🔹 Stage 2: Runner
FROM node:23-alpine AS runner

# Set working directory
WORKDIR /app

# Copy necessary built files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Use non-root user for security
USER node

# Expose the required port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start"]
