---
title: Connect an AI tool to Profinity
description: "Choose Claude Code, Cursor, Codex, or ChatGPT and open the guide that connects that tool to your Profinity instance."
type: index
owner: Documentation
last_reviewed: 2026-10-27
---

# Connect an AI tool to Profinity

Connect Claude Code, Cursor, Codex, or ChatGPT to a Profinity instance so the tool can read live data or build configuration.
Prepare the instance once, then follow the guide for the tool you use.
The [capability table](../Profinity_AI/AI_Skills_Reference.md#what-each-tool-can-do) shows which tools can use the Model Context Protocol (MCP) server, which use a Custom GPT, and which can trust a self-signed certificate.

- [Prepare Profinity for an MCP client](../Integrating_to_Profinity/MCP_Server/Prepare_Profinity.md): turn on the MCP server, create a service account token, and choose an HTTP or HTTPS address.
- [Connect Cursor to Profinity](../Integrating_to_Profinity/MCP_Server/Connect_Cursor.md): add the server to Cursor and trust the Profinity certificate.
- [Connect Claude Code to Profinity](../Integrating_to_Profinity/MCP_Server/Connect_Claude_Code.md): add the server from the Claude Code command line and trust the certificate.
- [Connect Codex to Profinity](../Integrating_to_Profinity/MCP_Server/Connect_Codex.md): name the bearer token in the Codex configuration and trust the certificate.
- [Connect ChatGPT to Profinity](../Integrating_to_Profinity/MCP_Server/Connect_ChatGPT.md): build a Custom GPT that calls the REST API. ChatGPT does not connect to a private MCP server.
- [MCP tool reference](../Integrating_to_Profinity/MCP_Server/Tool_Reference.md): look up the ten read-only MCP tools.
- [Install AI Skills](../Profinity_AI/Install_AI_Skills.md): add the skills that build dashboards, rules, collections, scripts, plugins, derived tags, and example apps.

[AI Chat](../Profinity_AI/AI_Chat.md) is the assistant inside Profinity and needs no client setup.
To return to the how-to list, refer to [How-to guides](index.md).
