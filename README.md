# Ecommerce-NW

Monorepo del ecommerce:

- `API/` — API REST en TypeScript (Express 5 + Prisma 7 + PostgreSQL).
- `WEB/` — cliente web.

## API

### Requisitos

- Node.js 22+
- PostgreSQL 17 en `localhost:5432`

### Puesta en marcha

```bash
cd API
cp .env.example .env   # ajusta DATABASE_URL y JWT_SECRET
npm install            # ejecuta "prisma generate" en postinstall
npm run dev            # http://localhost:3000
```

### Scripts

| Script              | Descripción                                     |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Servidor con recarga automática (tsx watch)     |
| `npm start`         | Servidor en modo normal                         |
| `npm run build`     | Compila TypeScript a `dist/`                    |
| `npm run typecheck` | Verifica tipos sin emitir                       |
| `npm test`          | Tests con Vitest + Supertest                    |

### Endpoints

| Método | Ruta      | Descripción                        |
| ------ | --------- | ---------------------------------- |
| GET    | `/`       | Información básica de la API       |
| GET    | `/health` | Estado del servicio                |

### Base de datos

El esquema está en `API/prisma/schema.prisma` y el historial de migraciones
en `API/prisma/migrations` (baseline `0_init`).

```bash
npx prisma migrate status   # estado de las migraciones
npx prisma migrate dev      # crear una nueva migración
npx prisma studio           # explorar los datos
```
