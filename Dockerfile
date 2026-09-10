FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Build the static site
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Serve the prebuilt static files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 astro
RUN adduser --system --uid 1001 astro

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER astro

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "npx --no-install sirv dist --port $PORT --host 0.0.0.0"]
