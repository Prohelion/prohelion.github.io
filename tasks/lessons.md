# Lessons

## Docs are for users, not for people who built the product

Rule: STYLE_GUIDE.md section 2.8. Published pages must make sense to a reader with only the product and the docs.

Pattern to avoid: drafting a page from source code, plans or review notes and carrying their wording across. Typical leaks found in the 2.3 review:

- Internal class, controller, service or component names (`...Controller`, `...Service`, `...Manager`).
- Mechanism instead of user action ("the engine reloads when the last-write time changes" instead of "edit `theme.yaml`").
- Roadmap or build-state wording ("deferred", "planned for a future update", "guide not yet published", "still settling", "is migrating").
- Design history ("load-only shim", "rewrites on load", "previously").

Before finishing any docs page:

1. Grep the page for `Controller|Service|Manager|deferred|planned|not yet|shim|previously|legacy` and justify each hit as something the user sees or types.
2. Keep names that users type or read (UI labels, YAML keys, config keys, env vars, API routes, public SDK names). Remove names they never encounter.
3. Keep "older dashboards still work" notes (user-visible upgrade behaviour); drop how Profinity migrates them.
4. When something is not available yet, state the current fact ("Not available in 2.3") and do not name the plan or promise a date.
5. Run `venv/bin/mkdocs build -d <temp dir>` and confirm no new warnings.

Reviewer note: automated review passes over-flag legitimate API and field names, and invent roadmap in their suggested rewrites. Check each finding before applying it.
