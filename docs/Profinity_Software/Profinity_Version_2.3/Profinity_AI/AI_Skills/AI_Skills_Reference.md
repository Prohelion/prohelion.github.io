---
title: AI Skills reference
description: Look up the seven AI Skills, the licence, permissions, and API access they need, and what each supported AI tool can do with them.
type: reference
owner: Documentation
last_reviewed: 2026-10-27
---

# AI Skills reference

This page lists the seven skills in [AI Skills](./index.md), what they need to work, and the AI tools that can use them.
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
It uses the Representational State Transfer (REST) API of Profinity (refer to [Profinity REST APIs](../../Integrating_to_Profinity/APIs/index.md)), which every edition includes.
Your sign-in applies, so the same credentials and permissions apply as for any other API call.
A skill that saves a dashboard, rule, or collection needs the matching permission for the signed-in user.
Examples are **Modify dashboards**, **Modify tag rules**, and **Modify tag collections** (refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)).

Some skills can also read from the Model Context Protocol (MCP) server of your instance, for extra schema discovery (refer to [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md)).
This access is read-only, and it never pushes changes.
It needs the **AI** licensed feature, which the **Server** and **Enterprise** editions include ([Licensing](../../Licensing.md) lists what each edition includes).
If the MCP server is unavailable, the skill falls back to the REST API alone.
If the REST API is not available when you ask a skill to generate something, the skill says so and stops.
It does not guess an endpoint or use a remembered schema.

## What each tool can do

[AI Skills](./index.md) supports four tools.
The connection steps for each one start from [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md).

| AI tool | Live MCP data | AI Skills form | Saves through the REST API | Runs local skill commands | Self-signed HTTPS |
|---------|---------------|----------------|----------------------------|---------------------------|-------------------|
| Claude Code | Yes. Streamable HTTP with a bearer token | Agent skills | Yes, after you approve the change | Yes | Trust the operating system certificate, or set `NODE_EXTRA_CA_CERTS` to the exported certificate |
| Cursor | Yes. Streamable HTTP with a bearer token | Agent skills | Yes, after you approve the change | Yes | Trust the certificate in the operating system. Cursor has no setting that skips this check |
| Codex | Yes. Streamable HTTP with a bearer token | Agent skills | Yes, after you approve the change | Yes | Trust the certificate in the operating system. Codex has no documented setting that skips this check |
| ChatGPT | No. ChatGPT cannot reach a private Profinity MCP server, and Profinity MCP does not provide the OAuth sign-in that connector uses | Custom GPT | Yes, for the dashboard, rules, collections, derived tag, and app skills | No | No. ChatGPT needs a publicly trusted HTTPS address for the REST API |

Agent skills give Claude Code, Cursor, and Codex the full pack.
When the tool can run commands, the script and plugin skills run `profinity-script` and `profinity-component-pack` and read the output.
Those three tools reuse the MCP connection from their own setup guides.
Other tools that load `SKILL.md` skills can use the agent skills, and Prohelion's setup guides cover the four tools in this table.

ChatGPT uses the Custom GPT package because a Custom GPT has no shell and its connection is fixed when you build it.
The script and plugin GPTs give you the commands to run yourself.
The dashboard GPT shows you the converted dashboard before it saves.
To build one, refer to [Connect ChatGPT to Profinity](Connect_ChatGPT.md).
