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

| Folder | On the server | On your laptop |
| --- | --- | --- |
| `storage/uploads/production` | where uploads are saved (`UPLOAD_DIR` unset) | the backup copy of the live files, filled by `pnpm backup-data` |
| `storage/uploads/local` | not used | where uploads are saved, for `pnpm dev` and `pnpm build`/`start` (`UPLOAD_DIR` in `.env`) |

Both folders are git-ignored: images never go into git.

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

One command on your laptop backs up the live site:

```bash
pnpm backup-data
```

It reads the site's public endpoints (no server login needed) and saves:

- product and blog rows → `scripts/old-data.json`
- the images they use and the catalogue PDFs → `storage/uploads/production`

Images are downloaded only once, since upload names are never reused. Admin
accounts and contact enquiries are not public, so they are not included. Set
`BACKUP_SITE_URL` to back up a different copy of the site.

To restore, run `pnpm import-data`. It **replaces** the Product and Blog tables
with the file's rows, so the database ends up exactly matching the file:

- Before changing anything it saves the current rows to
  `storage/backups/before-import-<time>.json` (git-ignored). To undo an import,
  copy that file over `scripts/old-data.json` and run `pnpm import-data` again.
- The delete and the insert run in one transaction: if the insert fails, the
  database is left exactly as it was.
- A file with no products is refused, so an empty backup can't wipe the site.
- Admin accounts are never touched.

On your laptop it first copies the images it needs from
`storage/uploads/production` into `storage/uploads/local`. Add `--dry-run` to
only validate the file.

To restore the server from your laptop, copy `storage/uploads/production` up to
the same folder on the server, push `scripts/old-data.json`, and run
`pnpm import-data` there.

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
| `pnpm backup-data` | Back up the live site (data and images) to this laptop |
| `pnpm import-data` | Replace product and blog rows with `scripts/old-data.json` (saves the old rows first, never touches accounts) |
