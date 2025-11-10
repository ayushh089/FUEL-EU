# Fuel EU Compliance Dashboard

A small full-stack demo implementing a Fuel EU compliance dashboard. The project uses a Hexagonal (ports & adapters) architecture with a React + Vite frontend and a TypeScript + Express backend using Prisma and PostgreSQL.

## Overview

This repository contains:
- `frontend/` — React + Vite frontend UI (TypeScript). Implements a tabbed dashboard with Routes, Compare, Banking and Pooling views.
- `backend/` — Express server, Prisma ORM, and application logic (TypeScript). Exposes endpoints for routes, compliance (CB) calculations, banking and pooling.

The app demonstrates how to compute CO₂-intensity, compare routes to a baseline, allow banking/applying surplus CO₂ (Article 20), and create pooling arrangements (Article 21).

## Architecture summary (Hexagonal)

The code follows a Hexagonal (Ports & Adapters) pattern:

- `core/` — Domain models and application use-cases. Pure business logic.
- `adapters/outbound/` — Database repositories (Prisma/Postgres) implementing repository ports.
- `adapters/inbound/` — HTTP controllers exposing REST endpoints; these call application use-cases.
- `adapters/ui/` (frontend) — UI components that call the outbound HTTP API (via `apiClient`).
- `infrastructure/` — DB connection, server bootstrap and environment wiring.

This separation keeps domain logic isolated from transport and persistence concerns and makes the system easier to test.

## Setup & run

Prerequisites:
- Node.js (v18+ recommended)
- PostgreSQL (for backend)
- Optional: pnpm/npm/yarn

1) Clone and install

```powershell
# install frontend deps
cd frontend
npm install
# install backend deps
cd ..\backend
npm install
```

2) Configure environment

- Backend needs `DATABASE_URL` pointing to your Postgres instance. Example:

```powershell
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/fueleu_dev"
# on Linux/macOS: export DATABASE_URL=...
```

- Frontend supports overriding the API base with Vite env var `VITE_API_BASE`. By default the frontend expects the backend on `http://localhost:4000`.

3) Apply Prisma migrations and seed (backend)

```powershell
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4) Run servers (dev)

Open two terminals (PowerShell):

Frontend:
```powershell
cd frontend
npm run dev
# Vite dev server usually on http://localhost:5173
```

Backend:
```powershell
cd backend
npm run dev
# Backend dev server listens on http://localhost:4000
```

5) Build for production

```powershell
cd frontend
npm run build
cd ..\backend
npm run build
```

## How to execute tests

- Backend unit tests (Jest):

```powershell
cd backend
npm test
```

- Frontend: there are no automated UI tests in this demo, but you can run lint/build:

```powershell
cd frontend
npm run lint
npm run build
```



Note: these are example shapes; your actual responses depend on the database seed and server logic.

## Troubleshooting

- If the frontend shows empty data, confirm the backend is running on port `4000` and CORS is enabled.
- If Prisma reports schema drift, run `prisma migrate reset` in dev (this drops data) or `prisma db pull` / create a baseline migration if you need to preserve production data.
- If TypeScript build or ESLint issues occur, run `npm run build` in `frontend` or `backend` to see errors and fix accordingly.

## Next steps & enhancements

- Replace inline charts with Chart.js / Recharts for richer visuals.
- Add toasts for operations (baseline set, banked/applied, pool created).
- Add e2e tests (Cypress/Playwright) for critical flows.

---


