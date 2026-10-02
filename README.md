# Nuxt 4 + Prisma Starter Template

Production-ready full-stack template powered by Nuxt 4, Vue 3, Tailwind CSS v4, Vuetify 3, Prisma ORM, and Spec-Driven Development with OpenSpec.

## Features

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3 Composition API & SSR.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via Vite + [Vuetify 3](https://vuetifyjs.com/) with Material Design Icons (`@mdi/font`).
- **Database**: [Prisma ORM](https://www.prisma.io/) with dual SQLite (development/default) and MySQL (production) seamless switching.
- **Authentication**: [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils) session management with secure HttpOnly cookies and scrypt password hashing.
- **AI-Native Spec-Driven Development**: [OpenSpec](https://github.com/Fission-AI/OpenSpec) with pre-configured Antigravity workflows and rules (Prisma N+1 prevention, YAGNI / clean architecture).
- **Container Ready**: Dockerfile and docker-compose.yml included.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize Database
Prepare schemas, generate Prisma Client, and seed the database:
```bash
npm run db:prepare
npm run db:generate
npm run db:push
npm run db:seed
```

Default administrator credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Management Scripts

- `npm run db:prepare`: Prepares SQLite or MySQL combined schemas based on `SQL_PROVIDER`.
- `npm run db:generate`: Generates Prisma clients for both database providers.
- `npm run db:migrate`: Executes database migrations.
- `npm run db:push`: Pushes schema changes directly to the database.
- `npm run db:seed`: Seeds initial data (e.g. admin account).
- `npm run db:validate`: Validates Prisma schema syntax and relations.
- `npm run db:change-password`: Safely resets any user password directly via CLI.

---

## Spec-Driven Development (OpenSpec)

This starter enforces clean specifications and AI paired development via OpenSpec:

```bash
# Health check
npm run openspec -- doctor

# List specifications and active change proposals
npm run openspec -- list --specs
npm run openspec -- list

# Validate all specifications
npm run openspec -- validate --all
```

### AI Slash Commands:
- `/opsx-explore`: Brainstorm and explore new requirements.
- `/opsx-propose <name>`: Create a new change proposal (proposal, delta spec, design, tasks).
- `/opsx-apply`: Implement the approved tasks.
- `/opsx-archive <name>`: Merge delta specs into the source of truth and archive the change.
