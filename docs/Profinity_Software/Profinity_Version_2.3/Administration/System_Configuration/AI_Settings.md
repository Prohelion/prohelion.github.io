---
title: Profinity AI Settings
description: "Configure the instance-wide Profinity AI assistant with external providers or local models for live data queries."
---

# Profinity AI Settings

Profinity AI is an instance-wide chat assistant, configured once by an administrator and then made available to any permitted user from the side menu. A single configuration applies to the whole instance; Profinity 2.3 does not support per-user API keys or per-user provider selection.

!!! info "Licence required"
    Profinity AI requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../Licensing.md) for what each edition includes.

Once enabled, the assistant can query live data from this Profinity instance through the built-in MCP server, search docs.prohelion.com for how-to and reference material, and, if the administrator enables it, search the web. Requests are answered by an external AI provider (Claude, OpenAI, or OpenRouter) or by a local, self-hosted model.

## Enable Profinity AI

Select **ADMIN** in the side menu, then **System Configuration**, find the **Profinity AI** category, and set the fields below.

| UI field | Config field | Description |
|----------|--------------|--------------|
| Enable Profinity AI | `Enabled` | Turns the feature on for the instance. Enabling it also turns on the MCP server (`Mcp.Enabled`), since Profinity AI depends on it. |
| Provider | `Provider` | **Claude**, **OpenAI**, **OpenRouter**, or **Local / self-hosted**. |
| Base URL | `BaseUrl` | Absolute `http(s)` URL of a local or self-hosted OpenAI-compatible endpoint, for example Ollama. Shown and required only when Provider is **Local**. |
| Model | `Model` | The model identifier to send to the provider. |
| API Key | `ApiKey` | The provider's API key, stored encrypted and masked in the UI. Not shown or required when Provider is **Local**. |
| Enable web search | `EnableWebSearch` | Lets the assistant search the web as part of answering a question. Available for **Claude**, **OpenAI**, and **OpenRouter**; not available for **Local**. |
| Reasoning | `ReasoningMode` | **Low**, **Medium** (default), or **High**. Higher settings can produce better answers at the cost of a longer response time. |
| Response timeout (seconds) | `NetworkTimeoutSeconds` | 30–3600, default 300. Local and reasoning-heavy models often need several minutes to respond. |
| Enable MCP Server | `Mcp.Enabled` | Shown as its own "MCP Server" field group on this page. Enabling Profinity AI turns this on automatically; it can also be turned on by itself, with Profinity AI left off, for external MCP clients that can send a bearer token. See [MCP Server](../../Integrating_to_Profinity/MCP_Server.md). |

Profinity rejects a save that leaves the configuration in an inconsistent state, according to the following rules:

- The response timeout must fall within 30–3600 seconds.
- A model must be set before Profinity AI can be enabled.
- Every provider except **Local** requires an API key.
- **Local** requires a well-formed absolute `http(s)` base URL in place of an API key.
- The MCP server must stay enabled while Profinity AI is enabled.

Profinity treats a configuration that passes these checks as ready to use. It does not make a live test call to the provider when the configuration is saved, so a valid-looking configuration with, for example, a revoked API key will not be flagged until a user actually sends a chat message.

## Data handling and security

!!! warning "Prompts and Data Leave the Instance Boundary"
    Sending a message through Profinity AI sends the conversation, and any Profinity data the assistant retrieves through MCP to answer it, to the configured provider outside this instance. If web search is enabled, search queries are also sent to the provider's web-search capability, and documentation queries are sent to docs.prohelion.com. Review this data flow against your organisation's security requirements before enabling Profinity AI for a regulated or air-gapped deployment.

The API key is decrypted only inside the Profinity Engine process, for the duration of a single request to the provider. It is never sent to the browser, at any point.

Live-data access through MCP is scoped to the permissions of the user asking the question, using a short-lived token minted for that user. Profinity AI cannot see data the asking user could not otherwise see through the API.

## Permissions

A user needs the **AI Assistant** permission to see and use the **Profinity AI** menu item; this permission also grants the **MCP View** permission automatically, since the assistant needs it to query live data on the user's behalf. The **AI Assistant** permission is included in the default Administrators role and in the Desktop role, and can be added to or removed from any role like any other permission (see [Roles and permissions](../Users_and_Access/Roles_and_Permissions.md)).

Changing the Profinity AI configuration itself uses the same instance-settings permission as other admin configuration areas.

### REST API

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Ai/Chat` | Streams a chat response for the calling user, using the instance's Profinity AI configuration. |
| GET/POST | `/api/v2/Ai/Mcp` | The MCP server endpoint Profinity AI itself calls to retrieve live data scoped to the calling user. |

## Related documentation

- [MCP Server](../../Integrating_to_Profinity/MCP_Server.md) — the live-data connection Profinity AI uses, and how to connect an external MCP client.
- [AI Chat](../../Profinity_AI/AI_Chat.md) — the operator-facing guide to using the chat window.
- [Roles and permissions](../Users_and_Access/Roles_and_Permissions.md) — assigning the AI Assistant permission to roles.
