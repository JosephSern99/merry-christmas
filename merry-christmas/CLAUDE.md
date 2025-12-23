# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **BMAD-METHOD™ v4.44.3** installation - an AI-powered agile development framework that provides specialized AI agents, workflows, and templates for software development. This is NOT a traditional codebase with application code. It's the orchestration layer for managing AI-assisted development workflows.

**Critical Understanding**: The git history shows this repository previously contained an Angular-based Cashku CRM Admin Portal that has been removed. The current purpose is to serve as the BMAD framework installation for AI-driven development orchestration.

## Framework Structure

### Core Directory: `.bmad-core/`

Contains the entire framework:
- **agents/** - 10 specialized AI agent definitions
- **tasks/** - 30+ executable workflow tasks
- **templates/** - 12 YAML-based document templates
- **checklists/** - Quality assurance validation checklists
- **workflows/** - 6 pre-defined greenfield/brownfield workflows
- **data/** - Knowledge base and technical preferences
- **core-config.yaml** - **CRITICAL** project configuration file

### IDE Integration: `.claude/commands/BMad/`

Claude Code slash-command integration providing access to all agents and tasks.

## Essential Configuration

The most important file is `.bmad-core/core-config.yaml`:

```yaml
markdownExploder: true
qa:
  qaLocation: docs/qa
prd:
  prdFile: docs/prd.md
  prdVersion: v4
  prdSharded: true
  prdShardedLocation: docs/prd
  epicFilePattern: epic-{n}*.md
architecture:
  architectureFile: docs/architecture.md
  architectureVersion: v4
  architectureSharded: true
  architectureShardedLocation: docs/architecture
devLoadAlwaysFiles:
  - docs/architecture/coding-standards.md
  - docs/architecture/tech-stack.md
  - docs/architecture/source-tree.md
devDebugLog: .ai/debug-log.md
devStoryLocation: docs/stories
slashPrefix: BMad
```

**Never modify this file** without understanding the full impact on agent workflows.

## The 10 Specialized Agents

Access via slash commands in Claude Code:

| Agent | Command | Role | Primary Use |
|-------|---------|------|-------------|
| **analyst** | `/analyst` | Business Analyst | Market research, competitor analysis, requirements gathering |
| **pm** | `/pm` | Product Manager | PRD creation, feature prioritization, product roadmaps |
| **architect** | `/architect` | Solution Architect | System design, technical architecture, technology decisions |
| **ux-expert** | `/ux-expert` | UX Designer | UI/UX specifications, design systems, user flows |
| **dev** | `/dev` | Full Stack Developer | Code implementation, debugging, testing (persona: James) |
| **po** | `/po` | Product Owner | Story validation, backlog management, document sharding |
| **sm** | `/sm` | Scrum Master | Story creation, sprint planning, task breakdown |
| **qa** | `/qa` | QA Specialist | Test planning, code review, quality gates (persona: Quinn) |
| **bmad-orchestrator** | `/bmad-orchestrator` | Team Coordinator | Multi-agent workflows, role switching |
| **bmad-master** | `/bmad-master` | Universal Expert | All-in-one capability |

## Critical Development Rules

### ALWAYS Follow These Principles

1. **Use FRESH chat windows** when switching between SM, Dev, and QA agents
2. **NEVER use bmad-master or orchestrator** for development work (only for planning)
3. **ONE story at a time** - complete fully before moving to next
4. **Sequential agent workflow**: SM → Dev → QA (in separate chats)
5. **Dev agent context**: Keep lean - don't load external docs unless explicitly directed

### The Standard Development Cycle

```
NEW CHAT → /sm → *create (generate story)
  ↓ (Review story, update status: Draft → Approved)
NEW CHAT → /dev → *develop-story {story-file}
  ↓ (Implement, test, mark checkboxes, update File List)
NEW CHAT → /qa → *review {completed-story}
  ↓ (Code review, refactoring, quality gate decision)
REPEAT for next story
```

## Common Commands

### Story Management (SM Agent)
```bash
/sm
*create          # Create next story from epics
*draft           # Draft next story (same as *create)
*help            # Show available SM commands
```

### Development (Dev Agent)
```bash
/dev
*develop-story {story-file}   # Implement approved story
*help                         # Show available Dev commands
```

### Quality Assurance (QA Agent)
```bash
/qa
*risk {story}          # Risk assessment (before dev starts)
*design {story}        # Test strategy creation (before dev starts)
*trace {story}         # Requirements tracing (during dev)
*nfr {story}           # Non-functional requirements validation (during dev)
*review {story}        # Comprehensive code review (after dev complete)
*gate {story}          # Update quality gate decision (post-review)
*help                  # Show available QA commands
```

### Planning (PM Agent)
```bash
/pm
*create-prd            # Create Product Requirements Document
*create-brownfield-prd # Create PRD for existing project enhancements
*help                  # Show available PM commands
```

### Architecture (Architect Agent)
```bash
/architect
*create-architecture   # Create system architecture document
*document-project      # Document existing codebase (brownfield)
*help                  # Show available Architect commands
```

### Document Management (PO Agent)
```bash
/po
*shard-prd             # Break PRD into epic files
*shard-architecture    # Break architecture into component files
*help                  # Show available PO commands
```

## Two-Phase Development Approach

### Phase 1: Planning (Recommended: Web UI for cost savings)

**Ideal Platform**: Gemini Web (1M token context window)

**Workflow**:
1. Optional: Analyst → Market research, competitor analysis, project brief
2. PM → Create PRD with functional requirements, NFRs, epics, stories
3. Optional: UX Expert → UI specifications, design system
4. Architect → System architecture from PRD (+ UX spec if available)
5. Optional: QA → Early test strategy for high-risk areas
6. PO → Run master checklist to validate alignment
7. Copy `docs/prd.md` and `docs/architecture.md` to project

### Phase 2: Development (IDE - Claude Code)

**Workflow**:
1. **Transition**: Open project in Claude Code
2. **Shard Documents**: `/po` then `*shard-prd` and `*shard-architecture`
3. **Begin Cycle**:
   - Story Creation: `/sm` → `*create` → Review → Approve
   - Implementation: `/dev` → `*develop-story {file}` → Code → Test → Complete
   - Quality Review: `/qa` → `*review {file}` → Assess → Approve/Return
4. **Repeat**: Continue until epic complete

## Document Locations (Standard Paths)

```
docs/
├── prd.md                    # Main Product Requirements Document
├── architecture.md           # Main Architecture Document
├── prd/                      # Sharded epic files
│   └── epic-*.md
├── architecture/             # Sharded architecture components
│   ├── coding-standards.md   # Always loaded by Dev agent
│   ├── tech-stack.md         # Always loaded by Dev agent
│   └── source-tree.md        # Always loaded by Dev agent
├── stories/                  # User story files
│   └── *.md
└── qa/
    ├── assessments/          # Risk, test design, NFR, tracing reports
    └── gates/                # Quality gate decision files
```

## Story Status Progression

Stories move through these states:
- **Draft** - Initial creation by SM agent
- **Approved** - Reviewed and ready for development
- **InProgress** - Currently being implemented
- **Ready for Review** - Dev complete, all tests passing
- **Done** - QA approved and complete

## Quality Gates (QA Agent)

Gate decisions documented in `docs/qa/gates/{epic}.{story}-{slug}.yml`:

| Status | Meaning | Action Required | Can Proceed? |
|--------|---------|-----------------|--------------|
| **PASS** | All critical requirements met | None | ✅ Yes |
| **CONCERNS** | Non-critical issues found | Team review recommended | ⚠️ With caution |
| **FAIL** | Critical issues (security, missing P0 tests) | Must fix | ❌ No |
| **WAIVED** | Issues acknowledged and accepted | Document reasoning | ✅ With approval |

## Test Architect Workflow (QA Integration)

**Stage 1 - After Story Approval (Before Dev)**:
- `*risk {story}` - Identify integration/regression risks (HIGH priority for complex/brownfield)
- `*design {story}` - Create test strategy for developer (HIGH priority for new features)

**Stage 2 - During Development**:
- `*trace {story}` - Verify test coverage (MEDIUM priority)
- `*nfr {story}` - Validate quality attributes (HIGH priority for critical features)

**Stage 3 - Story Review (REQUIRED)**:
- `*review {story}` - Comprehensive code review, refactoring, test validation

**Stage 4 - Post-Review**:
- `*gate {story}` - Update quality gate after fixes

## Brownfield Development (Existing Projects)

For working with existing codebases:

### Approach A: PRD-First (Recommended for large/complex changes)
1. PM: Create brownfield PRD to define requirements
2. Architect: Document only relevant areas based on PRD scope
3. More efficient - avoids documenting unused code

### Approach B: Document-First (Good for smaller projects)
1. Architect: Document entire system (`*document-project` task)
2. PM: Create PRD with full context
3. More thorough - captures everything

**Key Tool**: Use `/architect` with `*document-project` task to systematically analyze and document existing codebases.

## Important Documentation Files

Read these for detailed guidance:
- `.bmad-core/user-guide.md` - Complete workflow diagrams and usage guide
- `.bmad-core/enhanced-ide-development-workflow.md` - Step-by-step IDE workflow
- `.bmad-core/working-in-the-brownfield.md` - Existing project strategies
- `.bmad-core/data/bmad-kb.md` - Comprehensive knowledge base (810 lines)

## Cost Optimization Tips

1. **Use Web UI for planning** - Large context windows (Gemini: 1M tokens) at lower cost
2. **Use IDE for development** - Optimized for file operations and coding
3. **Document-first sometimes better than PRD-first** - Analyze trade-offs per project
4. **Keep Dev agent context lean** - Don't load unnecessary external documents
5. **Fresh chat windows** - Better AI performance, faster processing

## The "Vibe CEO" Philosophy

You are the CEO directing a team of specialized AI agents:
- **You provide**: Vision, decisions, strategic oversight, quality control
- **Agents handle**: Implementation details, document generation, code writing
- **Key principle**: Iterate and refine - expect revisits, not linear process
- **Quality arbiter**: You make final decisions on what's acceptable

## Environment Selection

**Use Web UI for**:
- Initial planning and documentation (PRD, architecture)
- Cost-effective document creation
- Brainstorming and analysis phases
- Multi-agent consultation

**Use IDE (Claude Code) for**:
- Active development and coding
- File operations and project integration
- Document sharding
- SM/Dev/QA workflow execution

## Installation Metadata

- **Version**: 4.44.3
- **Install Date**: 2025-12-23 06:06:59 UTC
- **Install Type**: Full
- **IDE Setup**: Claude Code
- **Total Files**: 231 tracked files

## Working with Claude Code

When you (future Claude Code instance) are loaded into this repository:

1. **Understand the context**: This is a framework installation, not application code
2. **Respect the structure**: Don't modify `.bmad-core/` unless instructed
3. **Use slash commands**: Type `/agent-name` to switch agent personas
4. **Follow workflows**: Use the sequential SM → Dev → QA pattern
5. **Keep context clean**: New chat for each agent switch
6. **Trust the system**: The framework is battle-tested - follow the patterns

## What NOT to Do

❌ Never modify `.bmad-core/core-config.yaml` without explicit instruction
❌ Never use bmad-master or orchestrator for development work
❌ Never mix agent responsibilities (SM does stories, Dev does code, QA does review)
❌ Never work on multiple stories simultaneously
❌ Never skip the QA review step
❌ Never load unnecessary external docs into Dev agent context
❌ Never reuse chat windows when switching agent roles

## Getting Started

To begin using the framework:

```bash
# Show available commands for any agent
/agent-name
*help

# Example: Start development cycle
/sm
*help
# Review available commands, then create story

# After story approved:
/dev
*help
# Review available commands, then develop story

# After development complete:
/qa
*help
# Review available commands, then review story
```

## Summary

This repository is the **orchestration layer** for AI-driven development. It provides structure, workflows, and specialized AI agents to enable rapid, high-quality software development through human-AI collaboration. The framework handles the mechanics; you provide the vision and quality control.
