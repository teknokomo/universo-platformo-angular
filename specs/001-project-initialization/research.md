# Research & Architectural Decisions

**Feature**: Universo Platformo Angular - Project Initialization  
**Date**: 2025-11-17  
**Status**: Complete

## Overview

This document consolidates research findings and architectural decisions for technical clarifications identified during the Technical Context phase. All "NEEDS CLARIFICATION" items have been resolved with evidence-based recommendations.

## 1. Build Orchestration: Nx vs Turbo

### Decision: **Nx**

### Rationale

Nx is the optimal choice for this Angular + Go monorepo project because:

1. **Deep Angular Integration**: Nx was born from Angular CLI and provides best-in-class Angular support with out-of-the-box code generation, linting, testing, and advanced project graph intelligence.

2. **Multi-Language Support**: Unlike Turborepo (primarily JavaScript/TypeScript focused), Nx has a growing plugin ecosystem for Go and other languages, making it ideal for cross-language monorepos like ours (Angular frontend + Gin backend).

3. **Advanced Build Orchestration**: Nx uses a sophisticated dependency graph to rebuild only affected projects, with powerful local and remote caching (Nx Cloud). This is critical for monorepos with 20-30+ packages.

4. **PNPM Workspace Integration**: Full native integration with PNPM for dependency management and package linking.

5. **Enterprise Features**: Includes distributed task execution, release management, and code ownership features beneficial for growing teams.

6. **Scalability**: Performs better in large monorepos with cross-project dependencies compared to Turborepo.

### Alternatives Considered

**Turborepo**:
- **Pros**: Simpler setup, faster for small JavaScript-only projects, minimal configuration
- **Cons**: Limited Angular support (manual setup required), no native Go support, lacks enterprise features, smaller plugin ecosystem
- **Why Rejected**: Our project requires strong Angular + Go support, and Nx's advanced features are worth the slightly steeper learning curve

### Implementation Notes

- Use Nx workspace configuration
- Leverage Nx plugins for Angular (`@nx/angular`) and Go projects
- Configure Nx Cloud for remote caching in CI/CD
- Use Nx affected commands for efficient builds: `nx affected:build`, `nx affected:test`

### References

- Nx vs Turborepo comparison benchmarks (2025)
- Nx official documentation on multi-language monorepos
- Community feedback on Angular + Nx integration

---

## 2. Frontend Testing: Jest vs Jasmine/Karma

### Decision: **Jest**

### Rationale

Jest is the clear choice for Angular unit testing in 2025 because:

1. **Karma Deprecated**: As of Angular 16, Karma is officially deprecated. The Angular team no longer provides bug fixes or new features, making it unsuitable for future-ready projects.

2. **Superior Performance**: Jest runs tests in parallel using Node.js (no browser required), making it significantly faster than Karma, especially for large test suites.

3. **Modern Features**:
   - Native mocking capabilities (no additional libraries needed)
   - Snapshot testing for component rendering
   - Built-in code coverage
   - Watch mode with intelligent re-runs

4. **Better CI/CD Integration**: No browser dependencies, simpler Docker images, faster pipeline execution.

5. **Easy Migration**: Jest is mostly compatible with Jasmine API syntax. Migration tools like `jest-codemods` automate most of the conversion process.

6. **Community Momentum**: Strong migration trend in the Angular community. Most new projects and many established projects have migrated to Jest.

### Alternatives Considered

**Jasmine/Karma**:
- **Pros**: Angular's historical default, simpler syntax
- **Cons**: Karma deprecated, slower (browser-based), no parallelism, limited modern features
- **Why Rejected**: Deprecated technology with no future support

**Web Test Runner with Jasmine**:
- **Pros**: Modern, lightweight, browser-based for real DOM testing
- **Cons**: Less mature ecosystem, fewer features than Jest
- **Why Rejected**: Jest's feature set and performance advantages outweigh the benefits of real browser testing for most unit tests

### Implementation Notes

- Use `jest-preset-angular` for Angular-specific Jest configuration
- Configure Jest with jsdom for DOM emulation
- Set up parallel test execution for CI/CD
- Use Nx's Jest integration: `@nx/jest`
- Keep test syntax similar to Jasmine for easier onboarding

### References

- Angular 16+ official testing guidance
- Jest vs Karma migration guides from Backbase Engineering, HackerNoon
- Community migration case studies (2024-2025)

---

## 3. E2E Testing: Playwright vs Cypress

### Decision: **Playwright**

### Rationale

Playwright is the superior choice for E2E testing of Angular applications because:

1. **Cross-Browser Coverage**: Native support for Chromium, Firefox, and WebKit (Safari), including mobile emulations. Critical for testing across diverse user environments.

2. **Multi-Tab and Multi-Domain**: Robust support for complex scenarios like multi-tab flows, popups, and cross-domain interactions - areas where Cypress historically struggled.

3. **Language Flexibility**: Supports JavaScript, TypeScript, Python, C#, and Java. This allows backend integration tests in Go if needed.

4. **Performance and Parallelization**: Faster execution with free parallel test running. Strong CI/CD integration without additional costs.

5. **Advanced Features**:
   - Trace viewer for debugging
   - Network interception and mocking
   - Device and geolocation emulation
   - Auto-waiting reduces test flakiness

6. **Enterprise Scalability**: Better suited for large-scale Angular applications with complex user flows.

### Alternatives Considered

**Cypress**:
- **Pros**: Excellent developer experience, intuitive UI with time-travel debugging, simple setup, great for component testing
- **Cons**: Limited browser support (primarily Chromium), no native multi-tab/domain support, paid parallelization, performance issues in very large codebases
- **Why Rejected**: Cross-browser testing and multi-domain scenarios are important for our platform. Playwright offers broader capabilities for enterprise-scale applications.

### Implementation Notes

- Use `@playwright/test` for Angular E2E tests
- Configure Playwright for cross-browser testing (Chromium, Firefox, WebKit)
- Set up trace collection for failed tests in CI
- Use Nx's Playwright integration if available, or custom executors
- Organize tests by user journey/feature

### References

- Playwright vs Cypress comparison (2025)
- Cross-browser testing best practices
- Enterprise E2E testing strategies

---

## 4. Go Authentication with Supabase

### Decision: **supabase-community/supabase-go + appleboy/gin-jwt**

### Rationale

The optimal authentication architecture for Go + Gin + Supabase uses:

1. **supabase-community/supabase-go**: Official community client for Supabase Auth API integration
   - Validates JWT tokens issued by Supabase
   - Retrieves user information from Supabase Auth
   - Handles token refresh and session management
   - Well-maintained with active community support

2. **appleboy/gin-jwt**: Mature JWT middleware for Gin framework
   - Extracts and parses JWT from Authorization headers
   - Validates token structure and claims
   - Integrates seamlessly with Gin routing
   - Supports custom authorization logic

### Architecture Pattern

```
Frontend (Angular) → Supabase Auth (JWT issued)
                   ↓
Backend (Gin) → JWT Middleware (appleboy/gin-jwt)
              → Token Validation (supabase-go client)
              → User Context Injection
              → Protected Route Handler
```

### Implementation Approach

1. **JWT Validation Middleware**:
   ```go
   func AuthMiddleware(supabaseClient *supabase.Client) gin.HandlerFunc {
       return func(c *gin.Context) {
           token := extractTokenFromHeader(c)
           user, err := supabaseClient.Auth.User(ctx, token)
           if err != nil {
               c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
               return
           }
           c.Set("user", user)
           c.Next()
       }
   }
   ```

2. **Best Practices**:
   - Always verify JWT signature and expiration
   - Use Supabase Row Level Security (RLS) for database access control
   - Never expose service keys in client code
   - Implement token refresh mechanisms
   - Add custom claims for roles/permissions
   - Use HTTPS in production

3. **Additional Libraries**:
   - `github.com/golang-jwt/jwt/v5` for JWT parsing
   - Standard Go crypto packages for signature verification

### Alternatives Considered

**supabase-community/auth-go**:
- **Pros**: More focused on Auth API only
- **Cons**: Pre-release status, less mature than supabase-go
- **Why Rejected**: supabase-go is more stable and actively maintained

**Custom JWT Implementation**:
- **Pros**: Full control over authentication flow
- **Cons**: Reinventing the wheel, more maintenance burden, security risks
- **Why Rejected**: Official libraries provide battle-tested security

### Implementation Notes

- Create `auth-srv` package with Supabase integration
- Implement reusable middleware for protected routes
- Configure Supabase client with environment variables
- Set up proper error handling and logging
- Document authentication flow in package README

### References

- Supabase official Go client documentation
- Supabase Auth best practices
- Gin JWT middleware patterns
- Community examples and tutorials

---

## 5. Additional Research: PNPM Workspace Configuration

### Decision: **PNPM Workspaces with Catalog**

### Key Configuration

The PNPM workspace will use the catalog feature for centralized dependency management:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'

catalog:
  '@angular/core': ^17.0.0
  '@angular/common': ^17.0.0
  '@angular/material': ^17.0.0
  'rxjs': ^7.8.0
  'typescript': ^5.2.0
```

### Benefits

1. **Version Consistency**: Single source of truth for shared dependencies
2. **Easier Updates**: Update versions in one place
3. **Reduced Conflicts**: Eliminates version mismatches across packages
4. **Better DX**: Simpler dependency management for developers

### Implementation Strategy

1. Define catalog with all shared dependencies (Angular, Material, testing libraries)
2. Packages reference catalog versions: `"@angular/core": "catalog:"`
3. Use workspace protocol for internal packages: `"@universo/types": "workspace:*"`
4. Configure Nx to work with PNPM workspaces

---

## 6. Angular + Gin Best Practices

### Angular Best Practices

1. **Project Structure**:
   - Feature-based module organization
   - Shared components in `universo-ng-components`
   - Lazy loading for feature modules
   - Smart/container vs presentational components pattern

2. **State Management**:
   - RxJS + Services for simple state
   - Consider NgRx for complex features (deferred to feature implementation)

3. **TypeScript**:
   - Strict mode enabled
   - Explicit typing (avoid `any`)
   - Shared types from `universo-types` package

4. **Material Design**:
   - Use Angular Material components
   - Consistent theming across packages
   - Responsive design with Material breakpoints

### Gin Best Practices

1. **Project Structure**:
   - Clean architecture: handlers → services → repositories
   - Package-based organization (not flat structure)
   - Dependency injection via function parameters

2. **Error Handling**:
   - Centralized error middleware
   - Consistent error response format
   - Proper HTTP status codes

3. **Middleware Chain**:
   - CORS middleware
   - Authentication middleware
   - Logging middleware
   - Recovery middleware (panic handling)

4. **Database Access**:
   - Repository pattern for Supabase access
   - Interface-based abstractions
   - Proper connection pooling

### API Design

1. **RESTful Conventions**:
   - Resource-based URLs
   - Proper HTTP methods (GET, POST, PUT, DELETE)
   - Consistent response format

2. **Versioning**:
   - URL versioning: `/api/v1/...`
   - Prepare for future v2

3. **Documentation**:
   - OpenAPI/Swagger specifications
   - Generated from code annotations

---

## Summary of Decisions

| Area | Decision | Key Reason |
|------|----------|------------|
| Build Orchestration | **Nx** | Best Angular + Go support, advanced features |
| Frontend Testing | **Jest** | Karma deprecated, better performance, modern features |
| E2E Testing | **Playwright** | Cross-browser support, enterprise scalability |
| Go Authentication | **supabase-go + gin-jwt** | Official library, mature middleware, best practices |
| Dependency Management | **PNPM Catalog** | Centralized versions, consistency |

## Next Steps

With all technical decisions made, proceed to **Phase 1: Design & Contracts**:

1. Generate `data-model.md` - Document key entities and relationships
2. Create API contracts in `/contracts/` - Define REST API specifications
3. Generate `quickstart.md` - Developer onboarding and setup guide
4. Update agent context - Add new technology decisions

All NEEDS CLARIFICATION items are now RESOLVED. ✅
