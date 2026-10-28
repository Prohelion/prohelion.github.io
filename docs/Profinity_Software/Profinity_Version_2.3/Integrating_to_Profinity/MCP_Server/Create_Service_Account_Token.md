---
title: Create a service account token
description: "Create a service account with the MCP integration permission and generate the bearer token an AI tool sends with every Profinity MCP call."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Create a service account token

Create a service account and generate the bearer token that an AI tool sends with every Model Context Protocol (MCP) call.
Every MCP call needs a token for an account that has **MCP integration**.
Tag tools also need **View tags**, and alert tools also need **View alerts**.
The **Administrators** role includes these permissions.
A dedicated role with only those permissions is enough for a tool that reads data and does not change the instance.

Use a [service account](../../Administration/Users_and_Access/Service_Accounts.md) so the token does not expire while the tool is open.
Creating the account needs **Users & Groups**, which needs the Server licence.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**.
3. Enter a name, such as `mcp-service`, and switch on **Service Account**.
4. Under **Assigned roles**, select a role that includes **MCP integration**, **View tags**, and **View alerts**, then save the user.
5. Select the user's row, open the **User Actions** tab, and select **Generate Token**.
6. Copy the token into a secrets manager.

The token is shown once in that dialog, so a copy in a secrets manager confirms the step worked.
**Generate Token** replaces any previous token immediately, and every tool that still has the old token stops connecting until you update it.
Refer to [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md).

Next, [choose the MCP server address](Choose_Server_Address.md).
