# ── Etapa 1: dependencias ─────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# ── Etapa 2: producción ────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

# Instalar dumb-init para gestión correcta de señales del proceso
RUN apk add --no-cache dumb-init

WORKDIR /app

# Crear usuario sin privilegios (seguridad)
RUN addgroup -S eload && adduser -S eload -G eload

# Copiar dependencias y código
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=eload:eload . .

# Cambiar al usuario sin privilegios
USER eload

EXPOSE 8000

# dumb-init gestiona correctamente SIGTERM para shutdown limpio
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
