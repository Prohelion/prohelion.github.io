---
title: AI Skills
---

# AI Skills

**AI Skills** is a pack of seven skills for AI coding assistants — Claude and other tools — that help you build Profinity dashboards, rules, collections, scripts, plugins, derived tags, and example apps. Unlike asking a general-purpose assistant to guess at a config format, every skill works from Profinity's own live schema and API, and from curated examples drawn from Profinity's own shipped content — so what it generates matches your instance's real conventions, not an invented approximation.

This is a different thing from [Profinity AI](./index.md), the chat assistant built into the product: Profinity AI answers questions about a running instance from inside Profinity itself; AI Skills is a toolkit you use with your own AI coding assistant, outside Profinity, while you're building dashboards, rules, or integrations.

## The seven skills

| Skill | Purpose |
|-------|---------|
| **Dashboard Builder** | Generate Profinity dashboard config (YAML) from your live UI schema |
| **Script** | Write in-profile scripts using `profinity-script` with SDK guidance |
| **Plugin** | Create a component plugin and package it with `profinity-component-pack` |
| **Tag Collections** | Build tag collection documents (group related tags for dashboards) |
| **Tag Rules** | Create alert and rule documents to trigger on tag conditions |
| **Derived Tags** | Define virtual tags that compute from other signals and rules |
| **App** | Write an example app that calls the Profinity REST API |

## How it works

Each skill is self-contained:

- **Fetches live data** — before generating anything, the skill queries your instance's live schema (`GET /api/v2/UI/schema` for dashboards; similar endpoints for rules, collections, and derived tags). It never relies on a remembered schema from a previous run.
- **Uses curated examples** — generation is grounded in Profinity's own example content, not invented output.
- **Shows before pushing** — for skills that modify your instance (dashboards, rules, collections), the skill shows you the payload and asks for approval before any change goes live. Read-only skills (script, plugin, app) generate code and stop.

## What AI Skills needs to work

- **Authenticated access to your Profinity REST API** — used to fetch your live schema. The same credentials and permissions you'd use for any other API call apply here.
- **Optionally: read access to the MCP server** — some skills use the MCP server for additional schema discovery, but it is read-only and never used to push changes. If MCP is unavailable, the skill falls back to REST API alone.

If either isn't available when you ask for something, the skill says so plainly and stops, rather than guessing an endpoint or falling back to a remembered schema.

## Installing AI Skills

Prohelion publishes AI Skills as `profinity-ai-skills.zip` alongside each Profinity release. After you download it:

```bash
# Option 1: Install from the downloaded folder
npx skills add ./Profinity-AI-Skills

# Option 2: Install from the extracted zip
unzip profinity-ai-skills.zip
npx skills add ./profinity-ai-skills
```

After installation, the skills are available in your AI tool. Start with the skill's `SKILL.md` file for step-by-step guidance — each skill folder includes detailed instructions, API reference docs, examples, and schemas.

## Finding detailed skill documentation

Each skill's folder contains:

| File | Contents |
|------|----------|
| `SKILL.md` | Step-by-step instructions, examples, and troubleshooting |
| `api-access.md` | REST API endpoints, request formats, authentication |
| `sdk.md` | How to find and use the Profinity SDK locally (for script, plugin) |
| `examples/` | Sample configurations, YAML files, reference dashboards |
| `schema/` | JSON schemas for validation (rules, collections, derived tags) |

See the [full README](https://github.com/Prohelion/Profinity/tree/master/Profinity-AI-Skills) in the Profinity repository for complete technical details, packaging information, and architecture.

## Related documentation

- [Profinity AI](./index.md) — the in-product chat assistant, a different feature from AI Skills.
- [MCP Server](../Extending_Profinity/MCP_Server.md) — optional server connection AI Skills can use for schema discovery.
- [Profinity Rest APIs](../Extending_Profinity/APIs/index.md) — the REST API that AI Skills use to fetch your live schema and push generated configs.
