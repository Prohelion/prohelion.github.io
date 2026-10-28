---
title: MCP connection errors
description: "Look up the HTTP responses and empty results an AI tool gets from the Profinity MCP server, with the cause and the fix for each."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# MCP connection errors

This page lists the responses an AI tool receives from the Profinity Model Context Protocol (MCP) server, with the cause and the fix.
The guides for [Cursor](Connect_Cursor.md), [Claude Code](Connect_Claude_Code.md), and [Codex](Connect_Codex.md) cover the tool-specific causes, and [ChatGPT](Connect_ChatGPT.md) uses the REST API instead.

| Response | Cause | What to do |
|----------|-------|------------|
| Certificate error | The tool does not trust the certificate, or the address is not a name on it | Trust the exported certificate, or use the HTTP address on the same computer |
| 401 | The token is missing, incomplete, or expired | Paste the service account token again |
| 403 | The account lacks **MCP integration** | Add that permission to one of the account's roles |
| 404 | The server is unavailable, or the request is not an MCP request | Use the causes under this table |
| 429 with `Too many MCP requests. Please try again later.` | The account sent too many MCP requests | Wait, then retry |

A 404 has these causes:

- **Enable MCP Server** is off.
- The **AI** feature is not licensed.
- Profinity has not finished restarting since the setting was saved.
- The request has no `Accept: application/json, text/event-stream` header. A browser request fails in this way. The AI tool sends the header itself.

A tool that connects but returns no tags or alerts is working.
The account lacks **View tags** or **View alerts**, or the active profile has no matching data.
A component or collection restricted to other roles is also left out.
Refer to [Component and collection security](../../Administration/Users_and_Access/Component_And_Collection_Security.md).
