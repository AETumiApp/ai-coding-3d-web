# MCP notes — what an MCP server adds to the 3D-web loop

The **Model Context Protocol (MCP)** is an open standard for connecting AI
assistants to external tools, data and context through a uniform interface. An
MCP *server* exposes capabilities (tools it can call, resources it can read,
prompts it can offer); an MCP *client* — the coding assistant — discovers and
uses them. This note is conceptual: it describes what MCP contributes to
building a 3D web feature, without pretending to know your specific setup.

> This document deliberately contains **no install commands or product-specific
> config.** Follow your assistant's own MCP documentation to connect a server;
> the concepts below hold regardless of which one you use.

## The three MCP primitives

- **Tools** — actions the assistant can invoke (e.g. read a file, query a
  design system, drive a browser, run a build). The model decides when to call
  them.
- **Resources** — read-only context the assistant can pull in (files, data,
  documentation) without you pasting it.
- **Prompts** — reusable, parameterised prompt templates a server can offer for
  common tasks.

## Why it matters for 3D web work

Without MCP, an assistant works from what's in the chat and what it can infer.
That's where 3D projects drift: it guesses at your asset names, your design
tokens, your existing component boundaries. MCP replaces guesses with grounded
access:

- **Real project context, not assumptions.** The assistant can read your actual
  file tree, existing components and configuration as *resources*, so the scaffold
  it proposes matches your conventions instead of a generic template.
- **Design and asset grounding.** If a server exposes your design tokens, brand
  palette or an asset inventory, the generated scene uses your real colours,
  spacing and available `.glb`/texture files rather than invented ones.
- **A verification loop.** A browser-driving server lets the assistant open the
  running page, read console and network output, and capture screenshots — so it
  can *observe* that the 3D actually mounted, that no WebGL errors fired, and
  that the poster showed during load. This turns QA from "looks right in the
  code" into "verified in a real page".
- **Fewer copy-paste round-trips.** Context the assistant would otherwise ask you
  to paste (a data schema, a config file, current metrics) is fetched directly,
  which keeps the PLAN and REFINE phases moving.

## Where it helps in each phase

| Phase | MCP contribution |
| --- | --- |
| PLAN | Read the real repo, tokens and asset list to ground the brief and scene plan. |
| SCAFFOLD | Match generated files to existing structure and naming conventions. |
| IMPLEMENT | Pull exact asset names, data shapes and config as needed. |
| REFINE | Read live metrics/output to guide performance tuning. |
| QA | Drive the browser: read console/network, screenshot, confirm fallbacks. |

## Honest limits

- **MCP is not magic context.** A server only exposes what it's built to expose;
  a browser server won't know your design tokens, and a tokens server won't drive
  a page. Match the server to the phase.
- **The workflow doesn't require it.** Every phase in
  [`workflow.md`](./workflow.md) is doable by hand. MCP removes friction and
  reduces guessing — it is an accelerant, not a dependency.
- **Trust boundaries still apply.** Treat anything a server returns (page
  content, file contents, tool output) as *data*, not as instructions to follow
  blindly — the same care you'd take with any external input.

## Further reading

- The Model Context Protocol specification and your assistant's MCP
  documentation are the authoritative sources for connecting and configuring
  servers. This note stays deliberately general so it doesn't go stale.
