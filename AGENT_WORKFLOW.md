# 🤖 AI Agent Workflow Log

This document records how AI agents assisted in building the **FuelEU Maritime Compliance Platform** — a full-stack project developed using **TypeScript, Node.js, PostgreSQL, Prisma, and React** under **Hexagonal Architecture**.  
The goal was to use AI tools as collaborators — for ideation, structure, and boilerplate — while ensuring all generated code was manually reviewed and validated.

---

## ⚙️ Agents Used

| Agent | Role | Usage Context |
|--------|------|---------------|
| **ChatGPT (GPT-5)** | Core design + planning assistant | Helped structure project architecture, database schema, backend logic, and modular separation between ports/adapters |
| **GitHub Copilot** | Inline autocompletion and boilerplate generation | Suggested TypeScript interfaces, Express route handlers, Prisma model snippets, and React components |
| **Cursor IDE Agent** | Code refinement and async handler correction | Used for quick refactors, type inference, and resolving import path issues |


---

## 🧩 Prompts & Outputs

### 🧠 Example 1 — Database Schema & Seeding
**Prompt:**
> "Generate PostgreSQL schema for routes, pools, ship_compliance, and bank_entries tables with foreign keys and seed data (set one baseline=true)."

**AI Output:**
- Created normalized schema with five tables.  
- Added foreign keys and constraints between pools → pool_members → ships.  
- Included seed insert queries with one baseline route.  

**Manual Validation:**
- Adjusted decimal precision (`DECIMAL(15,4)` instead of `(10,2)`).  
- Added indexing for faster `ship_id` lookups.  
- Re-tested schema execution in VS Code PostgreSQL extension.

---

### 🧠 Example 2 — Backend Setup with TypeScript + Postgres
**Prompt:**
> "Initialize a Node.js project in TypeScript with PostgreSQL connection using Pool from 'pg'. Follow clean folder structure: core, adapters, infrastructure."

**AI Output:**
- Generated `package.json` setup commands.  
- Added `database.ts` for connection pooling and `.env` variables.  
- Suggested `server.ts` with a sample `/api/health` route.  

**Manual Refinement:**
- Moved config to `infrastructure/db/`.  
- Rewrote import paths to use ES Modules.  
- Added proper error handling and async/await connection checks.

---

### 🧠 Example 3 — Prisma Schema Debugging
**Prompt:**
> "Fix `Prisma schema validation error: missing provider or model name mismatch` in schema.prisma."

**AI Output:**
- Identified issue with `generator client` block missing `provider = "prisma-client-js"`.  
- Suggested corrected schema format and re-run command `npx prisma generate`.

**Validation:**
- Verified fix by running migrations successfully.  
- Added database seed using `prisma/seed.ts` and confirmed in Prisma Studio.

---

### 🧠 Example 4 — React Frontend Component (Comparison Dashboard)
**Prompt:**
> "Create a CompareTab component (React + TypeScript + Tailwind + Recharts) that fetches `/routes/comparison` and displays a bar chart for GHG intensity vs baseline."

**AI Output:**
- Produced functional React component with `useEffect`, `fetch` call, and Recharts `<BarChart>` setup.  
- Added tooltip, labels, and responsive container.  

**Manual Refinement:**
- Replaced `any` with explicit `RouteData` interface.  
- Added loading/error states and baseline check.  
- Improved accessibility contrast with Tailwind color adjustments.

---

### 🧠 Example 5 — CORS & API Integration Issue
**Prompt:**
> "Frontend requests returning CORS error — fix for Express backend."

**AI Output:**
```ts
import cors from 'cors';
app.use(cors({ origin: '*' }));
