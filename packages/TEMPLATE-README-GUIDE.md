# Package README Template Usage Guide

This guide explains how to use the TEMPLATE-README.md to create documentation for packages in the Universo Platformo Angular monorepo.

## Template Placeholders

### Required Replacements

Replace ALL placeholders with actual content:

| Placeholder | Description | Example |
|------------|-------------|---------|
| `{Package Name}` | Human-readable package name | "Authentication Frontend" |
| `{package-name}` | Package identifier | "auth-frt" or "@universo/auth-srv" |
| `{version}` | Current package version | "0.1.0" |
| `{ENV_VAR_1}` | Environment variable name | "SUPABASE_URL" |
| `{Primary Feature Category}` | Main feature group name | "Authentication Components" |
| `{Secondary Feature Category}` | Additional feature group | "Session Management" |
| `{CONFIG_VAR_1}` | Configuration variable name | "JWT_SECRET" |

### Conditional Sections

Include or exclude entire sections based on package type:

#### All Packages Include:
- Overview
- Package Information
- Key Features
- Installation & Setup
- Architecture
- File Structure (appropriate type)
- Testing
- Development
- Documentation
- Contributing
- License

#### Frontend Packages (Angular) Include:
- Angular-specific Usage examples
- Frontend File Structure
- Angular Components API Reference
- ngx-translate i18n instructions
- Angular CLI commands

#### Backend Packages (Go) Include:
- Go-specific Usage examples
- Backend File Structure
- Go Handlers API Reference
- Go embed assets instructions
- Go build commands

#### Shared Library Packages Include:
- Both TypeScript and usage examples if applicable
- Shared Library File Structure
- Public API documentation
- Build configuration for dual output (CJS, ESM)

## Step-by-Step Usage

### 1. Copy the Template

```bash
cp packages/TEMPLATE-README.md packages/{your-package-name}/base/README.md
```

### 2. Replace Basic Information

Start at the top and work down:

```markdown
# Authentication Frontend   # ← Your package name

## Overview

The Authentication Frontend package provides Angular components, services, and guards 
for implementing user authentication in Universo Platformo Angular applications.
# ← Your description

## Package Information

- **Package**: `@universo/auth-frt`          # ← Your package identifier
- **Version**: `0.1.0`                       # ← Your version
- **Type**: Frontend                         # ← Package type
- **Framework**: Angular 17, TypeScript 5    # ← Your tech stack
- **Dependencies**: `@universo/types`, `@angular/common`  # ← Key deps
```

### 3. Document Features

Replace feature category placeholders with actual features:

```markdown
## Key Features

### 🎯 Authentication Components
- **LoginForm**: Responsive login form with email/password validation
- **SessionGuard**: Route guard for protecting authenticated routes
- **LogoutButton**: Pre-styled logout button component

### 🔧 Authentication Services
- **AuthService**: Core authentication service with Supabase integration
- **TokenService**: JWT token management and refresh logic

### 🏗️ Integration
- **Supabase Integration**: Direct integration with Supabase authentication
- **HTTP Interceptors**: Automatic token injection for API requests
```

### 4. Update Usage Examples

Provide actual, working code examples:

```typescript
// Replace generic examples with real usage
import { AuthService, SessionGuard } from '@universo/auth-frt'

// Actual component code that works
@Component({
  selector: 'app-login',
  template: `<universo-login-form (onLogin)="handleLogin($event)"></universo-login-form>`
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  
  handleLogin(credentials: { email: string; password: string }) {
    this.authService.login(credentials).subscribe(...)
  }
}
```

### 5. Customize File Structure

Choose the appropriate file structure section and remove others:

For **Frontend (Angular)** - Keep the Angular section, remove Go and Shared Library sections.

For **Backend (Go)** - Keep the Go section, remove Angular and Shared Library sections.

For **Shared Library** - Keep the Shared Library section, remove Angular and Go sections.

### 6. Document API Reference

Replace API placeholder sections with actual documentation:

```markdown
## API Reference

### AuthService

#### Methods

**login(credentials: Credentials): Observable<AuthResponse>**
- **Description**: Authenticates user with email and password
- **Parameters**:
  - `credentials`: Object containing `email` and `password`
- **Returns**: Observable of AuthResponse with user data and token
- **Example**:
  ```typescript
  authService.login({ email: 'user@example.com', password: 'pass123' })
    .subscribe(response => console.log(response.user))
  ```

**logout(): void**
- **Description**: Logs out current user and clears session
- **Parameters**: None
- **Returns**: void
```

### 7. Add Configuration Details

Replace configuration placeholders with actual environment variables:

```markdown
## Configuration

### Environment Variables
```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co  # Supabase project URL
SUPABASE_ANON_KEY=your-anon-key                # Supabase anonymous key

# JWT Configuration
JWT_SECRET=your-secret-key                      # JWT signing secret
JWT_EXPIRY=3600                                # Token expiry in seconds
```

### Configuration Files
- **environment.ts**: Development environment configuration
- **environment.prod.ts**: Production environment configuration
```

### 8. Update Integration Points

Document how this package integrates with others:

```markdown
## Integration Points

### Package Dependencies
- **@universo/types**: Uses `User`, `AuthResponse` types
- **@universo/api-client**: Uses `ApiClient` for backend communication
- **universo-ng-components**: Uses common UI components

### External Services
- **Supabase Auth**: Authenticates users via Supabase authentication service
- **Backend API**: Communicates with auth-srv package for session management
```

### 9. Document Tests

Provide actual test commands and structure:

```bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode for development
pnpm test:watch
```

### 10. Create Russian Version

After completing the English README.md:

```bash
cp packages/{your-package-name}/base/README.md packages/{your-package-name}/base/README-RU.md
```

Then translate ALL content to Russian while maintaining:
- **Exact same structure**: Same sections, same order
- **Exact same line count**: Each line translates to one line
- **Same code examples**: Keep code unchanged, translate only comments
- **Same formatting**: Preserve markdown syntax

## Package Type Guidelines

### Frontend Package (Angular)

**Focus on:**
- Angular components, services, directives
- Template usage examples
- Component inputs/outputs
- Angular-specific lifecycle hooks
- RxJS observables
- ngx-translate usage

**File structure:**
```
packages/auth-frt/
└── base/
    ├── src/
    │   ├── lib/              # Main library code
    │   ├── assets/           # Icons and images
    │   ├── i18n/             # Translations
    │   └── public-api.ts     # Public exports
    ├── dist/                 # Build output
    ├── package.json
    ├── ng-package.json       # Angular library config
    ├── README.md
    └── README-RU.md
```

### Backend Package (Go)

**Focus on:**
- HTTP handlers and routes
- Middleware functions
- Business logic services
- Database repositories
- Input validation
- Error handling

**File structure:**
```
packages/auth-srv/
└── base/
    ├── cmd/                  # Entry points
    ├── internal/             # Private code
    │   ├── handlers/
    │   ├── middleware/
    │   ├── services/
    │   ├── repository/
    │   ├── validators/
    │   └── configs/
    ├── assets/               # Embedded assets
    ├── go.mod
    ├── README.md
    └── README-RU.md
```

### Shared Library Package (TypeScript)

**Focus on:**
- Type definitions and interfaces
- Utility functions
- Shared constants
- Abstract base classes
- Common helpers

**File structure:**
```
packages/universo-types/
└── base/
    ├── src/
    │   ├── interfaces/       # Interface definitions
    │   ├── types/            # Type definitions
    │   └── index.ts          # Exports
    ├── dist/                 # CJS, ESM, types
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    └── README-RU.md
```

## Content Quality Checklist

Before finalizing your README, verify:

- [ ] **All placeholders replaced** - No `{placeholder}` text remains
- [ ] **Accurate examples** - All code examples are tested and work
- [ ] **Complete API docs** - All public APIs documented
- [ ] **Current dependencies** - Dependency list matches package.json
- [ ] **Accurate file structure** - Structure matches actual package layout
- [ ] **Working commands** - All bash/terminal commands tested
- [ ] **Proper section inclusion** - Irrelevant sections removed
- [ ] **Integration documentation** - Clear explanation of dependencies
- [ ] **Configuration complete** - All environment variables documented
- [ ] **Russian version created** - README-RU.md exists and matches
- [ ] **Bilingual accuracy** - Russian version is exact translation
- [ ] **Line count match** - EN and RU files have same line count
- [ ] **Code examples unchanged** - Code stays same in both languages
- [ ] **License included** - License section present

## Common Mistakes to Avoid

### ❌ Don't Do This:

```markdown
# {Package Name}   ← Forgot to replace placeholder

## Overview
TODO: Add description   ← Incomplete content

### Basic Usage
```typescript
// Example coming soon   ← Missing actual examples
```

## File Structure
{STRUCTURE_FOR_MODERN_PACKAGES}   ← Forgot to replace with actual structure
```

### ✅ Do This Instead:

```markdown
# Authentication Frontend   ← Real name

## Overview
The Authentication Frontend package provides Angular components...   ← Complete description

### Basic Usage
```typescript
import { AuthService } from '@universo/auth-frt'   ← Working example

@Component({...})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  // ... actual implementation
}
```

## File Structure
```
packages/auth-frt/
└── base/
    ├── src/   ← Actual structure
    ...
```

## Template Maintenance

### When to Update the Template

- New package types are introduced
- New required sections identified
- Better examples become available
- Structure conventions change
- Tooling requirements change

### Template Version Control

The template should evolve with the project. When updating:

1. Update TEMPLATE-README.md
2. Update this guide
3. Document changes in commit message
4. Notify team of changes
5. Consider updating existing package READMEs

## Getting Help

If you're unsure about how to document something:

1. Check existing package READMEs for examples
2. Review `.github/instructions/` for documentation guidelines
3. Consult the architecture comparison document
4. Ask team members for review
5. Create an issue for template improvements

## Quick Reference

### Essential Sections (All Packages)

1. Title
2. Overview
3. Package Information
4. Key Features
5. Installation & Setup
6. Usage (with real examples)
7. Architecture
8. File Structure
9. Testing
10. Development
11. Documentation
12. Contributing
13. License

### Optional Sections (Add If Relevant)

- API Reference
- Configuration
- Internationalization
- Assets Management
- Integration Points
- Migration Guide (for evolving packages)
- Troubleshooting
- Performance Considerations

### Bilingual Workflow

```bash
# 1. Write complete English version
vim packages/my-package/base/README.md

# 2. Copy to Russian version
cp packages/my-package/base/README.md packages/my-package/base/README-RU.md

# 3. Translate while preserving structure
vim packages/my-package/base/README-RU.md

# 4. Verify line count matches
wc -l packages/my-package/base/README*.md
```

---

**Remember**: Good documentation is as important as good code. Take time to write clear, accurate, and helpful READMEs that make your package easy to understand and use.
