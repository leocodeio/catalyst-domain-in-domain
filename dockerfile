FROM node:20 AS builder

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
  curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client and build the app
RUN pnpm prisma generate && pnpm build

FROM node:20 AS runner

WORKDIR /app

# Install pnpm in runner stage
RUN npm install -g pnpm

# Copy package files and dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 3000

# Start the Remix app
CMD ["pnpm", "start"]