# Universo Platformo Angular

Implementation of **Universo Platformo** on **Angular** (frontend) and **Gin / Go** (backend) with TypeScript and Go.
Supabase is used as the database and authentication provider — accessed **exclusively through the backend**.
The frontend never communicates with Supabase directly.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 17+ · TypeScript · Angular Material |
| Backend | Go 1.21+ · Gin · gin-contrib/sessions · gin-contrib/cors |
| Auth provider | Supabase (via Go backend only) |
| Session storage | Signed HTTP-Only cookie (server-side, 7 days) |
| CSRF protection | Synchronizer token pattern (CSRF token stored in session) |
| Package manager | PNPM workspaces |
| i18n | Not yet implemented (planned: ngx-translate) |

## Architecture

All features are implemented as **independent packages** in the `packages/` directory.
Each package has a `base/` directory with the core implementation and bilingual README (EN + RU).
Frontend packages use the `-frt` suffix; backend packages use the `-srv` suffix.

```
packages/
├── auth-frt/base/    Angular authentication module (service, guards, components)
├── auth-srv/base/    Go/Gin authentication server (Supabase proxy)
└── start-frt/base/  Angular start pages (guest landing + onboarding wizard)
```

## How Supabase Integration Works

```
Browser (Angular)
      │  HTTP (cookie session + CSRF token)
      ▼
Go/Gin auth-srv
      │  HTTPS (apikey header)
      ▼
Supabase Auth API
```

The Angular frontend calls only `/api/v1/auth/*` endpoints on the Go backend.
The Go backend holds the `SUPABASE_URL` and `SUPABASE_ANON_KEY` — never exposed to the browser.
The backend proxies sign-in, sign-up, token refresh, and sign-out to Supabase on behalf of the user.

## Implemented Packages

### `packages/auth-srv/base` — Go/Gin authentication backend

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/csrf` | GET | — | Issue CSRF token for the session |
| `/api/v1/auth/login` | POST | CSRF | Authenticate with email + password |
| `/api/v1/auth/register` | POST | CSRF | Register a new account |
| `/api/v1/auth/me` | GET | session | Return current user; auto-refresh token |
| `/api/v1/auth/logout` | POST | CSRF | Invalidate session and Supabase token |
| `/health` | GET | — | Liveness check |

Key implementation details:
- Sessions stored server-side in a signed cookie (`gin-contrib/sessions`)
- CSRF tokens generated with `crypto/rand`, validated per-request
- Supabase tokens never reach the browser
- Cookie `Secure` and `SameSite` configurable via environment variables
- All Supabase HTTP calls use the request context for proper cancellation

### `packages/auth-frt/base` — Angular authentication frontend

Provides reactive authentication state for the whole Angular application:

- **`AuthService`** — `BehaviorSubject`-based state (`user$`, `isAuthenticated$`, `loading$`)
- **`authGuard`** / **`guestGuard`** — functional route guards (Angular 17+)
- **`LoginFormComponent`** — Material email/password login form with validation
- **`RegisterFormComponent`** — Registration form with password confirmation and legal checkboxes
- **`AuthViewComponent`** — Tabbed card with login and registration forms

### `packages/start-frt/base` — Angular start pages

- **`StartPageComponent`** — Smart router: shows guest or authenticated view based on auth state
- **`GuestStartPageComponent`** — Hero landing page with feature cards and CTA → `/auth`
- **`AuthenticatedStartPageComponent`** — Three-step onboarding wizard (Projects → Campaigns → Clusters)
- **`StartFooterComponent`** — Shared footer with privacy and terms links

## Getting Started

### Prerequisites

- Node.js 18+ and PNPM 8+
- Go 1.21+
- A [Supabase](https://supabase.com) project with email/password auth enabled

### Backend setup

```bash
cd packages/auth-srv/base
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_ANON_KEY, SESSION_SECRET
go run cmd/server/main.go
```

### Frontend setup

```bash
pnpm install
# Start your Angular application that imports @universo/auth-frt and @universo/start-frt
```

## Security Notes

- Set `SECURE_COOKIE=true` in production (requires HTTPS)
- Use a strong random `SESSION_SECRET` (≥ 32 characters)
- The `SUPABASE_ANON_KEY` is only present on the backend — never in frontend bundles
- CSRF tokens are regenerated per session and validated on every state-changing request

## Package Conventions

- **Naming**: `{feature}-frt` (Angular) or `{feature}-srv` (Go/Gin)
- **Structure**: Each package has a `base/` directory with the implementation
- **Docs**: Each package has bilingual `README.md` + `README-RU.md`
- **Independence**: Packages expose well-defined public APIs for inter-package use

## Project Roadmap

1. **Phase 1 (current)**: All packages as workspace packages in this monorepo
2. **Phase 2**: Mature packages extracted to separate repositories
3. **Phase 3**: Only infrastructure packages remain; features are fully independent

## License

[Omsk Open License](https://github.com/teknokomo/universo-platformo-react)

