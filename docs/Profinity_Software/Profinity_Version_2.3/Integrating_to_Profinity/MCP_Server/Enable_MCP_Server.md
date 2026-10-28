---
title: Enable the MCP server
description: "Switch on the Profinity Model Context Protocol server in System Configuration so an external AI tool can connect."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Enable the MCP server

Switch on the Model Context Protocol (MCP) server in System Configuration, which restarts Profinity.
You need the **AI** licensed feature, which the **Server** and **Enterprise** editions include, and the **System administration** permission to change the setting.
Refer to [Licensing](../../Licensing.md) and [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

The server stays off until an administrator enables it.
Enabling Profinity AI also enables the server, because [AI Chat](../../Profinity_AI/AI_Chat.md) depends on it.
You can enable the server on its own and leave Profinity AI off when only an external tool needs it.

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Open the **Profinity AI** category and find the **MCP Server** field group.
3. Switch on **Enable MCP Server**.
4. Select **Save**.

Saving restarts Profinity.
The web interface shows "Restarting, please wait..." and loads the settings again when the engine is running.
The server is not available during that restart.
When the settings load again, **Enable MCP Server** shows as on, and the server is ready.

On an edition without the **AI** feature, **Enable MCP Server** is not shown.
Refer to [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md).

Next, [create a service account token](Create_Service_Account_Token.md).
