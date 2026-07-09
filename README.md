# MODO Application

**Cognitive Digital Twin Platform** — Attention, Effort and Reality made visible.

Monorepo unificado:

```
modo-application/
├── backend/     Express + TypeScript + Prisma (port 4000)
├── frontend/    React + Vite + Tailwind (port 5173)
├── agents/      Regras estratégicas dos agents (markdown)
└── skills/      Skills operacionais da IA (markdown)
```

## Quick Start

```bash
npm install
npm run dev
```

Sobe Postgres (Docker), backend (:4000) e frontend (:5173).

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000/api/health
- **Chat MODO:** http://localhost:5173/dashboard/chat
- **Dashboard:** http://localhost:5173/dashboard

## Database (optional)

```bash
cp .env.example .env
# Edit .env — set POSTGRES_PASSWORD and JWT_SECRET

docker compose down -v   # se migrou de modu → modo
docker compose up -d
npm run db:push
npm run db:seed
```

Demo login: `demo@modo.ai` / `modo123`

## Scripts

| Script | Description |
|--------|-------------|
| `npm install` | Instala tudo (único `node_modules` na raiz) |
| `npm run dev` | Docker + backend + frontend |
| `npm run dev:backend` | Só Express (4000) |
| `npm run dev:frontend` | Só Vite (5173) |

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite, Tailwind, Framer Motion, Recharts, React Flow |
| Backend | Node.js, Express, Prisma, PostgreSQL, JWT, Anthropic |
| Intelligence | `agents/rules/` + `skills/` loaded at runtime |
