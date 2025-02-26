# Build Stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Workdir
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Generate Prisma client and build the application
RUN npx prisma generate && npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies with minimal footprint
RUN npm install --omit=dev --no-optional && \
    npm install --no-save --save-dev prisma && \
    npx prisma generate && \
    npm prune --production && \
    rm -rf /root/.npm /tmp/* /var/cache/apk/* && \
    # Remove unnecessary files
    find /app/node_modules -type f -name "*.md" -o -name "*.ts" -o -name "*.map" | xargs rm -f && \
    find /app/node_modules -type d -name "test" -o -name "tests" -o -name "docs" | xargs rm -rf

# Use non-root user for security
USER node

EXPOSE 3000

# Use the start script from package.json
CMD ["node", "build/index.js"]