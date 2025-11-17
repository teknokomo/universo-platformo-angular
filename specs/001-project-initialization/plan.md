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
- Backend: Gin, Supabase Go client, JWT authentication library
- Build: PNPM 8+, NEEDS CLARIFICATION (Nx vs Turbo for build orchestration)
- Database: Supabase (PostgreSQL-based with REST/realtime APIs)

**Storage**: Supabase (PostgreSQL), with abstraction layer for future DBMS expansion

**Testing**: 
- Frontend: Jasmine/Karma (Angular default) or Jest
- Backend: Go testing package, table-driven tests
- E2E: NEEDS CLARIFICATION (Playwright vs Cypress)

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
- **Check**: Build Orchestration: NEEDS CLARIFICATION (Nx vs Turbo) - to be resolved in Phase 0

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
- **Status**: PASS with CLARIFICATIONS NEEDED
- ✅ Angular (latest stable) with TypeScript
- ✅ Angular Material for UI components
- ✅ Gin framework for Go backend
- ✅ Supabase for database
- ✅ Go-based authentication with Supabase connector
- ✅ PNPM with workspace and catalog
- ⚠️ **NEEDS CLARIFICATION**: Nx vs Turbo for build orchestration
- ⚠️ **NEEDS CLARIFICATION**: Jest vs Jasmine/Karma for frontend testing
- ⚠️ **NEEDS CLARIFICATION**: E2E testing framework (Playwright vs Cypress)
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
**CONDITIONAL PASS** - Proceed to Phase 0 research to resolve:
1. Build orchestration tool selection (Nx vs Turbo)
2. Frontend testing framework selection
3. E2E testing framework selection
4. Go authentication library selection for Supabase integration

All constitutional principles are aligned. Clarifications needed are technical decisions, not violations.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Monorepo structure with PNPM workspaces
packages/
├── universo-types/              # Shared TypeScript type definitions
│   └── base/
│       ├── src/
│       └── tests/
├── universo-utils/              # Shared utility functions
│   └── base/
│       ├── src/
│       └── tests/
├── universo-api-client/         # Type-safe API client libraries
│   └── base/
│       ├── src/
│       └── tests/
├── universo-i18n/              # Centralized internationalization
│   └── base/
│       ├── src/
│       └── tests/
├── universo-rest-docs/         # API documentation server
│   └── base/
│       ├── src/
│       └── tests/
├── universo-ng-components/      # Shared Angular component library
│   └── base/
│       ├── src/
│       │   ├── lib/
│       │   └── public-api.ts
│       └── tests/
├── auth-frt/                    # Authentication frontend (Angular)
│   └── base/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── guards/
│       │   │   ├── services/
│       │   │   └── components/
│       │   └── public-api.ts
│       └── tests/
└── auth-srv/                    # Authentication backend (Go/Gin)
    └── base/
        ├── cmd/
        ├── internal/
        │   ├── handlers/
        │   ├── middleware/
        │   └── services/
        └── tests/

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
