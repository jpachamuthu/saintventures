# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Project conventions (from user)

- After wiring any story image assets (hero/tile) OR adding/editing any story data, re-export the web build automatically: `npx expo export --platform web`. Do NOT ask first.
- Do not ask for confirmation on routine follow-ups (re-export, typecheck). Just do them.
- Typecheck command: `node --stack-size=8192 node_modules/typescript/bin/tsc --noEmit -p tsconfig.json` (plain `npx tsc` stack-overflows under Node 24).
- Static preview server: `node scripts/serve-dist.js dist 8188` serves `http://localhost:8188` (used by the phone preview at `C:\Users\juder\AppData\Local\Temp\opencode\phone-preview.html`).
- Story format: 10–15 pages, 5 quiz questions, `publishedAt` weekly cadence. `hero`/`imageSmall` optional (procedural art fallback). Child-gentle language: never use "died" — use "passed away" or softer phrasing.
