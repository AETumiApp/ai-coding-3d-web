# The quality bar for shipped 3D web

What "done" means for a premium 3D web feature, independent of which assistant
built it. This is the standard the five-phase workflow is aiming at — a single
page you can point any tool (or teammate) at and say *this is the bar*.

It is intentionally strict. 3D on the web fails in ways flat pages don't: it can
mount on the server and crash the build, run beautifully on your laptop and melt
a phone, look finished and leak a WebGL context on every navigation until the
canvas dies. Each section below closes one of those trapdoors.

---

## 1. Architecture — the boundary is right

- Copy and metadata are **server-rendered HTML**; the 3D is a **client-only
  island** (`next/dynamic`, `ssr: false`). No `three` import is evaluated on the
  server.
- The `three` + scene code is **code-split**, not in the initial/shared chunk.
- The canvas is decorative and `aria-hidden`; **all meaning lives in real HTML**
  beside it.

*Fails the bar if:* the page 500s on the server, or the headline only exists
inside the canvas.

## 2. Performance — it holds up on a real phone

- Pixel ratio capped `Math.min(devicePixelRatio, 2)`.
- Draw calls and triangles measured (`renderer.info.render.calls`) and inside
  the brief's budget. Repeated meshes instanced; static geometry merged.
- **One** RAF loop; **zero** per-frame allocations (scratch objects hoisted).
- Render-on-demand where the scene is static; loop paused on tab-hidden.
- Sustained target fps on a **named mid-range phone**, verified on device — not
  only under emulated throttling (which under-reports thermal throttling).

*Fails the bar if:* it's smooth on a flagship and a slideshow on a Pixel 6a.

## 3. Adaptivity — one scene, many devices

- A device-aware quality ladder (high/medium/low) chosen from cheap signals
  (viewport width, DPR, `hardwareConcurrency`, optional first-frame probe).
- The high tier looks identical to the intended design; lower tiers reduce
  counts/effects/DPR, they don't restyle.

*Fails the bar if:* the scene is either too heavy for phones or too timid for
desktops because it ships one fixed cost.

## 4. Fallback & resilience — it never white-screens

- No-WebGL → a poster image / CSS gradient, never a blank canvas.
- Load failure (model/texture) → poster + short message, caught, not a crash.
- Context loss (`webglcontextlost`) → recover or fall back gracefully.
- Loading state visible until mount; **no layout shift** when the canvas
  appears.

*Fails the bar if:* a 404 on one texture takes down the page.

## 5. Accessibility — motion and meaning are inclusive

- `prefers-reduced-motion` → a single **static frame**, loop not started (not a
  slowed-down animation).
- Every interactive 3D control has a keyboard-operable DOM equivalent; focus is
  visible and not trapped by the canvas.
- Text over the canvas meets **WCAG AA against the darkest and lightest frames**.
- No rapid full-screen flashing (> 3/sec).

*Fails the bar if:* the only way to rotate the product is a mouse drag.

## 6. SEO & metadata — crawlers see a real page

- Title, meta description, real `<h1>/<h2>`, semantic landmarks — all in the
  server HTML.
- OpenGraph/Twitter image is a **static screenshot** of the scene (crawlers
  can't run WebGL).
- LCP is text or the poster, **not** the canvas — verified in Lighthouse.

*Fails the bar if:* the share preview is blank and the LCP is a canvas.

## 7. Lifecycle & cleanup — nothing leaks

- Full disposal on unmount: geometries, materials, **textures**, render targets,
  controls, env maps, renderer. Loaded models disposed via `scene.traverse`.
- RAF cancelled; listeners removed; canvas removed.
- Navigating in and out of the route repeatedly **does not accumulate WebGL
  contexts** (browsers cap ~16; leaking eventually kills the canvas).
- No doubled RAF loop under React strict-mode double-mount.

*Fails the bar if:* the fifth visit to the page renders nothing.

## 8. Verification & tests — proof, not vibes

- A production build runs clean: **no console errors or warnings**.
- Lighthouse (mobile) Performance + Accessibility scores **recorded**.
- The disposal/no-leak behaviour is actually exercised (navigate away and back),
  not assumed.
- Where practical, the pure pieces are unit-testable: scroll-progress→state
  mapping, bounding-box framing math, and tier selection are pure functions and
  should have at least smoke tests.
- A field signal exists (fallback-shown rate, sampled frame time) so real-device
  regressions surface after launch.

*Fails the bar if:* "it worked when I looked at it" is the only evidence.

---

## Using this bar

- **At review**, walk sections 1–8 like a gate. Any waiver is written down with
  a reason — never silent.
- **Across tools**, this page is the contract: Claude Code, Cursor and Codex are
  all held to the same standard, so the artifact (the finished feature) is
  interchangeable even if the tool that built it wasn't.
- **Paired docs:** the granular checkbox version is
  <https://aetumi.app/claude-code-threejs> (`production-checklist.md`); the
  build prompts that bake these constraints in are
  <https://aetumi.app/3d-web-ai-prompts>.
