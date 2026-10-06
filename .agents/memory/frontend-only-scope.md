---
name: Frontend-only scope
description: Why the fashion website should remain client-only during its initial visual build.
---

Keep this website frontend-only during the initial visual build. The user intends to move it to Antigravity for further visual refinement before eventual backend integration. Content, collection records, journal entries, images, and the contact confirmation should remain local and editable; the contact form must not claim to send anything.

**Why:** The user explicitly asked for a complete visual website without backend services, databases, authentication, CMS, APIs, payments, or server-side storage, and described this as a staged handoff.

**How to apply:** Do not connect the site to the workspace's default API or database scaffolding. Preserve local data and asset paths until the user requests the later integration stage.
