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

### I. Monorepo Organization

The project MUST be organized as a monorepo managed by PNPM. All packages MUST reside in the `packages/` directory. For features requiring both frontend and backend, they MUST be split into separate packages with clear naming: `packages/{feature}-frt` (frontend) and `packages/{feature}-srv` (backend). Each package MUST contain a `base/` directory at its root to support future multiple implementations.

**Rationale**: Monorepo structure enables shared tooling, consistent versioning, and atomic cross-package changes. The `base/` convention future-proofs the architecture for multiple technology stack implementations while maintaining a common interface.

### II. Package-First Development

Every feature MUST start as an independent package with clear boundaries. Packages MUST be self-contained with their own dependencies, configuration, and documentation. Packages MUST expose well-defined interfaces for inter-package communication.

**Rationale**: Package-first architecture enforces modularity, enables independent development cycles, and allows packages to be extracted into separate repositories in the future without refactoring.

### III. Bilingual Documentation (NON-NEGOTIABLE)

ALL documentation files (README, guides, specifications) MUST be created in both English and Russian. The English version MUST be created first and serves as the authoritative source. The Russian version MUST be an exact translation with identical structure, content, and line count. Documentation updates MUST follow the sequence: English first, then Russian.

**Rationale**: Bilingual documentation ensures accessibility for both international and Russian-speaking team members, with English as the primary standard to maintain consistency across the global development community.

### IV. Technology Stack Adherence

**Frontend**: Angular with TypeScript, Material UI (Angular Material), Passport.js for authentication
**Backend**: Gin framework with Go
**Database**: Supabase (primary), with architecture supporting future DBMS expansion
**Package Management**: PNPM for workspace management

The project MUST follow best practices specific to Angular and Gin frameworks. Implementation MUST NOT blindly copy patterns from the React reference implementation but instead adopt idiomatic patterns for the chosen stack.

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
1. Base infrastructure first (authentication, database, routing)
2. First complete feature with full CRUD (e.g., Clusters: Clusters/Domains/Resources)
3. Replicate structure for similar features (e.g., Metaverses: Metaverses/Sections/Entities)
4. Add specialized functionality as needed (e.g., Spaces/Canvases with node graphs)

Each feature MUST be independently testable and deployable.

**Rationale**: Starting with a complete reference feature establishes patterns that can be replicated efficiently. This approach reduces decision fatigue and maintains consistency across the codebase.

### VII. Specification-Driven Development

Before implementing any feature, a complete specification MUST be created following `.specify/templates/spec-template.md`. Specifications MUST include user stories with priorities (P1, P2, P3), functional requirements, success criteria, and must be independently testable. Implementation work MUST NOT begin until the specification is approved.

**Rationale**: Specifications prevent scope creep, ensure shared understanding, enable independent testing of user stories, and provide clear acceptance criteria before code is written.

## Technology Stack & Architecture

### Required Technologies

- **Frontend Framework**: Angular (latest stable version) with TypeScript
- **UI Library**: Angular Material (Material Design implementation for Angular)
- **Backend Framework**: Gin (Go web framework)
- **Database**: Supabase (PostgreSQL-based, with REST and realtime APIs)
- **Authentication**: Passport.js with Supabase connector
- **Package Manager**: PNPM with workspace support
- **Version Control**: Git with conventional commits

### Architecture Constraints

- Frontend and backend MUST communicate via RESTful APIs
- Database access MUST be abstracted to support future DBMS migration
- Authentication MUST be stateless using JWT tokens
- All packages MUST follow the `base/` directory convention
- Package naming MUST use the pattern: `{feature}-{frt|srv}`

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

### Complexity Justification

Any deviation from these principles MUST be explicitly justified in the pull request description with:
- Specific violation being made
- Why the deviation is necessary
- Why simpler alternatives following the constitution are insufficient

**Version**: 1.0.0 | **Ratified**: 2025-11-16 | **Last Amended**: 2025-11-16
