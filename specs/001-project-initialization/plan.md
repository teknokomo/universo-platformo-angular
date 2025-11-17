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

## Strategic Context: Monorepo-to-Multirepo Evolution

**CRITICAL UNDERSTANDING**: This project follows a deliberate architectural evolution:

### Phase 1: Unified Monorepo (CURRENT)
- All packages as workspace packages within single repository
- Shared tooling, versioning, and build orchestration
- Easy cross-package changes and atomic commits
- **Goal**: Establish patterns and prove architecture

### Phase 2: Gradual Package Extraction (FUTURE)
- Mature, stable packages moved to separate repositories
- Core packages remain in monorepo
- Feature packages become independent
- **Goal**: Enable independent versioning and deployment

### Phase 3: Multi-Repository Architecture (LONG-TERM)
- Only base framework packages in monorepo
- All features in separate repositories
- Packages published to registry
- **Goal**: True microservice architecture with package federation

### Architectural Implications

**THEREFORE**: Every design decision MUST consider:
1. Can this package be moved to a separate repository without refactoring?
2. Are all dependencies explicit and versioned?
3. Is the public API stable and well-defined?
4. Is the package self-contained with its own tests and documentation?

**Reference**: Universo Platformo React (https://github.com/teknokomo/universo-platformo-react) demonstrates this pattern with:
- 35+ packages following modular structure
- Clear separation of concerns (`-frt` / `-srv` packages)
- Shared infrastructure packages (`universo-types`, `universo-utils`, `universo-api-client`, `universo-i18n`, `universo-rest-docs`)
- Feature packages ready for extraction (`clusters-frt`, `clusters-srv`, `metaverses-frt`, `metaverses-srv`, etc.)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ⚠️ CRITICAL: Absolute Modular Implementation Requirement

**THIS PROJECT MANDATES 100% MODULAR PACKAGE-BASED ARCHITECTURE**

All functionality (except root-level build/launch scripts) MUST be implemented in packages within `packages/` directory. This is **NON-NEGOTIABLE** and follows Constitution v1.0.3.

**Rationale**: This project is designed for eventual package extraction to separate repositories. Every package must be repository-independent from day one.

**FORBIDDEN**: Creating any feature code outside `packages/` directory structure.

See `.specify/memory/constitution.md` Section "FORBIDDEN Implementations" for complete list of prohibited practices.

### ✅ Principle I: Monorepo Organization (ABSOLUTE REQUIREMENT)
- **Status**: PASS
- **Check**: Project will be organized as PNPM monorepo with ALL packages in `packages/` directory
- **Check**: Packages will follow `-frt` (frontend) and `-srv` (backend) naming convention
- **Check**: Each package will contain `base/` directory for core implementation
- **CRITICAL**: Absolutely NO functionality implemented outside of packages/ (except root build/launch scripts)

### ✅ Principle II: Package-First Development (MANDATORY FOR ALL FEATURES)
- **Status**: PASS
- **Check**: All features will start as independent packages
- **Check**: Packages will have well-defined interfaces for inter-package communication
- **Check**: Package architecture supports future extraction to separate repositories
- **CRITICAL**: Every package designed for repository independence from day one

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

### FORBIDDEN Implementations Check
- **Status**: PASS - No violations planned
- ❌ Non-package implementations (outside packages/)
- ❌ Monolithic frontend+backend in single package
- ❌ Packages without base/ directory
- ❌ Direct cross-package imports from internals
- ❌ Tight coupling preventing repository separation
- ❌ Inconsistent package naming
- ❌ Non-modular shared code
- ❌ Blind copying from React repo without adaptation

**All forbidden practices will be actively avoided in implementation.**

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

**⚠️ CRITICAL: ALL implementation code MUST be in packages/ directory**

The structure below shows the ONLY acceptable pattern for code organization. Any deviation violates Constitution v1.0.3.

```text
# Monorepo structure with PNPM workspaces
# ⚠️ ALL FEATURE CODE MUST BE IN packages/ DIRECTORY
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

This is a **monorepo with multiple packages** structure. The project uses PNPM workspaces to manage multiple independent packages that can be developed, tested, and versioned together. 

**⚠️ CRITICAL REQUIREMENT**: This is NOT just a recommended pattern—it is the ONLY acceptable architecture. ALL feature implementation MUST follow this structure without exception.

**Key architectural decisions:**

1. **Package Organization (MANDATORY)**: ALL packages in `packages/` directory following naming conventions:
   - Shared infrastructure: `universo-*` prefix
   - Feature packages: `{feature}-frt` (frontend), `{feature}-srv` (backend)
   - **FORBIDDEN**: Any feature code outside of `packages/` directory
   
2. **Base Directory Convention (MANDATORY)**: Every package MUST contain a `base/` directory at its root containing the core implementation. This supports future multiple technology stack implementations while maintaining common interfaces.
   - **FORBIDDEN**: Packages without `base/` directory

3. **Shared Infrastructure First (MANDATORY SEQUENCE)**: Infrastructure packages (types, utils, api-client, i18n, rest-docs) MUST be implemented before feature packages that depend on them.
   - **FORBIDDEN**: Creating shared code outside of dedicated shared infrastructure packages

4. **Component Library (MANDATORY)**: `universo-ng-components` eliminates code duplication across frontend packages by providing reusable Angular components.
   - **FORBIDDEN**: Duplicating UI components across packages instead of using shared library

5. **Authentication Packages (MANDATORY SEPARATION)**: Separated into `auth-frt` (Angular UI) and `auth-srv` (Go backend) as foundational services.
   - **FORBIDDEN**: Combining frontend and backend in single package when they should be separate

6. **Future Extensibility (STRATEGIC GOAL)**: Package structure supports eventual extraction to separate repositories while maintaining base packages in the monorepo.
   - **REQUIREMENT**: Every package MUST be designed to be repository-independent from day one

**Migration Path Verification**: Each package in this structure can be moved to a separate repository with:
- Zero code refactoring required
- Only package.json dependency updates needed
- Preserved test coverage and documentation
- Maintained public API contracts

## Complexity Tracking

**Status**: No violations detected.

All constitution principles are satisfied:
- Monorepo organization with PNPM ✅
- Package-first development with clear boundaries ✅
- **ABSOLUTE MODULAR IMPLEMENTATION** - All code in packages/ ✅
- Bilingual documentation (English/Russian) ✅
- Correct technology stack (Angular/Gin/Supabase) ✅
- Following GitHub workflow guidelines ✅
- Incremental feature development pattern ✅
- Specification-driven development ✅
- **NO FORBIDDEN IMPLEMENTATIONS** planned ✅

**Verification**: This plan follows Constitution v1.0.3 with absolute adherence to modular package-based architecture.

No complexity justification required.
