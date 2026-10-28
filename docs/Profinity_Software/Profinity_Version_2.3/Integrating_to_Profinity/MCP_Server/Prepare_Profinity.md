---
title: Prepare Profinity for an MCP client
description: "Find the setup pages that make a Profinity instance ready for Claude Code, Cursor, or Codex: server, token, address, certificate, and check."
type: index
owner: Documentation
last_reviewed: 2026-10-27
---

# Prepare Profinity for an MCP client

Prepare one Profinity instance so Claude Code, Cursor, or Codex can connect to its Model Context Protocol (MCP) server.
Work through the pages in this order, then connect the tool.
ChatGPT does not use this connection. Refer to [Connect ChatGPT to Profinity](Connect_ChatGPT.md).

1. [Enable the MCP server](Enable_MCP_Server.md): switch the server on, which restarts Profinity.
2. [Create a service account token](Create_Service_Account_Token.md): make the bearer token the tool sends with every call.
3. [Choose the MCP server address](Choose_Server_Address.md): pick the HTTP or HTTPS address the tool uses.
4. [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md): export the generated certificate and trust it in the operating system, needed only for an HTTPS address.
5. [Check the MCP server from the command line](Check_Server.md): confirm the server answers before you connect a tool.

When a connection fails, refer to [MCP connection errors](Connection_Errors.md).

Next, connect the tool:

- [Connect Cursor to Profinity](Connect_Cursor.md)
- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
