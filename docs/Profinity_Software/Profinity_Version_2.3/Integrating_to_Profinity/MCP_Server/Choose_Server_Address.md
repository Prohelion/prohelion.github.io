---
title: Choose the MCP server address
description: "Choose the HTTP or HTTPS address an AI tool uses to reach the Profinity MCP server, and check the ports and host name."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Choose the MCP server address

Choose the address that the AI tool uses to reach the Profinity Model Context Protocol (MCP) server.
You need the server [enabled](Enable_MCP_Server.md) and the port numbers from the **Web** tab.

The MCP address is the Profinity web address with `/api/v2/Ai/Mcp` on the end.
Take the ports from the **Web** tab.
The defaults are `18080` for HTTP and `18443` for HTTPS.
Refer to [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).

1. Use HTTP when the AI tool runs on the same computer as Profinity and **Redirect all Http traffic to Https** is off:

    ```text
    http://localhost:18080/api/v2/Ai/Mcp
    ```

    This address does not use a certificate.
    Use it for Cursor, Claude Code, or Codex on that computer when you want to avoid certificate setup.

2. Use HTTPS when the tool runs on another computer, or when HTTP is redirected to HTTPS:

    ```text
    https://localhost:18443/api/v2/Ai/Mcp
    ```

    Replace `localhost` with the computer's host name or network address when the tool is on another computer.

3. For an HTTPS address, confirm that the host name or address is one of the names on the certificate, and that the web server port is reachable from the tool, including through any firewall.

Without a Server licence, Profinity listens only on `127.0.0.1`, so a tool on another computer cannot connect.
Refer to [Licensing](../../Licensing.md).

Keep the address and the token from the previous page.
Next, [trust the HTTPS certificate](Trust_HTTPS_Certificate.md) for an HTTPS address, or [check the server from the command line](Check_Server.md) for an HTTP address.
