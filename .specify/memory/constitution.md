<!--
Sync Impact Report - Constitution v1.0.4
========================================
Version Change: v1.0.3 → v1.0.4 (PATCH - Added Technology Stack Best Practices)
Modified Principles: IV (added explicit Angular and Gin best practices requirements)
Modified Sections: Technology Stack & Architecture (added references to best practices documents)
Changes Made:
  - Principle IV: Added explicit Angular-specific requirements (standalone components, inject(), signals)
  - Principle IV: Added explicit Go/Gin-specific requirements (Clean Architecture, internal/, middleware)
  - Technology Stack: Added reference to BEST-PRACTICES.md and BEST-PRACTICES-RU.md
  - Documentation: Created comprehensive BEST-PRACTICES.md with Angular and Gin patterns
  - Documentation: Created BEST-PRACTICES-RU.md as exact Russian translation
Review Status:
  ✅ Based on research of Angular monorepo patterns with Nx
  ✅ Based on research of Go/Gin microservices best practices
  ✅ Incorporates modern Angular 17+ standalone components
  ✅ Incorporates Clean Architecture patterns for Go/Gin
  ✅ Verified alignment with universo-platformo-react conceptual patterns
Impact Analysis:
  - PATCH version bump (clarifications and documentation additions)
  - Adds explicit technology-specific requirements to constitution
  - Creates comprehensive best practices documentation (77 pages)
  - No breaking changes to existing principles
  - Strengthens guidance for Angular and Gin implementations
Templates Status:
  ✅ spec-template.md - Aligns with constitution
  ✅ plan-template.md - Aligns with constitution
  ✅ tasks-template.md - Aligns with constitution
  ✅ BEST-PRACTICES.md - New comprehensive guide created
  ✅ BEST-PRACTICES-RU.md - New Russian translation created
Follow-up TODOs: None - Constitution now includes technology stack best practices
-->

<!--
Sync Impact Report - Constitution v1.0.3
========================================
Version Change: v1.0.2 → v1.0.3 (MINOR - Strengthened Modularity Requirements)
Modified Principles: I, II (absolute prohibition of non-package implementations)
Modified Sections: Architecture Constraints (new FORBIDDEN section), Strategic Context (new section)
Changes Made:
  - Principle I: Added absolute prohibition language forbidding non-package implementations
  - Principle II: Strengthened with explicit migration path to separate repositories
  - Architecture Constraints: Added new FORBIDDEN section listing prohibited practices
  - Strategic Context: New section explaining monorepo-to-separate-repos evolution
Review Status:
  ✅ Based on deep analysis of universo-platformo-react package structure
  ✅ Responds to critical requirement for absolute modular implementation
  ✅ Verified all packages in React repo follow base/ convention
Impact Analysis:
  - MINOR version bump due to new architectural prohibitions
  - Strengthens enforcement of package-first development
  - Makes migration path explicit for future repository separation
  - Adds explicit "do not" examples to prevent violations
  - No breaking changes to existing compliant code
Templates Status:
  ✅ spec-template.md - Aligns with strengthened constitution
  ✅ plan-template.md - Aligns with strengthened constitution
  ✅ tasks-template.md - Aligns with strengthened constitution
  ⚠️ GitHub instruction files - To be followed during implementation
Follow-up TODOs: None - Constitution now has absolute clarity on modularity
-->

<!--
Sync Impact Report - Constitution v1.0.2
========================================
Version Change: v1.0.1 → v1.0.2 (MINOR - New Architecture Constraints)
Modified Principles: VI (enhanced with shared infrastructure priority)
Modified Sections: Required Technologies, Architecture Constraints
Changes Made:
  - Principle VI: Added shared infrastructure packages and component libraries as first steps
  - Required Technologies: Updated authentication to Go-based middleware, added PNPM catalog, Nx/Turbo, ngx-translate
  - Architecture Constraints: Added 4 new constraints for shared infrastructure, PNPM catalog, README templates, and component libraries
Review Status:
  ✅ Based on comprehensive analysis of universo-platformo-react repository
  ✅ Aligns with updated specification v1.1 (FR-015-NEW through FR-047-NEW)
  ✅ Incorporates P1 and P2 architectural patterns
Impact Analysis:
  - MINOR version bump due to new architecture constraints
  - Enhances Principle VI with shared infrastructure priority
  - Adds explicit technology requirements for build orchestration and i18n
  - No breaking changes to existing principles
  - Maintains backward compatibility with v1.0.1
Templates Status:
  ✅ spec-template.md - Updated with new patterns
  ✅ plan-template.md - Aligns with constitution
  ✅ tasks-template.md - Aligns with constitution
  ⚠️ GitHub instruction files - To be followed during implementation
Follow-up TODOs: None - Constitution reflects current architectural decisions
-->

<!--
Sync Impact Report - Constitution v1.0.1
========================================
Version Change: v1.0.0 → v1.0.1 (PATCH - Clarifications)
Modified Principles: I, VI, VII (clarification improvements only)
Changes Made:
  - Principle I: Clarified that base/ directory contains core implementation
  - Principle VI: Expanded examples to explicitly mention Metaverses, Uniks, LangChain, UPDL nodes
  - Principle VII: Added reference to plan-template.md for post-specification planning
Review Status:
  ✅ Comprehensive review against original requirements completed
  ✅ All 6 requirement areas fully covered (10/10 alignment score)
  ✅ Constitution is production-ready
Impact Analysis:
  - No breaking changes to existing principles
  - Improves clarity without changing governance rules
  - All improvements are clarifications per amendment PATCH process
Templates Status:
  ✅ plan-template.md - Reviewed, aligns with constitution
  ✅ spec-template.md - Reviewed, aligns with constitution
  ✅ tasks-template.md - Reviewed, aligns with constitution
  ⚠️ GitHub instruction files - To be followed during implementation
Follow-up TODOs: None - Constitution ready for use
-->

<!--
Sync Impact Report - Constitution v1.0.0
========================================
Version Change: Initial creation → v1.0.0
Modified Principles: N/A (Initial version)
Added Sections:
  - Core Principles (7 principles defined)
  - Technology Stack & Architecture
  - Development Workflow
  - Governance
Templates Status:
  ✅ plan-template.md - Reviewed, aligns with constitution
  ✅ spec-template.md - Reviewed, aligns with constitution
  ✅ tasks-template.md - Reviewed, aligns with constitution
  ⚠️ GitHub instruction files - To be followed during implementation
Follow-up TODOs: None
-->

# Universo Platformo Angular Constitution

## Core Principles

### I. Monorepo Organization (ABSOLUTE REQUIREMENT)

The project MUST be organized as a monorepo managed by PNPM. **ALL** functionality (except root-level build and launch scripts) MUST be implemented as independent packages residing in the `packages/` directory. For features requiring both frontend and backend, they MUST be split into separate packages with clear naming: `packages/{feature}-frt` (frontend) and `packages/{feature}-srv` (backend). Each package MUST contain a `base/` directory at its root containing the core implementation. This convention supports future multiple technology stack implementations (e.g., React version, Vue version) while maintaining a common interface.

**CRITICAL**: It is **ABSOLUTELY FORBIDDEN** to implement functionality outside of the `packages/` directory structure. Any feature implementation that does not follow the package-based architecture is a **DIRECT VIOLATION** of this constitution and MUST be rejected immediately.

**Rationale**: Monorepo structure enables shared tooling, consistent versioning, and atomic cross-package changes. The `base/` convention future-proofs the architecture for multiple technology stack implementations while maintaining a common interface. The absolute requirement for package-based organization ensures that all packages can be extracted into separate repositories in the future without refactoring, which is a **CORE STRATEGIC GOAL** of this project.

### II. Package-First Development (MANDATORY FOR ALL FEATURES)

**EVERY** feature MUST start as an independent package with clear boundaries. Packages MUST be self-contained with their own dependencies, configuration, and documentation. Packages MUST expose well-defined interfaces for inter-package communication.

**Strategic Context**: This project follows a deliberate evolution path from monorepo to multi-repo:
1. **Phase 1 (Current)**: All packages as workspace packages within the monorepo
2. **Phase 2 (Future)**: Gradual extraction of mature packages into separate repositories
3. **Phase 3 (Long-term)**: Only base framework packages remain in monorepo, all features in separate repos

**THEREFORE**: Every package MUST be designed from day one to be repository-independent. Any tight coupling between packages that would prevent future repository separation is a **CRITICAL DEFECT**.

**Rationale**: Package-first architecture enforces modularity, enables independent development cycles, and allows packages to be extracted into separate repositories in the future without refactoring. This is not an optional optimization—it is the **CORE ARCHITECTURAL STRATEGY** that enables the project's long-term evolution.

### III. Bilingual Documentation (NON-NEGOTIABLE)

ALL documentation files (README, guides, specifications) MUST be created in both English and Russian. The English version MUST be created first and serves as the authoritative source. The Russian version MUST be an exact translation with identical structure, content, and line count. Documentation updates MUST follow the sequence: English first, then Russian.

**Rationale**: Bilingual documentation ensures accessibility for both international and Russian-speaking team members, with English as the primary standard to maintain consistency across the global development community.

### IV. Technology Stack Adherence

**Frontend**: Angular with TypeScript, Material UI (Angular Material), Passport.js for authentication
**Backend**: Gin framework with Go
**Database**: Supabase (primary), with architecture supporting future DBMS expansion
**Package Management**: PNPM for workspace management

The project MUST follow best practices specific to Angular and Gin frameworks. Implementation MUST NOT blindly copy patterns from the React reference implementation but instead adopt idiomatic patterns for the chosen stack.

**Angular-Specific Requirements**:
- Use standalone components (Angular 17+)
- Use modern `inject()` function for dependency injection
- Implement lazy loading for all feature packages
- Use Angular Signals for reactive state management
- Use Angular Material for all UI components

**Go/Gin-Specific Requirements**:
- Follow Clean Architecture (Handler → Service → Repository pattern)
- Use `internal/` directory for package-private code
- Implement middleware for cross-cutting concerns
- Use environment-based configuration
- Generate OpenAPI documentation for all APIs

**Documentation**: See `.specify/memory/BEST-PRACTICES.md` and `.specify/memory/BEST-PRACTICES-RU.md` for comprehensive technology-specific guidelines.

**Rationale**: Using established frameworks and best practices reduces learning curve, improves maintainability, and leverages community support. Stack-specific patterns ensure optimal performance and developer experience.

### V. GitHub Workflow Integration

ALL development work MUST follow the GitHub workflow guidelines:
- Create Issues according to `.github/instructions/github-issues.md` with bilingual content
- Apply labels according to `.github/instructions/github-labels.md`
- Create Pull Requests according to `.github/instructions/github-pr.md`
- Follow internationalization rules from `.github/instructions/i18n-docs.md`

Issues and PRs MUST include both English and Russian versions using the exact spoiler tag format: `<summary>In Russian</summary>`

**Rationale**: Consistent GitHub workflows enable traceability, clear communication, and maintain the bilingual requirement across all project artifacts.

### VI. Incremental Feature Development

Feature development MUST follow the pattern established in the reference React implementation:
1. Shared infrastructure packages first (types, utils, api-client, i18n, rest-docs) to provide common functionality
2. Shared component libraries to eliminate duplication across frontend packages
3. Base infrastructure (authentication packages, database, routing)
4. First complete feature with full CRUD (e.g., Clusters package with three-entity structure: Clusters/Domains/Resources entities)
5. Replicate structure for similar features (e.g., Metaverses package: Metaverses/Sections/Entities; Uniks with potentially more entities)
6. Add specialized functionality as needed (e.g., Spaces/Canvases packages with advanced features)

Each feature MUST be independently testable and deployable.

**Rationale**: Establishing shared infrastructure first prevents code duplication and ensures consistent patterns. Starting with a complete reference feature establishes patterns that can be replicated efficiently. This approach reduces decision fatigue and maintains consistency across the codebase.

### VII. Specification-Driven Development

Before implementing any feature, a complete specification MUST be created following `.specify/templates/spec-template.md`. Specifications MUST include user stories with priorities (P1, P2, P3), functional requirements, success criteria, and must be independently testable. Implementation work MUST NOT begin until the specification is approved. After specification approval, implementation planning MUST follow `.specify/templates/plan-template.md` to decompose work into concrete tasks.

**Rationale**: Specifications prevent scope creep, ensure shared understanding, enable independent testing of user stories, and provide clear acceptance criteria before code is written.

## Technology Stack & Architecture

### Required Technologies

- **Frontend Framework**: Angular (latest stable version) with TypeScript
- **UI Library**: Angular Material (Material Design implementation for Angular)
- **Backend Framework**: Gin (Go web framework)
- **Database**: Supabase (PostgreSQL-based, with REST and realtime APIs)
- **Authentication**: Go-based authentication middleware following Passport.js patterns with Supabase connector
- **Package Manager**: PNPM with workspace support and catalog for centralized dependency management
- **Build Orchestration**: Nx or Turbo for efficient monorepo builds
- **Internationalization**: ngx-translate for Angular (equivalent to react-i18next)
- **Version Control**: Git with conventional commits

### Architecture Constraints

- Frontend and backend MUST communicate via RESTful APIs
- Database access MUST be abstracted to support future DBMS migration
- Authentication MUST be stateless using JWT tokens
- All packages MUST follow the `base/` directory convention
- Package naming MUST use the pattern: `{feature}-{frt|srv}`
- Shared infrastructure packages MUST be implemented before feature packages that depend on them
- PNPM catalog MUST be used for centralized dependency version management
- Package README files MUST follow standardized templates for consistency
- Shared component libraries MUST be used to eliminate code duplication across frontend packages

### FORBIDDEN Implementations (ABSOLUTE PROHIBITIONS)

The following practices are **STRICTLY FORBIDDEN** and constitute violations of this constitution:

1. **Non-Package Implementations**: Creating ANY feature code outside of `packages/` directory (except root-level build/launch scripts)
2. **Monolithic Structure**: Implementing frontend and backend in a single package when they should be separate `-frt` and `-srv` packages
3. **Missing base/ Directory**: Creating packages without a `base/` directory at their root
4. **Direct Cross-Package Imports**: Importing from package internals instead of using well-defined public interfaces
5. **Tight Coupling**: Creating dependencies between packages that would prevent future repository separation
6. **Inconsistent Naming**: Using package names that don't follow the `{feature}-{frt|srv}` or `universo-{shared-component}` pattern
7. **Non-Modular Shared Code**: Creating shared code outside of dedicated shared infrastructure packages (universo-types, universo-utils, etc.)
8. **Legacy Code Patterns**: Blindly copying implementation details from the React reference repository without adapting to Angular/Gin best practices

**Enforcement**: Any pull request containing forbidden implementations MUST be rejected immediately with a reference to this section.

### Excluded Elements

The following MUST NOT be implemented in this repository:
- Documentation website (`docs/` folder) - will be maintained in separate repository
- AI agent configuration files - user will create these as needed

## Development Workflow

### Issue Creation

Before implementing any feature or fix:
1. Create a GitHub Issue with bilingual description
2. Apply appropriate labels from repository (fetch current labels first)
3. Link to relevant specifications if applicable
4. Use future tense describing work to be done

### Pull Request Process

For all code changes:
1. Create feature branch following specification numbering
2. Implement changes following the constitution principles
3. Create PR with title format: `GH{issue_number} {description}`
4. Include bilingual PR description with sections: Description, Changes Made, Additional Work, Testing
5. Link PR to issue using "Fixes #{issue_number}"
6. Apply appropriate labels matching the issue

### Documentation Updates

When updating any documentation:
1. Update English version first (e.g., README.md)
2. Update Russian version to match exactly (e.g., README-RU.md)
3. Verify both versions have identical structure and line count
4. Include both updates in the same commit

### Reference Repository Tracking

Development MUST periodically review the reference React implementation at `https://github.com/teknokomo/universo-platformo-react` to:
- Identify new features to port to Angular/Gin stack
- Understand conceptual patterns (not implementation details)
- Avoid copying legacy code or incomplete implementations
- Adapt patterns to Angular/Gin best practices

## Governance

This constitution supersedes all other development practices and guidelines. All code reviews, pull requests, and architectural decisions MUST verify compliance with these principles.

### Amendment Process

1. Proposed changes MUST be discussed in a GitHub Issue
2. Changes MUST include rationale and impact analysis
3. Version MUST be incremented following semantic versioning:
   - **MAJOR**: Backward incompatible governance changes or principle removals
   - **MINOR**: New principles added or material expansions
   - **PATCH**: Clarifications, wording improvements, non-semantic changes
4. Amendments MUST update the Sync Impact Report
5. Dependent templates and documentation MUST be updated

### Compliance Verification

All pull requests MUST include verification that:
- Constitution principles are followed
- Bilingual documentation is complete and matching
- GitHub workflow guidelines are followed
- Technology stack constraints are respected
- Package structure conventions are maintained
- **NO FORBIDDEN IMPLEMENTATIONS** are present (see FORBIDDEN Implementations section)

### Complexity Justification

Any deviation from these principles MUST be explicitly justified in the pull request description with:
- Specific violation being made
- Why the deviation is necessary
- Why simpler alternatives following the constitution are insufficient

**Note**: Deviations from the FORBIDDEN Implementations list are **NEVER** acceptable and CANNOT be justified under any circumstances.

**Version**: 1.0.4 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-18
