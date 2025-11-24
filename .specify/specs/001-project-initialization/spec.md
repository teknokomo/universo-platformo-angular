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
- How does the system handle features that require variations of the three-entity pattern (more or fewer entities)?
- What happens when a package is created without a backend component (-srv), only frontend (-frt)?
- How does the system support advanced features that extend beyond the base three-entity pattern (e.g., Spaces/Canvases with node systems)?

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
- **FR-015-NEW**: Project MUST use PNPM catalog in `pnpm-workspace.yaml` for centralized dependency version management to ensure consistent versions across all packages
- **FR-016-NEW**: Monorepo MUST use Nx or Turbo for build orchestration to enable efficient parallel builds and caching

#### Frontend Infrastructure
- **FR-017**: Frontend packages MUST use Angular framework with TypeScript
- **FR-018**: Frontend packages MUST integrate Angular Material (Material Design components for Angular) for component library
- **FR-019**: Frontend MUST support responsive design patterns
- **FR-020**: Frontend build system MUST produce optimized production bundles
- **FR-021-NEW**: Repository MUST include a shared Angular component library package (e.g., `universo-ng-components`) for common UI components extracted from feature packages to eliminate duplication
- **FR-022-NEW**: Shared component library MUST follow Angular library best practices with proper module exports and be published as an internal workspace package

#### Backend Infrastructure
- **FR-023**: Backend packages MUST use Gin framework with Go
- **FR-024**: Backend MUST implement RESTful API patterns for frontend communication
- **FR-025**: Backend MUST handle CORS configuration for development and production environments
- **FR-026**: Backend MUST include error handling and logging mechanisms

#### Database & Authentication
- **FR-027**: Project MUST integrate with Supabase as the primary database provider
- **FR-028**: Backend MUST implement Passport.js for authentication middleware (or equivalent Go authentication middleware with Supabase support)
- **FR-029**: Authentication MUST support Supabase authentication connector
- **FR-030**: Data access layer MUST implement an abstraction pattern (repository pattern or similar) that isolates database-specific code, with Supabase implementation behind clearly-defined interfaces to enable future addition of other database providers without modifying feature code
- **FR-031**: Database connection configuration MUST support environment-specific settings
- **FR-032-NEW**: Repository MUST include separate authentication packages: `auth-frt` (Angular authentication UI primitives with login forms, session guards, and auth hooks) and `auth-srv` (Go authentication backend with session management and JWT token handling)
- **FR-033-NEW**: Authentication architecture MUST support session-based authentication with JWT tokens, integrating with Supabase authentication service

#### Documentation & Developer Experience
- **FR-034**: Each package MUST include its own README file explaining its purpose and usage
- **FR-035**: Root README MUST explain overall project architecture and reference universo-platformo-react as the conceptual basis
- **FR-036**: Documentation MUST clarify that this implementation adapts concepts from universo-platformo-react to Angular/Gin stack
- **FR-037**: Setup instructions MUST include prerequisites for Node.js, Go, and PNPM
- **FR-038**: Repository MUST include example package templates for consistent scaffolding
- **FR-039-NEW**: Repository MUST provide standardized README templates (`TEMPLATE-README.md` and `TEMPLATE-README-GUIDE.md`) in the `packages/` directory for consistent package documentation
- **FR-040-NEW**: Each package README MUST follow the template structure including sections: Overview, Features, Installation, Usage, API Reference, Development, and Contributing

#### Shared Infrastructure Packages
- **FR-041-NEW**: Repository MUST include a `universo-types` package containing all shared TypeScript type definitions and interfaces used across the platform
- **FR-042-NEW**: Repository MUST include a `universo-utils` package containing shared utility functions and processors used across multiple applications
- **FR-043-NEW**: Repository MUST include a `universo-api-client` package providing TypeScript/Go API client libraries for backend services with type-safe interfaces
- **FR-044-NEW**: Repository MUST include a `universo-i18n` package providing centralized internationalization configuration and translation management for both Angular (ngx-translate) and Go applications
- **FR-045-NEW**: Repository MUST include a `universo-rest-docs` package providing API documentation server using OpenAPI/Swagger specifications auto-generated from code
- **FR-046-NEW**: All shared infrastructure packages MUST be built and published as internal workspace packages before feature packages that depend on them
- **FR-047-NEW**: Shared infrastructure packages MUST follow semantic versioning and maintain stable APIs to minimize breaking changes across dependent packages

#### Repository Synchronization & Workflow
- **FR-048**: Team MUST periodically monitor universo-platformo-react repository for new features and architectural concepts
- **FR-049**: New features from universo-platformo-react MUST be evaluated for implementation in this Angular/Gin stack
- **FR-050**: Implementation MUST adapt React concepts to Angular/Gin best practices rather than direct code translation
- **FR-051**: Repository MUST document workflow for creating Issues before implementing specifications according to .github/instructions/github-issues.md

#### Explicit Exclusions
- **FR-052**: Repository MUST NOT include a `docs/` folder (documentation will be hosted in a separate repository)
- **FR-053**: Repository MUST NOT include AI agent rules folders or files (user will create these manually if needed)
- **FR-054**: Repository MUST NOT replicate legacy Flowise code from universo-platformo-react
- **FR-055**: Repository MUST NOT copy poor implementations or technical debt from universo-platformo-react

#### Package Architecture Patterns
- **FR-056**: Repository MUST establish a three-entity hierarchical pattern as the base architecture for features (e.g., Clusters/Domains/Resources, Metaverses/Sections/Entities)
- **FR-057**: Package implementation MUST support replication of this pattern across different feature domains with consistent structure
- **FR-058**: Base functionality common to all three-entity patterns MUST be abstracted for reuse across features
- **FR-059**: Packages MUST allow extension of the base three-entity pattern with feature-specific additions (e.g., Uniks with more entities, Spaces/Canvases with node systems)

#### Future Extensibility
- **FR-060**: Packages MUST be designed with loose coupling to support eventual extraction to separate repositories
- **FR-061**: Base packages (core frontend launcher and loader) MUST remain in monorepo when other packages are separated
- **FR-062**: Package interfaces MUST be stable and well-defined to support independent versioning after separation
- **FR-063**: Inter-package dependencies MUST use explicit version constraints compatible with future separate repositories

#### Feature Development Roadmap
- **FR-064**: Repository initialization MUST prepare for incremental feature development following this sequence: (1) Shared infrastructure packages, (2) Base infrastructure (authentication, database, routing), (3) First complete feature (Clusters), (4) Pattern replication (Metaverses, Uniks), (5) Advanced features (Spaces/Canvases with specialized functionality)
- **FR-065**: First feature implementation (Clusters) MUST serve as the reference pattern for all subsequent features
- **FR-066**: Documentation MUST explain the feature development progression and pattern replication strategy

#### Package Documentation Standards
- **FR-067**: Each package MUST include README.md and README-RU.md following standardized templates in identical structure and line count
- **FR-068**: Package READMEs MUST include mandatory sections: Overview, Package Information, Key Features, Installation & Setup, Usage, Architecture, File Structure, Testing, Development, Documentation, Contributing, License
- **FR-069**: Repository MUST provide TEMPLATE-README.md and TEMPLATE-README-GUIDE.md in packages/ directory for consistent package documentation across the monorepo
- **FR-070**: Package READMEs MUST be created in English first (authoritative version) followed by exact Russian translation

#### Package Asset Management
- **FR-071**: Frontend packages MAY include assets/ directory within src/ for package-specific icons, images, and static resources
- **FR-072**: Asset build pipeline MUST copy assets from src/assets/ to dist/assets/ during package build process
- **FR-073**: Go backend packages MUST use go:embed directive for embedding static assets when needed
- **FR-074**: Assets MUST be organized in subdirectories by type (icons/, images/) for clarity

#### Package Internationalization Structure
- **FR-075**: Frontend packages requiring localization MUST include i18n/ directory within src/ organized by language code
- **FR-076**: Translation files MUST be organized in language subdirectories following pattern src/i18n/{language-code}/ (e.g., src/i18n/en/, src/i18n/ru/)
- **FR-077**: Each package MUST use namespace prefixes for translation keys to prevent conflicts across packages
- **FR-078**: Translation structure MUST integrate with centralized universo-i18n package for shared configuration

#### Advanced Package Organization
- **FR-079**: Complex packages MAY use features/ directory within src/ for organizing self-contained feature modules
- **FR-080**: Packages MAY include configs/ directory within src/ for centralized configuration constants and settings
- **FR-081**: Backend packages MUST include validators/ directory within internal/ for input validation logic separated from business logic
- **FR-082**: Package structure MUST follow framework conventions: Angular uses lib/ for library code, Go uses internal/ for private code

### Key Entities

- **Package**: A modular unit of functionality within the monorepo, typically split into frontend and backend components
  - Contains `base/` directory for core functionality
  - Has its own dependencies and build configuration
  - Follows naming convention (`*-frt` for frontend, `*-srv` for backend)
  - Examples: `clusters-frt`, `clusters-srv`, `metaverses-frt`, `metaverses-srv`

- **Three-Entity Pattern**: The base architectural pattern for feature packages, consisting of a hierarchical relationship between three entity types
  - **Parent Entity**: Top-level organizational unit (e.g., Cluster, Metaverse, Unik)
  - **Child Entity**: Mid-level organizational unit belonging to a parent (e.g., Domain, Section)
  - **Resource Entity**: Leaf-level items belonging to a child (e.g., Resource, Entity)
  - Pattern is replicated across features with different entity names but consistent structure
  - Can be extended with additional entities or specialized functionality for advanced features

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

- **Shared Infrastructure Package**: A package providing common functionality across multiple features
  - **Types Package** (`universo-types`): Shared TypeScript type definitions and interfaces
  - **Utils Package** (`universo-utils`): Common utility functions and processors
  - **API Client Package** (`universo-api-client`): Type-safe API client libraries for backend services
  - **I18n Package** (`universo-i18n`): Centralized internationalization configuration
  - **REST Docs Package** (`universo-rest-docs`): API documentation server with OpenAPI/Swagger
  - Built and published before feature packages that depend on them
  - Follow semantic versioning with stable APIs

- **Shared Component Library**: A package containing reusable UI components extracted from feature packages
  - Angular library with proper module exports
  - Published as internal workspace package
  - Eliminates code duplication across frontend packages
  - Examples: common dialogs, forms, cards, layouts

- **Authentication Package**: Specialized packages for authentication functionality
  - **Auth Frontend** (`auth-frt`): Angular UI primitives (login forms, session guards, auth hooks)
  - **Auth Backend** (`auth-srv`): Go authentication backend (session management, JWT handling)
  - Integrates with Supabase authentication service

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
- **SC-013**: Repository does not contain excluded items (docs/ folder, AI agent files, Flowise legacy code) maintaining 100% compliance with exclusion requirements
- **SC-014**: Team can identify and evaluate new features from universo-platformo-react repository for implementation within 1 week of their appearance
- **SC-015**: Package architecture pattern (three-entity hierarchy) is documented and understood by 90% of developers on first review
- **SC-016**: First feature (Clusters) successfully demonstrates three-entity pattern with full CRUD operations, serving as reference for all subsequent features
- **SC-017**: Package interfaces are designed to support future repository separation with zero refactoring required for extraction
- **SC-018**: Shared infrastructure packages (`universo-types`, `universo-utils`, `universo-api-client`, `universo-i18n`, `universo-rest-docs`) are documented and usable by all feature packages
- **SC-019**: PNPM catalog maintains consistent dependency versions across all packages (100% of shared dependencies use catalog versions)
- **SC-020**: Package README templates exist and are used by 100% of packages for consistent documentation structure
- **SC-021**: Shared Angular component library successfully eliminates code duplication, with zero duplicate component implementations across feature packages
- **SC-022**: Authentication packages (`auth-frt`, `auth-srv`) provide complete authentication flow that can be integrated into any feature package within 30 minutes
- **SC-023**: Package README templates (TEMPLATE-README.md, TEMPLATE-README-GUIDE.md) exist in packages/ directory and provide clear guidance for creating package documentation
- **SC-024**: 100% of packages include both README.md and README-RU.md with identical structure, demonstrating proper use of templates
- **SC-025**: Packages with UI components include properly organized assets/ directory, and assets are correctly copied to dist/ during build
- **SC-026**: Frontend packages requiring translations include i18n/ directory structure with language subdirectories, integrated with universo-i18n package
- **SC-027**: Architecture comparison document exists documenting patterns learned from universo-platformo-react and adaptations for Angular/Go stack

## Assumptions

- **Technology Stack Versions**: Minimum versions required: Node.js v18+, Go v1.20+, PNPM v8+. These versions support all features needed for the project.
- **Development Environment**: Developers work on operating systems that support Node.js and Go (Linux, macOS, Windows with WSL)
- **Supabase Account**: Team has access to Supabase credentials or can create a Supabase project for development/testing
- **English Proficiency**: Primary development documentation is in English; Russian translations maintain identical structure
- **Git Familiarity**: Developers understand basic Git workflows including branches, commits, and pull requests
- **Package Naming**: The `-frt`/`-srv` suffix convention is sufficient for distinguishing frontend/backend packages at this stage
- **React Reference**: The universo-platformo-react repository serves as a conceptual guide but this implementation may diverge in technical details due to different technology stack
- **Legacy Code**: This is a fresh implementation and does not need to accommodate legacy code from the React version
- **Database Provider**: Supabase is the primary database for initial implementation, with future-proofing for other providers through abstraction layer
- **Authentication Method**: Go-based authentication middleware will be implemented following Passport.js patterns, leveraging Supabase connector for session management and JWT tokens
- **Angular Material**: Angular Material provides Material Design components for Angular, serving the same role as Material-UI (MUI) does for React in the reference implementation
- **Monorepo Benefits**: Using PNPM workspaces provides sufficient benefits for managing multiple packages compared to separate repositories
- **Build Tooling**: Angular CLI for frontend and standard Go build tools for backend are sufficient; Nx or Turbo will handle monorepo orchestration
- **Development Workflow**: Hot-reload is essential for developer productivity and worth the configuration effort
- **Future Package Separation**: Packages are designed with loose coupling to support eventual extraction to separate repositories while maintaining base packages in monorepo
- **React Repository Access**: Team has access to universo-platformo-react repository for reference and can periodically review it for new concepts
- **Three-Entity Pattern Flexibility**: While three-entity pattern (Parent/Child/Resource) is the base, some features will require variations (more entities, fewer entities, or extensions with specialized functionality)
- **Shared Infrastructure Priority**: Establishing shared infrastructure packages early prevents code duplication and ensures consistent patterns across feature packages
- **PNPM Catalog Benefits**: Centralized dependency management through PNPM catalog reduces version conflicts and simplifies upgrades
- **Component Library Evolution**: Shared component library will grow organically as common patterns emerge from feature packages

## Dependencies

### External Dependencies
- **universo-platformo-react repository**: Reference for overall architecture, concepts, and patterns (information dependency, not code dependency). Team must periodically monitor for new features and concepts to evaluate for implementation
- **Supabase service**: Required for database operations and authentication backend
- **PNPM**: Required for package management and monorepo workspace orchestration
- **Node.js runtime**: Required for running Angular development servers and build tools (v18+)
- **Go runtime**: Required for running Gin backend servers and compiling Go code (v1.20+)
- **Angular framework**: Core dependency for frontend development
- **Gin framework**: Core dependency for backend development
- **Angular Material**: Required for UI component library (Angular-specific implementation of Material Design)
- **Go authentication middleware**: Required for authentication (Go equivalent of Passport.js pattern)
- **Nx or Turbo**: Required for build orchestration in monorepo
- **ngx-translate**: Required for Angular internationalization (Angular equivalent of react-i18next)

### Internal Dependencies
- **Repository standards documentation** (FR-006, FR-007, FR-008, FR-009): Must be created before developers can effectively contribute
- **PNPM workspace configuration with catalog** (FR-015-NEW): Must be set up before packages can reference each other with consistent versions
- **Shared infrastructure packages** (FR-041-NEW to FR-047-NEW): Must be built before feature packages that depend on them
  - `universo-types`: Required by all packages using shared type definitions
  - `universo-utils`: Required by packages using common utility functions
  - `universo-api-client`: Required by frontend packages communicating with backend
  - `universo-i18n`: Required by all packages supporting internationalization
  - `universo-rest-docs`: Optional, for API documentation
- **Shared component library** (FR-021-NEW): Must be built before frontend feature packages that use common UI components
- **Authentication packages** (FR-032-NEW): Must be built before feature packages requiring authentication
- **Package README templates** (FR-039-NEW): Must be created before individual package documentation
- **Base package structure**: P1 foundation work must be completed before feature-specific packages can be developed
- **Development environment setup**: Must work before developers can test their code changes
- **Build system configuration**: Must be functional before production deployments can occur

### Documentation Dependencies
- **English README files**: Must be completed first as the primary standard
- **Russian README files**: Depend on English versions being finalized to ensure identical structure
- **.github/instructions files**: Must exist before developers can follow repository standards

### Sequencing Dependencies
1. **First**: Repository structure and standards documentation (P1)
2. **Second**: PNPM workspace setup with catalog for dependency management (P2)
3. **Third**: Shared infrastructure packages (`universo-types`, `universo-utils`, `universo-api-client`, `universo-i18n`, `universo-rest-docs`) (P2)
4. **Fourth**: Shared Angular component library for common UI components (P2)
5. **Fifth**: Authentication packages (`auth-frt`, `auth-srv`) (P3)
6. **Sixth**: Development environment configuration with hot-reload (P3)
7. **Seventh**: Database integration and configuration (P4)
8. **Eighth**: First feature package (Clusters) as reference implementation (P4)

This sequencing ensures each phase builds on the previous one and provides independently testable value. Shared infrastructure must be in place before feature packages can utilize them.

## Future Features (Deferred to Advanced Implementation Phase)

The following architectural patterns from universo-platformo-react have been identified but are deferred to future specifications as they represent advanced functionality beyond initial project setup:

### UPDL (Universal Platform Definition Language)
- **Purpose**: Node system for describing 3D/AR/VR spaces that can be exported to multiple platforms
- **Components**: Core high-level nodes, legacy compatibility nodes, TypeScript interfaces
- **Target**: Future specification for spatial computing and metaverse features
- **Reference**: `packages/updl` in universo-platformo-react

### Publication System
- **Purpose**: Export and share UPDL spaces with public URLs
- **Components**: 
  - Frontend: UPDL processing, template registry, multi-technology support
  - Backend: Raw flow data serving, publication configuration
- **Target**: Future specification after UPDL implementation
- **Reference**: `packages/publish-frt` and `packages/publish-srv` in universo-platformo-react

### Template Packages
- **Purpose**: Specialized packages for generating specific application types
- **Examples**: 
  - AR.js quiz templates
  - PlayCanvas MMO templates
  - Template registry system for dynamic loading
- **Target**: Future specification after publication system
- **Reference**: `packages/template-quiz` and `packages/template-mmoomm` in universo-platformo-react

### Multiplayer Infrastructure
- **Purpose**: Real-time networking for multiplayer experiences
- **Components**: Colyseus server, state synchronization, entity replication
- **Target**: Future specification for multiplayer features
- **Reference**: `packages/multiplayer-colyseus-srv` in universo-platformo-react

### Space Builder (Prompt-to-Flow)
- **Purpose**: AI-powered generation of flow graphs from natural language prompts
- **Components**: LLM integration, graph validation, model selection
- **Target**: Future specification for AI-assisted development
- **Reference**: `packages/space-builder-frt` and `packages/space-builder-srv` in universo-platformo-react

These features demonstrate the long-term vision for Universo Platformo Angular but are intentionally excluded from the initial implementation to maintain focus on foundational architecture. Each will be specified in detail when the appropriate implementation phase is reached.
