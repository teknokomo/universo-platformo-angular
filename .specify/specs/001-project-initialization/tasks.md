# Tasks: Universo Platformo Angular - Project Initialization

**Input**: Design documents from `.specify/specs/001-project-initialization/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/auth-api.md, architecture-comparison.md

**Tests**: No explicit test requirements were requested in the feature specification. This task list focuses on implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Architecture Patterns**: This task list incorporates enhanced package structure patterns from architecture-comparison.md analysis of universo-platformo-react, including:
- Package-level assets/ directories for icons and images
- Package-level i18n/ directories with en/ru subdirectories for translations
- Backend validators/ directories for input validation logic
- Backend configs/ directories for configuration constants
- Bilingual README files (README.md and README-RU.md) for every package

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: All packages in `packages/` directory
- **Frontend**: Angular packages in `packages/{feature}-frt/base/`
- **Backend**: Go packages in `packages/{feature}-srv/base/`
- **Shared**: Infrastructure packages in `packages/universo-*/base/`

---

## Phase 1: Setup (Repository Initialization)

**Purpose**: Initialize repository structure, documentation, and standards

- [ ] T001 Create root .gitignore with patterns for Node.js, Go, IDEs, and build artifacts at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.gitignore
- [ ] T002 Create root package.json with PNPM workspace scripts at /home/runner/work/universo-platformo-angular/universo-platformo-angular/package.json
- [ ] T003 Create pnpm-workspace.yaml with catalog for centralized dependency management at /home/runner/work/universo-platformo-angular/universo-platformo-angular/pnpm-workspace.yaml
- [ ] T004 Initialize Nx workspace configuration with affected commands, caching strategy, and project graph at /home/runner/work/universo-platformo-angular/universo-platformo-angular/nx.json
- [ ] T004a Configure Nx parallel execution and task orchestration settings in nx.json
- [ ] T004b [Optional] Setup Nx Cloud for remote caching (can be deferred to production optimization)
- [ ] T005 Create .env.example with required environment variables at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.env.example
- [ ] T006 [P] Create English root README.md at /home/runner/work/universo-platformo-angular/universo-platformo-angular/README.md
- [ ] T007 [P] Create Russian root README-RU.md (exact copy of English structure) at /home/runner/work/universo-platformo-angular/universo-platformo-angular/README-RU.md
- [ ] T008 [P] Create packages/README.md explaining package directory structure at /home/runner/work/universo-platformo-angular/universo-platformo-angular/packages/README.md
- [ ] T009 [P] Create packages/TEMPLATE-README.md with standardized package documentation template at /home/runner/work/universo-platformo-angular/universo-platformo-angular/packages/TEMPLATE-README.md
- [ ] T010 [P] Create packages/TEMPLATE-README-GUIDE.md with template usage instructions at /home/runner/work/universo-platformo-angular/universo-platformo-angular/packages/TEMPLATE-README-GUIDE.md
- [ ] T011 Verify and enhance .github/instructions/github-issues.md if needed at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.github/instructions/github-issues.md
- [ ] T012 Verify and enhance .github/instructions/github-pr.md if needed at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.github/instructions/github-pr.md
- [ ] T013 Verify and enhance .github/instructions/github-labels.md if needed at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.github/instructions/github-labels.md
- [ ] T014 Verify and enhance .github/instructions/i18n-docs.md if needed at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.github/instructions/i18n-docs.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared infrastructure that MUST be complete before ANY user story features can be implemented

**⚠️ CRITICAL**: No user story feature work can begin until this phase is complete

### Shared Infrastructure Packages

**Note**: Following enhanced package structure from architecture-comparison.md analysis of universo-platformo-react patterns

- [ ] T015 [P] Create universo-types package structure with standard directories in packages/universo-types/base/
- [ ] T016 [P] Create universo-utils package structure with standard directories in packages/universo-utils/base/
- [ ] T017 [P] Create universo-api-client package structure with standard directories in packages/universo-api-client/base/
- [ ] T018 [P] Create universo-i18n package structure with locales subdirectories in packages/universo-i18n/base/
- [ ] T019 [P] Create universo-rest-docs package structure with swagger subdirectory in packages/universo-rest-docs/base/
- [ ] T020 [P] Create universo-ng-components package structure with assets and i18n subdirectories in packages/universo-ng-components/base/

### universo-types Package Implementation

- [ ] T021 Create package.json for universo-types in packages/universo-types/base/package.json
- [ ] T022 Create tsconfig.json for universo-types in packages/universo-types/base/tsconfig.json
- [ ] T023 [P] Define User interface in packages/universo-types/base/src/interfaces/user.ts
- [ ] T024 [P] Define AuthSession interface in packages/universo-types/base/src/interfaces/auth-session.ts
- [ ] T025 [P] Define AppConfig interface in packages/universo-types/base/src/interfaces/app-config.ts
- [ ] T026 [P] Define ApiResponse generic interface in packages/universo-types/base/src/interfaces/api-response.ts
- [ ] T027 [P] Define PaginatedResponse generic interface in packages/universo-types/base/src/interfaces/paginated-response.ts
- [ ] T028 [P] Define PackageInfo interface in packages/universo-types/base/src/interfaces/package-info.ts
- [ ] T029 [P] Define Translation types in packages/universo-types/base/src/types/translation.ts
- [ ] T030 Create index.ts barrel export for universo-types in packages/universo-types/base/src/index.ts
- [ ] T031 [P] Create English README for universo-types in packages/universo-types/base/README.md
- [ ] T032 [P] Create Russian README for universo-types in packages/universo-types/base/README-RU.md
- [ ] T033 Build universo-types package

### universo-utils Package Implementation

- [ ] T034 Create package.json for universo-utils in packages/universo-utils/base/package.json
- [ ] T035 Create tsconfig.json for universo-utils in packages/universo-utils/base/tsconfig.json
- [ ] T036 [P] Implement string utilities in packages/universo-utils/base/src/utils/string-utils.ts
- [ ] T037 [P] Implement date utilities in packages/universo-utils/base/src/utils/date-utils.ts
- [ ] T038 [P] Implement validation utilities in packages/universo-utils/base/src/utils/validation-utils.ts
- [ ] T039 Create index.ts barrel export for universo-utils in packages/universo-utils/base/src/index.ts
- [ ] T040 [P] Create English README for universo-utils in packages/universo-utils/base/README.md
- [ ] T041 [P] Create Russian README for universo-utils in packages/universo-utils/base/README-RU.md
- [ ] T042 Build universo-utils package

### universo-api-client Package Implementation

- [ ] T043 Create package.json for universo-api-client in packages/universo-api-client/base/package.json
- [ ] T044 Create tsconfig.json for universo-api-client in packages/universo-api-client/base/tsconfig.json
- [ ] T045 Implement base HTTP client in packages/universo-api-client/base/src/clients/base-http-client.ts
- [ ] T046 Implement auth API client interface in packages/universo-api-client/base/src/clients/auth-client.ts
- [ ] T047 [P] Define request/response types in packages/universo-api-client/base/src/types/api-types.ts
- [ ] T048 Create index.ts barrel export for universo-api-client in packages/universo-api-client/base/src/index.ts
- [ ] T049 [P] Create English README for universo-api-client in packages/universo-api-client/base/README.md
- [ ] T050 [P] Create Russian README for universo-api-client in packages/universo-api-client/base/README-RU.md
- [ ] T051 Build universo-api-client package

### universo-i18n Package Implementation

- [ ] T052 Create package.json for universo-i18n in packages/universo-i18n/base/package.json
- [ ] T053 Create tsconfig.json for universo-i18n in packages/universo-i18n/base/tsconfig.json
- [ ] T054 Create English translation file in packages/universo-i18n/base/src/locales/en/common.json
- [ ] T055 Create Russian translation file in packages/universo-i18n/base/src/locales/ru/common.json
- [ ] T056 Implement i18n configuration for Angular (ngx-translate) in packages/universo-i18n/base/src/angular-i18n.ts
- [ ] T057 Implement i18n configuration for Go in packages/universo-i18n/base/src/go-i18n.ts
- [ ] T058 Create index.ts barrel export for universo-i18n in packages/universo-i18n/base/src/index.ts
- [ ] T059 [P] Create English README for universo-i18n in packages/universo-i18n/base/README.md
- [ ] T060 [P] Create Russian README for universo-i18n in packages/universo-i18n/base/README-RU.md
- [ ] T061 Build universo-i18n package

### universo-rest-docs Package Implementation

- [ ] T062 Create package.json for universo-rest-docs in packages/universo-rest-docs/base/package.json
- [ ] T063 Create tsconfig.json for universo-rest-docs in packages/universo-rest-docs/base/tsconfig.json
- [ ] T064 Implement Swagger/OpenAPI server setup in packages/universo-rest-docs/base/src/index.ts
- [ ] T065 Create auth API OpenAPI specification in packages/universo-rest-docs/base/src/swagger/auth-api.yaml
- [ ] T066 [P] Create English README for universo-rest-docs in packages/universo-rest-docs/base/README.md
- [ ] T067 [P] Create Russian README for universo-rest-docs in packages/universo-rest-docs/base/README-RU.md
- [ ] T068 Build universo-rest-docs package

### universo-ng-components Package Implementation

- [ ] T069 Create Angular library package for universo-ng-components using Nx in packages/universo-ng-components/base/
- [ ] T070 Create ng-package.json for Angular library configuration in packages/universo-ng-components/base/ng-package.json
- [ ] T071 Create public-api.ts for library exports in packages/universo-ng-components/base/src/public-api.ts
- [ ] T072 [P] Create placeholder component (to be populated with shared components later) in packages/universo-ng-components/base/src/lib/components/placeholder.component.ts
- [ ] T073 [P] Create shared pipes directory structure in packages/universo-ng-components/base/src/lib/pipes/
- [ ] T074 [P] Create shared directives directory structure in packages/universo-ng-components/base/src/lib/directives/
- [ ] T075 [P] Create shared services directory structure in packages/universo-ng-components/base/src/lib/services/
- [ ] T076 Setup assets directory structure (icons/, images/) in packages/universo-ng-components/base/src/assets/
- [ ] T077 Setup i18n directory structure (en/, ru/) with translation.json files in packages/universo-ng-components/base/src/i18n/
- [ ] T078 [P] Create English README for universo-ng-components in packages/universo-ng-components/base/README.md
- [ ] T079 [P] Create Russian README for universo-ng-components in packages/universo-ng-components/base/README-RU.md
- [ ] T080 Build universo-ng-components package

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Repository Setup and Standards (Priority: P1) 🎯 MVP

**Goal**: Establish comprehensive repository documentation, bilingual READMEs, and clear contribution standards so new developers can understand project structure and contribute effectively.

**Independent Test**: Clone repository on fresh machine, read README files in both languages, review standards documentation, verify understanding of monorepo structure and contribution workflow.

### Implementation for User Story 1

- [ ] T081 [P] [US1] Enhance root README.md with project overview, architecture reference to universo-platformo-react, and Angular/Gin stack details at /home/runner/work/universo-platformo-angular/universo-platformo-angular/README.md
- [ ] T082 [P] [US1] Enhance root README-RU.md with identical content to README.md in Russian at /home/runner/work/universo-platformo-angular/universo-platformo-angular/README-RU.md
- [ ] T083 [P] [US1] Update packages/README.md with detailed package organization explanation and naming conventions at /home/runner/work/universo-platformo-angular/universo-platformo-angular/packages/README.md
- [ ] T084 [US1] Document monorepo structure with diagram in README.md
- [ ] T085 [US1] Document PNPM workspace usage and commands in README.md
- [ ] T086 [US1] Add setup instructions section to README.md (prerequisites, installation steps)
- [ ] T087 [US1] Add quick start guide section to README.md
- [ ] T088 [US1] Document contribution workflow (Issues → Branch → PR) in README.md
- [ ] T089 [US1] Add section on package-first architecture principle in README.md
- [ ] T090 [US1] Add future roadmap section referencing universo-platformo-react patterns in README.md
- [ ] T091 [US1] Ensure README-RU.md matches README.md exactly (line count, structure) in Russian
- [ ] T092 [US1] Verify all .github/instructions files are comprehensive and up-to-date
- [ ] T093 [US1] Create CONTRIBUTING.md with detailed contribution guidelines at /home/runner/work/universo-platformo-angular/universo-platformo-angular/CONTRIBUTING.md
- [ ] T094 [US1] Create CONTRIBUTING-RU.md with Russian translation at /home/runner/work/universo-platformo-angular/universo-platformo-angular/CONTRIBUTING-RU.md

**Checkpoint**: At this point, User Story 1 should be fully functional - any developer can clone the repository and understand how to contribute

---

## Phase 4: User Story 2 - Basic Package Infrastructure (Priority: P2)

**Goal**: Establish reusable patterns for creating feature packages with frontend and backend components, ensuring PNPM workspace dependencies work correctly.

**Independent Test**: Create a sample feature package following established patterns, verify PNPM workspace resolution, confirm shared packages are accessible, test build process.

### Implementation for User Story 2

- [ ] T095 [P] [US2] Create detailed package template documentation in packages/TEMPLATE-README.md covering structure, dependencies, build, test sections
- [ ] T096 [P] [US2] Create comprehensive template guide in packages/TEMPLATE-README-GUIDE.md explaining placeholders, conditional sections, bilingual requirements
- [ ] T097 [US2] Document base/ directory convention and future extensibility in packages/README.md
- [ ] T098 [US2] Document frontend package pattern (*-frt) with Angular specifics in packages/README.md
- [ ] T099 [US2] Document backend package pattern (*-srv) with Go specifics in packages/README.md
- [ ] T100 [US2] Document shared infrastructure package pattern (universo-*) in packages/README.md
- [ ] T101 [US2] Create example package structure documentation showing all standard directories (src/, assets/, i18n/, configs/, validators/, features/)
- [ ] T102 [US2] Document PNPM workspace protocol usage for internal dependencies in packages/README.md
- [ ] T103 [US2] Document package versioning strategy (semantic versioning) in packages/README.md
- [ ] T104 [US2] Create script to scaffold new packages at /home/runner/work/universo-platformo-angular/universo-platformo-angular/scripts/create-package.sh
- [ ] T105 [US2] Update root package.json with package lifecycle scripts (build, test, lint, clean)
- [ ] T106 [US2] Configure Nx to recognize and build all package types (Angular, Go, TypeScript)
- [ ] T107 [US2] Test PNPM workspace dependency resolution with existing packages
- [ ] T108 [US2] Document troubleshooting common package issues in packages/README.md

**Checkpoint**: At this point, User Stories 1 AND 2 should both work - developers can create new packages following established patterns

---

## Phase 5: User Story 3 - Development Environment Configuration (Priority: P3)

**Goal**: Configure development environment with hot-reload for both Angular and Gin, ensuring developers can productively work on frontend or backend.

**Independent Test**: Follow setup instructions on clean machine, start Angular dev server with hot-reload, start Gin server with hot-reload, verify changes trigger auto-refresh.

### Implementation for User Story 3

- [ ] T109 [US3] Install and configure Nx CLI globally and in workspace at /home/runner/work/universo-platformo-angular/universo-platformo-angular/nx.json
- [ ] T110 [US3] Configure Nx executors for Angular packages in nx.json
- [ ] T111 [US3] Configure Nx executors for Go packages in nx.json
- [ ] T112 [US3] Create development script for running all packages in root package.json
- [ ] T113 [US3] Create development script for frontend only in root package.json
- [ ] T114 [US3] Create development script for backend only in root package.json
- [ ] T115 [US3] Configure Angular CLI for hot module replacement (HMR) in angular.json (if applicable)
- [ ] T116 [US3] Setup Air or Fresh for Go hot-reload (document in quickstart.md)
- [ ] T117 [US3] Configure CORS for development environment in backend packages
- [ ] T118 [US3] Setup environment variable loading (.env support) for frontend
- [ ] T119 [US3] Setup environment variable loading (.env support) for backend
- [ ] T120 [US3] Create VS Code workspace settings for recommended extensions at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.vscode/settings.json
- [ ] T121 [US3] Create VS Code launch configurations for debugging at /home/runner/work/universo-platformo-angular/universo-platformo-angular/.vscode/launch.json
- [ ] T122 [US3] Document development workflow in quickstart.md (starting servers, making changes, debugging)
- [ ] T123 [US3] Create troubleshooting guide for common development environment issues in quickstart.md

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work - developers have a fully functional development environment

---

## Phase 6: User Story 4 - Database and Authentication Foundation (Priority: P4)

**Goal**: Integrate Supabase for data persistence and implement authentication packages (auth-frt and auth-srv) to enable user management features.

**Independent Test**: Configure Supabase credentials, run authentication flow (sign up, sign in, sign out), verify JWT tokens, test protected routes, confirm database operations.

### Authentication Frontend Package (auth-frt)

**Note**: Following enhanced package structure with assets/ and i18n/ directories for package-level resources

- [ ] T124 [US4] Create Angular library package for auth-frt using Nx in packages/auth-frt/base/
- [ ] T125 [US4] Create ng-package.json for auth-frt in packages/auth-frt/base/ng-package.json
- [ ] T126 [US4] Create package.json for auth-frt with dependencies (Angular, RxJS, universo-types, universo-api-client, universo-i18n) in packages/auth-frt/base/package.json
- [ ] T127 [P] [US4] Implement AuthService for state management in packages/auth-frt/base/src/lib/services/auth.service.ts
- [ ] T128 [P] [US4] Implement TokenService for JWT token management in packages/auth-frt/base/src/lib/services/token.service.ts
- [ ] T129 [P] [US4] Implement SessionGuard for route protection in packages/auth-frt/base/src/lib/guards/session.guard.ts
- [ ] T130 [P] [US4] Implement AuthInterceptor for attaching JWT tokens to HTTP requests in packages/auth-frt/base/src/lib/interceptors/auth.interceptor.ts
- [ ] T131 [P] [US4] Create LoginFormComponent in packages/auth-frt/base/src/lib/components/login-form/login-form.component.ts
- [ ] T132 [P] [US4] Create SignUpFormComponent in packages/auth-frt/base/src/lib/components/signup-form/signup-form.component.ts
- [ ] T133 [P] [US4] Create LogoutButtonComponent in packages/auth-frt/base/src/lib/components/logout-button/logout-button.component.ts
- [ ] T134 [P] [US4] Create UserProfileComponent in packages/auth-frt/base/src/lib/components/user-profile/user-profile.component.ts
- [ ] T135 [US4] Setup assets directory with auth icons in packages/auth-frt/base/src/assets/icons/
- [ ] T136 [US4] Create English translations for auth-frt in packages/auth-frt/base/src/i18n/en/translations.json
- [ ] T137 [US4] Create Russian translations for auth-frt in packages/auth-frt/base/src/i18n/ru/translations.json
- [ ] T138 [US4] Create public-api.ts barrel export for auth-frt in packages/auth-frt/base/src/public-api.ts
- [ ] T139 [P] [US4] Create English README for auth-frt in packages/auth-frt/base/README.md
- [ ] T140 [P] [US4] Create Russian README for auth-frt in packages/auth-frt/base/README-RU.md
- [ ] T141 [US4] Build auth-frt package

### Authentication Backend Package (auth-srv)

**Note**: Following enhanced package structure with validators/ and configs/ directories for better organization

- [ ] T142 [US4] Create Go module for auth-srv in packages/auth-srv/base/
- [ ] T143 [US4] Initialize go.mod for auth-srv in packages/auth-srv/base/go.mod
- [ ] T144 [US4] Create main server entry point in packages/auth-srv/base/cmd/server/main.go
- [ ] T145 [US4] Add dependencies (Gin, supabase-go, gin-jwt, golang-jwt) to go.mod
- [ ] T146 [P] [US4] Implement SignUpHandler in packages/auth-srv/base/internal/handlers/signup.go
- [ ] T147 [P] [US4] Implement SignInHandler in packages/auth-srv/base/internal/handlers/signin.go
- [ ] T148 [P] [US4] Implement SignOutHandler in packages/auth-srv/base/internal/handlers/signout.go
- [ ] T149 [P] [US4] Implement RefreshTokenHandler in packages/auth-srv/base/internal/handlers/refresh.go
- [ ] T150 [P] [US4] Implement GetSessionHandler in packages/auth-srv/base/internal/handlers/session.go
- [ ] T151 [US4] Implement AuthMiddleware for JWT validation in packages/auth-srv/base/internal/middleware/auth.go
- [ ] T152 [US4] Implement CORS middleware in packages/auth-srv/base/internal/middleware/cors.go
- [ ] T153 [US4] Implement logging middleware in packages/auth-srv/base/internal/middleware/logger.go
- [ ] T154 [US4] Implement recovery middleware (panic handling) in packages/auth-srv/base/internal/middleware/recovery.go
- [ ] T155 [US4] Implement AuthService for business logic in packages/auth-srv/base/internal/services/auth_service.go
- [ ] T156 [US4] Implement SessionService in packages/auth-srv/base/internal/services/session_service.go
- [ ] T157 [US4] Implement Supabase client wrapper in packages/auth-srv/base/internal/repository/supabase.go
- [ ] T158 [P] [US4] Implement request validators in packages/auth-srv/base/internal/validators/auth_validators.go
- [ ] T159 [US4] Implement configuration loader in packages/auth-srv/base/internal/configs/config.go
- [ ] T160 [US4] Setup router with all auth endpoints in packages/auth-srv/base/internal/routes/routes.go
- [ ] T161 [US4] Implement health check endpoint in packages/auth-srv/base/internal/handlers/health.go
- [ ] T162 [P] [US4] Create English README for auth-srv in packages/auth-srv/base/README.md
- [ ] T163 [P] [US4] Create Russian README for auth-srv in packages/auth-srv/base/README-RU.md
- [ ] T164 [US4] Build auth-srv package

### Authentication Integration and Testing

- [ ] T165 [US4] Update .env.example with Supabase configuration variables
- [ ] T166 [US4] Document Supabase setup process in quickstart.md
- [ ] T167 [US4] Update universo-rest-docs with complete auth API OpenAPI specification
- [ ] T168 [US4] Create integration example showing auth-frt + auth-srv usage
- [ ] T169 [US4] Document authentication flow (sign up → confirm email → sign in → access protected routes) in auth packages READMEs
- [ ] T170 [US4] Document JWT token handling and refresh mechanism
- [ ] T171 [US4] Test complete authentication flow end-to-end

**Checkpoint**: At this point, User Stories 1-4 should all work - authentication system is functional with Supabase integration

---

## Phase 7: User Story 5 - UI Component Library Setup (Priority: P5)

**Goal**: Configure Angular Material (MUI) for consistent UI components across the application, enabling developers to build user interfaces with Material Design.

**Independent Test**: Create sample pages using Angular Material components, verify theme configuration, test components render correctly, validate responsive behavior.

### Implementation for User Story 5

- [ ] T172 [US5] Install Angular Material and dependencies in root package.json
- [ ] T173 [US5] Add Angular Material to PNPM catalog in pnpm-workspace.yaml
- [ ] T174 [US5] Create shared theme configuration in packages/universo-ng-components/base/src/lib/theme/
- [ ] T175 [US5] Define primary, accent, and warn color palettes in theme configuration
- [ ] T176 [US5] Configure Angular Material typography in theme
- [ ] T177 [US5] Setup global Material styles in universo-ng-components
- [ ] T178 [P] [US5] Create reusable Material dialog wrapper component in packages/universo-ng-components/base/src/lib/components/dialog/
- [ ] T179 [P] [US5] Create reusable Material card component in packages/universo-ng-components/base/src/lib/components/card/
- [ ] T180 [P] [US5] Create reusable Material form field component in packages/universo-ng-components/base/src/lib/components/form-field/
- [ ] T181 [P] [US5] Create reusable Material button component in packages/universo-ng-components/base/src/lib/components/button/
- [ ] T182 [P] [US5] Create reusable Material table component in packages/universo-ng-components/base/src/lib/components/table/
- [ ] T183 [US5] Create Material icon registry service in packages/universo-ng-components/base/src/lib/services/icon-registry.service.ts
- [ ] T184 [US5] Configure responsive breakpoints using Material CDK in universo-ng-components
- [ ] T185 [US5] Create example page demonstrating Material components in auth-frt
- [ ] T186 [US5] Update auth-frt login and signup forms to use Material components
- [ ] T187 [US5] Document Material theme customization in universo-ng-components README
- [ ] T188 [US5] Document available shared Material components in universo-ng-components README
- [ ] T189 [US5] Update universo-ng-components package with Material setup instructions
- [ ] T190 [US5] Test Material components across Chrome, Firefox, and Safari
- [ ] T191 [US5] Verify responsive behavior on different viewport sizes

**Checkpoint**: All user stories should now be independently functional - developers can use Material UI for building interfaces

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T192 [P] Create comprehensive architecture documentation referencing universo-platformo-react patterns and architecture-comparison.md
- [ ] T193 [P] Create migration guide from React patterns to Angular/Go patterns
- [ ] T194 [P] Document three-entity pattern (Clusters/Domains/Resources structure) for future features
- [ ] T195 [P] Setup CI/CD workflows in .github/workflows/ (build, test, lint)
- [ ] T196 [P] Configure ESLint and Prettier for TypeScript packages
- [ ] T197 [P] Configure golangci-lint for Go packages
- [ ] T198 Setup pre-commit hooks for linting and formatting
- [ ] T199 Create GitHub issue templates at .github/ISSUE_TEMPLATE/
- [ ] T200 Create pull request template at .github/PULL_REQUEST_TEMPLATE.md
- [ ] T201 Verify all bilingual documentation has identical structure (line count matching)
- [ ] T202 Run full build of all packages in correct order
- [ ] T203 Validate PNPM workspace dependencies resolve correctly
- [ ] T204 Test hot-reload functionality for frontend and backend
- [ ] T205 Verify Nx affected commands work correctly
- [ ] T206 Test complete authentication flow end-to-end
- [ ] T207 Validate Angular Material components render correctly
- [ ] T208 Review and update all package READMEs for completeness
- [ ] T209 Run quickstart.md validation on clean environment
- [ ] T210 Create release checklist document
- [ ] T211 Final verification of constitution compliance (all code in packages/, no forbidden patterns)
- [ ] T212 Verify package structure follows architecture-comparison.md patterns (assets/, i18n/, validators/, configs/)
- [ ] T213 Create LICENSE file with Omsk Open License at /home/runner/work/universo-platformo-angular/universo-platformo-angular/LICENSE
- [ ] T214 Document React repository sync workflow (FR-048 to FR-050) explaining process for monitoring and evaluating new features from universo-platformo-react

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in priority order (P1 → P2 → P3 → P4 → P5)
  - OR can be worked on in parallel with sufficient team capacity
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 documentation but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Uses packages from US2 but independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Uses shared packages but independently testable
- **User Story 5 (P5)**: Can start after US4 (auth-frt exists) - Enhances US4 with Material UI

### Within Each User Story

- **US1**: Documentation tasks can mostly run in parallel
- **US2**: Documentation and template tasks can run in parallel
- **US3**: Configuration tasks are mostly sequential (Nx → executors → scripts)
- **US4**: Frontend and backend packages can be built in parallel, then integrated
- **US5**: Material setup → component creation (parallelizable) → integration

### Parallel Opportunities

**Setup Phase**:
- T006, T007, T008, T009, T010 can run in parallel (different README files)

**Foundational Phase**:
- T015-T020: Create all package structures in parallel
- T023-T029: Define all interfaces in parallel
- T031, T032: README creation in parallel
- T036-T038: Utility implementations in parallel
- T040, T041: README creation in parallel
- T049, T050: README creation in parallel
- T059, T060: README creation in parallel
- T066, T067: README creation in parallel
- T072-T075: Component directory structures in parallel
- T078, T079: README creation in parallel

**User Story 1**:
- T081, T082, T083: All README files in parallel
- T093, T094: CONTRIBUTING files in parallel

**User Story 2**:
- T095, T096: Template documentation in parallel

**User Story 4**:
- T127-T134: All auth-frt services, guards, components in parallel
- T138, T139: README creation in parallel
- T145-T149: All auth-srv handlers in parallel
- T161, T162: README creation in parallel
- Frontend (T124-T140) and Backend (T141-T163) can be developed in parallel

**User Story 5**:
- T177-T181: All Material components in parallel

---

## Parallel Example: User Story 4 (Authentication)

```bash
# Launch frontend and backend package creation in parallel:
Task T124: "Create Angular library package for auth-frt"
Task T141: "Create Go module for auth-srv"

# Launch all auth-frt services in parallel:
Task T127: "Implement AuthService"
Task T128: "Implement TokenService"
Task T129: "Implement SessionGuard"
Task T130: "Implement AuthInterceptor"

# Launch all auth-frt components in parallel:
Task T131: "Create LoginFormComponent"
Task T132: "Create SignUpFormComponent"
Task T133: "Create LogoutButtonComponent"
Task T134: "Create UserProfileComponent"

# Launch all auth-srv handlers in parallel:
Task T145: "Implement SignUpHandler"
Task T146: "Implement SignInHandler"
Task T147: "Implement SignOutHandler"
Task T148: "Implement RefreshTokenHandler"
Task T149: "Implement GetSessionHandler"
```

---

## Implementation Strategy

### MVP First (Phases 1-3: Setup + Foundational + User Story 1)

1. Complete Phase 1: Setup (T001-T014)
2. Complete Phase 2: Foundational (T015-T080) - CRITICAL foundation
3. Complete Phase 3: User Story 1 (T081-T094)
4. **STOP and VALIDATE**: Repository documentation complete
5. Deploy/demo if ready

**Rationale**: This gives a fully documented repository that developers can understand and contribute to. All shared infrastructure packages are built and ready for feature development.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready ✅
2. Add User Story 1 → Test independently → Documentation complete ✅
3. Add User Story 2 → Test independently → Package patterns established ✅
4. Add User Story 3 → Test independently → Development environment ready ✅
5. Add User Story 4 → Test independently → Authentication functional ✅
6. Add User Story 5 → Test independently → UI components ready ✅
7. Polish phase → Production ready ✅

Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (T001-T080)
2. **Once Foundational is done:**
   - Developer A: User Story 1 (Documentation)
   - Developer B: User Story 2 (Package Infrastructure)
   - Developer C: User Story 3 (Dev Environment)
   - Developer D: User Story 4 Frontend (auth-frt)
   - Developer E: User Story 4 Backend (auth-srv)
   - Developer F: User Story 5 (Material UI)
3. Stories complete and integrate independently

---

## Notes

- **[P] tasks**: Different files, no dependencies - can run in parallel
- **[Story] label**: Maps task to specific user story (US1-US5) for traceability
- Each user story should be independently completable and testable
- **Absolute paths**: All file paths use full repository path starting with /home/runner/work/universo-platformo-angular/universo-platformo-angular/
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **CRITICAL**: ALL implementation code MUST be in packages/ directory (no exceptions per Constitution v1.0.3)
- Follow bilingual documentation requirement: English first, then Russian with identical structure

---

## Scope Clarification

**This specification covers project initialization (foundation infrastructure) only.**

The Feature Development Roadmap (FR-064) mentions "First complete feature (Clusters)" as a reference pattern implementation. This first domain feature (clusters-frt/clusters-srv packages) will be specified and implemented in a **separate specification** (e.g., `002-clusters-feature`) after this initialization is complete.

**Foundation tasks in this spec provide:**
1. ✅ Complete shared infrastructure packages (universo-types, universo-utils, etc.)
2. ✅ Complete authentication system (auth-frt, auth-srv)
3. ✅ Angular Material component library setup
4. ✅ Documentation, templates, and standards
5. ✅ Build system and development environment

**The following will be covered in subsequent specifications:**
- First domain feature package (Clusters) demonstrating three-entity pattern
- Additional domain features (Metaverses, Uniks, Spaces/Canvases)
- Advanced features (UPDL, Publication, Templates, Multiplayer)

---

## Summary Statistics

- **Total Tasks**: 216 (updated to include Nx sub-tasks T004a, T004b and new tasks T213, T214)
- **Setup Phase**: 16 tasks (including Nx configuration sub-tasks)
- **Foundational Phase**: 66 tasks (shared infrastructure)
- **User Story 1**: 14 tasks (Repository documentation)
- **User Story 2**: 14 tasks (Package infrastructure)
- **User Story 3**: 15 tasks (Development environment)
- **User Story 4**: 48 tasks (Authentication - frontend + backend)
- **User Story 5**: 20 tasks (Material UI)
- **Polish Phase**: 24 tasks (Cross-cutting concerns, including T213 and T214)

**Parallel Opportunities**: 
- Setup: 5 parallel tasks
- Foundational: 30+ parallel tasks (models, utilities, components)
- US1: 3 parallel groups
- US2: 2 parallel groups
- US4: 20+ parallel tasks (services, components, handlers)
- US5: 5 parallel tasks (Material components)

**MVP Scope**: Phases 1-3 (Setup + Foundational + User Story 1) = 96 tasks
- Provides fully documented repository with all shared infrastructure
- Ready for feature development to begin

**Suggested Delivery Order**:
1. **Sprint 1**: Setup + Foundational (T001-T080) - Foundation
2. **Sprint 2**: User Story 1 + User Story 2 (T081-T108) - Documentation & Patterns
3. **Sprint 3**: User Story 3 + User Story 4 (T109-T171) - Dev Environment & Auth
4. **Sprint 4**: User Story 5 + Polish (T172-T212) - UI & Production Ready

**Architecture Enhancements** (from architecture-comparison.md):
- ✅ Package-level assets/ directories for icons and images
- ✅ Package-level i18n/ directories with en/ru subdirectories
- ✅ Backend validators/ directories for input validation
- ✅ Backend configs/ directories for configuration constants
- ✅ Bilingual README files for all packages
- ✅ Enhanced package structure patterns from universo-platformo-react analysis
