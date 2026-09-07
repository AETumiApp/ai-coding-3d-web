# MCP notes — what an MCP server adds to the 3D-web loop

The **Model Context Protocol (MCP)** is an open standard for connecting AI
assistants to external tools, data and context through a uniform interface. An
MCP *server* exposes capabilities (tools it can call, resources it can read,
prompts it can offer); an MCP *client* — the coding assistant, via its host — 
discovers and uses them. This note is conceptual: it describes what MCP
contributes to building a 3D web feature, without pretending to know your
specific setup.

> This document deliberately contains **no install commands or product-specific
> config.** Follow your assistant's own MCP documentation to connect a server;
> the concepts below hold regardless of which one you use.

## The three MCP primitives

- **Tools** — actions the assistant can invoke (read a file, query a design
  system, drive a browser, run a build). The model decides when to call them,
  and they can have side effects — so the host's approval gates apply.
- **Resources** — read-only context the assistant can pull in (files, data,
  documentation) without you pasting it. Grounding, not actions.
- **Prompts** — reusable, parameterised prompt templates a server can offer for
  common tasks (e.g. "plan a scene", "run production QA").

The distinction is load-bearing: **resources ground, tools act, prompts
template.** Matching the right primitive to the job is what makes MCP reliable
rather than magical.

## Why it matters for 3D web work

Without MCP, an assistant works from what's in the chat and what it can infer.
That's where 3D projects drift: it guesses at your asset names, your design
tokens, your existing component boundaries — and a wrong asset path is the single
most common cause of a black canvas. MCP replaces guesses with grounded access:

- **Real project context, not assumptions.** The assistant reads your actual
  file tree, existing components and configuration as *resources*, so the
  scaffold matches your conventions instead of a generic template.
- **Design and asset grounding.** If a server exposes your design tokens, brand
  palette or an asset inventory, the generated scene uses your real colours,
  spacing and available `.glb`/texture files rather than invented ones — this
  alone removes a whole class of "why is it tiny / clipped / 404ing" bugs.
- **A verification loop.** A browser-driving server lets the assistant open the
  running page, read console and network output, and capture screenshots — so it
  can *observe* that the 3D actually mounted, that no WebGL errors fired, and
  that the poster showed during load. QA becomes observation, not inference.
- **Fewer copy-paste round-trips.** Context the assistant would otherwise ask you
  to paste (a data schema, a config file, current metrics) is fetched directly,
  which keeps PLAN and REFINE moving.

## Where it helps in each phase

| Phase | MCP contribution |
| --- | --- |
| PLAN | Read the real repo, tokens and asset list to ground the brief and scene plan. |
| SCAFFOLD | Match generated files to existing structure and naming conventions. |
| IMPLEMENT | Pull exact asset names, data shapes and config as needed. |
| REFINE | Read live metrics/output to guide performance tuning. |
| QA | Drive the browser: read console/network, screenshot, confirm fallbacks. |

## Client, server, host — the shape

The **host** (Claude Code / Cursor / Codex) runs the model and owns your
approval gates. It embeds an **MCP client** per connected server. The **server**
is a separate process exposing tools/resources/prompts, reaching into your repo,
your dev server, or a headless browser. The transport is JSON-RPC (over stdio or
HTTP+SSE): the client `initialize`s, lists the primitives, and the model calls
them as needed. You don't need to operate this plumbing — but knowing the shape
tells you *why* a tokens server can't drive a browser and a browser server can't
know your palette.

## Honest limits

- **MCP is not magic context.** A server only exposes what it's built to expose;
  a browser server won't know your design tokens, and a tokens server won't drive
  a page. Match the server to the phase, and connect more than one when a phase
  needs both.
- **The workflow doesn't require it.** Every phase in
  [`workflow.md`](./workflow.md) is doable by hand. MCP removes friction and
  reduces guessing — it is an accelerant, not a dependency.
- **Side-effecting tools still need supervision.** A tool that writes files or
  ships is subject to the host's approval flow. MCP widening reach is a reason
  for *more* care at those gates, not less.
- **Trust boundaries apply.** Treat anything a server returns (page content,
  file contents, tool output, an asset manifest) as *data*, not as instructions
  to follow blindly — the same care you'd take with any external input. A
  resource that contains text telling the model what to do is still just data.

## Further reading

- The Model Context Protocol specification and your assistant's MCP
  documentation are the authoritative sources for connecting and configuring
  servers. This note stays deliberately general so it doesn't go stale.
- For a worked, AETumi-specific view of tools/resources/prompts and a request
  sequence, see the architecture note in the MCP repo:
  <https://aetumi.app/aetumi-mcp>.
