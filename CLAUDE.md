# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page musician website for Julian Wittich (NYC jazz bassist). The visible content (bio, events, contact copy) is **not stored in this repo** — it is fetched at runtime from Google services, so the codebase is mostly the rendering shell plus an interactive canvas animation.

## Commands

```bash
nvm use            # pin Node to 18.17.0 (.nvmrc) before anything else
npm i
netlify dev        # preferred local dev — injects env vars from Netlify
npm run dev        # plain Next.js dev (no env vars; content sections render empty)
npm run build      # next build (also what Netlify runs)
```

There is **no test suite and no linter** configured. Type checking happens via `tsc`/`next build`; note `tsconfig.json` has `"strict": false` (but `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `noUncheckedIndexedAccess` are on).

To run locally with real content you need a `.env` file containing `GOOGLE_API_KEY` (taken from the Netlify dashboard). Without it, the Blogger and Calendar fetches fail silently and sections come back empty.

## Deploy

Merging to `main` triggers a Netlify deploy. `netlify.toml` runs `next build` and publishes `.next`. The `julianwittich.com` domain is on Squarespace; the site also lives at `julianwittichmusic.netlify.app`.

## Architecture

Next.js 14 **Pages Router** + TypeScript + SCSS modules. No state library — data flows through hooks and props.

### Content comes from external Google APIs

All human-editable copy lives outside the repo and is proxied through Next API routes that hold the `GOOGLE_API_KEY`:

- **`pages/api/content.ts`** — fetches a Blogger blog post by section. The three sections (`about`, `contact`, `events`) map to hardcoded Blogger post IDs in `POST_ID_MAP`. Returns raw HTML that is rendered with `dangerouslySetInnerHTML`. (See README for the allowed HTML tags content editors may use.)
- **`pages/api/events.ts`** — fetches raw events from a hardcoded Google Calendar ID.

Both handlers swallow errors and return empty (`''` / `[]`) so the page still renders if Google is down or the key is missing.

### Two-phase data loading (intentional, for page-load speed)

- The **about** section is fetched server-side in `pages/index.tsx` `getServerSideProps` and passed down as a prop.
- **events** and **contact** are fetched **client-side** via hooks (`content/main/useLoadEventsSection.ts`, `useLoadContactSection.ts`) which call the model layer (`model/api.ts` → the `/api/*` routes).
- `content/main/Main.tsx` lazy-loads `SidebarBelowTheFold` with `React.lazy` + `Suspense` so only the intro renders on first paint.

Events fallback: `useLoadEventsSection` first calls `fetchDisplayEvents`; if there are zero upcoming events it instead fetches the `events` Blogger post as placeholder copy.

### Event filtering / timezones (`model/event.ts`)

`filterAndOrderDates` drops past events and sorts chronologically by end time. Key gotcha documented in the code: filtering uses **absolute** time (the build/server runs in US Eastern, same as the calendar), while display uses the event's own `timeZone` via `moment-timezone`. Touch this carefully — timezone handling here was deliberate.

### The "strumable bass" canvas (`components/canvas/`)

A full-screen `<canvas>` background animation of bass strings that react to mouse movement. It's built on a small home-grown animation framework in `components/canvas/util/` (`Visual`, `Canvas`, `Geometry`, `Motion`). `GuitarVisual.ts` extends `Visual`; `GuitarString.ts` is a single plucked string. `Canvas.tsx` wires it up, and because the canvas has pointer events disabled (it overlays the whole page), mouse listeners are attached to `document.body`, not the canvas.

### SCSS ↔ JS shared variables

`styles/theme.module.scss` defines layout/color variables and re-exports them via an `:export` block. TS files import them as a module (e.g. `import Theme from '../../styles/theme.module.scss'` then `parseInt(Theme.guitarStringCount!)`). If you change a guitar/layout constant, update it in the SCSS — the canvas reads its geometry from there, not from duplicated JS constants. `declaration.d.ts` declares the `*.scss` module type.

## Conventions

- Each component/section is a folder with `Component.tsx`, `style.module.scss`, and an `index.ts` barrel. Barrels re-export upward (`components/index.ts`, `model/index.ts`, `content/index.ts`) — import from the barrel, not deep paths.
- `pages/admin.tsx` is not an admin panel — it just client-redirects to the GitHub repo.
