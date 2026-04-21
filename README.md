# Ryuga Storage

A minimal Google Drive clone. Upload, browse, and manage files across folders.

## Stack

- **Framework** — Next.js 15 (App Router)
- **Database** — SingleStore via Drizzle ORM
- **Auth** — Clerk
- **File Storage** — UploadThing
- **Styling** — Tailwind CSS + shadcn/ui

## Features

- File upload with automatic type detection
- Folder creation and navigation
- URL-based folder routing (`/f/[folderId]`)
- Breadcrumb trail
- File deletion (removes from storage and DB)
- Automatic user onboarding on first sign-in
- Server-side caching with tag-based invalidation

## Getting Started

1. Clone the repo and install dependencies

```bash
pnpm install
```

2. Copy `.env.example` to `.env` and fill in your credentials

```bash
cp .env.example .env
```

3. Push the schema to your database

```bash
pnpm db:push
```

4. Run the dev server

```bash
pnpm dev
```

## Environment Variables

```env
SINGLESTORE_HOST=
SINGLESTORE_PORT=
SINGLESTORE_USER=
SINGLESTORE_PASS=
SINGLESTORE_DB_NAME=

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

UPLOADTHING_TOKEN=
```

## Project Structure

```
src/
├── app/
│   ├── f/[folderId]/     # Folder view
│   ├── drive/            # Auth redirect + onboarding
│   ├── sign-in/          # Sign in page
├── server/
│   ├── db/
│   │   ├── schema.ts     # Drizzle schema
│   │   └── queries.ts    # Cached queries + mutations
│   └── actions.ts        # Server actions
└── lib/
    ├── types.ts           # Domain types
    └── mappers.ts         # DB → UI type mappers
```
