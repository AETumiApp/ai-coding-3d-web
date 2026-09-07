# AI coding × 3D web — cross-assistant workflow

A tool-agnostic way to build a 3D web feature end to end with **Claude Code,
Cursor or Codex**, optionally accelerated by **MCP**. Workflow content, not a
runnable app — the value is in the process and the durable artifacts.

Hub: <https://aetumi.app/ai-coding-3d-web>

## Contents

| File | What it covers |
| --- | --- |
| [`workflow.md`](./workflow.md) | The five-phase loop — PLAN → SCAFFOLD → IMPLEMENT → REFINE → QA — with the artifact each phase must produce, per-tool notes, and where MCP accelerates each phase. |
| [`mcp-notes.md`](./mcp-notes.md) | What an MCP server adds conceptually (tools, resources, prompts), the client/server/host shape, where it helps in each phase, and its honest limits. No install commands. |
| [`quality-bar.md`](./quality-bar.md) | The standard "done" means: architecture, performance, adaptivity, fallback, a11y, SEO, lifecycle and verification — the single bar every assistant is held to. |

## The one-paragraph version

Build 3D web features in five reviewable phases and let the *artifacts* — brief,
scene plan, file plan, checklist — carry the work between tools, so you can start
in Claude Code, continue in Cursor, and QA with Codex without losing the thread.
Keep the stack pinned (**Next.js 14, React 18, `three@0.160.0`**, client-only 3D
island) so every assistant generates against the same APIs. Use MCP to replace
the assistant's guesses with grounded project context and a real browser-based QA
loop — but treat it as an accelerant, since every phase works without it. Hold
everything to one [quality bar](./quality-bar.md) so the finished feature is
interchangeable even when the tool that built it isn't.

## Companion repos

- Reference implementation of the client-island pattern:
  <https://aetumi.app/nextjs-threejs-starter>
- The briefs, planning prompts and production checklist these phases reference:
  <https://aetumi.app/claude-code-threejs>
- Reusable build prompts for specific scenes:
  <https://aetumi.app/3d-web-ai-prompts>
- Driving the loop with grounded context via MCP:
  <https://aetumi.app/aetumi-mcp>
