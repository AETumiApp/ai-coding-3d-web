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
between phases are where quality is won. The single most common failure in
AI-assisted 3D is **skipping PLAN**: a beautiful scene that mounts on the server,
leaks WebGL contexts, or melts a phone is not a win, and all three are decided
before any code is written.

---

### 1. PLAN — decide the expensive things first

**Goal:** agree the architecture, the scene design and the budget before code.

- Write a short task brief: goal, feeling, stack, non-goals, file plan,
  acceptance criteria, performance budget, a11y contract, fallback plan.
- Have the assistant produce a **scene plan on paper** — scene graph, camera,
  lights, motion, adaptive quality, perf plan, fallback plan — and approve it.
- Decide the server/client boundary explicitly: what is server-rendered HTML
  (copy, metadata), what is the client-only 3D island.
- Commit to **numbers** now: draw calls, asset MB, target fps on a *named*
  mid-range phone. A budget you set later is a budget you'll never enforce.

**Artifact:** an approved brief + scene plan. **Do not proceed without it.**

> Same in every tool: this is a conversation, not code. Claude Code, Cursor's
> chat, and Codex all do this well — the discipline is yours, not the tool's.
> With MCP, this phase also *reads your real repo, tokens and asset list*, so the
> plan is grounded in your project rather than a generic template.

### 2. SCAFFOLD — structure before substance

**Goal:** create the files and boundaries, mostly empty, so the shape is right.

- Generate `page.tsx` (server component: metadata + copy + loader), the client
  island component, and a poster/fallback — wired together but with a trivial
  placeholder scene (a single lit cube).
- Confirm the build runs, the island loads only in the browser (no `three` on
  the server), and the poster shows during load. **Ship nothing real until the
  plumbing is proven.**

**Artifact:** a running skeleton that renders a placeholder in the right place,
with the poster and the no-WebGL path already wired.

> Tool notes: Cursor is strong at multi-file scaffolding from the file plan;
> Claude Code is strong at doing it from the terminal with the brief in context;
> Codex works the same way from the file plan. Give whichever tool the file plan
> verbatim so the paths match. With MCP, the scaffold matches your *existing*
> structure and naming instead of inventing conventions.

### 3. IMPLEMENT — build the real scene against the plan

**Goal:** replace the placeholder with the actual scene, one section at a time.

- Implement in the order the scene plan listed: geometry/materials → lighting →
  motion → interaction.
- Keep each step small enough to eyeball. Ask for the *diff*, not a rewrite.
- Enforce the rules as you go: capped pixel ratio, single RAF loop, no per-frame
  allocations, full disposal on unmount, `prefers-reduced-motion` branch, correct
  colour space + tone mapping.

**Artifact:** the working scene, matching the approved plan, inside budget.

> With MCP, exact asset names, data shapes and config are pulled directly, so the
> implementation stops guessing at file paths — the most common source of a
> black screen.

### 4. REFINE — tighten look, feel and cost

**Goal:** close the gap between "works" and "good", and between "good on my
laptop" and "good on a phone".

- Tune easing, timing, colour and lighting against the intended feeling.
- Profile: check `renderer.info.render.calls`, frame timing, and payload. If a
  budget line is over, fix it here (instancing, merged geometry, smaller
  textures, render-on-demand) — measure before and after.
- Add the device-aware quality ladder (high/medium/low tiers) so the scene
  adapts instead of shipping one fixed cost.
- Add the resilience paths: WebGL-missing fallback, asset-load errors,
  context-loss handling, tab-visibility pause.

**Artifact:** a scene that hits its budget and its aesthetic on your machine
*and* on the baseline phone.

> With MCP, live metrics and bundle output can be read directly, so tuning is
> driven by real numbers rather than eyeballing.

### 5. QA — prove it on real conditions

**Goal:** verify against the acceptance criteria and real devices.

- Walk the production checklist: performance, fallbacks, a11y, SEO, mobile,
  cleanup, analytics.
- Test on a **real mid-range phone**, with JS disabled (copy still there?), and
  with reduced-motion on. Navigate in and out of the route repeatedly to prove
  no WebGL contexts leak.
- Run Lighthouse (mobile); confirm the LCP element is text/poster, not canvas.

**Artifact:** a checked-off checklist and recorded scores. Loop back to REFINE
for anything that fails.

> With MCP, a browser-driving tool opens the running page, reads console/network
> output, and screenshots — turning "looks right in the code" into "verified in
> a real page".

---

## Where MCP fits

An MCP server gives the assistant *first-class tools and context* instead of
guesses — see [`mcp-notes.md`](./mcp-notes.md). In this loop it helps most in
**PLAN** (pulling in real project context, design tokens, asset inventories) and
**QA** (driving a browser, reading console/network output, capturing screenshots
for review), and it removes friction in every phase between. The workflow does
not depend on any specific server; treat MCP as an accelerant on the same five
phases.

| Phase | What MCP adds |
| --- | --- |
| PLAN | Read the real repo, tokens and asset list to ground the brief and scene plan. |
| SCAFFOLD | Match generated files to existing structure and naming. |
| IMPLEMENT | Pull exact asset names, data shapes and config as needed. |
| REFINE | Read live metrics/output to guide performance tuning. |
| QA | Drive the browser: read console/network, screenshot, confirm fallbacks. |

## Keeping tools interchangeable

- **Travel the artifacts, not the chat history.** The brief, scene plan, file
  plan and checklist are plain markdown — hand them to whichever assistant you
  open. That's what makes the workflow portable across Claude Code, Cursor and
  Codex.
- **Pin the stack in the brief** (`three@0.160.0` + matching types) so every
  tool generates against the same API surface.
- **Always ask for diffs and reviews between phases.** The review gates are the
  quality mechanism, independent of the assistant.
- **Hold the same quality bar** regardless of tool — see
  [`quality-bar.md`](./quality-bar.md) for what "done" means.
