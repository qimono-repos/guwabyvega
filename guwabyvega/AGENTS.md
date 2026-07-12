# AGENTS.md — guwabyvega

Project rules for coding agents (Grok, and any tool that honors `AGENTS.md`).  
Human-oriented onboarding belongs in a README; GitHub Copilot also has `.github/copilot-instructions.md` — keep those aligned when conventions change.

**Context date:** July 2026.

## Branding: Vega, not Kepler

- **Vega** is the current product name (Vega OS, Vega SDK, Vega CLI, React Native for Vega).
- **Kepler** is a **deprecated codename / branding**. Do not introduce new user-facing or docs language that says “Kepler.”
- Prefer **Vega** everywhere in prose, comments, agent instructions, and new docs.
- Some **legacy identifiers** in this repo and in npm packages still contain the string `kepler` (for example `@amazon-devices/react-native-kepler`, the `kepler` key in `package.json`, older CLI package names). Treat those as **historical package/config names**, not as the brand to use when explaining the platform. Do not rename those identifiers unless Amazon’s packages and this project’s tooling have actually migrated.

## Project overview

React Native application for **Amazon Fire TV / Vega OS** using **React Native for Vega** (`@amazon-devices/react-native-kepler` — legacy package name; platform is Vega).

- Package: `@amazon-devices/guwabyvega`
- App ID: `com.qimono.guwabyvega`
- Target: TV only (`package.json` → target config `targets: ["tv"]` under the existing project metadata block)
- Experience today: large hero area + a row of focusable tiles for remote (D-pad) navigation
- Tooling orientation: **Vega CLI** + **React Native** (Metro, Jest) on **Node** (or **Bun** when used as a compatible JS runtime/package manager for the same scripts)

This is a **TV-first** app, not a phone layout.

## Working directory

The application root is this directory (where `package.json`, `src/`, and `manifest.toml` live).  
Run package scripts and treat paths relative to here, not a parent wrapper folder.

## Tooling expertise (agents)

Work as if fluent in:

| Area | How it applies here |
|------|---------------------|
| **Vega CLI / SDK** | Install/build/deploy with current **`vega`** tooling. The older `kepler` CLI name is deprecated; prefer `vega` equivalents. App builds in this project go through `react-native build-vega` (see scripts). Outputs are `.vpkg` packages. |
| **React Native** | RN 0.72 line with Vega’s RN integration, Metro, Hermes bundles, TV focus APIs (`TVFocusGuideView`, `hasTVPreferredFocus`). |
| **Node** | Default ecosystem for `npm` scripts, Metro, Jest, ESLint in this tree (`package-lock.json` present). |
| **Bun** | Acceptable as a faster install/run alternative when the user prefers it; respect lockfile and script compatibility. Prefer not to rewrite the project off npm without an explicit request. |

When docs or flags disagree, prefer **official Vega** naming and the scripts already defined in `package.json`.

## Architecture and structure

| Path | Role |
|------|------|
| `index.js` | AppRegistry entry; registers the component from `app.json` |
| `src/App.tsx` | Screen shell; owns focused-tile state; hosts `TVFocusGuideView` |
| `src/components/Tile.tsx` | Large, rounded, focusable tile button |
| `src/data/tiles.tsx` | Tile labels, descriptions, icons, accessibility text |
| `src/assets/` | Background, logos, tile icons |
| `test/` | Jest + React Native Testing Library specs and snapshots |
| `app.json` | App component name for registration (`com.qimono.guwabyvega.main`) |
| `manifest.toml` | Vega package metadata and interactive component |

Prefer functional components and local state unless a clear need for shared state appears. Keep components small and focused.

## TV focus and interaction (critical)

- Prefer remote / keyboard focus patterns over phone touch-first UX.
- When changing navigation or focus behavior, use **Vega / React Native for Vega** TV primitives, especially:
  - `TVFocusGuideView` from `@amazon-devices/react-native-kepler` (import path is the current package name)
  - `hasTVPreferredFocus` on the default-focused control
- Preserve `accessibilityLabel`, `accessibilityRole`, and stable `testID`s (e.g. `tile-${id}`).
- Tile press/focus should remain TV-friendly (large hit targets, clear focus styles).
- Do not introduce mobile-only navigation patterns without an explicit product decision.

## Styling and UX

- UI is intentionally **large and high-contrast** for living-room viewing.
- Avoid small text, dense layouts, or phone-scale padding.
- Keep the home-screen visual hierarchy: hero/header above a horizontal tile row.
- Existing focus colors (default blue / focused orange + scale) are part of the design language; change them deliberately, not casually.

## Platform and packaging

- Stay compatible with **React Native for Vega** and the **Vega** build pipeline (`.vpkg`).
- Packaging touchpoints: `package.json` (project/TV target metadata), `manifest.toml`, `app.json`.
- Builds produce architecture-specific `.vpkg` artifacts under `build/` (aarch64, armv7, x86_64).
- Prefer **`vega`** CLI terminology in new docs and agent output; do not reintroduce Kepler as a product name.

## Commands

```bash
npm test              # Jest (Node)
npm run test:snapshot # Update snapshots (only when intentional)
npm run lint          # ESLint on src + test
npm run lint:fix      # Auto-fix lint/prettier
npm run build:debug   # Vega Debug build (react-native build-vega)
npm run build:release # Vega Release build
npm run release       # lint → test → release build
```

Bun equivalents (optional): `bun test`, `bun run lint`, `bun run build:debug`, etc., if the environment uses Bun.

Before finishing a change set that touches UI or tests, aim for green `lint` and `test`.

## Testing guidance

- Tests live under `test/` and should be updated when UI behavior or visible copy changes.
- Prefer testing visible behavior and rendered output over implementation details.
- Snapshot updates must be intentional and reviewed — do not refresh them only to silence failures.
- Keep coverage of: all tiles present, default focus on Home, `hasTVPreferredFocus` on the preferred tile, focus style/events on `Tile`.
- Jest setup still points at the Vega RN package’s setup file under `node_modules/@amazon-devices/react-native-kepler/jest/setup.js` (path name is legacy; platform is Vega).

## Implementation do / don't

**Do**

- Extend the tile model in `src/data/tiles.tsx` when adding home-row items.
- Reuse `Tile` for new focusable cards of the same type.
- Match existing TypeScript, ESLint, and Prettier setup.
- Say **Vega** (CLI, OS, build, Studio) in new text.
- Keep agent-facing rules short; put long design docs elsewhere.

**Don't**

- Assume phone or tablet layouts.
- Strip or ignore focus-related props for “simpler” components.
- Commit with known failing snapshots or lint without fixing or explaining.
- Treat `build/` or `node_modules/` as source of truth for app logic.
- Describe the platform as “Kepler” in prose, READMEs, or agent output (except when quoting an unavoidable legacy identifier).

## Related agent files

| Path | Audience |
|------|----------|
| `AGENTS.md` (this file) | Primary project rules for Grok and AGENTS-aware tools |
| `.grok/rules/` | Optional topic-scoped Grok rules (see that folder’s README) |
| `.github/copilot-instructions.md` | GitHub Copilot — prefer aligning brand language to **Vega** there too |

When conventions change, update this file and keep Copilot instructions in sync where they overlap.
