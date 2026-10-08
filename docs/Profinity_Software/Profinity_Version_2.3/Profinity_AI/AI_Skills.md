---
title: AI Skills
description: "Seven skills that let Claude Code, Cursor, Codex, and ChatGPT build Profinity config and code, and act as a power-user alternative to AI Chat."
---

# AI Skills

AI Skills is a pack of seven skills for AI coding assistants such as Claude Code, Cursor, Codex and ChatGPT that help you build Profinity [dashboards](../Customising_Profinity/Dashboards/index.md), rules, [collections](../Tags/Collections.md), [scripts](../Developing_with_Profinity/Scripting/index.md), [plugins](../Developing_with_Profinity/Plugins/index.md), [derived tags](../Tags/Derived_Tags.md) and example apps. Every skill works from the live schema and API of your own Profinity instance and from curated examples drawn from Profinity's shipped content, so what it generates matches the conventions of your instance. AI Skills runs in your own AI tool, outside Profinity, while [AI Chat](./AI_Chat.md) is the assistant built into the product that answers questions about a running instance.

## The Seven Skills

| Skill | Purpose |
|-------|---------|
| **Dashboard Builder** | Generate Profinity dashboard config (YAML) from your live UI schema |
| **Script** | Write in-profile scripts using `profinity-script` with SDK guidance |
| **Plugin** | Create a component plugin and package it with `profinity-component-pack` |
| **Tag Collections** | Build tag collection documents (group related tags for dashboards) |
| **Tag Rules** | Create alert and rule documents to trigger on tag conditions |
| **Derived Tags** | Define derived tags that compute from other tags |
| **App** | Write an example app that calls the Profinity REST API |

## How It Works

Each skill is self-contained. Before it generates anything, it queries your instance's live schema (`GET /api/v2/UI/schema` for dashboards, and the matching live definitions for rules, collections and derived tags), so it never relies on a schema remembered from a previous run. It grounds generation in Profinity's own example content rather than invented output. For skills that modify your instance (dashboards, rules and collections), the skill shows you the payload and asks for approval before any change goes live, while the read-only skills (script, plugin and app) generate code and stop.

## What AI Skills Needs to Work

AI Skills needs no licence of its own. It uses the [REST API](../Integrating_to_Profinity/APIs/index.md), which every edition includes, with your sign-in, so the same credentials and permissions apply as for any other API call. A skill that saves a dashboard, rule or collection needs the matching permission for the signed-in user, such as **Modify dashboards**, **Modify tag rules** or **Modify tag collections** (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)). Some skills can also use read access to the [MCP server](../Integrating_to_Profinity/MCP_Server.md) for extra schema discovery, which is read-only, never pushes changes, and needs the **AI** licensed feature; if MCP is unavailable, the skill falls back to the REST API alone. If the REST API is not available when a skill is asked to generate something, the skill says so and stops rather than guessing an endpoint or using a remembered schema. Installing the skills with `npx` needs Node.js on your computer.

## Supported AI Tools

AI Skills ships in two forms.

| Form | Works with | How you use it |
|------|-----------|----------------|
| **Agent skills** (`SKILL.md` folders) | Claude Code, Cursor, Codex, and other agents that load `SKILL.md` skills | Install with `npx skills add`; the agent discovers the skills and runs them |
| **ChatGPT Custom GPTs** | ChatGPT | Someone builds a Custom GPT once from the files in the pack, then others use it |

Agent skills give the full experience. When the tool can run commands, the script and plugin skills run `profinity-script` and `profinity-component-pack` themselves and read the output, and the skills reuse the MCP connection settings that Claude Code and Cursor already hold. Prohelion's setup guidance covers Claude Code, Cursor, Codex and ChatGPT, and other tools that load `SKILL.md` skills can use the agent skills without written guidance.

ChatGPT has more limits, because a Custom GPT has no shell and its connection is fixed when it is built. Whoever builds the GPT does a short one-time setup: paste the instructions, upload the example files, and import the OpenAPI Actions file (the file that tells the GPT how to call the REST API) with your Profinity host in it. Profinity is deployed per customer, so there is no ready-made GPT to share. The dashboard, rules, collections, derived tag and app GPTs can read and save through the REST API, but the script and plugin GPTs cannot, so they give you the commands to run yourself. Dashboards are written as YAML but the save endpoints accept only JSON, so the GPT converts the YAML and shows you the result first.

## Use AI Skills Instead of AI Chat

[AI Chat](./AI_Chat.md) is for everyone with the **Profinity AI** permission and needs no setup on their machine. Power users can use their own AI tool for the same job, which suits people who want their own model or provider rather than the single provider configured for the whole instance, conversations that persist (AI Chat keeps history only for the current browser tab), or other work in the same session such as files, code and other systems. To do this, connect your tool to the [MCP Server](../Integrating_to_Profinity/MCP_Server.md) using [How to Connect Profinity to AI](../How_To_Guides/Connect_Profinity_to_AI.md), which gives it the same read-only live data AI Chat uses: tags and their history, alert rules, active alerts and alert history. Add AI Skills on top and the same tool can also build and change things, always showing you the payload before it saves.

Your own tool does not get AI Chat's built-in documentation lookup, so point it at [docs.prohelion.com](https://docs.prohelion.com) if you want it to cite the manuals. It sees only what your sign-in is permitted to see, and your messages go to whichever provider that tool uses, so check that provider against your organisation's data-handling rules.

## Developing With Profinity

AI Skills also helps people who build on Profinity, because each skill reads the schema and API of your instance and generates what your Profinity version accepts.

| You are building | Use |
|------------------|-----|
| A dashboard or component dashboard | Dashboard Builder |
| Alert rules, tag collections, or derived tags | Tag Rules, Tag Collections, Derived Tags |
| An in-profile script, with simulation before you deploy | Script |
| A custom component plugin, packed for installation | Plugin |
| An application or integration against the REST API | App |

The Script and Plugin skills work beside the Profinity developer kit (`Profinity.Sdk`, `profinity-script` and `profinity-component-pack`), which Prohelion supplies on request. See [Developing with Profinity](../Developing_with_Profinity/index.md) for the underlying SDK and plugin documentation.

## Installing AI Skills

Prohelion publishes AI Skills as `profinity-ai-skills.zip` with each Profinity release, at `https://files.prohelion.com/profinity/<branch>/skills/profinity-ai-skills.zip`, where `<branch>` is the release channel that Prohelion gives you. Download the zip, extract it into a folder, and point `npx skills add` at that folder. The zip has no wrapping folder, so create the destination folder when you extract:

```bash
unzip profinity-ai-skills.zip -d profinity-ai-skills
npx skills add ./profinity-ai-skills
```

On Windows, extract the zip with File Explorer or with `Expand-Archive profinity-ai-skills.zip -DestinationPath profinity-ai-skills` in PowerShell, then run the same `npx skills add` command. After installation, the skills are available in your AI tool, and each skill's `SKILL.md` file gives step-by-step instructions, with API reference notes, examples and schemas beside it in the skill's folder.

## Related Documentation

- [Profinity AI](./index.md): the overview of AI Chat and AI Skills.
- [AI Chat](./AI_Chat.md): the in-product chat assistant, a different feature from AI Skills.
- [How to Connect Profinity to AI](../How_To_Guides/Connect_Profinity_to_AI.md): connect your own AI tool to the MCP Server.
- [Developing with Profinity](../Developing_with_Profinity/index.md): the SDK, plugins, and scripting that the Script and Plugin skills build on.
- [MCP Server](../Integrating_to_Profinity/MCP_Server.md): the optional server connection AI Skills can use for schema discovery.
- [Profinity REST APIs](../Integrating_to_Profinity/APIs/index.md): the REST API that AI Skills use to fetch your live schema and push generated configuration.
