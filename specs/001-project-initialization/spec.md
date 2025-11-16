# Feature Specification: Universo Platformo Angular - Project Initialization

**Feature Branch**: `001-project-initialization`  
**Created**: 2025-11-16  
**Status**: Draft  
**Input**: User description: "Initialize Universo Platformo Angular project - Setup monorepo structure with PNPM, implement Angular/TypeScript frontend and Gin/Go backend, configure base packages, integrate Supabase, setup Passport.js authentication, use Material UI (MUI), create bilingual README files, and establish repository standards following best practices from universo-platformo-react"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Repository Setup and Standards (Priority: P1)

A development team member needs to understand the project structure, access repository documentation, and follow established standards for contributing to the Universo Platformo Angular project.

**Why this priority**: This is the foundation for all development work. Without proper repository setup and clear standards, no other development can proceed effectively.

**Independent Test**: Can be fully tested by cloning the repository, reading README files in both English and Russian, understanding the monorepo structure, and verifying that basic repository standards are documented and accessible.

**Acceptance Scenarios**:

1. **Given** a new developer joining the project, **When** they clone the repository, **Then** they find comprehensive README files in both English and Russian explaining the project purpose, architecture, and setup instructions
2. **Given** a developer wants to contribute, **When** they review repository standards, **Then** they find clear guidelines for creating Issues (with bilingual support), Pull Requests, using labels, and internationalization practices
3. **Given** a developer needs to understand project structure, **When** they explore the repository, **Then** they find a logical monorepo layout with packages organized in a `packages/` directory following naming conventions (e.g., `*-frt` for frontend, `*-srv` for backend)
4. **Given** a developer wants to add dependencies, **When** they review package management documentation, **Then** they understand how to use PNPM for workspace management

---

### User Story 2 - Basic Package Infrastructure (Priority: P2)

A developer needs to create a new feature package that includes both frontend and backend components, following the established monorepo patterns.

**Why this priority**: This establishes the reusable patterns for all future feature development and ensures consistency across the codebase.

**Independent Test**: Can be fully tested by creating a sample package with frontend and backend components, verifying that PNPM workspaces work correctly, and confirming that the base structure can be replicated.

**Acceptance Scenarios**:

1. **Given** a developer wants to create a new feature, **When** they scaffold a new package, **Then** they can create separate frontend (`*-frt`) and backend (`*-srv`) packages with `base/` directories
2. **Given** a package requires shared configuration, **When** developers examine the package structure, **Then** they find the `base/` directory contains foundational code that can be extended for different implementations
3. **Given** multiple packages exist, **When** a developer runs build commands, **Then** PNPM correctly manages dependencies and builds packages in the proper order
4. **Given** a package needs to reference another package, **When** using PNPM workspace syntax, **Then** internal dependencies resolve correctly

---

### User Story 3 - Development Environment Configuration (Priority: P3)

A developer needs to set up their local development environment with all necessary tools and configurations to begin working on either frontend or backend components.

**Why this priority**: While important for productive development, this can be completed after the basic structure is in place and doesn't block understanding the architecture.

**Independent Test**: Can be fully tested by following setup instructions on a clean machine, successfully running development servers for both Angular and Gin components, and verifying hot-reload functionality.

**Acceptance Scenarios**:

1. **Given** a developer has Node.js and Go installed, **When** they follow setup instructions, **Then** they successfully install PNPM, project dependencies, and can start development servers
2. **Given** a developer wants to work on frontend code, **When** they start the Angular development server, **Then** they see the application running with hot-reload enabled
3. **Given** a developer wants to work on backend code, **When** they start the Gin server, **Then** it runs successfully and can communicate with Supabase
4. **Given** a developer modifies code, **When** they save changes, **Then** appropriate hot-reload mechanisms refresh the application without manual restart

---

### User Story 4 - Database and Authentication Foundation (Priority: P4)

A developer needs to integrate Supabase for data persistence and configure Passport.js authentication to enable user management features.

**Why this priority**: This is a foundational service but can be implemented after the basic project structure is established. Many initial development tasks don't require authentication.

**Independent Test**: Can be fully tested by configuring Supabase credentials, implementing a test authentication flow, verifying database connections, and confirming that Passport.js strategies work correctly.

**Acceptance Scenarios**:

1. **Given** Supabase credentials are configured, **When** the backend server starts, **Then** it successfully connects to Supabase and can perform basic database operations
2. **Given** a user attempts to authenticate, **When** they provide valid credentials, **Then** Passport.js processes the authentication and returns appropriate session tokens
3. **Given** the project needs future database flexibility, **When** developers examine the data access layer, **Then** they find abstractions that would allow adding other database systems
4. **Given** authentication is configured, **When** protected routes are accessed, **Then** Passport.js middleware correctly validates user sessions

---

### User Story 5 - UI Component Library Setup (Priority: P5)

A developer needs to use Material UI (MUI) components to build consistent user interfaces across the application.

**Why this priority**: UI development can begin after the basic Angular structure is in place. Initial focus should be on architecture rather than visual polish.

**Independent Test**: Can be fully tested by creating sample pages using MUI components, verifying theme configuration, and ensuring components render correctly across different screen sizes.

**Acceptance Scenarios**:

1. **Given** Angular is configured, **When** developers import MUI components, **Then** they render correctly with proper styling
2. **Given** the application needs consistent theming, **When** MUI theme is configured, **Then** all components inherit the theme settings
3. **Given** developers want to use MUI icons and utilities, **When** they import from MUI packages, **Then** TypeScript types are available and components work as expected
4. **Given** responsive design is needed, **When** using MUI's responsive utilities, **Then** layouts adapt appropriately to different viewport sizes

---

### Edge Cases

- What happens when PNPM workspace references are circular between packages?
- How does the system handle missing Supabase credentials during development?
- What occurs when developers try to create packages without following the naming conventions (`*-frt`, `*-srv`)?
- How does the build system behave when Go and Node.js versions don't meet minimum requirements?
- What happens when bilingual documentation files fall out of sync (different line counts between English and Russian versions)?
- How does Passport.js handle authentication when Supabase is temporarily unavailable?
- What occurs when developers try to add database providers other than Supabase without proper abstraction?

## Requirements *(mandatory)*

### Functional Requirements

#### Repository Structure & Standards
- **FR-001**: Repository MUST be organized as a monorepo with PNPM workspace management
- **FR-002**: Repository MUST contain a `packages/` directory for all feature packages
- **FR-003**: Feature packages MUST follow naming convention with `-frt` suffix for frontend and `-srv` suffix for backend components
- **FR-004**: Each package MUST include a `base/` directory for foundational code that can be extended
- **FR-005**: Repository MUST include comprehensive README files in both English and Russian with identical structure and line count
- **FR-006**: Repository MUST provide documented standards for creating Issues with bilingual support using `<details>` tags with exact `<summary>In Russian</summary>` format
- **FR-007**: Repository MUST provide documented standards for creating Pull Requests with appropriate labels
- **FR-008**: Repository MUST provide documented standards for internationalization of documentation files
- **FR-009**: Repository MUST provide documented label guidelines with instructions to fetch current repository labels before use

#### Package Management & Build System
- **FR-010**: Project MUST use PNPM for package management and workspace configuration
- **FR-011**: Monorepo MUST support internal package dependencies via PNPM workspace protocol
- **FR-012**: Build system MUST compile TypeScript code for frontend packages
- **FR-013**: Build system MUST compile Go code for backend packages
- **FR-014**: Development environment MUST support hot-reload for both Angular and Gin servers

#### Frontend Infrastructure
- **FR-015**: Frontend packages MUST use Angular framework with TypeScript
- **FR-016**: Frontend packages MUST integrate Material UI (MUI) for component library
- **FR-017**: Frontend MUST support responsive design patterns
- **FR-018**: Frontend build system MUST produce optimized production bundles

#### Backend Infrastructure
- **FR-019**: Backend packages MUST use Gin framework with Go
- **FR-020**: Backend MUST implement RESTful API patterns for frontend communication
- **FR-021**: Backend MUST handle CORS configuration for development and production environments
- **FR-022**: Backend MUST include error handling and logging mechanisms

#### Database & Authentication
- **FR-023**: Project MUST integrate with Supabase as the primary database provider
- **FR-024**: Backend MUST implement Passport.js for authentication middleware
- **FR-025**: Authentication MUST support Supabase authentication connector
- **FR-026**: Data access layer MUST be designed to potentially support additional database providers in the future
- **FR-027**: Database connection configuration MUST support environment-specific settings

#### Documentation & Developer Experience
- **FR-028**: Each package MUST include its own README file explaining its purpose and usage
- **FR-029**: Root README MUST explain overall project architecture and reference universo-platformo-react as the conceptual basis
- **FR-030**: Documentation MUST clarify that this implementation adapts concepts from universo-platformo-react to Angular/Gin stack
- **FR-031**: Setup instructions MUST include prerequisites for Node.js, Go, and PNPM
- **FR-032**: Repository MUST include example package templates for consistent scaffolding

### Key Entities

- **Package**: A modular unit of functionality within the monorepo, typically split into frontend and backend components
  - Contains `base/` directory for core functionality
  - Has its own dependencies and build configuration
  - Follows naming convention (`*-frt` for frontend, `*-srv` for backend)
  - Examples: `clusters-frt`, `clusters-srv`, `metaverses-frt`, `metaverses-srv`

- **Workspace**: The PNPM-managed monorepo structure that coordinates multiple packages
  - Manages internal package dependencies
  - Provides unified dependency installation
  - Enables parallel builds across packages

- **Base Structure**: The foundational code within each package's `base/` directory
  - Provides core functionality that can be extended or customized
  - Allows for future alternative implementations of the same feature
  - Contains shared types, interfaces, and utilities

- **Documentation Set**: Bilingual documentation files that maintain identical structure
  - English version is the primary standard
  - Russian version mirrors English exactly (same structure, line count)
  - Both files updated together to maintain synchronization

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developers can clone the repository and understand its purpose within 5 minutes by reading bilingual README files
- **SC-002**: New developers can set up their development environment in under 30 minutes following documented instructions
- **SC-003**: Team members can create a new feature package following the established pattern in under 15 minutes
- **SC-004**: Build system successfully compiles all packages without errors on initial setup
- **SC-005**: Documentation maintains 100% synchronization between English and Russian versions (identical line count and structure)
- **SC-006**: PNPM workspace correctly resolves internal package dependencies without requiring manual intervention
- **SC-007**: Hot-reload functionality responds to code changes within 3 seconds for both frontend and backend
- **SC-008**: Developers can find and follow repository standards (Issues, PRs, labels, i18n) without external assistance
- **SC-009**: Authentication flow completes successfully when valid Supabase credentials are configured
- **SC-010**: MUI components render correctly across Chrome, Firefox, and Safari browsers
- **SC-011**: Repository structure is clear enough that 90% of new developers can identify where to add a new feature on first attempt
- **SC-012**: All package naming conventions are consistently applied across the monorepo (100% compliance with `-frt`/`-srv` suffixes)

## Assumptions

- **Technology Stack Versions**: Developers have access to reasonably recent versions of Node.js (v18+), Go (v1.20+), and can install PNPM
- **Development Environment**: Developers work on operating systems that support Node.js and Go (Linux, macOS, Windows with WSL)
- **Supabase Account**: Team has access to Supabase credentials or can create a Supabase project for development/testing
- **English Proficiency**: Primary development documentation is in English; Russian translations maintain identical structure
- **Git Familiarity**: Developers understand basic Git workflows including branches, commits, and pull requests
- **Package Naming**: The `-frt`/`-srv` suffix convention is sufficient for distinguishing frontend/backend packages at this stage
- **React Reference**: The universo-platformo-react repository serves as a conceptual guide but this implementation may diverge in technical details due to different technology stack
- **Legacy Code**: This is a fresh implementation and does not need to accommodate legacy code from the React version
- **Database Provider**: Supabase is the primary database for initial implementation, with future-proofing for other providers
- **Authentication Method**: Passport.js is the chosen authentication middleware, leveraging its ecosystem and Supabase connector
- **Material UI Compatibility**: MUI has Angular bindings or compatible alternatives available for the Angular ecosystem
- **Monorepo Benefits**: Using PNPM workspaces provides sufficient benefits for managing multiple packages compared to separate repositories
- **Build Tooling**: Standard Angular CLI and Go build tools are sufficient for the build system
- **Development Workflow**: Hot-reload is essential for developer productivity and worth the configuration effort

## Dependencies

### External Dependencies
- **universo-platformo-react repository**: Reference for overall architecture, concepts, and patterns (information dependency, not code dependency)
- **Supabase service**: Required for database operations and authentication backend
- **PNPM**: Required for package management and monorepo workspace orchestration
- **Node.js runtime**: Required for running Angular development servers and build tools
- **Go runtime**: Required for running Gin backend servers and compiling Go code
- **Angular framework**: Core dependency for frontend development
- **Gin framework**: Core dependency for backend development
- **Material UI (MUI)**: Required for UI component library (may need Angular-specific implementation)
- **Passport.js**: Required for authentication middleware

### Internal Dependencies
- **Repository standards documentation** (FR-006, FR-007, FR-008, FR-009): Must be created before developers can effectively contribute
- **PNPM workspace configuration**: Must be set up before packages can reference each other
- **Base package structure**: P1 foundation work must be completed before feature-specific packages can be developed
- **Development environment setup**: Must work before developers can test their code changes
- **Build system configuration**: Must be functional before production deployments can occur

### Documentation Dependencies
- **English README files**: Must be completed first as the primary standard
- **Russian README files**: Depend on English versions being finalized to ensure identical structure
- **.github/instructions files**: Must exist before developers can follow repository standards

### Sequencing Dependencies
1. **First**: Repository structure and standards documentation (P1)
2. **Second**: Package infrastructure and PNPM workspace setup (P2)
3. **Third**: Development environment configuration (P3)
4. **Fourth**: Database and authentication setup (P4)
5. **Fifth**: UI component library integration (P5)

This sequencing ensures each phase builds on the previous one and provides independently testable value.
