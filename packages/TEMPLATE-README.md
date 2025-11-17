# {Package Name}

## Overview

{Brief description of the package's purpose and role in the Universo Platformo Angular ecosystem}

## Package Information

- **Package**: `{package-name}` or `@universo/{package-name}`
- **Version**: `{version}`
- **Type**: {Frontend/Backend/Library/Shared}
- **Framework**: {Main technologies and frameworks used}
- **Dependencies**: {Key dependency relationships}

## Key Features

### 🎯 {Primary Feature Category}
- **Feature 1**: Description of the feature
- **Feature 2**: Description of the feature
- **Feature 3**: Description of the feature

### 🔧 {Secondary Feature Category (if applicable)}
- **Feature 1**: Description of the feature
- **Feature 2**: Description of the feature

### 🏗️ {Architecture/Integration Category (if applicable)}
- **Integration Point 1**: Description
- **Integration Point 2**: Description

## Installation & Setup

### Prerequisites
```bash
# List any prerequisites
Node.js >= 18.0.0
Go >= 1.20.0
PNPM >= 8.0.0
```

### Installation
```bash
# For workspace packages
pnpm install

# For external usage (if applicable)
pnpm add @universo/{package-name}
```

### Configuration
```bash
# Environment variables (if applicable)
{ENV_VAR_1}=value1
{ENV_VAR_2}=value2
```

## Usage

### Basic Usage (Frontend - Angular)
```typescript
// Basic usage example for Angular
import { ComponentName } from '@universo/{package-name}'

// Usage code
@Component({
  selector: 'app-example',
  template: '<component-name></component-name>'
})
export class ExampleComponent {}
```

### Basic Usage (Backend - Go)
```go
// Basic usage example for Go
package main

import (
    "{package-name}/internal/handlers"
)

func main() {
    // Usage code
}
```

### Advanced Usage
```typescript
// Advanced usage example
// More complex implementation
```

## Architecture

### Core Components
- **Component 1**: Purpose and functionality
- **Component 2**: Purpose and functionality
- **Component 3**: Purpose and functionality

### Dependencies
```json
{
  "dependency1": "^x.y.z",
  "dependency2": "^x.y.z"
}
```

## File Structure

### Frontend Package (Angular)
```
packages/{package-name}/
├── base/                   # Default implementation
│   ├── src/               # Source code
│   │   ├── lib/           # Library code
│   │   │   ├── components/    # Angular components
│   │   │   ├── services/      # Angular services
│   │   │   ├── guards/        # Route guards
│   │   │   ├── directives/    # Custom directives
│   │   │   ├── pipes/         # Custom pipes
│   │   │   └── interceptors/  # HTTP interceptors
│   │   ├── assets/        # Static resources (icons, images)
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── i18n/          # Internationalization
│   │   │   ├── en/        # English translations
│   │   │   └── ru/        # Russian translations
│   │   ├── features/      # Feature modules (complex packages)
│   │   └── public-api.ts  # Public API exports
│   ├── dist/              # Compiled output
│   ├── package.json
│   ├── tsconfig.json
│   ├── ng-package.json    # Angular library configuration
│   ├── README.md          # This file
│   └── README-RU.md       # Russian documentation
├── package.json           # Workspace package configuration
└── README.md              # Package overview
```

### Backend Package (Go)
```
packages/{package-name}/
├── base/                   # Default implementation
│   ├── cmd/               # Command-line applications
│   │   └── server/        # Server entry point
│   ├── internal/          # Private application code
│   │   ├── handlers/      # HTTP handlers
│   │   ├── middleware/    # Middleware functions
│   │   ├── services/      # Business logic
│   │   ├── repository/    # Data access layer
│   │   ├── models/        # Data models
│   │   ├── validators/    # Input validation
│   │   └── configs/       # Configuration
│   ├── pkg/               # Public libraries (if needed)
│   ├── assets/            # Embedded static resources
│   ├── go.mod
│   ├── go.sum
│   ├── README.md          # This file
│   └── README-RU.md       # Russian documentation
├── package.json           # Workspace package configuration
└── README.md              # Package overview
```

### Shared Library Package (TypeScript)
```
packages/{package-name}/
├── base/                   # Default implementation
│   ├── src/               # Source code
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── types/         # Type definitions
│   │   ├── utils/         # Utility functions
│   │   └── index.ts       # Entry point
│   ├── dist/              # Compiled output (CJS, ESM, types)
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md          # This file
│   └── README-RU.md       # Russian documentation
├── package.json           # Workspace package configuration
└── README.md              # Package overview
```

## Testing

### Test Setup
```bash
# Install dependencies
pnpm install

# Run tests (Angular)
pnpm test

# Run tests (Go)
go test ./...

# Run tests in watch mode (Angular)
pnpm test:watch

# Run tests with coverage
pnpm test:coverage  # Angular
go test -cover ./... # Go
```

### Test Structure
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and workflow testing
- **E2E Tests**: End-to-end user flow testing (if applicable)

## Development

### Local Development (Frontend)
```bash
# Install dependencies
pnpm install

# Start development build watch
pnpm dev

# Build project
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

### Local Development (Backend)
```bash
# Install dependencies
go mod download

# Run in development mode
go run cmd/server/main.go

# Build project
go build -o bin/server cmd/server/main.go

# Run linting
golangci-lint run

# Format code
go fmt ./...
```

### Development Guidelines
- Follow TypeScript-first development for frontend
- Follow Go best practices for backend
- Use workspace imports for cross-package dependencies
- Follow repository coding standards and linting rules
- Maintain bilingual documentation (EN/RU)
- Write tests for all new functionality

## Integration Points

### Package Dependencies
- **Package 1**: Integration description
- **Package 2**: Integration description

### External Services (if applicable)
- **Service 1**: Integration description
- **Service 2**: Integration description

## API Reference

### Frontend Components (Angular)
{ANGULAR_COMPONENT_DOCUMENTATION}

### Backend Handlers (Go)
{GO_HANDLER_DOCUMENTATION}

### Public Functions/Methods
{PUBLIC_API_DOCUMENTATION}

## Configuration

### Environment Variables
```bash
# Configuration options for development
{CONFIG_VAR_1}=default_value  # Description
{CONFIG_VAR_2}=default_value  # Description
```

### Configuration Files
- **angular.json**: Angular workspace configuration (frontend)
- **tsconfig.json**: TypeScript configuration
- **go.mod**: Go module configuration (backend)
- **package.json**: NPM/PNPM package configuration

## Internationalization

### Adding Translations

**Frontend (Angular)**:
1. Add translation keys to `src/i18n/en/translations.json`
2. Add corresponding Russian translations to `src/i18n/ru/translations.json`
3. Use in templates: `{{ 'key' | translate }}`
4. Use in components: `this.translate.instant('key')`

**Backend (Go)**:
1. Use universo-i18n package for localization
2. Follow package-specific i18n patterns

### Translation File Structure
```
src/i18n/
├── en/
│   └── translations.json
└── ru/
    └── translations.json
```

## Assets Management

### Adding Assets (Frontend)
```
src/assets/
├── icons/
│   └── {icon-name}.svg
└── images/
    └── {image-name}.png
```

### Embedding Assets (Backend)
```go
//go:embed assets/*
var assetsFS embed.FS
```

## Documentation

- **Architecture Documentation**: [architecture-comparison.md](../../specs/001-project-initialization/architecture-comparison.md)
- **API Documentation**: Link to detailed API docs
- **Integration Guides**: Links to integration documentation

## Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes following coding standards
3. Add appropriate tests for new functionality
4. Update documentation as needed (both EN and RU)
5. Run linting and tests
6. Submit pull request for review

### Code Standards
- Follow Angular style guide for frontend code
- Follow Effective Go for backend code
- Use TypeScript strict mode
- Write meaningful commit messages
- Maintain test coverage above 80%

### Bilingual Documentation Requirements
- All documentation MUST be provided in both English and Russian
- English version is created first (authoritative)
- Russian version MUST match English exactly (structure, content, line count)
- Use `.github/instructions/i18n-docs.md` as reference

## License

This project is being implemented under the [Omsk Open License](https://universo.pro/ol) (Basic modification).

---

**Support**: For questions, issues, or feature requests, please refer to the project documentation or create an issue in the repository.
