---
title: AI Skills
description: "Seven skills that let Claude Code, Cursor, Codex, and ChatGPT build Profinity config and code, and act as a power-user alternative to AI Chat."
---

# AI Skills

**AI Skills** is a pack of seven skills for AI coding assistants — Claude and other tools — that help you build Profinity [dashboards](../Customising_Profinity/Dashboards/index.md), rules, [collections](../Tags/Collections.md), [scripts](../Developing_with_Profinity/Scripting/index.md), [plugins](../Developing_with_Profinity/Plugins/index.md), [derived tags](../Tags/Derived_Tags.md), and example apps. Every skill works from Profinity's own live schema and API, and from curated examples drawn from Profinity's own shipped content, so that what it generates matches the conventions of your instance rather than a format the assistant has had to guess.

This is a different thing from [AI Chat](./AI_Chat.md), the chat assistant built into the product: AI Chat answers questions about a running instance from inside Profinity itself; AI Skills is a toolkit used with your own AI coding assistant, outside Profinity, while you are building dashboards, rules, or integrations.

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

- **Authenticated access to your Profinity REST API** — used to fetch your live schema. The same credentials and permissions that apply to any other API call apply here.
- **Optionally: read access to the [MCP server](../Integrating_to_Profinity/MCP_Server.md)** — some skills use the MCP server for additional schema discovery, but it is read-only and never used to push changes. If MCP is unavailable, the skill falls back to REST API alone.

If the [REST API](../Integrating_to_Profinity/APIs/index.md) is not available when a skill is asked to generate something, the skill says so and stops, rather than guessing an endpoint or falling back to a remembered schema.

## Supported AI tools

AI Skills ships in two forms, so it works with two families of AI tool.

| Form | Works with | How you use it |
|------|-----------|----------------|
| **Agent skills** (`SKILL.md` folders) | Claude Code, Cursor, Codex, and other agents that load `SKILL.md` skills | Install with `npx skills add`; the agent discovers the skills and runs them |
| **ChatGPT Custom GPTs** | ChatGPT | Someone builds a Custom GPT once from the files in the pack, then others use it |

Agent skills are the full experience. When the tool can run commands, the script and plugin skills run `profinity-script` and `profinity-component-pack` themselves and read the output. Claude Code and Cursor are the tools the skills name explicitly: the skills know where Cursor keeps its `mcp.json` sign-in details and reuse them.

ChatGPT has more limits, because a Custom GPT has no shell and its connection is fixed when it is built:

- Whoever builds the GPT does a short one-time setup: paste the instructions, upload the example files, and import the OpenAPI Actions file with your Profinity host in it. Profinity is deployed per customer, so there is no ready-made GPT to share.
- The dashboard, rules, collections, derived tag, and app GPTs can read and save through the REST API. The script and plugin GPTs cannot. They give you the commands to run yourself.
- Dashboards are written as YAML, but the save endpoints accept only JSON. The GPT converts and shows you the result first.

!!! note "Other Tools"
    Any tool that loads `SKILL.md` skills should be able to use the agent skills, but Prohelion has only written setup guidance for the tools above.

## Use AI Skills instead of AI Chat

[AI Chat](./AI_Chat.md) is built for everyone with the AI Assistant permission and needs no setup on their machine. Power users can use their own AI tool for the same job instead, which suits people who want:

- **Their own model or provider**, rather than the single provider configured for the whole instance.
- **Conversations that persist**, because AI Chat keeps history only for the current browser tab.
- **Other work alongside the questions**, such as files, code, and other systems in the same session.

For this, connect your tool to the [MCP Server](../Integrating_to_Profinity/MCP_Server.md) using [How to Connect Profinity to AI](../How_To_Guides/Connect_Profinity_to_AI.md). That gives it the same read-only live data AI Chat uses: tags and their history, alert rules, active alerts, and alert history. Add AI Skills on top and the same tool can also build and change things, always showing you the payload before it saves.

Your own tool does not get AI Chat's built-in documentation lookup, so point it at [docs.prohelion.com](https://docs.prohelion.com) if you want it to cite the manuals. It sees only what your sign-in is permitted to see, and your messages go to whichever provider that tool uses, so check that provider against your organisation's data-handling rules.

## Developing with Profinity

AI Skills is also an assistant for people building on Profinity. Because each skill reads your instance's live schema and API, it generates what your Profinity version accepts, not what the assistant remembers from an older release.

| You are building | Use |
|------------------|-----|
| A dashboard or component dashboard | Dashboard Builder |
| Alert rules, tag collections, or derived tags | Tag Rules, Tag Collections, Derived Tags |
| An in-profile script, with simulation before you deploy | Script |
| A custom component plugin, packed for installation | Plugin |
| An application or integration against the REST API | App |

The Script and Plugin skills work beside the Profinity developer kit (`Profinity.Sdk`, `profinity-script`, `profinity-component-pack`). Contact Prohelion for a copy; each skill's `sdk.md` explains how it finds the kit. See [Developing with Profinity](../Developing_with_Profinity/index.md) for the underlying SDK and plugin documentation.

## Installing AI Skills

Prohelion publishes AI Skills as `profinity-ai-skills.zip` alongside each Profinity release. After you download it:

```bash
# Option 1: Install from the downloaded folder
npx skills add ./Profinity-AI-Skills

# Option 2: Install from the extracted zip
unzip profinity-ai-skills.zip
npx skills add ./profinity-ai-skills
```

After installation, the skills are available in your AI tool. Start with the skill's `SKILL.md` file for step-by-step guidance, as each skill folder includes detailed instructions, API reference documents, examples, and schemas.

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

- [Profinity AI](./index.md) — the overview of AI Chat and AI Skills.
- [AI Chat](./AI_Chat.md) — the in-product chat assistant, a different feature from AI Skills.
- [How to Connect Profinity to AI](../How_To_Guides/Connect_Profinity_to_AI.md) — connect your own AI tool to the MCP Server.
- [Developing with Profinity](../Developing_with_Profinity/index.md) — the SDK, plugins, and scripting that the Script and Plugin skills build on.
- [MCP Server](../Integrating_to_Profinity/MCP_Server.md) — optional server connection AI Skills can use for schema discovery.
- [Profinity REST APIs](../Integrating_to_Profinity/APIs/index.md) — the REST API that AI Skills use to fetch your live schema and push generated configs.
