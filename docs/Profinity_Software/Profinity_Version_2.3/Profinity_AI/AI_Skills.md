---
title: AI Skills
---

# AI Skills

**AI Skills** is a pack of skills for AI coding assistants — Claude and other tools — that help
you build Profinity dashboards, rules, collections, scripts, and example apps. Unlike asking a
general-purpose assistant to guess at a config format, every skill in this pack works from
Profinity's own live schema and API, and from a small set of curated examples drawn from
Profinity's own shipped content — so what it generates matches your instance's real conventions,
not an invented approximation.

This is a different thing from [Profinity AI](./index.md), the chat assistant built into the
product: Profinity AI answers questions about a running instance from inside Profinity itself;
AI Skills is a toolkit you use with your own AI coding assistant, outside Profinity, while you're
building dashboards, rules, or integrations.

## How it works

Each skill separates the parts that stay the same from the parts that change per AI tool:

- **Shared assets** — the live-schema fetch, the curated examples, and the actual generation
  logic. This is the same regardless of which assistant you're using.
- **A thin wrapper per tool** — for Claude, a Skill (`SKILL.md` plus step instructions); other AI
  tools get their own equivalent wrapper over the same shared assets and the same Profinity API.

Every skill fetches your instance's **live** schema before generating anything — it never relies
on a remembered schema from a previous run, since your instance's configuration can change between
sessions.

## Dashboard Builder

The first skill in the pack generates a Profinity dashboard config, grounded in your instance's
real schema and Profinity's own example content.

1. **Fetches the live UI schema** from your Profinity instance (`GET /api/v2/UI/schema`).
2. **Matches Profinity's own conventions** — naming, binding patterns, layout structure — using a
   bundled example dashboard copied from Profinity's shipped demo content, not a generic style.
3. **Generates the dashboard config as YAML** (Profinity dashboards are authored in YAML, not
   JSON — the schema describes the shape, it doesn't change the file format).
4. **Shows you the result before pushing anything.** Generating a config is not the same as
   publishing it — the skill stops here unless you ask for it to go live.
5. **Pushes only when you explicitly ask**, via the Profinity API, and shows you the exact payload
   it's about to send first.

Only Profinity's own bundled, anonymised example content is used as reference style — the skill
never treats a live client's dashboards as reusable examples.

## What AI Skills needs to work

- **Read access to your Profinity instance's MCP server** — used for schema discovery and for
  listing existing dashboards as reference material. MCP access is read-only; it's never used to
  push a change.
- **An authenticated Profinity API session** — used to fetch the live schema and, only on your
  explicit request, to push a generated config. The schema endpoint requires the same
  authentication as any other Profinity API call.

If either isn't available when you ask for something, the skill says so plainly and stops, rather
than guessing an endpoint or falling back to a remembered schema.

## Getting AI Skills

Prohelion publishes AI Skills as `profinity-ai-skills.zip` alongside each Profinity release —
contact Prohelion or your account team for the current download location. Once you have the pack,
add the Claude skill under `claude/dashboard-builder/` to your Claude configuration the same way
you'd add any other Claude Skill.

## Related documentation

- [Profinity AI](./index.md) — the in-product chat assistant, a different feature from AI Skills.
- [MCP Server](../Extending_Profinity/MCP_Server.md) — the connection AI Skills uses for schema
  discovery, the same server Profinity AI itself uses.
- [Profinity Rest APIs](../Extending_Profinity/APIs/index.md) — the API AI Skills uses to fetch
  the live schema and push generated configs.
