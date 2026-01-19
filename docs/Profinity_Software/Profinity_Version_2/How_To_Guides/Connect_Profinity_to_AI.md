---
title: How to Connect Profinity to AI
---

# How to Connect Profinity to AI

Connect Profinity to AI tools and LLMs using the Model Context Protocol (MCP) server integration.

## Prerequisites

- Profinity V2 installed and running
- Admin access to system configuration
- An AI tool or LLM that supports MCP (e.g., Claude Desktop, Cursor IDE)
- Understanding of MCP protocol

## Steps

### Step 1: Enable MCP Server in Profinity

1. Navigate to **ADMIN** → **System Configuration**
2. Find **MCP Server** section in Application Configuration
3. Enable **MCP Server** option
4. Click **Save**

**Note:** The MCP server will be available at `http://localhost:18080/sse` (using the default Profinity web server port).

### Step 2: Create Service Account and Get Token

The MCP server requires authentication using JWT tokens. Users must have the `SystemRead` security role to access MCP endpoints.

1. Create a user account with the `SystemRead` role:
   - Navigate to **ADMIN** → **User Management**
   - Create a new user (e.g., "mcp-service")
   - Set **Service Account** to `true`
   - Assign the `SystemRead` security role
   - Save the user

2. Generate a JWT token for the service account:
   - Authenticate via the Profinity API: `POST /api/v2/Users/Authenticate`
   - Use the service account username and password
   - Save the token from the response (service account tokens never expire)

**Example API call:**
```bash
curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
  -H "Content-Type: application/json" \
  -d '{"username":"mcp-service","password":"your-password"}'
```

### Step 3: Configure Your AI Tool

The following should be taken as examples only, check with your tools documentation on how to configure MCP over SSE to your tool.

Examples on using SSE with OLLAMA are also available on the Prohelion GitHub page `https://www.github.com/prohelion`.

**Example For Claude Desktop:**

1. Open Claude Desktop settings
2. Navigate to MCP server configuration
3. Add MCP server with authentication:
   ```json
   {
     "mcpServers": {
       "profinity": {
         "command": "npx",
         "args": [
           "@modelcontextprotocol/server-fetch",
           "http://localhost:18080/sse"
         ],
         "env": {
           "AUTHORIZATION": "Bearer YOUR_JWT_TOKEN_HERE"
         }
       }
     }
   }
   ```
   **Note:** Replace `YOUR_JWT_TOKEN_HERE` with the JWT token from Step 2.
4. Restart Claude Desktop

### Step 4: Verify Connection

1. In your AI tool, try querying Profinity data
2. Check MCP server responds correctly
3. Verify you can access component data, profiles, and dashboards

### Step 5: Use AI Features

Once connected, you can:

- Query component data
- Analyse dashboards
- Generate scripts
- Troubleshoot issues

## Example Queries

- "What components are in my active profile?"
- "Show me the current battery voltage from the BMU"
- "Create a dashboard for monitoring motor controller temperatures"
- "Help me write a script to log data every 5 seconds"

## Tips

- **Start Simple**: Begin with basic queries to verify the connection
- **Check Logs**: Monitor Profinity logs for MCP connection issues
- **Firewall Settings**: Ensure the MCP port is accessible if connecting remotely
- **Authentication**: Use strong credentials for production deployments

## Troubleshooting

- **Connection Failed**: Verify MCP server is enabled and port is correct
- **No Data Available**: Ensure you have active components and profiles
- **Authentication Errors**: Check credentials match in both systems

## Related Documentation

- [MCP Server](../Extending_Profinity/MCP_Server.md) - Complete MCP server documentation
- [Scripting](../Extending_Profinity/Scripting/index.md) - Learn about Profinity scripting
- [APIs](../Extending_Profinity/APIs/index.md) - REST API documentation
