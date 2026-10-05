---
title: How to Connect Profinity to AI
description: "Connect Profinity to AI tools and MCP clients using the Profinity Model Context Protocol (MCP) server over Streamable HTTP with a bearer token."
---

# How to Connect Profinity to AI

Connect Profinity to AI tools and large language models (LLMs) using the Model Context Protocol (MCP) server integration.

## Prerequisites

- Profinity V2 installed and running
- Administrator access to the Profinity [AI Settings](../Administration/System_Configuration/AI_Settings.md) and to user management
- An AI tool or LLM client that supports MCP over Streamable HTTP with a custom `Authorization` header, because the Profinity [MCP server](../Integrating_to_Profinity/MCP_Server.md) authenticates every request with a JWT bearer token
- Familiarity with how your AI tool adds an MCP server

## Steps

### Step 1: Enable the MCP Server in Profinity

1. Select **ADMIN** in the side menu, then **System Configuration**
2. Find the **Profinity AI** category, and its **MCP Server** field group
3. Enable **Enable MCP Server**
4. Click **Save**

Enabling or disabling the MCP server takes effect only after Profinity restarts, and Profinity shows a "Restarting, please wait..." message and refreshes the settings once the engine is running again.

The MCP server is then available at `http://localhost:18080/api/v2/Ai/Mcp` (using the default Profinity web server port). It uses Streamable HTTP transport, not SSE, so there is no `/sse` path.

### Step 2: Create a Service Account and Get a Token

Every call to the MCP server requires a JWT bearer token for a user with the `McpView` permission. Each tool also checks its own permission before returning data: `TagView` for the tag tools and `AlertsView` for the alert tools. A tag or alert the user cannot view is omitted from the response.

1. Create a service account with the required permissions:
   - Select **ADMIN** in the side menu, then **Users & Groups**, and click **+ Add user**
   - Enter a name (for example "mcp-service")
   - Enable **Service account**
   - Assign a role that includes `McpView`, `TagView` and `AlertsView`
   - Save the user
2. Click the user's row, open the **User Actions** tab and click **Generate Token**
3. Copy the token and store it in a secrets manager; service account tokens do not expire

Alternatively, authenticate with the service account username and password through the Profinity API:

```bash
curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
  -H "Content-Type: application/json" \
  -d '{"username":"mcp-service","password":"your-password"}'
```

See [Service Accounts](../Administration/Users_and_Access/Service_Accounts.md) for the full token steps.

### Step 3: Configure Your AI Tool

A Profinity MCP client needs three things: the Streamable HTTP endpoint `http://localhost:18080/api/v2/Ai/Mcp`, the HTTP transport, and an `Authorization: Bearer <token>` header sent on every request. How those three values are entered differs between AI tools, so check your tool's documentation for how to add a remote MCP server over Streamable HTTP with a custom header.

Examples of using MCP with OLLAMA are also available on the Prohelion GitHub page `https://www.github.com/prohelion`.

**Example configuration for a client that reads an `mcpServers` JSON file with `type`, `url` and `headers` fields (the form used by tools such as Claude Code and Cursor):**

1. Open the MCP server configuration of your AI tool
2. Add an MCP server named `profinity` with the endpoint and an `Authorization` header:
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
   Replace `YOUR_JWT_TOKEN_HERE` with the token from Step 2.
3. Restart the AI tool

Claude Code can add the same server from its command line:

```bash
claude mcp add --transport http profinity http://localhost:18080/api/v2/Ai/Mcp --header "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

A client that cannot send a custom `Authorization` header, including a connector that supports only OAuth sign-in, cannot connect to the Profinity MCP server, because the server rejects an unauthenticated request.

### Step 4: Verify Connection

1. In your AI tool, try querying Profinity data
2. Check the MCP server responds correctly
3. Verify you can access component names, tags, tag values and alerts

### Step 5: Use AI Features

Once connected, the AI tool can use the ten read-only MCP tools to:

- Discover components and search the tag tree
- Read current tag values and tag history
- Review active alerts and alert history

The MCP server does not expose any tool that changes Profinity data, so changes such as generating dashboards or scripts are made in your AI tool and applied separately (see [AI Skills](../Profinity_AI/AI_Skills.md)).

## Example Queries

- "What components are in my active profile?"
- "Show me the current battery voltage from the BMU"
- "Which alerts have been raised in the last hour?"
- "Plot the motor controller temperature over the last 24 hours"

## Tips

- **Start Simple**: Begin with basic queries to verify the connection
- **Check Logs**: Monitor Profinity logs for MCP connection issues
- **Firewall Settings**: Ensure the Profinity web server port is accessible if connecting remotely
- **Authentication**: Use a service account with only the permissions required, and keep its token in a secrets manager

## Troubleshooting

- **Connection Failed**: Verify the MCP server is enabled, Profinity has restarted, and the endpoint is `/api/v2/Ai/Mcp`
- **No Data Available**: Ensure there are active components and profiles, and that the token's user has `TagView` or `AlertsView`
- **Authentication Errors**: Check the token is complete and the user has `McpView`

## Related Documentation

- [MCP Server](../Integrating_to_Profinity/MCP_Server.md) - the full MCP server reference, including every tool and its parameters
- [AI Chat](../Profinity_AI/AI_Chat.md) - the built-in chat assistant, which uses the same MCP server
- [Scripting](../Developing_with_Profinity/Scripting/index.md) - Profinity scripting
- [APIs](../Integrating_to_Profinity/APIs/index.md) - REST API documentation
