---
title: How to Connect Profinity to AI
description: "Connect Profinity to AI tools and MCP clients using the Profinity Model Context Protocol (MCP) server over Streamable HTTP with a bearer token."
---

# How to Connect Profinity to AI

Connect Profinity to AI tools and large language models (LLMs) using the Model Context Protocol (MCP) server integration. Three steps make the connection: enabling the MCP server, creating a service account token, and adding the server to the AI tool.

## Prerequisites

- Profinity 2.3 installed and running
- A licence that includes the **AI** feature, which the MCP server needs, and the **Profinity Server** feature, which **Users & Groups** needs for the service account in Step 2. Both are included in the **Server** and **Enterprise** editions. On other editions the **Enable MCP Server** setting is unavailable. See [Licensing](../Administration/Licensing.md)
- Administrator access to the Profinity [AI Settings](../Administration/System_Configuration/AI_Settings.md) and to user management
- An AI tool or LLM client that supports MCP over Streamable HTTP with a custom `Authorization` header, because the Profinity [MCP server](../Integrating_to_Profinity/MCP_Server.md) authenticates every request with a JSON Web Token (JWT) bearer token
- Familiarity with how your AI tool adds an MCP server

## Steps

### Step 1: Enable the MCP Server in Profinity

1. Select **ADMIN** in the side menu, then **System Configuration**
2. Find the **Profinity AI** category, and its **MCP Server** field group
3. Enable **Enable MCP Server**
4. Click **Save**

Enabling or disabling the MCP server takes effect only after Profinity restarts, and Profinity shows a "Restarting, please wait..." message and refreshes the settings once the engine is running again.

The MCP server is then available at `http://localhost:18080/api/v2/Ai/Mcp` (using the default Profinity web server port). It uses Streamable HTTP transport, not Server-Sent Events (SSE), so there is no `/sse` path.

### Step 2: Create a Service Account and Get a Token

Every call to the MCP server requires a JWT bearer token for a user with the **MCP integration** permission. Each tool also checks its own permission before returning data: **View tags** for the tag tools and **View alerts** for the alert tools. A tag or alert the user cannot view is omitted from the response.

1. Select **ADMIN** in the side menu, then **Users & Groups**, and click **+ Add user**
2. Enter a name (for example "mcp-service"), and enable **Service account**
3. Assign a role that includes **MCP integration**, **View tags** and **View alerts**, and save the user
4. Click the user's row, open the **User Actions** tab and click **Generate Token**
5. Copy the token and store it in a secrets manager, because a service account token does not expire and stays valid until an administrator generates a new one or disables the account (see [Service Accounts](../Administration/Users_and_Access/Service_Accounts.md))

!!! note "Getting a Token From the API"
    A script can instead authenticate with the service account username and password through the Profinity API, which puts the password on the command line:

    ```bash
    curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
      -H "Content-Type: application/json" \
      -d '{"username":"mcp-service","password":"your-password"}'
    ```

### Step 3: Configure Your AI Tool

A Profinity MCP client needs three things: the Streamable HTTP endpoint `http://localhost:18080/api/v2/Ai/Mcp`, the HTTP transport, and an `Authorization: Bearer <token>` header sent on every request. A tool on another machine replaces `localhost` with the address of the Profinity server, and the Profinity web server port must be reachable from that machine. Each AI tool enters these values in its own way, and the following example shows the common JSON form.

Examples that use Ollama are on the [Prohelion GitHub page](https://www.github.com/prohelion).

A client that reads an `mcpServers` JSON file with `type`, `url` and `headers` fields, the form used by tools such as Claude Code and Cursor, takes this entry, which is added to the AI tool's MCP server configuration with the name `profinity`:

```json
{
  "mcpServers": {
    "profinity": {
      "type": "http",
      "url": "http://localhost:18080/api/v2/Ai/Mcp",
      "headers": {
        "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
      }
    }
  }
}
```

Replace `YOUR_JWT_TOKEN_HERE` with the token from Step 2 and restart the AI tool.

Claude Code can add the same server from its command line:

```bash
claude mcp add --transport http profinity http://localhost:18080/api/v2/Ai/Mcp --header "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

A client that cannot send a custom `Authorization` header, including a connector that supports only OAuth sign-in, cannot connect to the Profinity MCP server, because the server rejects an unauthenticated request.

## Verify the Connection

In the AI tool, ask "What components are in my active profile?", and a list of component names confirms the connection. Tag values and alerts are available in the same way.

## What the AI Tool Can Do

Once connected, the AI tool can use the ten read-only MCP tools to discover components and search the tag tree, read current tag values and tag history, and review active alerts and alert history. The MCP server does not expose any tool that changes Profinity data, so changes such as generating dashboards or scripts are made in your AI tool and applied separately (see [AI Skills](../Profinity_AI/AI_Skills.md)).

Example questions to ask once the connection works:

- "What components are in my active profile?"
- "Show me the current battery voltage from the BMU"
- "Which alerts have been raised in the last hour?"
- "Plot the motor controller temperature over the last 24 hours"

## Troubleshooting

### The Connection Fails

If the AI tool reports that the connection failed, the MCP server is disabled, Profinity has not finished restarting, the web server port is not reachable from the AI tool, or the endpoint path is wrong. Confirm that **Enable MCP Server** is on, that Profinity has restarted, and that the URL ends in `/api/v2/Ai/Mcp`, and check the Profinity [logs](../Getting_Started/Profinity_Log.md) for MCP connection issues. If the web server runs on another machine, make sure its port is allowed through the firewall.

### Enable MCP Server Is Unavailable

The **Enable MCP Server** setting needs the **AI** licensed feature, so on an edition without it the setting cannot be used. See [Licensing](../Administration/Licensing.md).

### No Data Is Returned

If the AI tool connects but returns nothing, there may be no active components or profile, or the token's user lacks the **View tags** or **View alerts** permission. Make sure a profile with components is active and that the user's role includes the permission for the data requested.

### Authentication Errors

An authentication error means the token is incomplete, or its user lacks the **MCP integration** permission. Check that the token was copied completely and that the user's role includes **MCP integration**.

## Related Documentation

- [MCP Server](../Integrating_to_Profinity/MCP_Server.md) - the full MCP server reference, including every tool and its parameters
- [AI Chat](../Profinity_AI/AI_Chat.md) - the built-in chat assistant, which uses the same MCP server
- [Scripting](../Developing_with_Profinity/Scripting/index.md) - Profinity scripting
- [APIs](../Integrating_to_Profinity/APIs/index.md) - REST API documentation
