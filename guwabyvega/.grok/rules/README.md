# `.grok/rules/` — optional topic-scoped project rules

## Intent

This folder holds **optional, topic-scoped rules** for **Grok** (and any tooling that loads project rules from `.grok/rules/`).

- **`AGENTS.md`** at the app root is the **primary** place for project-wide agent instructions (architecture, TV focus, commands, testing).
- **`.grok/rules/*.md`** is for **extra**, focused rule files when a single `AGENTS.md` would become too long or when only a subset of concerns needs its own file (e.g. testing conventions, packaging, focus navigation).

Grok auto-discovers **every `*.md` file** in this directory and injects them as project instructions for sessions in this tree. Keep files short, actionable, and non-duplicative of `AGENTS.md` unless you are deliberately overriding a detail.

## What belongs here

| Good fit | Poor fit |
|----------|----------|
| Narrow conventions (“how we write TV focus tests”) | Full product roadmap or design docs |
| Packaging / Vega constraints that only apply to build work | Human setup guides (use a root README) |
| Temporary or experimental agent rules under review | Secrets, tokens, or personal machine paths |
| Split rules as the app grows | A second full copy of `AGENTS.md` |

## What does not belong here

- Application source code (`src/`, `test/`)
- Build outputs (`build/`)
- User-global Grok config (that lives under `~/.grok/` on each machine)
- GitHub Copilot-only docs (those stay under `.github/`)

## Suggested layout (optional)

As the project grows, you may add files such as:

```text
.grok/rules/
  README.md           # This file — intent of the folder
  testing.md          # Jest / snapshot / a11y test rules
  tv-focus.md         # Vega TV focus and remote navigation
  packaging.md        # manifest, app.json, Vega vpkg builds
```

Only add a file when the rule set is stable enough that the team wants every agent session to see it.

## Relationship to other instruction files

| File / folder | Role |
|---------------|------|
| `AGENTS.md` | Canonical project-wide agent rules |
| `.grok/rules/*.md` | Optional Grok topic rules (this folder) |
| `.github/copilot-instructions.md` | GitHub Copilot project instructions |
| Future README at app root | Human developers (setup, SDK, deploy) |

Prefer **one source of truth** for each concern. If a rule applies to all agents and humans writing code, put it in `AGENTS.md` (and mirror briefly in Copilot instructions if needed). Use this folder for Grok-oriented splits, not for conflicting policies.

## Team checklist

1. Read `AGENTS.md` first.
2. Add a new `*.md` here only when the topic is clearly scoped and durable.
3. Keep each rule file concise — agents load the full file into context.
4. After adding or renaming rules, run `grok inspect` (if available) to confirm they are discovered.
5. Commit these files so the whole team and CI agents share the same guidance.

## Note for agents loading this file

This README documents folder purpose. Prefer `AGENTS.md` for implementation constraints. Do not invent additional rule files unless the user or a clear project need asks for them.
