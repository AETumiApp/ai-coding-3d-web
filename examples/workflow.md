# A shared workflow for building a 3D web feature with AI assistants

One repeatable loop that works across **Claude Code, Cursor and Codex**, with an
**MCP** server in the mix. It is assistant-agnostic on purpose: the phases and
the artifacts are what matter, not which tool types the code.

Target stack throughout: **Next.js 14 (App Router), React 18, TypeScript,
`three@0.160.0`**, with the 3D mounted as a client-only island
(`next/dynamic`, `ssr: false`).

---

## The five phases

```
PLAN → SCAFFOLD → IMPLEMENT → REFINE → QA
  \_______________ iterate on REFINE/QA as needed _______________/
```

Each phase produces a concrete artifact you can review. Never let an assistant
jump from a one-line request straight to a finished feature — the review points
between phases are where quality is won.

---

### 1. PLAN — decide the expensive things first

**Goal:** agree the architecture, the scene design and the budget before code.

- Write a short task brief: goal, stack, non-goals, file plan, acceptance
  criteria, performance budget.
- Have the assistant produce a **scene plan on paper** — scene graph, camera,
  lights, motion, perf plan, fallback plan — and approve it.
- Decide the server/client boundary explicitly: what is server-rendered HTML,
  what is the client-only 3D island.

**Artifact:** an approved brief + scene plan. **Do not proceed without it.**

> Same in every tool: this is a conversation, not code. Claude Code, Cursor's
> chat, and Codex all do this well — the discipline is yours, not the tool's.

### 2. SCAFFOLD — structure before substance

**Goal:** create the files and boundaries, mostly empty, so the shape is right.

- Generate `page.tsx` (server component: metadata + copy + loader), the client
  island component, and a poster/fallback — wired together but with a trivial
  placeholder scene (a single lit cube).
- Confirm the build runs, the island loads only in the browser, and the poster
  shows during load. **Ship nothing real until the plumbing is proven.**

**Artifact:** a running skeleton that renders a placeholder in the right place.

> Tool notes: Cursor is strong at multi-file scaffolding from the file plan;
> Claude Code is strong at doing it from the terminal with the brief in context;
> Codex works the same way from the file plan. Give whichever tool the file plan
> verbatim so the paths match.

### 3. IMPLEMENT — build the real scene against the plan

**Goal:** replace the placeholder with the actual scene, one section at a time.

- Implement in the order the scene plan listed: geometry/materials → lighting →
  motion → interaction.
- Keep each step small enough to eyeball. Ask for the *diff*, not a rewrite.
- Enforce the rules as you go: capped pixel ratio, single RAF loop, no per-frame
  allocations, full disposal on unmount, `prefers-reduced-motion` branch.

**Artifact:** the working scene, matching the approved plan, inside budget.

### 4. REFINE — tighten look, feel and cost

**Goal:** close the gap between "works" and "good".

- Tune easing, timing, colour and lighting against the intended feeling.
- Profile: check `renderer.info.render.calls`, frame timing, and payload. If a
  budget line is over, fix it here (instancing, merged geometry, smaller
  textures, render-on-demand).
- Add the resilience paths: WebGL-missing fallback, asset-load errors,
  context-loss handling, tab-visibility pause.

**Artifact:** a scene that hits its budget and its aesthetic on your machine.

### 5. QA — prove it on real conditions

**Goal:** verify against the acceptance criteria and real devices.

- Walk the production checklist: performance, fallbacks, a11y, SEO, mobile.
- Test on a **real mid-range phone**, with JS disabled (copy still there?), and
  with reduced-motion on.
- Run Lighthouse (mobile); confirm the LCP element is text/poster, not canvas.

**Artifact:** a checked-off checklist and recorded scores. Loop back to REFINE
for anything that fails.

---

## Where MCP fits

An MCP server gives the assistant *first-class tools and context* instead of
guesses — see [`mcp-notes.md`](./mcp-notes.md). In this loop it typically helps
most in **PLAN** (pulling in real project context, design tokens, asset
inventories) and **QA** (driving a browser, reading console/network output,
capturing screenshots for review). The workflow does not depend on any specific
server; treat MCP as an accelerant on the same five phases.

## Keeping tools interchangeable

- **Travel the artifacts, not the chat history.** The brief, scene plan, file
  plan and checklist are plain markdown — hand them to whichever assistant you
  open. That's what makes the workflow portable across Claude Code, Cursor and
  Codex.
- **Pin the stack in the brief** (`three@0.160.0` + matching types) so every
  tool generates against the same API surface.
- **Always ask for diffs and reviews between phases.** The review gates are the
  quality mechanism, independent of the assistant.
