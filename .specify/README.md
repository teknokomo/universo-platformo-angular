# .specify Directory Structure

This directory contains all project specifications, documentation, and tooling for the Spec-Driven Development workflow.

## Directory Structure

```
.specify/
├── memory/              # Project constitution and principles
│   ├── constitution.md  # Core project principles and governance
│   ├── BEST-PRACTICES.md         # Technology-specific best practices
│   ├── BEST-PRACTICES-RU.md      # Russian translation
│   ├── BEST-PRACTICES-VERIFICATION.md  # Best practices validation
│   ├── CONSTITUTION_REVIEW.md    # Constitution review reports
│   ├── CONSTITUTION_REVIEW-RU.md # Russian translation
│   └── MODULAR-ARCHITECTURE-VALIDATION.md
├── specs/               # Feature specifications
│   └── 001-project-initialization/  # Example feature directory
│       ├── spec.md      # Feature specification
│       ├── plan.md      # Implementation plan
│       ├── tasks.md     # Task breakdown
│       ├── data-model.md    # Data model (optional)
│       ├── research.md      # Research notes (optional)
│       ├── quickstart.md    # Quick start guide (optional)
│       ├── contracts/       # API contracts (optional)
│       └── checklists/      # Review checklists (optional)
├── scripts/             # Automation scripts
│   └── bash/
│       ├── check-prerequisites.sh  # Validate workflow prerequisites
│       └── common.sh               # Common functions
└── templates/           # Document templates
    ├── spec-template.md
    ├── plan-template.md
    ├── tasks-template.md
    ├── checklist-template.md
    └── agent-file-template.md
```

## Usage

### Working with Feature Specifications

All feature specifications are stored in `.specify/specs/` using the pattern:
- `NNN-feature-name/` where NNN is a zero-padded number (e.g., 001, 002, 003)

Each feature directory should contain:
- **spec.md** (required): Feature specification with user stories
- **plan.md** (required): Implementation plan with technical decisions
- **tasks.md** (required): Detailed task breakdown
- Additional optional documents as needed

### Scripts

Scripts in `.specify/scripts/bash/` help automate the workflow:

```bash
# Check prerequisites and get feature paths
.specify/scripts/bash/check-prerequisites.sh --json --paths-only

# Check prerequisites with task validation
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

### Constitution and Principles

The project constitution (`.specify/memory/constitution.md`) defines:
1. Package-first architecture requirements
2. Bilingual documentation standards
3. Technology stack adherence
4. GitHub workflow integration
5. Incremental feature development
6. Specification-driven development

All best practices documents are also stored in `.specify/memory/` for easy reference.

## Agent Configuration

GitHub Copilot agents in `.github/agents/` are configured to access `.specify/` directories:
- **tasks** mode: Has access to `.specify/` for task generation
- **analytics** mode: Has access to `.specify/` for consistency analysis
- All other agents: Follow paths defined in `.specify/scripts/bash/common.sh`

## Migration Notes

This structure was reorganized from the previous layout:
- `specs/` → `.specify/specs/` (feature specifications)
- Root-level constitution/best practices files → `.specify/memory/`

All scripts and agent configurations have been updated to use the new paths.
