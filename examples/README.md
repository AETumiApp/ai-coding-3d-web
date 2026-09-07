# AI coding × 3D web — cross-assistant workflow

A tool-agnostic way to build a 3D web feature end to end with **Claude Code,
Cursor or Codex**, optionally accelerated by **MCP**. Workflow content, not a
runnable app.

Hub: <https://aetumi.app/ai-coding-3d-web>

## Contents

| File | What it covers |
| --- | --- |
| [`workflow.md`](./workflow.md) | The five-phase loop — PLAN → SCAFFOLD → IMPLEMENT → REFINE → QA — with the artifact each phase must produce and per-tool notes so it stays portable across assistants. |
| [`mcp-notes.md`](./mcp-notes.md) | What an MCP server adds conceptually (tools, resources, prompts), where it helps in each phase, and its honest limits. No install commands. |

## The one-paragraph version

Build 3D web features in five reviewable phases and let the *artifacts* — brief,
scene plan, file plan, checklist — carry the work between tools, so you can start
in Claude Code, continue in Cursor, and QA with Codex without losing the thread.
Keep the stack pinned (**Next.js 14, React 18, `three@0.160.0`**, client-only 3D
island) so every assistant generates against the same APIs. Use MCP to replace
the assistant's guesses with grounded project context and a real browser-based QA
loop — but treat it as an accelerant, since every phase works without it.

## Companion repos

- Reference implementation of the client-island pattern:
  <https://aetumi.app/nextjs-threejs-starter>
- The briefs, planning prompt and production checklist these phases reference:
  <https://aetumi.app/claude-code-threejs>
- Reusable build prompts for specific scenes:
  <https://aetumi.app/3d-web-ai-prompts>

---

## Example backlog / roadmap

# AI Coding for 3D Web Example Backlog

## Planned workflow examples

### Claude Code architecture-first build

Start from a structured brief, ask for a file plan, review boundaries, then implement a small Three.js hero.

### Cursor component refactor

Turn a monolithic WebGL effect into a reusable React component with explicit props and cleanup.

### Codex implementation review

Review an existing Three.js project for rendering lifecycle, loading, mobile behavior and accessibility issues.

### MCP-assisted resource discovery

Use structured AETumi context to identify the right website, component, prompt or technical example before writing code.

### Cross-tool handoff

Document an architecture brief that can be continued by another assistant without losing project constraints.

### Performance review workflow

Ask the assistant to identify potential draw-call, texture, animation-loop and React-rendering problems, then verify them in the browser.

## Evaluation criteria

Every workflow should make clear:

- what context was supplied
- what the assistant was asked to plan
- which decisions remain human-owned
- what was validated at runtime
- what production risks were checked

## AETumi links

- https://aetumi.app/mcp/
- https://aetumi.app/docs/
- https://aetumi.app/threejs/
- https://aetumi.app/3d-prompts/
