# Implementation Plan: Universo Platformo Angular - Project Initialization

**Branch**: `001-project-initialization` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-project-initialization/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Initialize Universo Platformo Angular as a monorepo with PNPM workspace management, establish repository structure and standards documentation, set up shared infrastructure packages (types, utils, api-client, i18n, rest-docs), configure Angular frontend with TypeScript and Gin backend with Go, integrate Supabase for database operations, implement authentication packages with Supabase connector, set up Material UI component library, and create comprehensive bilingual documentation following established workflow guidelines.

## Technical Context

**Language/Version**: 
- Frontend: TypeScript 5.0+, Angular 17+ (latest stable)
- Backend: Go 1.20+, Gin framework 1.9+
- Node.js 18+ for frontend tooling

**Primary Dependencies**: 
- Frontend: Angular, Angular Material, ngx-translate, RxJS
- Backend: Gin, supabase-community/supabase-go, appleboy/gin-jwt
- Build: PNPM 8+, Nx (chosen over Turbo for Angular+Go support)
- Database: Supabase (PostgreSQL-based with REST/realtime APIs)

**Storage**: Supabase (PostgreSQL), with abstraction layer for future DBMS expansion

**Testing**: 
- Frontend: Jest (Karma deprecated as of Angular 16)
- Backend: Go testing package, table-driven tests
- E2E: Playwright (chosen for cross-browser support)

**Target Platform**: 
- Frontend: Modern browsers (Chrome, Firefox, Safari, Edge)
- Backend: Linux/macOS/Windows servers, containerizable

**Project Type**: Monorepo with multiple packages (web application architecture)

**Performance Goals**: 
- Frontend: <2s initial load, <100ms UI interactions
- Backend: <200ms API response time (p95)
- Build: <5min full monorepo build

**Constraints**: 
- Hot-reload within 3 seconds for both frontend and backend
- Package interfaces must support future repository separation
- All documentation must be bilingual (English/Russian) with identical structure

**Scale/Scope**: 
- Initial: 5-10 packages (shared infrastructure + auth + first feature)
- Target: 20-30 packages as features are added
- Expected team: 3-10 developers
- Codebase: 50k-100k LOC target for initial implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Monorepo Organization
- **Status**: PASS
- **Check**: Project will be organized as PNPM monorepo with packages in `packages/` directory
- **Check**: Packages will follow `-frt` (frontend) and `-srv` (backend) naming convention
- **Check**: Each package will contain `base/` directory for core implementation

### ✅ Principle II: Package-First Development
- **Status**: PASS
- **Check**: All features will start as independent packages
- **Check**: Packages will have well-defined interfaces for inter-package communication
- **Check**: Package architecture supports future extraction to separate repositories

### ✅ Principle III: Bilingual Documentation (NON-NEGOTIABLE)
- **Status**: PASS
- **Check**: All documentation will be created in English first, then Russian
- **Check**: Russian versions will match English exactly (structure, content, line count)
- **Check**: Following `.github/instructions/i18n-docs.md` guidelines

### ✅ Principle IV: Technology Stack Adherence
- **Status**: PASS
- **Check**: Frontend: Angular with TypeScript, Angular Material
- **Check**: Backend: Gin framework with Go
- **Check**: Database: Supabase (primary) with abstraction for future expansion
- **Check**: Package Management: PNPM with workspace and catalog support
- **Check**: Build Orchestration: Nx (selected for Angular+Go monorepo support)
- **Check**: Frontend Testing: Jest (Karma deprecated)
- **Check**: E2E Testing: Playwright (cross-browser support)
- **Check**: Go Authentication: supabase-community/supabase-go + appleboy/gin-jwt

### ✅ Principle V: GitHub Workflow Integration
- **Status**: PASS
- **Check**: Following `.github/instructions/github-issues.md` for Issue creation
- **Check**: Following `.github/instructions/github-labels.md` for label application
- **Check**: Following `.github/instructions/github-pr.md` for Pull Request creation
- **Check**: Using exact spoiler tag format: `<summary>In Russian</summary>`

### ✅ Principle VI: Incremental Feature Development
- **Status**: PASS
- **Check**: Shared infrastructure packages will be implemented first (types, utils, api-client, i18n, rest-docs)
- **Check**: Shared component libraries will be created to eliminate duplication
- **Check**: Authentication packages will be built before feature packages
- **Check**: First complete feature (Clusters) will establish reusable patterns

### ✅ Principle VII: Specification-Driven Development
- **Status**: PASS
- **Check**: Complete specification exists in `specs/001-project-initialization/spec.md`
- **Check**: Following `.specify/templates/spec-template.md` structure
- **Check**: Implementation planning follows `.specify/templates/plan-template.md`
- **Check**: User stories have clear priorities (P1-P5) and acceptance criteria

### Required Technologies Check
- **Status**: PASS - All clarifications resolved
- ✅ Angular (latest stable) with TypeScript
- ✅ Angular Material for UI components
- ✅ Gin framework for Go backend
- ✅ Supabase for database
- ✅ Go-based authentication with Supabase connector
- ✅ PNPM with workspace and catalog
- ✅ **RESOLVED**: Nx for build orchestration (selected over Turbo)
- ✅ **RESOLVED**: Jest for frontend testing (Karma deprecated)
- ✅ **RESOLVED**: Playwright for E2E testing (selected over Cypress)
- ✅ ngx-translate for internationalization

### Architecture Constraints Check
- **Status**: PASS
- ✅ Frontend/backend will communicate via RESTful APIs
- ✅ Database access will be abstracted for future DBMS migration
- ✅ Authentication will use JWT tokens (stateless)
- ✅ All packages will follow `base/` directory convention
- ✅ Package naming: `{feature}-{frt|srv}` pattern
- ✅ Shared infrastructure packages before feature packages
- ✅ PNPM catalog for centralized dependency management
- ✅ Package README templates for consistency
- ✅ Shared component libraries to eliminate duplication

### Excluded Elements Check
- **Status**: PASS
- ✅ No `docs/` folder will be created (separate repository)
- ✅ No AI agent configuration files will be created (user-managed)

### Overall Gate Status
**PASS** ✅ - All constitution principles satisfied and technical decisions made.

Phase 0 research completed with all clarifications resolved:
1. ✅ Build orchestration: **Nx** (best Angular+Go support, enterprise features)
2. ✅ Frontend testing: **Jest** (Karma deprecated, better performance)
3. ✅ E2E testing: **Playwright** (cross-browser support, scalability)
4. ✅ Go authentication: **supabase-go + gin-jwt** (official libraries, best practices)

**Ready to proceed to Phase 1: Design & Contracts**

See `research.md` for detailed rationale and alternatives considered for each decision.

**Additional Research Validation** (2025-11-17):
- `research-enhancement.md` - Extended research from web sources and Context7 documentation
- All technical decisions validated by current industry best practices
- New insights documented for future implementation phases (Signals API, zoneless change detection, context handling)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── research-enhancement.md  # Extended research (web + Context7)
├── architecture-comparison.md  # React repo pattern analysis
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Monorepo structure with PNPM workspaces
packages/
├── TEMPLATE-README.md           # Package README template
├── TEMPLATE-README-GUIDE.md     # Template usage guide
├── README.md                    # Packages directory overview
│
├── universo-types/              # Shared TypeScript type definitions
│   └── base/
│       ├── src/
│       │   ├── interfaces/      # Interface definitions
│       │   ├── types/           # Type definitions
│       │   └── index.ts
│       ├── dist/                # Compiled output (CJS, ESM, types)
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── universo-utils/              # Shared utility functions
│   └── base/
│       ├── src/
│       │   ├── utils/           # Utility functions
│       │   └── index.ts
│       ├── dist/                # Compiled output (CJS, ESM, types)
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── universo-api-client/         # Type-safe API client libraries
│   └── base/
│       ├── src/
│       │   ├── clients/         # API client implementations
│       │   ├── types/           # Request/response types
│       │   └── index.ts
│       ├── dist/                # Compiled output (CJS, ESM, types)
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── universo-i18n/              # Centralized internationalization
│   └── base/
│       ├── src/
│       │   ├── locales/         # Translation files
│       │   │   ├── en/
│       │   │   └── ru/
│       │   ├── i18n.ts          # i18n configuration
│       │   └── index.ts
│       ├── dist/                # Compiled output
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── universo-rest-docs/         # API documentation server
│   └── base/
│       ├── src/
│       │   ├── swagger/         # OpenAPI specifications
│       │   └── index.ts
│       ├── dist/                # Compiled output
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── universo-ng-components/      # Shared Angular component library
│   └── base/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # Shared components
│       │   │   ├── directives/  # Shared directives
│       │   │   ├── pipes/       # Shared pipes
│       │   │   └── services/    # Shared services
│       │   ├── assets/          # Component-specific assets
│       │   │   ├── icons/
│       │   │   └── images/
│       │   ├── i18n/            # Component translations
│       │   │   ├── en/
│       │   │   │   └── translations.json
│       │   │   └── ru/
│       │   │       └── translations.json
│       │   └── public-api.ts
│       ├── dist/                # Compiled output
│       ├── package.json
│       ├── ng-package.json      # Angular library configuration
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
├── auth-frt/                    # Authentication frontend (Angular)
│   └── base/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── guards/      # Route guards (SessionGuard, etc.)
│       │   │   ├── services/    # Auth services (AuthService, TokenService)
│       │   │   ├── components/  # Auth UI (LoginForm, LogoutButton)
│       │   │   └── interceptors/# HTTP interceptors
│       │   ├── assets/          # Auth-specific assets
│       │   │   └── icons/
│       │   ├── i18n/            # Auth translations
│       │   │   ├── en/
│       │   │   │   └── translations.json
│       │   │   └── ru/
│       │   │       └── translations.json
│       │   └── public-api.ts
│       ├── dist/                # Compiled output
│       ├── package.json
│       ├── ng-package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── README-RU.md
│
└── auth-srv/                    # Authentication backend (Go/Gin)
    └── base/
        ├── cmd/
        │   └── server/          # Server entry point
        ├── internal/
        │   ├── handlers/        # HTTP handlers (login, logout, session)
        │   ├── middleware/      # Auth middleware (JWT validation)
        │   ├── services/        # Business logic (session management)
        │   ├── repository/      # Data access layer
        │   ├── validators/      # Input validation
        │   └── configs/         # Configuration constants
        ├── assets/              # Embedded static resources (if needed)
        ├── go.mod
        ├── go.sum
        ├── README.md
        └── README-RU.md

# Root configuration
.github/
├── instructions/                # Workflow guidelines (existing)
└── workflows/                   # CI/CD pipelines (future)

.specify/                        # Specification system (existing)
├── memory/
├── scripts/
└── templates/

specs/                          # Feature specifications (existing)
└── 001-project-initialization/

pnpm-workspace.yaml             # PNPM workspace configuration with catalog
package.json                    # Root package.json with workspace scripts
.gitignore                      # Git ignore patterns
README.md                       # English documentation
README-RU.md                    # Russian documentation
```

**Structure Decision**: 

This is a **monorepo with multiple packages** structure. The project uses PNPM workspaces to manage multiple independent packages that can be developed, tested, and versioned together. Key architectural decisions:

1. **Package Organization**: All packages in `packages/` directory following naming conventions:
   - Shared infrastructure: `universo-*` prefix
   - Feature packages: `{feature}-frt` (frontend), `{feature}-srv` (backend)
   
2. **Base Directory Convention**: Every package contains a `base/` directory at its root containing the core implementation. This supports future multiple technology stack implementations while maintaining common interfaces.

3. **Shared Infrastructure First**: Infrastructure packages (types, utils, api-client, i18n, rest-docs) provide common functionality used by all feature packages.

4. **Component Library**: `universo-ng-components` eliminates code duplication across frontend packages by providing reusable Angular components.

5. **Authentication Packages**: Separated into `auth-frt` (Angular UI) and `auth-srv` (Go backend) as foundational services for all features requiring authentication.

6. **Future Extensibility**: Package structure supports eventual extraction to separate repositories while maintaining base packages in the monorepo.

## Complexity Tracking

**Status**: No violations detected.

All constitution principles are satisfied:
- Monorepo organization with PNPM ✅
- Package-first development with clear boundaries ✅
- Bilingual documentation (English/Russian) ✅
- Correct technology stack (Angular/Gin/Supabase) ✅
- Following GitHub workflow guidelines ✅
- Incremental feature development pattern ✅
- Specification-driven development ✅

No complexity justification required.
