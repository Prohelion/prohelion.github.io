---
title: AI Skills reference
description: Look up the seven AI Skills, the licence, permissions, and API access they need, and what each supported AI tool can do with them.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# AI Skills reference

This page lists the seven skills in [AI Skills](./AI_Skills.md), what they need to work, and the AI tools that can use them.
To install them, refer to [Install AI Skills](./Install_AI_Skills.md).

## The seven skills

| Skill | Purpose |
|-------|---------|
| **Dashboard Builder** | Generate Profinity dashboard config (YAML) from your live UI schema |
| **Script** | Write in-profile scripts using `profinity-script` with SDK guidance |
| **Plugin** | Create a component plugin and package it with `profinity-component-pack` |
| **Tag Collections** | Build tag collection documents (group related tags for dashboards) |
| **Tag Rules** | Create alert and rule documents to trigger on tag conditions |
| **Derived Tags** | Define derived tags that compute from other tags |
| **App** | Write an example app that calls the Profinity REST API |

## What AI Skills needs to work

AI Skills needs no licence of its own.
It uses the [REST API](../Integrating_to_Profinity/APIs/index.md), which every edition includes, with your sign-in, so the same credentials and permissions apply as for any other API call.
A skill that saves a dashboard, rule, or collection needs the matching permission for the signed-in user, such as **Modify dashboards**, **Modify tag rules**, or **Modify tag collections** (refer to [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).
Some skills can also use read access to the [MCP server](../Integrating_to_Profinity/MCP_Server/index.md) for extra schema discovery, which is read-only, never pushes changes, and needs the **AI** licensed feature.
If MCP is unavailable, the skill falls back to the REST API alone.
If the REST API is not available when a skill is asked to generate something, the skill says so and stops rather than guessing an endpoint or using a remembered schema.

## Supported AI tools

AI Skills ships in two forms.

| Form | Works with | How you use it |
|------|-----------|----------------|
| **Agent skills** (`SKILL.md` folders) | Claude Code, Cursor, Codex, and other agents that load `SKILL.md` skills | Install with `npx skills add`; the agent discovers the skills and runs them |
| **ChatGPT Custom GPTs** | ChatGPT | Someone builds a Custom GPT once from the files in the pack, then others use it |

Agent skills give the full experience.
When the tool can run commands, the script and plugin skills run `profinity-script` and `profinity-component-pack` themselves and read the output, and the skills reuse the MCP connection settings that Claude Code and Cursor already hold.
Prohelion's setup guidance covers Claude Code, Cursor, Codex, and ChatGPT, and other tools that load `SKILL.md` skills can use the agent skills without written guidance.

ChatGPT has more limits, because a Custom GPT has no shell and its connection is fixed when it is built.
The dashboard, rules, collections, derived tag, and app GPTs can read and save through the REST API, but the script and plugin GPTs cannot, so they give you the commands to run yourself.
Dashboards are written as YAML but the save endpoints accept only JSON, so the GPT converts the YAML and shows you the result first.
To build a Custom GPT, refer to [Install AI Skills](./Install_AI_Skills.md#set-up-a-chatgpt-custom-gpt).
