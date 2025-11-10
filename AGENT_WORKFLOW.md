# AI Agent Workflow Log

This document records how AI agents assisted in building the **FuelEU Maritime Compliance Platform** — a full-stack project developed using **TypeScript, Node.js, PostgreSQL, Prisma, and React** under **Hexagonal Architecture**.  
The goal was to use AI tools as collaborators — for ideation, structure, and boilerplate — while ensuring all generated code was manually reviewed and validated.

---

## Agents Used

| Agent                | Role                                             | Usage Context                                                                                                        |
| -------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **ChatGPT (GPT-5)**  | Core design + planning assistant                 | Helped structure project architecture, database schema, backend logic, and modular separation between ports/adapters |
| **GitHub Copilot**   | Inline autocompletion and boilerplate generation | Suggested TypeScript interfaces, Express route handlers, Prisma model snippets, and React components                 |
| **Cursor IDE Agent** | Code refinement and async handler correction     | Used for quick refactors, type inference, and resolving import path issues                                           |

---

## Prompts & Outputs

### Example 1 — Database Schema & Seeding

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

### Example 2 — Backend Setup with TypeScript + Postgres

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

### Example 3 — Prisma Schema Debugging

**Prompt:**

> "Fix `Prisma schema validation error: missing provider or model name mismatch` in schema.prisma."

**AI Output:**

- Identified issue with `generator client` block missing `provider = "prisma-client-js"`.
- Suggested corrected schema format and re-run command `npx prisma generate`.

**Validation:**

- Verified fix by running migrations successfully.
- Added database seed using `prisma/seed.ts` and confirmed in Prisma Studio.

---

### Example 4 — React Frontend Component (Comparison Dashboard)

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

### Example 5 — CORS & API Integration Issue

**Prompt:**

> "Frontend requests returning CORS error — fix for Express backend."

**AI Output:**

```ts
import cors from "cors";
app.use(cors({ origin: "*" }));
```
## Validation / Corrections

During the project, every AI-generated snippet was **tested, debugged, and refined manually** before being committed.  
Here’s how I verified the agent outputs across different layers:

| Area | AI Suggestion | My Verification & Fix |
|------|----------------|------------------------|
| **Database Schema** | Added DECIMAL precision as `(10,2)` | Increased to `(15,4)` for accurate CO₂ values |
| **Prisma Models** | Missed foreign key relation | Added `@relation` manually between pool_members and pools |
| **API Routes** | AI used wrong import paths | Corrected to relative imports (`../../infrastructure/db/database`) |
| **Frontend Chart** | Missing `key` prop in map() | Added unique `id` keys for React rendering |
| **Env Variables** | Suggested inline `set DATABASE_URL` | Replaced with `.env` + `dotenv` for persistent config |
| **CORS Setup** | Used `origin: '*'` | Restricted to localhost during dev and domain in production |

 All outputs were verified by:
- Running SQL migrations in PostgreSQL.
- Testing API endpoints via **Postman**.
- Using **console logs + error boundaries** in React for UI validation.
- Reviewing each commit manually before pushing to GitHub.


## Observations

###  Where AI Saved Time
- **Project bootstrapping:** ChatGPT and Copilot generated initial folder structure and base code in minutes.  
- **Repetitive code:** Copilot’s inline completions saved time in writing DTOs, React state handlers, and TypeScript types.  
- **Debug assistance:** ChatGPT quickly identified `.env` and Prisma migration issues.  

### Where AI Needed Review
- **Incorrect path imports:** Cursor and Copilot often assumed non-existent directories.  
- **Minor logic errors:** Some Prisma queries missed filters (`where: { year }`), which I added manually.  
- **Frontend gaps:** React components occasionally had missing type annotations and null checks.  

###  How I Combined Tools Effectively
1. **ChatGPT** → Used for architecture design, database schema, and logical flow.  
2. **Copilot** → Used inline for repetitive code and syntax corrections.  
3. **Cursor** → Used for fast type corrections and async refactors.  
4. **Manual testing** → Every generated code block was verified in Postman and browser console before merging.


## Best Practices Followed

- Used **ChatGPT** for architectural guidance — never directly deployed AI-generated code without review.  
- Used **Copilot** for boilerplate and interface completion only.  
- Tested all backend routes using **Postman** before integration with frontend.  
- Followed **Hexagonal Architecture** consistently (core, ports, adapters).  
- Documented all AI-assisted work in commits (e.g., “generated schema via GPT, validated manually”).  
- Stored all environment configurations securely in `.env`.  
- Reviewed each AI suggestion line-by-line to maintain code quality and logic consistency.
