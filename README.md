# Aluminium (natrajaluform.com)

Next.js 16 + Prisma/PostgreSQL site with a small admin area for blogs and products.

## Setup

```bash
pnpm install
cp .env.example .env      # then fill in the values
pnpm prisma migrate deploy
pnpm dev
```

### Required environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string. |
| `AUTH_SECRET` | yes | JWT signing key, min 32 chars. **The API refuses to start without it.** Generate with `openssl rand -base64 48`. |
| `UPLOAD_DIR` | local only | Set to `storage/uploads/local` on your machine (as in `.env.example`). Leave unset on the production server, where it defaults to `storage/uploads/production`. Must stay outside `public/`. |

## Admin accounts

**There is no registration endpoint and no signup page.** Accounts exist only
where someone already has database access. Create the admin account once with:

```bash
pnpm seed
```

It refuses to run if the account already exists. Passwords are stored as
salted scrypt hashes.

Never commit credentials to the repo — `scripts/old-data.json` previously
carried a plaintext admin password and has been stripped.

## Uploads

Uploaded images are written to `UPLOAD_DIR`, which is **deliberately outside
`public/`** so nothing uploaded can ever be served as a static asset. There are
two upload folders:

| Folder | Used by | In git? |
| --- | --- | --- |
| `storage/uploads/local` | your machine, for `pnpm dev` and `pnpm build`/`start` (`UPLOAD_DIR` in `.env`) | no, ignored |
| `storage/uploads/production` | the production server (`UPLOAD_DIR` unset) | yes, committed from the server as a backup |

Images are read back only through `GET /api/image/<filename>`,
which serves a fixed allowlist of image types with `nosniff`.

The upload endpoint requires authentication, caps files at 5 MB, and determines
the file type from its leading bytes — the client-supplied filename and
`Content-Type` are both ignored.

The two Extruded Products catalogue PDFs follow the same rules: uploaded via
`POST /api/catalogue` (authenticated, PDF only by leading bytes, 20 MB cap),
stored in `UPLOAD_DIR` as `catalogue-1.pdf` / `catalogue-2.pdf`, and downloaded
through `GET /api/catalogue/<slot>`. Their titles live in `src/lib/catalogue.ts`.

## Backup and restore

Product and blog rows are backed up to `scripts/old-data.json`, and the files
they use live in `storage/uploads/production`. Both are committed, so the repo
is the backup. Admin accounts are never backed up (they hold password hashes).

On the production server:

```bash
pnpm backup-data        # database → scripts/old-data.json
git add scripts/old-data.json storage/uploads/production
git commit -m "Back up production data" && git push
```

Then `git pull` anywhere to get a copy. To restore, put the files in place and
run `pnpm import-data`. It upserts by id, so it is safe to re-run and never
deletes rows. Add `--dry-run` to only validate the file.

## Contact enquiries

The Contact Us form posts to `POST /api/enquiry`, which validates the fields and
appends each enquiry to `storage/enquiries/enquiries.json`. Like uploads, the
file is outside `public/`, so it can't be opened by URL, and no endpoint reads it
back. It holds people's contact details, so it is git-ignored and not part of
the git backup: read it on the server and copy it off separately.

## API auth

Every mutating endpoint (`POST`/`PUT`/`DELETE` on `/api/blog` and `/api/product`,
and `POST /api/upload`) calls `requireAuth` and rejects unauthenticated requests
with 403. `GET` on blog and product stays public — the site is public.
`/api/auth/login` and `POST /api/enquiry` (the contact form) are the only
unauthenticated write endpoints.

When adding a route handler that writes data, start it with:

```ts
const auth = await requireAuth(request);
if (!auth.ok) return auth.response;
```

Client-side guards (`MainGuard`) only hide UI. They are not access control.

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build / serve on port 3205 |
| `pnpm lint` | ESLint |
| `pnpm seed` | Create the admin account (refuses if it already exists) |
| `pnpm backup-data` | Back up product and blog rows to `scripts/old-data.json` |
| `pnpm import-data` | Restore product and blog rows from `scripts/old-data.json` (never touches accounts) |
