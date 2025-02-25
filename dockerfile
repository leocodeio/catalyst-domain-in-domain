# Build Stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Generate Prisma client and build the application
RUN pnpm prisma generate && pnpm build

# Prune development dependencies
RUN pnpm prune --prod

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client for the target platform
ENV NODE_ENV=production
RUN npm install -g pnpm
RUN pnpm install prisma --save-dev
RUN pnpm prisma generate

# Use non-root user for security
USER node

EXPOSE 3000

# Use the start script from package.json
CMD ["pnpm", "start"]
