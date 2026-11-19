---
title: MCP connection errors
description: "Look up the errors and short results an AI tool gets from the Profinity MCP server, with the cause and the fix for each."
type: reference
owner: Documentation
last_reviewed: 2026-10-29
---

# MCP connection errors

This page lists the responses an AI tool receives from the Profinity Model Context Protocol (MCP) server, with the cause and the fix for each.
The guides for [Claude Code](Connect_Claude_Code.md), [Codex](Connect_Codex.md), and [Cursor](Connect_Cursor.md) cover the causes that belong to one tool.

| What you see | Cause | What to do |
|--------------|-------|------------|
| Certificate error | The tool treats the certificate as untrusted, or the address is missing from it | [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md), or use the HTTP address on the same computer |
| 401 | The token is missing, incomplete, or replaced by a newer one | Give the tool the current service account token |
| 403 | The account lacks **MCP integration** | Add that permission to one of the account's roles |
| 404 | The server is not available | Refer to [Causes of a 404](#causes-of-a-404) |
| 429 with `Too many MCP requests. Please try again later.` | The account sent too many MCP requests | Wait, then try again |
| An error when the tool asks for components, tags, or alerts | The account lacks **View tags** for component and tag requests, or **View alerts** for alert requests | Add that permission to one of the account's roles |

## Causes of a 404

A 404 has one of these causes:

- **Enable MCP server** is off.
- Profinity has not finished restarting since the setting was saved.
- The **AI** feature is not licensed.
- The address was opened in a browser. A browser does not make MCP requests, so check the server with the command in [Check the server answers](Prepare_Profinity.md#check-the-server-answers).

## Fewer results than expected

A tool that connects but returns fewer components, tags, or alerts than you expect is working.
Profinity shows an account only the components and collections its roles allow, and leaves the rest out silently.
An account that lacks **View tags** or **View alerts** gets an error instead of a short result.
The likely causes are:

- A component or collection is restricted to roles the account does not have. Refer to [Component and collection security](../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).
- The active profile has no matching data.

To find out which tool answers which question, refer to the [MCP tool reference](Tool_Reference.md).
