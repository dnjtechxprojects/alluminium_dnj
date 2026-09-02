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
| `UPLOAD_DIR` | no | Defaults to `storage/uploads`. Must stay outside `public/`. |

## Admin accounts

**There is no registration endpoint and no signup page.** Accounts exist only
where someone already has database access, and are managed entirely from the
CLI:

```bash
pnpm create-admin --list                                  # show accounts
pnpm create-admin <username> [password]                   # create or reset
pnpm create-admin --remove <username>                     # delete
pnpm create-admin --replace <oldUser> <newUser> [password] # swap, atomically
```

Omit the password and a 28-character one is generated and printed once.
Passwords must be at least 16 characters and are stored as salted scrypt
hashes. `--remove` refuses to delete the last remaining account, and
`--replace` creates before it deletes, so you can never end up locked out.

Never commit credentials to the repo — `scripts/old-data.json` previously
carried a plaintext admin password and has been stripped.

## Uploads

Uploaded images are written to `UPLOAD_DIR` (default `storage/uploads`), which is
**deliberately outside `public/`** so nothing uploaded can ever be served as a
static asset. Images are read back only through `GET /api/image/<filename>`,
which serves a fixed allowlist of image types with `nosniff`.

The upload endpoint requires authentication, caps files at 5 MB, and determines
the file type from its leading bytes — the client-supplied filename and
`Content-Type` are both ignored.

Back up `storage/uploads` alongside the database; it is not in version control.

## API auth

Every mutating endpoint (`POST`/`PUT`/`DELETE` on `/api/blog` and `/api/product`,
and `POST /api/upload`) calls `requireAuth` and rejects unauthenticated requests
with 403. `GET` on blog and product stays public — the site is public.
`/api/auth/login` is the only unauthenticated write endpoint.

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
| `pnpm create-admin` | Create or reset an admin account |
| `pnpm import:old-data` | One-off legacy **product** import (never touches accounts) |
