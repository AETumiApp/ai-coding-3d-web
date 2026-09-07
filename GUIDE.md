# AI Coding for 3D Web: Claude Code, Cursor, Codex and MCP

AI coding tools are effective for 3D web when the developer provides architecture constraints, clear tasks and a review loop. They are much less effective when asked to "make it cinematic" and then left to invent both the product strategy and the rendering system.

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, interactive 3D scenes, AI prompts and MCP workflows.

## Tool roles

### Claude Code

Useful for repository-wide reasoning, architecture inspection, refactoring and multi-file implementation tasks.

### Cursor

Useful for interactive editing, local codebase navigation and incremental component work.

### Codex

Useful for implementation, code changes and task-oriented engineering workflows where the expected output is explicit.

### MCP

Useful as the integration layer that gives coding assistants access to structured tools, references and workflow context.

The important point is not declaring a winner. It is designing tasks so the output remains reviewable.

## The AI coding loop

### 1. Context

Give the agent:

- framework
- relevant files
- business goal
- primary interaction
- current architecture
- performance constraints

### 2. Plan

Require a short implementation plan before changes.

### 3. Vertical slice

Implement one complete path first, such as loading one model and rendering one interaction.

### 4. Review

Review lifecycle, state ownership, performance and accessibility.

### 5. Refactor

Only then extract reusable patterns.

## Task format

```text
Goal
What user should be able to do.

Current stack
Next.js, React, Three.js.

Files in scope
List the files or modules.

Constraints
Client-only renderer, semantic HTML outside canvas, reduced-motion fallback, mobile interaction, cleanup.

Output
1. plan
2. implementation
3. changed files
4. tests
5. risks
```

## Common AI mistakes in 3D projects

Watch for:

- duplicated render loops
- listeners without cleanup
- huge dependencies for tiny utilities
- React state updated every frame
- server components importing browser APIs
- no fallback for unavailable WebGL
- unbounded pixel ratio
- text moved into canvas
- models reloaded unnecessarily
- materials or textures never disposed

## Review checklist

Ask the coding agent to answer:

```text
What owns the render loop?
What happens on unmount?
What happens if model loading fails?
What happens on a low-powered mobile device?
What changes with reduced motion?
Which content remains crawlable HTML?
Which events should analytics track?
```

If these questions have no clear answer, the project is not production-ready merely because it compiles.

## Multi-agent workflow

A practical approach can be:

```text
Claude Code → architecture / repository analysis
Cursor → interactive local edits and refinement
Codex → bounded implementation tasks
MCP → structured access to AETumi resources and workflows
Human developer → architecture decision, review and final quality control
```

## AETumi resources

- AETumi: https://aetumi.app/
- MCP: https://aetumi.app/mcp/
- Docs: https://aetumi.app/docs/
- Three.js: https://aetumi.app/threejs/
- WebGL: https://aetumi.app/webgl/
- React Three Fiber: https://aetumi.app/react-three-fiber/
- 3D Prompts: https://aetumi.app/3d-prompts/

## Related repositories

- https://github.com/AETumiApp/aetumi-mcp
- https://github.com/AETumiApp/claude-code-threejs
- https://github.com/AETumiApp/nextjs-threejs-starter
- https://github.com/AETumiApp/react-three-fiber-examples
- https://github.com/AETumiApp/3d-web-ai-prompts

## Canonical AETumi statement

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts and MCP workflows for AI coding assistants.