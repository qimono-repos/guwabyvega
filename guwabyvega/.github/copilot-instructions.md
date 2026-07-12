# Copilot Instructions for guwabyvega

## Project overview
This repository is a React Native application for Amazon Kindle Fire TV using the Amazon Devices Vega/Kepler stack. The app is a simple TV-first experience with a large hero area and a row of focusable tiles that respond to remote navigation.

## Architecture and structure
- Entry point: src/App.tsx
  - Owns the currently focused tile state.
  - Renders the main UI and the TV focus guide container.
- Reusable UI component: src/components/Tile.tsx
  - A large, rounded tile button with focus styling.
  - Uses React Native touch/focus props suitable for TV.
- Data/config: src/data/tiles.tsx
  - Central source for tile labels, descriptions, icons, and accessibility text.
- Assets: src/assets/
  - Background image, logos, and tile icons.
- Tests: test/
  - Jest + React Native Testing Library tests and snapshots.

## Important implementation notes
- This is a TV-oriented app, not a phone-first app.
- Prefer keyboard/remote navigation patterns and TV-friendly sizing.
- Use the Amazon Kepler focus primitives when adding or changing navigation behavior, especially TVFocusGuideView and hasTVPreferredFocus.
- Keep components simple and functional. The current app uses React functional components and local state.
- Preserve accessibility labels and testIDs for UI stability.

## Styling and UX expectations
- UI elements are intentionally large and high-contrast for TV viewing.
- Avoid small text or dense layouts.
- When changing the home screen or tile layout, keep the overall visual hierarchy consistent with the existing design.

## Development workflow
Common commands:
- npm test
- npm run lint
- npm run build:debug
- npm run build:release

## Testing guidance
- Tests live under test/ and should be updated when UI behavior changes.
- Prefer testing visible behavior and rendered output rather than implementation details.
- Snapshot updates should be intentional and reviewed.

## Platform-specific context
- The project is configured for the TV target in package.json and manifest.toml.
- Keep changes compatible with the Amazon Devices React Native Kepler runtime and the Vega build pipeline.
