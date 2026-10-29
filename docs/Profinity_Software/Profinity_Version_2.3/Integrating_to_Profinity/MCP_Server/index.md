---
title: MCP Server
description: "Find out what the Profinity MCP server can read, which AI tools can connect, and which setup guide to follow."
type: concept
owner: Documentation
last_reviewed: 2026-10-29
---

# MCP Server

The Profinity Model Context Protocol (MCP) server lets an AI tool read live data from one Profinity instance.
The server answers questions about components, tag values, tag history, and alerts, and has no tool that changes Profinity data.
The AI tool sees only what its account is allowed to see.

[AI Chat](../../Profinity_AI/AI_Chat.md) uses this server inside Profinity.
Claude Code, Cursor, and Codex connect to it from your computer.
With [AI Skills](../../Profinity_AI/AI_Skills/index.md) installed, those tools can then build dashboards, rules, and other configuration from what they read.

!!! info "Licence required"
    The MCP server requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

## Choose a setup guide

Prepare the instance once, then connect the tool you use:

1. [Prepare Profinity for an MCP client](Prepare_Profinity.md): turn the server on, create a token, choose an address, and check that the server answers.
2. [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md): needed only when the tool uses an `https://` address.
3. The guide for your tool: [Claude Code](Connect_Claude_Code.md), [Codex](Connect_Codex.md), or [Cursor](Connect_Cursor.md).

ChatGPT cannot connect to the MCP server.
To use ChatGPT with Profinity, refer to [Connect ChatGPT to Profinity](../../Profinity_AI/AI_Skills/Connect_ChatGPT.md).

## What the server returns

The server's tools cover three jobs:

- Find components and tags.
- Read alert rules, active alerts, and alert history.
- Read current values and history.

Every call needs a token for an account with the **MCP integration** permission.
Tag tools also need **View tags**, and alert tools also need **View alerts**.
A tag or alert that the account cannot view is left out of the answer, without an error.

The [MCP tool reference](Tool_Reference.md) lists each tool and the permission it needs.
When a connection fails or returns less than you expect, refer to [MCP connection errors](Connection_Errors.md).
