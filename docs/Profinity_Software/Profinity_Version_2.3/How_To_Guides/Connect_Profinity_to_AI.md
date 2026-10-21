---
title: How to connect Profinity to AI tools like Claude or ChatGPT
description: "Connect an AI tool or MCP client to Profinity by enabling the MCP server, creating a service account token, and adding the server to the tool."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to connect Profinity to AI tools like Claude or ChatGPT

Connect Profinity to AI tools and large language models (LLMs) using the Model Context Protocol (MCP) server integration.
Three stages make the connection: enabling the MCP server, creating a service account token, and adding the server to the AI tool.

!!! tip "Profinity also has built-in AI"
    Profinity includes its own AI assistant, [AI Chat](../Profinity_AI/AI_Chat.md), which answers questions about your live components, tags, and alerts without any external AI tool.
    To use it, an administrator enters an API key (token) from Claude, OpenAI, or OpenRouter, or the address of a local model, in [Profinity AI settings](../Administration/System_Configuration/AI_Settings.md).
    Connect an external AI tool when you want to use Profinity data from that tool instead.

## Prerequisites

- Profinity 2.3 installed and running
- A licence that includes two licensed features:
    - **AI**, which the MCP server needs.
    - **Profinity Server**, which **Users & Groups** needs for the service account.
- The **Server** or **Enterprise** edition, which includes both features. On other editions the **Enable MCP Server** setting is unavailable. [Licensing](../Licensing.md) lists the features of each edition.
- Administrator access to [Profinity AI settings](../Administration/System_Configuration/AI_Settings.md) and to user management
- An AI tool or LLM client that supports MCP over Streamable HTTP with a custom `Authorization` header. The Profinity [MCP Server](../Integrating_to_Profinity/MCP_Server/index.md) authenticates every request with a JSON Web Token (JWT) bearer token.
- Familiarity with how your AI tool adds an MCP server

## Enable the MCP server

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Find the **Profinity AI** category, and its **MCP Server** field group.
3. Enable **Enable MCP Server**.
4. Select **Save**.

Enabling or disabling the MCP server takes effect only after Profinity restarts.
Profinity shows a "Restarting, please wait..." message, and it refreshes the settings when the engine is running again.

The MCP server is then available at `http://localhost:18080/api/v2/Ai/Mcp`, which uses the default Profinity web server port.
It uses Streamable HTTP transport, not Server-Sent Events, so there is no `/sse` path.

## Create a service account and get a token

Every call to the MCP server requires a JWT bearer token for a user with the **MCP integration** permission.
Each tool also checks its own permission before returning data: **View tags** for the tag tools and **View alerts** for the alert tools.
A tag or alert the user cannot view is omitted from the response.

1. Select **ADMIN** in the side menu, then **Users & Groups**, and select **+ Add user**.
2. Enter a name (for example "mcp-service"), and enable **Service account**.
3. Assign a role that includes **MCP integration**, **View tags**, and **View alerts**, and save the user.
4. Select the user's row, open the **User Actions** tab, and select **Generate Token**.
5. Copy the token and store it in a secrets manager.
   A service account token does not expire.
   It stays valid until an administrator generates a new one or disables the account (refer to [Service accounts](../Administration/Users_and_Access/Service_Accounts.md)).

!!! note "Get a token from the API"
    A script can instead authenticate with the service account username and password through the Profinity API, which puts the password on the command line:

    ```bash
    curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
      -H "Content-Type: application/json" \
      -d '{"username":"mcp-service","password":"your-password"}'
    ```

## Configure your AI tool

A Profinity MCP client needs three things:

- The Streamable HTTP endpoint `http://localhost:18080/api/v2/Ai/Mcp`.
- The HTTP transport.
- An `Authorization: Bearer <token>` header sent on every request.

A tool on another machine replaces `localhost` with the address of the Profinity server.
The Profinity web server port must be reachable from that machine.
Each AI tool enters these values in its own way, and the JSON example in this section shows the common form.
Examples that use Ollama are on the [Prohelion GitHub page](https://www.github.com/prohelion).

Some tools, such as Claude Code and Cursor, read an `mcpServers` JSON file with `type`, `url`, and `headers` fields.
Add this entry to the MCP server configuration of the AI tool, with the name `profinity`:

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

Replace `YOUR_JWT_TOKEN_HERE` with the token from the previous section and restart the AI tool.

Claude Code can add the same server from its command line:

```bash
claude mcp add --transport http profinity http://localhost:18080/api/v2/Ai/Mcp --header "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

A client that cannot send a custom `Authorization` header cannot connect to the Profinity MCP server, because the server rejects an unauthenticated request.
This includes a connector that supports only OAuth sign-in.

## Verify the connection

In the AI tool, ask "What components are in my active profile?".
A list of component names confirms the connection.
Tag values and alerts are available in the same way.

## What the AI tool can do

Once connected, the AI tool can use ten read-only MCP tools to:

- Discover components and search the tag tree.
- Read current tag values and tag history.
- Review active alerts and alert history.

Refer to [MCP Server](../Integrating_to_Profinity/MCP_Server/index.md) for every tool and its parameters.
The MCP server has no tool that changes Profinity data.
Make changes such as generating dashboards or scripts in your AI tool, and apply them separately (refer to [AI Skills](../Profinity_AI/AI_Skills.md)).

Example questions to ask once the connection works:

- "What components are in my active profile?"
- "Show me the current battery voltage from the BMU"
- "Which alerts have been raised in the last hour?"
- "Plot the motor controller temperature over the last 24 hours"

## Build Profinity content with AI Skills

The MCP server lets an AI tool read data from Profinity.
[AI Skills](../Profinity_AI/AI_Skills.md) goes further.
It lets an AI coding assistant such as Claude Code, Cursor, Codex, or ChatGPT build Profinity dashboards, rules, collections, scripts, plugins, derived tags, and example apps.
AI Skills reads live data through the MCP server and the live schema through the Profinity REST API.
It asks for approval before it saves any change to your instance.
To add the skills to your AI tool, refer to [Install AI Skills](../Profinity_AI/Install_AI_Skills.md).

## Troubleshooting

### The connection fails

If the AI tool reports that the connection failed, one of these causes applies:

- The MCP server is disabled.
- Profinity has not finished restarting.
- The web server port is not reachable from the AI tool.
- The endpoint path is wrong.

Confirm that **Enable MCP Server** is on, that Profinity has restarted, and that the URL ends in `/api/v2/Ai/Mcp`.
Check the Profinity [logs](../Administration/Logs_Config.md) for MCP connection issues.
If the web server runs on another machine, make sure the firewall allows its port.

### Enable MCP Server is unavailable

The **Enable MCP Server** setting needs the **AI** licensed feature, so an edition without it cannot use the setting.
[Licensing](../Licensing.md) lists the features of each edition.

### No data is returned

If the AI tool connects but returns nothing, there may be no active profile or components.
The token's user may also lack the **View tags** or **View alerts** permission.
Make sure a profile with components is active, and that the user's role includes the permission for the data requested.

### Authentication errors

An authentication error means the token is incomplete, or its user lacks the **MCP integration** permission.
Check that you copied the whole token, and that the user's role includes **MCP integration**.

## Related pages

- [AI Chat](../Profinity_AI/AI_Chat.md): the built-in chat assistant, which uses the same MCP server
- [AI Skills](../Profinity_AI/AI_Skills.md): skills that let an AI coding assistant build Profinity dashboards, rules, and scripts
- [Install AI Skills](../Profinity_AI/Install_AI_Skills.md): add the skills to your AI tool
- [Profinity Scripting](../Developing_with_Profinity/Scripting/index.md): Profinity scripting
- [Profinity REST APIs](../Integrating_to_Profinity/APIs/index.md): REST API documentation
