# NileDate Database

This folder contains the Prisma schema and future migrations.

## Stack

- PostgreSQL
- Prisma ORM

## Setup

1. Install dependencies:

```bash
npm install prisma @prisma/client
```

2. Initialize Prisma client:

```bash
npx prisma generate
```

3. Create migration:

```bash
npx prisma migrate dev --name init
```
