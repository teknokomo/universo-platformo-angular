# Quickstart Guide - Universo Platformo Angular

**Version**: 1.0.0  
**Last Updated**: 2025-11-17  
**Target Audience**: New developers joining the project

## Welcome! 🎉

This guide will help you set up your development environment and start contributing to Universo Platformo Angular within 30 minutes. This is a monorepo project built with Angular (frontend), Gin (backend), and managed with PNPM workspaces.

---

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software

| Tool | Minimum Version | Check Command | Installation |
|------|----------------|---------------|--------------|
| **Node.js** | 18.x or higher | `node --version` | [nodejs.org](https://nodejs.org/) |
| **Go** | 1.20 or higher | `go version` | [go.dev/dl](https://go.dev/dl/) |
| **PNPM** | 8.x or higher | `pnpm --version` | `npm install -g pnpm` |
| **Git** | 2.x or higher | `git --version` | [git-scm.com](https://git-scm.com/) |

### Optional (Recommended)

- **VS Code** with extensions:
  - Angular Language Service
  - Go (by Go Team at Google)
  - ESLint
  - Prettier
- **Docker** (for running Supabase locally, optional)

---

## Quick Setup (5 Steps)

### Step 1: Clone the Repository

```bash
git clone https://github.com/teknokomo/universo-platformo-angular.git
cd universo-platformo-angular
```

### Step 2: Install Dependencies

```bash
# Install all package dependencies using PNPM workspaces
pnpm install
```

This command installs dependencies for all packages in the monorepo.

### Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

**Required environment variables**:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# API Configuration
API_PORT=3000
API_BASE_URL=http://localhost:3000

# Frontend Configuration
FRONTEND_PORT=4200

# Environment
NODE_ENV=development
```

**Getting Supabase credentials**:
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### Step 4: Build Shared Packages

```bash
# Build all shared infrastructure packages
pnpm build:shared
```

This builds the foundational packages in the correct order:
- `universo-types`
- `universo-utils`
- `universo-api-client`
- `universo-i18n`
- `universo-ng-components`

### Step 5: Start Development Servers

```bash
# Terminal 1: Start backend (Gin server)
pnpm dev:backend

# Terminal 2: Start frontend (Angular dev server)
pnpm dev:frontend
```

**You're ready!** 🚀

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:3000](http://localhost:3000)
- API Health: [http://localhost:3000/api/v1/auth/health](http://localhost:3000/api/v1/auth/health)

---

## Project Structure Overview

```
universo-platformo-angular/
├── packages/                    # All monorepo packages
│   ├── universo-types/         # Shared TypeScript types
│   ├── universo-utils/         # Shared utilities
│   ├── universo-api-client/   # API client libraries
│   ├── universo-i18n/         # Internationalization
│   ├── universo-rest-docs/    # API documentation
│   ├── universo-ng-components/ # Shared Angular components
│   ├── auth-frt/              # Authentication frontend (Angular)
│   └── auth-srv/              # Authentication backend (Go/Gin)
│
├── .github/                    # GitHub workflows and documentation
│   ├── instructions/          # Contribution guidelines
│   │   ├── github-issues.md
│   │   ├── github-pr.md
│   │   ├── github-labels.md
│   │   └── i18n-docs.md
│   └── workflows/             # CI/CD pipelines
│
├── .specify/                   # Specification system
│   ├── memory/                # Project memory and constitution
│   ├── scripts/               # Specification scripts
│   └── templates/             # Templates for specs and plans
│
├── specs/                      # Feature specifications
│   └── 001-project-initialization/
│       ├── spec.md            # Feature specification
│       ├── plan.md            # Implementation plan
│       ├── research.md        # Research findings
│       ├── data-model.md      # Data models
│       ├── quickstart.md      # This guide
│       └── contracts/         # API contracts
│
├── pnpm-workspace.yaml        # PNPM workspace configuration
├── package.json               # Root package with workspace scripts
├── nx.json                    # Nx build orchestration config
├── .env.example               # Example environment variables
├── README.md                  # English documentation
└── README-RU.md               # Russian documentation
```

---

## Understanding the Monorepo

### Package Types

1. **Shared Infrastructure** (`universo-*`):
   - Used by all other packages
   - Built first, published as internal workspace packages
   - Examples: types, utils, api-client

2. **Feature Packages**:
   - Separated into frontend (`*-frt`) and backend (`*-srv`)
   - Each has a `base/` directory for core implementation
   - Example: `auth-frt`, `auth-srv`

### Build System

We use **Nx** for intelligent build orchestration:

```bash
# Build all packages
pnpm build

# Build only affected packages (after changes)
pnpm build:affected

# Build specific package
pnpm --filter auth-frt build

# Run tests
pnpm test

# Run tests for affected packages
pnpm test:affected
```

### Dependency Management

PNPM catalog ensures consistent versions:

```json
// In package.json
{
  "dependencies": {
    "@angular/core": "catalog:",  // Uses version from catalog
    "@universo/types": "workspace:*"  // Internal package
  }
}
```

---

## Development Workflow

### 1. Before Starting Work

**Always create an Issue first** (see `.github/instructions/github-issues.md`):

```bash
# Fetch repository labels
gh label list

# Create issue with bilingual content
# Title: "Add user profile management"
# Body: English description + Russian translation in spoiler
```

### 2. Create Feature Branch

```bash
# Branch naming: {issue-number}-{short-description}
git checkout -b 42-add-user-profile

# Or for specifications: {spec-number}-{feature-name}
git checkout -b 002-user-profiles
```

### 3. Make Changes

Follow package-specific development guides:

**Angular (Frontend)**:
```bash
cd packages/auth-frt

# Generate component
nx generate component login --project=auth-frt

# Run dev server with hot reload
pnpm dev

# Run tests
pnpm test
```

**Go (Backend)**:
```bash
cd packages/auth-srv

# Run with hot reload (using air or fresh)
pnpm dev

# Run tests
go test ./...

# Build
go build -o dist/auth-srv ./cmd/server
```

### 4. Testing

```bash
# Unit tests (all packages)
pnpm test

# E2E tests (Playwright)
pnpm test:e2e

# Specific package tests
pnpm --filter auth-frt test

# Watch mode
pnpm --filter auth-frt test:watch
```

### 5. Linting & Formatting

```bash
# Lint all code
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### 6. Create Pull Request

Follow `.github/instructions/github-pr.md`:

```
Title: GH42 Add user profile management

Body:
- English description with changes
- Russian translation in <details><summary>In Russian</summary>
- Link to issue: Fixes #42
- Testing checklist
```

---

## Common Tasks

### Add a New Package

```bash
# Frontend package (Angular)
nx generate @nx/angular:library my-feature-frt

# Backend package (Go)
mkdir -p packages/my-feature-srv/base
cd packages/my-feature-srv/base
go mod init github.com/teknokomo/universo-platformo-angular/packages/my-feature-srv
```

### Update Dependencies

```bash
# Update all packages to latest compatible versions
pnpm update

# Update specific package
pnpm update @angular/core --latest

# Update catalog version
# Edit pnpm-workspace.yaml, then:
pnpm install
```

### Debug Issues

**Frontend (Angular)**:
```bash
# Verbose build
pnpm --filter auth-frt build --verbose

# Check Angular CLI version
pnpm ng version

# Clear cache
rm -rf node_modules/.cache
pnpm install
```

**Backend (Go)**:
```bash
# Verbose build
go build -v ./...

# Check dependencies
go mod verify
go mod tidy

# Run with debugging
go run -race ./cmd/server
```

---

## Bilingual Documentation

**Important**: All documentation must be bilingual (English + Russian).

### Creating Documentation

1. **Write English version first** (e.g., `README.md`)
2. **Create Russian version** (e.g., `README-RU.md`)
3. **Ensure identical structure**: Same number of lines, same sections
4. **Commit both together**

See `.github/instructions/i18n-docs.md` for details.

---

## Getting Help

### Documentation

- **README.md**: Project overview
- **.github/instructions/**: Contribution guidelines
- **specs/**: Feature specifications and research
- **Package READMEs**: Package-specific documentation

### Common Issues

**Issue**: `pnpm install` fails
- **Solution**: Check Node.js version (>= 18), delete `node_modules` and `pnpm-lock.yaml`, retry

**Issue**: Build fails with type errors
- **Solution**: Ensure shared packages are built first: `pnpm build:shared`

**Issue**: Backend won't start
- **Solution**: Check `.env` file, verify Supabase credentials, check port 3000 is free

**Issue**: Frontend errors after package update
- **Solution**: Clear cache: `rm -rf .angular`, rebuild: `pnpm build`

### Ask for Help

- **GitHub Discussions**: Ask questions, share ideas
- **Issues**: Report bugs or problems
- **Pull Requests**: Get code review feedback

---

## Next Steps

Now that your environment is set up:

1. ✅ Read the [Constitution](.specify/memory/constitution.md) to understand project principles
2. ✅ Explore the [specification](.specify/specs/001-project-initialization/spec.md) for project initialization
3. ✅ Review [data models](.specify/specs/001-project-initialization/data-model.md) and [API contracts](.specify/specs/001-project-initialization/contracts/auth-api.md)
4. ✅ Check existing Issues and pick one to work on
5. ✅ Start contributing! 🚀

### Learning Resources

**Angular**:
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Guide](https://rxjs.dev/guide/overview)

**Go/Gin**:
- [Go Documentation](https://go.dev/doc/)
- [Gin Framework](https://gin-gonic.com/docs/)
- [Effective Go](https://go.dev/doc/effective_go)

**Monorepo**:
- [Nx Documentation](https://nx.dev/getting-started/intro)
- [PNPM Workspaces](https://pnpm.io/workspaces)

**Supabase**:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

---

## Tips for Success

1. **Start Small**: Pick a small issue for your first contribution
2. **Ask Questions**: Use GitHub Discussions, don't hesitate to ask
3. **Follow Conventions**: Read the constitution and guidelines
4. **Test Thoroughly**: Write tests for your changes
5. **Document Well**: Update documentation when adding features
6. **Bilingual Always**: Remember English + Russian for all docs
7. **Small PRs**: Keep pull requests focused and small
8. **Code Review**: Learn from feedback, improve continuously

---

## Troubleshooting Quick Reference

| Problem | Command | Notes |
|---------|---------|-------|
| Dependencies out of sync | `pnpm install` | Run from root |
| Build cache issues | `pnpm clean && pnpm build` | Clears all caches |
| Port already in use | `lsof -ti:3000 \| xargs kill` | Change port or kill process |
| Type errors | `pnpm build:shared` | Rebuild shared packages first |
| Git conflicts | `git checkout main && git pull` | Update main, rebase your branch |
| Test failures | `pnpm test:watch` | Debug in watch mode |

---

## Congratulations! 🎊

You're now ready to contribute to Universo Platformo Angular. Happy coding!

**Questions?** Open a GitHub Discussion or ask in your Pull Request.

**Found an issue in this guide?** Please open an Issue or submit a PR to improve it.

---

*Last updated: 2025-11-17 | Version: 1.0.0*
