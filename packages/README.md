# Universo Platformo Angular Packages

This directory contains modular packages that comprise the Universo Platformo Angular monorepo. Each package is independently versioned and can be developed, tested, and potentially extracted to a separate repository.

## Package Organization

Packages are organized by functionality type:

### Shared Infrastructure Packages

Core packages providing common functionality across the platform:

- **universo-types**: Shared TypeScript type definitions and interfaces
- **universo-utils**: Common utility functions and helpers
- **universo-api-client**: Type-safe API client libraries for backend services
- **universo-i18n**: Centralized internationalization configuration (ngx-translate)
- **universo-rest-docs**: API documentation server with OpenAPI/Swagger

### Shared UI Component Libraries

Reusable Angular components to eliminate duplication:

- **universo-ng-components**: Shared Angular component library with common UI elements

### Authentication System

Foundation packages for user authentication:

- **auth-frt**: Authentication frontend (Angular) - UI primitives, guards, services
- **auth-srv**: Authentication backend (Go/Gin) - session management, JWT handling

### Domain Feature Packages

Feature-specific packages following the three-entity pattern:

- **clusters-frt / clusters-srv**: Cluster management (Clusters/Domains/Resources)
- **metaverses-frt / metaverses-srv**: Metaverse management (Metaverses/Sections/Entities)
- **uniks-frt / uniks-srv**: Workspace management (Uniks with extended entities)
- **spaces-frt / spaces-srv**: Space/Canvas management (advanced features)
- **profile-frt / profile-srv**: User profile management
- **projects-frt / projects-srv**: Project management

### Advanced Feature Packages

Specialized functionality packages (future):

- **updl**: Universal node system for describing scenes
- **publish-frt / publish-srv**: Publication and export system
- **template-***: Template packages for specific use cases
- **multiplayer-***: Real-time multiplayer infrastructure

## Package Structure

All packages follow a standardized structure with a `base/` directory:

### Frontend Package (Angular)
```
packages/{package-name}-frt/
└── base/
    ├── src/
    │   ├── lib/              # Library code
    │   ├── assets/           # Icons, images
    │   ├── i18n/             # Translations (en/, ru/)
    │   └── public-api.ts     # Public exports
    ├── dist/                 # Compiled output
    ├── package.json
    ├── ng-package.json       # Angular library config
    ├── tsconfig.json
    ├── README.md
    └── README-RU.md
```

### Backend Package (Go)
```
packages/{package-name}-srv/
└── base/
    ├── cmd/                  # Entry points
    ├── internal/             # Private code
    │   ├── handlers/
    │   ├── middleware/
    │   ├── services/
    │   ├── repository/
    │   ├── validators/
    │   └── configs/
    ├── assets/               # Embedded resources
    ├── go.mod
    ├── go.sum
    ├── README.md
    └── README-RU.md
```

### Shared Library Package (TypeScript)
```
packages/universo-{name}/
└── base/
    ├── src/
    │   ├── {type}/           # Specific directories
    │   └── index.ts
    ├── dist/                 # CJS, ESM, types
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    └── README-RU.md
```

## Creating a New Package

1. **Choose Package Type**: Frontend (-frt), Backend (-srv), or Shared Library
2. **Use Template**: Copy the appropriate structure above
3. **Follow Naming**: Use `{feature}-frt` or `{feature}-srv` pattern
4. **Create Documentation**: Use `TEMPLATE-README.md` and `TEMPLATE-README-GUIDE.md`
5. **Add to Workspace**: Register in `pnpm-workspace.yaml`
6. **Configure Build**: Set up appropriate build configuration
7. **Add Tests**: Include test infrastructure
8. **Bilingual Docs**: Create both README.md and README-RU.md

## Package Development Workflow

### For Frontend Packages (Angular)

```bash
# Install dependencies
pnpm install

# Start development build
pnpm --filter {package-name} dev

# Build package
pnpm --filter {package-name} build

# Run tests
pnpm --filter {package-name} test

# Lint code
pnpm --filter {package-name} lint
```

### For Backend Packages (Go)

```bash
# Run in development
cd packages/{package-name}/base
go run cmd/server/main.go

# Build package
go build -o bin/server cmd/server/main.go

# Run tests
go test ./...

# Format code
go fmt ./...
```

### For Shared Libraries

```bash
# Install dependencies
pnpm install

# Build library
pnpm --filter {package-name} build

# Run tests
pnpm --filter {package-name} test
```

## Package Dependencies

Packages use PNPM workspace protocol for internal dependencies:

```json
{
  "dependencies": {
    "@universo/types": "workspace:*",
    "@universo/utils": "workspace:*"
  }
}
```

External dependencies are managed via PNPM catalog in `pnpm-workspace.yaml`:

```json
{
  "dependencies": {
    "@angular/core": "catalog:",
    "@angular/common": "catalog:"
  }
}
```

## Build Orchestration

The monorepo uses **Nx** for efficient build orchestration:

```bash
# Build all packages
pnpm build

# Build specific package and its dependencies
pnpm build --filter {package-name}

# Build only affected packages
nx affected:build

# Run all tests
pnpm test

# Test only affected packages
nx affected:test
```

## Package Documentation Standards

Every package MUST include:

1. **README.md**: English documentation following template
2. **README-RU.md**: Russian translation with identical structure
3. **Mandatory Sections**:
   - Overview
   - Package Information
   - Key Features
   - Installation & Setup
   - Usage
   - Architecture
   - File Structure
   - Testing
   - Development
   - Documentation
   - Contributing
   - License

See `TEMPLATE-README.md` and `TEMPLATE-README-GUIDE.md` for guidance.

## Internationalization

Packages requiring localization include `i18n/` directory:

```
src/i18n/
├── en/
│   └── translations.json
└── ru/
    └── translations.json
```

Translations integrate with centralized `universo-i18n` package.

## Asset Management

Packages with UI components include `assets/` directory:

```
src/assets/
├── icons/
│   └── {icon-name}.svg
└── images/
    └── {image-name}.png
```

- **Angular**: Assets handled by ng-packagr
- **Go**: Assets embedded using go:embed

## Testing Strategy

Each package includes comprehensive tests:

- **Unit Tests**: Component/function level testing
- **Integration Tests**: API and workflow testing
- **E2E Tests**: End-to-end user flows (where applicable)

Test coverage target: **80%+**

## Version Management

- **Shared Infrastructure**: Semantic versioning, stable APIs
- **Feature Packages**: Independent versioning
- **Authentication**: Breaking changes coordinated across frt/srv

## Future Extensibility

Packages are designed for potential extraction to separate repositories:

- Loose coupling between packages
- Well-defined interfaces
- Explicit version constraints
- Self-contained functionality
- Complete documentation

## Contributing

When contributing to packages:

1. Follow package structure conventions
2. Maintain bilingual documentation
3. Write comprehensive tests
4. Update package README
5. Follow TypeScript/Go best practices
6. Use workspace dependencies correctly
7. Ensure build succeeds
8. Run linting and tests

## Resources

- **Architecture Comparison**: See `specs/001-project-initialization/architecture-comparison.md`
- **Package Templates**: `TEMPLATE-README.md` and `TEMPLATE-README-GUIDE.md`
- **GitHub Instructions**: `.github/instructions/` for Issues, PRs, labels, i18n
- **Constitution**: `.specify/memory/constitution.md` for governance

---

**License**: Omsk Open License (Basic modification)

For questions or issues, please refer to the repository documentation or create an issue.
