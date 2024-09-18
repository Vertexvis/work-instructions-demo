FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps

# Setup env variabless for yarn and nextjs
ENV NEXT_TELEMETRY_DISABLED=1
ENV YARN_VERSION=4.5.0

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add dumb-init

WORKDIR /app

# Update Yarn
RUN corepack enable
RUN corepack prepare yarn@${YARN_VERSION}

# Yarn install
COPY package.json yarn.lock* .yarnrc.yml ./
RUN yarn install --immutable

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Setup env variabless for yarn and nextjs
ENV NEXT_TELEMETRY_DISABLED=1

# This will do the trick, use the corresponding env file for each environment.
# COPY .env.development.sample .env.production
# RUN npm run build
# Update Yarn
RUN corepack enable
RUN corepack prepare yarn@${YARN_VERSION}
RUN yarn run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
