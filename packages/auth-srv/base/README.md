# auth-srv — Authentication Backend (Go/Gin)

> **Package**: `universo-platformo/auth-srv`  
> **Technology**: Go/Gin  
> **Status**: Active Development

## Overview

Go/Gin authentication backend service providing session-based authentication via Supabase. This package is the Angular project equivalent of `auth-backend` in `universo-platformo-react`, reimplemented using Go/Gin instead of Node.js/Express.

## Package Information

| Attribute | Value |
|-----------|-------|
| Language | Go 1.21+ |
| Framework | Gin |
| Auth Provider | Supabase |
| Session Type | Cookie-based (server-side) |
| Port (default) | 3101 |

## Key Features

- **Supabase Integration**: Email/password authentication via Supabase Auth API
- **Session Management**: Secure cookie-based sessions (7-day lifetime)
- **CSRF Protection**: Token-based CSRF protection for state-changing requests
- **Token Refresh**: Automatic Supabase token refresh before expiry
- **CORS Support**: Configurable CORS for Angular frontend

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/auth/csrf` | Get CSRF token for session |
| `POST` | `/api/v1/auth/login` | Login with email/password |
| `POST` | `/api/v1/auth/register` | Register new account |
| `GET` | `/api/v1/auth/me` | Get current user (requires auth) |
| `POST` | `/api/v1/auth/logout` | Logout current session |
| `GET` | `/health` | Health check |

## Installation & Setup

### Prerequisites

- Go 1.21+
- Supabase project with email/password auth enabled

### Environment Variables

```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

Required variables:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SESSION_SECRET=at_least_32_random_characters
```

### Running

```bash
# Development
go run cmd/server/main.go

# Build
go build -o bin/server cmd/server/main.go

# Tests
go test ./...
```

## Architecture

```
base/
├── cmd/
│   └── server/
│       └── main.go           # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go         # Configuration from env vars
│   ├── handler/
│   │   └── auth_handler.go   # HTTP request handlers (login, logout, me, etc.)
│   ├── middleware/
│   │   ├── auth.go           # Auth guard & CSRF middleware
│   │   └── cors.go           # CORS configuration
│   ├── model/
│   │   └── model.go          # Data models and request/response types
│   └── service/
│       └── supabase_service.go  # Supabase API client
├── go.mod
├── go.sum
└── .env.example
```

## Security

- Sessions stored server-side (client only holds a signed cookie)
- CSRF tokens required for all state-changing requests
- Supabase tokens never sent to the client
- Automatic token refresh prevents session expiry

## License

Omsk Open License
