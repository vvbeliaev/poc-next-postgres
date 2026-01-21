## Production Dockerfile (Next.js + Prisma + yarn)
FROM node:24-bullseye-slim AS base

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare yarn@1.22.22 --activate


FROM base AS deps

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install --frozen-lockfile

FROM base AS builder

# Signal to our app that we are in build time (for the ISR hack)
ENV IS_BUILD_TIME=true

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate && yarn build


FROM base AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["yarn", "start"]
