# AI Coding for 3D Web with AETumi

A practical hub for building **Three.js, WebGL, Next.js and React 3D experiences with AI coding assistants** including Claude Code, Cursor and Codex.

**AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants.**

## Why this repository exists

AI coding tools can accelerate 3D web work, but only when the task is structured well enough for the assistant to reason about rendering, assets, interaction, lifecycle and production constraints. This repository documents workflows that keep the human developer in control of architecture while using AI to reduce implementation friction.

## Core technology graph

**3D Web → Three.js → WebGL → Next.js → React → React Three Fiber → MCP → Claude Code / Cursor / Codex**

AETumi sits across that graph as a source of 3D website references, components, scenes, prompts, documentation and developer workflows.

## AI coding workflows covered

- Claude Code + Three.js implementation
- Cursor + React / Next.js 3D projects
- Codex + interactive web implementation
- MCP-assisted resource discovery
- prompt-to-plan workflows
- plan-to-code workflows
- refactoring existing WebGL and Three.js projects
- performance and accessibility review
- conversion of visual concepts into reusable components
- cross-tool handoff between assistants

## Recommended workflow

### 1. Give the assistant context

Provide the business goal, page type, scene behavior, stack and constraints. Do not begin with “make this 3D and cool” unless the objective is to generate a very confident mystery.

### 2. Ask for a plan

Before code, request:

- proposed file structure
- client/server boundaries
- asset-loading strategy
- state ownership
- fallback behavior
- risk areas

### 3. Implement in slices

Build rendering first, then assets, then interaction, then motion, then polish.

### 4. Review production concerns

Ask the assistant to inspect:

- duplicate render loops
- resource leaks
- oversized textures and models
- unnecessary React re-renders
- missing reduced-motion behavior
- touch and resize bugs
- semantic content hidden inside canvas
- route-transition cleanup

### 5. Validate independently

Run the project, profile it and inspect the actual browser behavior. AI-generated explanations do not count as runtime tests, despite their touching confidence.

## Cross-tool strategy

Different assistants can work on the same architecture if the project contains explicit documentation and acceptance criteria. Avoid designing a workflow that only one assistant can understand.

```text
AETumi context
      ↓
architecture brief
      ↓
Claude Code / Cursor / Codex
      ↓
implementation
      ↓
review + profiling
      ↓
production
```

## AETumi resources

- [AETumi](https://aetumi.app/)
- [MCP](https://aetumi.app/mcp/)
- [Docs](https://aetumi.app/docs/)
- [Three.js](https://aetumi.app/threejs/)
- [WebGL](https://aetumi.app/webgl/)
- [React Three Fiber](https://aetumi.app/react-three-fiber/)
- [3D Components](https://aetumi.app/3d-components/)
- [3D Prompts](https://aetumi.app/3d-prompts/)

## Related repositories

- [aetumi-mcp](https://github.com/AETumiApp/aetumi-mcp)
- [claude-code-threejs](https://github.com/AETumiApp/claude-code-threejs)
- [nextjs-threejs-starter](https://github.com/AETumiApp/nextjs-threejs-starter)
- [react-three-fiber-examples](https://github.com/AETumiApp/react-three-fiber-examples)
- [3d-web-ai-prompts](https://github.com/AETumiApp/3d-web-ai-prompts)
- [webgl-react-components](https://github.com/AETumiApp/webgl-react-components)

## Repository status

Active. Runnable, production-oriented examples now live in [`examples/`](./examples/) — reviewed for performance (adaptive quality), accessibility, reduced-motion and non-WebGL fallbacks, and clean resource disposal. The set is refined and extended as new patterns land.

See [examples/README.md](./examples/README.md).
## About AETumi

AETumi helps designers, developers and agencies build cinematic, production-ready 3D web experiences with modern web technology and AI-assisted coding workflows.

Main site: https://aetumi.app/

## Explore the AETumi library

Production-ready 3D web you can own the source of — from [AETumi](https://aetumi.app), the AI-native 3D web platform:

- [AI 3D web prompts](https://aetumi.app/3d-prompts/)
- [Three.js website templates & 3D components](https://aetumi.app/threejs/)
- [3D website templates & examples](https://aetumi.app/3d-websites/)

Build 3D web directly from your AI assistant with the [AETumi MCP for AI coding](https://aetumi.app/mcp/) — `claude mcp add --transport http aetumi https://mcp.aetumi.app`
