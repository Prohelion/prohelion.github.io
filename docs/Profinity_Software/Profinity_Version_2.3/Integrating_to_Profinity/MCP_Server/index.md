---
title: MCP Server
description: "Find out what the Profinity MCP server can read, which AI tools can connect, and which setup guide to follow."
type: concept
owner: Documentation
last_reviewed: 2026-10-27
---

# MCP Server

The Profinity Model Context Protocol (MCP) server lets an external AI tool read live data from one Profinity instance.
The server answers questions about components, tag values, tag history, and alerts.
It has no tool that changes Profinity data.
The tool sees only what the signed-in account is allowed to see.

[AI Chat](../../Profinity_AI/AI_Chat.md) uses this same server inside Profinity.
Claude Code, Cursor, and Codex use it when you want one of those tools to read the instance.
[AI Skills](../../Profinity_AI/AI_Skills.md) can then build dashboards, rules, and other configuration in that tool.
The [capability table](../../Profinity_AI/AI_Skills_Reference.md#what-each-tool-can-do) shows what Claude Code, Cursor, Codex, and ChatGPT can do.

!!! info "Licence required"
    The MCP server requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions.
    Without it, **Enable MCP Server** is unavailable.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

## Choose a setup guide

Prepare the instance once, then follow the guide for the tool you use.

- [Prepare Profinity for an MCP client](Prepare_Profinity.md): turn the server on, create a service account token, and choose an address.
- [Connect Cursor to Profinity](Connect_Cursor.md)
- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
- [Connect ChatGPT to Profinity](Connect_ChatGPT.md): ChatGPT uses a Custom GPT and the REST API. It does not connect to a private MCP server.

The [MCP tool reference](Tool_Reference.md) lists the ten read-only tools and the values each one returns.

## What the server returns

The tools cover three jobs.

- Find components and tags.
- Read current values and history.
- Read alert rules, active alerts, and alert history.

A tag or alert that the account cannot view is left out of the answer.
The server does not report that omission as an error.
A short answer usually means the account's own permissions, or that the active profile has no matching data.

Every call needs a bearer token for an account with the **MCP integration** permission.
Tag tools also need **View tags**, and alert tools also need **View alerts**.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

## Where to go next

Start with [Prepare Profinity for an MCP client](Prepare_Profinity.md) when the tool runs on a computer you control.
Use [Connect ChatGPT to Profinity](Connect_ChatGPT.md) when the tool is ChatGPT.
For the built-in assistant, refer to [AI Chat](../../Profinity_AI/AI_Chat.md).
