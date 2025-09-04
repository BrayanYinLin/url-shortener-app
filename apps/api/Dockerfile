FROM node:22-slim AS builder

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --filter api --frozen-lockfile

COPY . .
COPY .env.production .env.production
COPY .env .env

RUN pnpm --filter api run build

FROM node:22-alpine

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/

# Instalar solo las deps de producción de API
RUN pnpm install --filter api... --prod --no-frozen-lockfile

# Copiar el build de la fase builder
COPY --from=builder /usr/app/apps/api/dist ./apps/api/dist

EXPOSE 5373


CMD ["pnpm", "start:api"]