# Universo Platformo Angular

Implementation of Universo Platformo / Universo MMOOMM / Universo Kiberplano built on Angular (frontend) and Gin (backend) with TypeScript and Go.

## 🏗️ Architecture: Modular Package-Based Monorepo

**CRITICAL**: This project follows a **strict modular architecture** where ALL functionality is implemented as independent packages in the `packages/` directory.

### Package Structure

```
packages/
├── universo-types/          # Shared TypeScript types
├── universo-utils/          # Shared utilities
├── universo-api-client/     # API client libraries
├── universo-i18n/          # Internationalization
├── universo-rest-docs/     # API documentation
├── universo-ng-components/ # Shared Angular components
├── auth-frt/               # Authentication frontend (Angular)
├── auth-srv/               # Authentication backend (Go/Gin)
└── {feature}-frt/          # Feature frontends
└── {feature}-srv/          # Feature backends
```

### Why Modular Architecture?

This project is designed for **gradual evolution from monorepo to multi-repo**:

1. **Phase 1 (Current)**: All packages as workspace packages in monorepo
2. **Phase 2 (Future)**: Mature packages extracted to separate repositories  
3. **Phase 3 (Long-term)**: Only base packages remain, features are independent

**Every package MUST be designed to be repository-independent from day one.**

## 🛠️ Technology Stack

- **Frontend**: Angular 17+ with TypeScript
- **UI Library**: Angular Material
- **Backend**: Gin framework with Go 1.20+
- **Database**: Supabase (PostgreSQL-based)
- **Authentication**: Go-based middleware with Supabase connector
- **Package Manager**: PNPM with workspaces
- **Build Tool**: Nx for monorepo orchestration
- **Testing**: Jest (frontend), Go testing (backend), Playwright (E2E)
- **i18n**: ngx-translate

## 📦 Package Conventions

Every package follows these rules:

- **Naming**: `{feature}-frt` (frontend) or `{feature}-srv` (backend)
- **Structure**: Each package contains a `base/` directory with core implementation
- **Shared packages**: Use `universo-*` prefix
- **Documentation**: Each package has bilingual README (English and Russian)
- **Independence**: Packages expose well-defined interfaces for inter-package communication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Go 1.20+
- PNPM 8+

### Installation

```bash
# Install PNPM if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development servers
pnpm dev
```

## 📚 Documentation

- **Constitution**: `.specify/memory/constitution.md` - Project governance and architectural principles
- **Specifications**: `specs/` - Feature specifications and implementation plans
- **Package READMEs**: Each package has its own detailed documentation

## 🌍 Bilingual Support

All documentation in this project is maintained in both **English** and **Russian**:
- English version is created first (authoritative)
- Russian version is an exact translation with identical structure

## 🔗 Reference Implementation

This project adapts patterns from [Universo Platformo React](https://github.com/teknokomo/universo-platformo-react) to the Angular/Gin stack, following Angular and Go best practices rather than blindly copying implementation details.

## 📋 Development Workflow

1. Review specifications in `specs/` directory
2. Follow GitHub workflow guidelines in `.github/instructions/`
3. Create Issues with bilingual descriptions
4. Implement features as independent packages
5. Submit Pull Requests following project conventions

## ⚠️ Critical Rules

**FORBIDDEN PRACTICES** (will be rejected in code review):
- ❌ Creating feature code outside `packages/` directory
- ❌ Combining frontend and backend in a single package
- ❌ Creating packages without `base/` directory
- ❌ Tight coupling that prevents repository separation

## 📄 License

[License information to be added]

## 🤝 Contributing

Please read the contribution guidelines in `.github/instructions/` before submitting pull requests.

---

**Architecture Version**: Constitution v1.0.3 | **Last Updated**: 2025-11-17
