# Migrating content to Decap CMS

A design doc for moving the site's editable **copy and album callout** off Blogger (and hardcoded constants) and onto **Decap CMS** — the open-source, git-based CMS (the successor to Netlify CMS). **Events stay on Google Calendar** — that flow is left untouched.

## Goals

1. **Edit all site copy and the album callout from one admin UI** instead of Blogger + hardcoded constants. (Events continue to be managed in Google Calendar, as today.)
2. **CMS content lives in this public git repo** as plain files (Markdown / JSON / YAML) and is read at runtime straight from the public repo. The only API key that remains is `GOOGLE_API_KEY`, still used for the Calendar events fetch.
3. **Content edits do _not_ trigger a Netlify rebuild.** Only commits that touch application code rebuild the site. Content changes go live immediately because the running site fetches content from the public repo on each request.

These last two are the load-bearing constraints; everything below is shaped around them.

---

## How it works today (for reference)

| Content               | Source                                                             | When it's fetched                                                                       |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| About copy            | Blogger post                                                       | server-side, `pages/index.tsx` `getServerSideProps`                                     |
| Contact / Events copy | Blogger posts                                                      | client-side hooks (`content/main/useLoad*Section.ts` → `model/api.ts` → `/api/content`) |
| Events list           | Google Calendar                                                    | client-side (`/api/events` → `model/event.ts` `filterAndOrderDates`)                    |
| Album callout         | Hardcoded constants in `components/album-callout/AlbumCallout.tsx` | build time                                                                              |
| Images                | `public/img/` (in repo) + external CDNs                            | static                                                                                  |

The proxy routes `pages/api/content.ts` and `pages/api/events.ts` exist to hide `GOOGLE_API_KEY`. After this migration, **the Blogger route (`pages/api/content.ts`) goes away** — copy becomes public files the browser/server reads directly. **`pages/api/events.ts`, the Calendar, and `GOOGLE_API_KEY` all stay exactly as they are.**

---

## Target architecture

```
Editor → Decap admin (/admin) → commits content files to this repo (GitHub)
                                          │
                                          ▼
                         content/*.md, data/*.json, public/img/uploads/*
                                          │
   ┌──────────────────────────────────────┴───────────────────────────┐
   │ A code commit?  →  Netlify rebuilds & redeploys                    │
   │ A content-only commit?  →  build is SKIPPED (netlify.toml ignore)  │
   └────────────────────────────────────────────────────────────────────┘
                                          │
   Live site reads content at request time from the PUBLIC repo
   (raw.githubusercontent.com / jsDelivr) — so content is live without a build
```

### Where content lives

Pick a convention and model the current content as collections:

```
content/
  about.md            # was the "about" Blogger post
  contact.md          # was the "contact" Blogger post
  events-empty.md     # the "no upcoming events" fallback copy (was the "events" Blogger post)
data/
  callout.json        # album callout: enabled, link, image, eyebrow, title
public/img/uploads/   # Decap media library target (images committed to repo)
```

> **Events are not in here.** The events _list_ still comes live from Google Calendar via `pages/api/events.ts` → `model/event.ts` `filterAndOrderDates`. Decap only owns `events-empty.md`, the fallback copy shown when there are no upcoming events (today that's the "events" Blogger post used by `useLoadEventsSection`).

---

## Requirement 1 — Access images and content from the public git repo

Because the repo is public, the site reads content files **at runtime** instead of bundling them at build. That's what decouples content from deploys.

Replace the **Blogger** fetches in the loaders with fetches against the public repo. Two good sources:

- `https://raw.githubusercontent.com/pjflanagan/julianwittichmusic/main/<path>` — sends `Access-Control-Allow-Origin: *`, so it works from both `getServerSideProps` and the browser. CDN-cached ~5 min.
- `https://cdn.jsdelivr.net/gh/pjflanagan/julianwittichmusic@main/<path>` — faster CDN, supports explicit purge if you need instant invalidation.

Concrete changes:

- **`pages/api/content.ts`** → fetch `content/about.md` / `contact.md` / `events-empty.md` from the raw URL, convert as needed, return it. (Or drop the route entirely and fetch the raw URL directly — see below.)
- **`pages/api/events.ts`** → **no change.** Keeps hitting Google Calendar with `GOOGLE_API_KEY` and running `filterAndOrderDates`.
- **`model/api.ts`** → point only `fetchContent` at the raw URLs; **leave `fetchDisplayEvents` pointed at `/api/events`** (Calendar). The existing client-side hooks `useLoadEventsSection` / `useLoadContactSection` then need no change.
- **About section** stays server-side in `getServerSideProps`, just fetching the raw URL instead of Blogger.
- **Album callout** reads `data/callout.json` (server-side, passed via `HomePageProps`) and renders; `enabled: false` or empty → `return null` (a no-deploy on/off switch). Images referenced in content can point at `public/img/uploads/...` (served by the site) or the raw repo URL.

Net effect: no Blogger. **Google Calendar and `GOOGLE_API_KEY` stay** for the events list. CMS copy is whatever is on `main` in the public repo **right now**, modulo CDN cache.

> **Caching caveat:** `raw.githubusercontent.com` caches ~5 minutes, so an edit can take a few minutes to appear. If that's too slow, use jsDelivr with a purge call, or have the Decap "publish" flow hit a tiny revalidation endpoint. Acceptable for a tour-dates/bio site; worth calling out.

---

## Requirement 2 — Only rebuild on code updates, never on content

Decap commits content into the repo, and by default **every push to `main` triggers a Netlify build**. We don't want content commits to rebuild (they don't need to — content is read at runtime). Netlify supports skipping a build via an **ignore command**: if it exits `0`, the build is canceled.

Add to `netlify.toml`:

```toml
[build]
  command = "next build"
  publish = ".next"
  # Exit 0 = skip the build. Skip when the push changed ONLY content/media paths.
  ignore = "git diff --quiet HEAD^ HEAD -- ':(exclude)content' ':(exclude)data' ':(exclude)public/img/uploads'"
```

How to read it: `git diff --quiet` exits `0` (skip build) when there are **no** changes outside `content/`, `data/`, and `public/img/uploads/`. So:

- Commit touches only `content/`, `data/`, or uploaded images → **no code diff → exit 0 → build skipped.**
- Commit touches any app code (`components/`, `pages/`, `styles/`, `model/`, config…) → diff is non-empty → build runs.

Make the Decap commit author/paths predictable so the rule is reliable:

- Configure Decap's `media_folder: "public/img/uploads"` and `public_folder: "/img/uploads"` so all CMS images land in the excluded path.
- Keep all CMS-managed files under `content/` and `data/`.

Result: editors publishing in Decap commit to the public repo, the live site picks it up at runtime within the cache window, and **Netlify stays idle until a developer pushes code.**

---

## Setting up Decap itself

Decap is two static files served by the site. Since Next.js serves `public/` statically:

```
public/admin/index.html   # loads decap-cms from CDN, mounts the editor
public/admin/config.yml    # backend + collections definition
```

- **Remove `pages/admin.tsx`** (today it just redirects `/admin` → the GitHub repo). A Next page at `/admin` would otherwise shadow `public/admin/index.html`.
- `config.yml` defines the `backend` and a `collections` entry per content type (about, contact, events-empty fallback, callout) — each mapping fields → the files above. There is **no events collection**; events stay in Google Calendar.

### Authentication

Decap needs OAuth to commit on the editor's behalf. Two paths:

1. **GitHub backend** (simplest if the editor has a GitHub account with repo access). Requires a GitHub OAuth app + a token-exchange endpoint — host the small OAuth handler as a Netlify Function. `backend: { name: github, repo: pjflanagan/julianwittichmusic, branch: main }`.
2. **Git Gateway + Netlify Identity** (best if a non-technical editor shouldn't need a GitHub login). Netlify brokers the commits; you invite editors by email. More moving parts on Netlify, no GitHub account needed.

For a one-artist + one-dev setup, **GitHub backend** is the least infrastructure. Use an **editorial workflow** (`publish_mode: editorial_workflow`) if you want draft → review → publish; otherwise publishes commit straight to `main`.

---

## Migration plan (phased, low-risk)

1. **Author the content files** — port the three Blogger posts to `content/about.md` / `contact.md` / `events-empty.md`, and capture the callout in `data/callout.json`. Commit them. (Site behavior unchanged at this point. No event export — those stay in Calendar.)
2. **Add the runtime data layer** — repoint the Blogger paths (`pages/api/content.ts` / `model/api.ts` `fetchContent` / the about fetch in `getServerSideProps`) at the raw public-repo URLs. Verify the rendered copy matches Blogger. Then delete the **Blogger** code path. Leave `pages/api/events.ts`, the Calendar fetch, and `GOOGLE_API_KEY` in place.
3. **Add the `ignore` rule** to `netlify.toml` and test: push a content-only commit (build should skip), push a code commit (build should run).
4. **Stand up Decap** — add `public/admin/`, wire OAuth, remove `pages/admin.tsx`, confirm an edit in the UI commits to the repo and shows up live without a deploy.
5. **Cut over** — update the README's "Edit Content" section (replace the Blogger copy instructions with the `/admin` workflow; **keep the Google Calendar instructions as-is**) and retire the Blogger blog.

Each phase is independently revertable; step 2 is the real switch and can be validated before deleting anything.

---

## Trade-offs / things to watch

- **Loss of compile-time guarantees:** CMS content is now untyped files; a malformed `callout.json` could break rendering. Add defensive parsing (the existing routes already swallow errors and return empty — keep that) and consider a Decap schema + a CI JSON-lint on `data/`.
- **Cache latency:** runtime fetch from raw GitHub/jsDelivr means edits appear within minutes, not instantly. This is the cost of "no rebuild on content."
- **`getServerSideProps` adds a fetch per request** to the public repo. Fine at this traffic; add a short in-memory/ISR cache if needed.
- **The `ignore` rule depends on path discipline** — if a CMS commit ever touches a non-excluded path, it'll rebuild. Lock Decap's `media_folder` and collection paths down to the excluded dirs.
- **Markdown vs HTML:** Blogger posts were raw HTML rendered via `dangerouslySetInnerHTML`. Decap's markdown widget outputs Markdown; either render Markdown to HTML (add a renderer) or use Decap's "Markdown ↔ raw HTML" and keep the existing `dangerouslySetInnerHTML` path.

```

```
