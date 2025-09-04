FROM node:22-slim as builder

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --filter api --frozen-lockfile

COPY . .

RUN pnpm --filter api run build

FROM node:22-alpine

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --filter api --prod --frozen-lockfile

COPY --from=builder /usr/app/apps/api/dist ./apps/api/dist

EXPOSE 5373

CMD ["pnpm", "dev"]