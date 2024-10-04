FROM node:20-alpine AS base

RUN addgroup -g 1001 -S nodejs && \
	adduser -u 1001 -g 1001 -S nextjs 

USER nextjs

# Setup env variabless for yarn and nextjs
ENV NEXT_TELEMETRY_DISABLED=1
ENV YARN_VERSION=4.5.0

# Enable corepack
USER root
RUN corepack enable
USER nextjs

# 1. Install dependencies only when needed
FROM base AS deps

USER root

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && \
	apk add --no-cache libc6-compat

USER nextjs

WORKDIR /app

# Yarn install
COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack prepare yarn@${YARN_VERSION} && \
	yarn install --immutable

# 2. Rebuild the source code only when needed
FROM base AS builder

USER nextjs

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build
RUN corepack prepare yarn@${YARN_VERSION} && \
	yarn run build

# 3. Production image, copy all the files and run next
FROM base AS runner

USER nextjs

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
