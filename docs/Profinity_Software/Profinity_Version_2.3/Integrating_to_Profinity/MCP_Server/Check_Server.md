---
title: Check the MCP server from the command line
description: "Request the Profinity MCP address with curl and the MCP accept header to confirm the server is running before you connect an AI tool."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Check the MCP server from the command line

Request the Model Context Protocol (MCP) address with `curl` to confirm the server is running before you connect an AI tool.
You need the [address](Choose_Server_Address.md) and, for HTTPS, the [exported certificate](Trust_HTTPS_Certificate.md).

A browser request is not an MCP request, so opening the address in a browser does not show whether the server is available.
From the computer that runs the AI tool, request the address with the MCP accept header.

1. For the HTTP address, run:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" -H "Accept: application/json, text/event-stream" http://localhost:18080/api/v2/Ai/Mcp
    ```

2. For the HTTPS address, point `--cacert` at the exported certificate:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" --cacert "$HOME/profinity.pem" -H "Accept: application/json, text/event-stream" https://localhost:18443/api/v2/Ai/Mcp
    ```

A response of `401` means the server is running and the request has no token yet.
A certificate error means the host name is not on the certificate, or the exported certificate was not used.
Other responses are listed in [MCP connection errors](Connection_Errors.md).

Continue with the guide for your tool and repeat the question there: "What components are in my active profile?"

- [Connect Cursor to Profinity](Connect_Cursor.md)
- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
