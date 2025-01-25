FROM oven/bun:1-alpine AS base

FROM base AS build
WORKDIR /temp

COPY package.json bun.lock ./
RUN bun install --production
COPY . .
RUN bun run build

FROM base AS production
WORKDIR /app

COPY --chown=bun:bun --from=build /temp/node_modules ./node_modules
COPY --chown=bun:bun --from=build /temp/leitner ./leitner

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "./leitner" ]
