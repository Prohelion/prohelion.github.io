---
title: Profinity AI Settings
description: "Configure the instance-wide Profinity AI assistant with external providers or local models for live data queries."
---

# Profinity AI Settings

Profinity AI is an instance-wide chat assistant, configured once by an administrator and then made available to any permitted user from the side menu. A single configuration applies to the whole instance; Profinity 2.3 does not support per-user API keys or per-user provider selection.

!!! info "Licence Required"
    Profinity AI requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../Licensing.md) for what each edition includes.

Once enabled, the assistant can query live data from this Profinity instance through the built-in Model Context Protocol (MCP) server, search docs.prohelion.com for how-to and reference material, and, if the administrator enables it, search the web. Requests are answered by an external AI provider (Claude, OpenAI, or OpenRouter) or by a local, self-hosted model.

## Enable Profinity AI

Select **ADMIN** in the side menu, then **System Configuration**, find the **Profinity AI** category, and set the fields below.

| Field | Description |
|-------|-------------|
| **Enable Profinity AI** | Turns the feature on for the instance. Enabling it also turns on the MCP server as well, since Profinity AI depends on it. |
| **Provider** | **Claude**, **OpenAI**, **OpenRouter**, or **Local / self-hosted**. |
| **Base URL** | Absolute `http(s)` URL of a local or self-hosted OpenAI-compatible endpoint, for example Ollama. Shown and required only when Provider is **Local**. |
| **Model** | The model identifier to send to the provider. |
| **API Key** | The provider's API key, stored encrypted and masked in the UI. Not shown or required when Provider is **Local**. |
| **Enable web search** | Lets the assistant search the web as part of answering a question. Available for **Claude**, **OpenAI**, and **OpenRouter**; not available for **Local**. |
| **Reasoning** | **Low**, **Medium** (default), or **High**. Higher settings can produce better answers at the cost of a longer response time. |
| **Response timeout (seconds)** | 30–3600, default 300. Local and reasoning-heavy models often need several minutes to respond. |
| **Enable MCP Server** | Shown as its own "MCP Server" field group on this page. Enabling Profinity AI turns this on automatically; it can also be turned on by itself, with Profinity AI left off, for external MCP clients that can send a bearer token. See [MCP Server](../../Integrating_to_Profinity/MCP_Server.md). |

Profinity rejects a save that leaves the configuration in an inconsistent state, according to the following rules:

- The response timeout must fall within 30–3600 seconds.
- A model must be set before Profinity AI can be enabled.
- Every provider except **Local** requires an API key.
- **Local** requires a well-formed absolute `http(s)` base URL in place of an API key.
- The MCP server must stay enabled while Profinity AI is enabled.

Profinity treats a configuration that passes these checks as ready to use. It does not make a live test call to the provider when the configuration is saved, so a valid-looking configuration with, for example, a revoked API key will not be flagged until a user sends a chat message, at which point the chat returns an error, so check the **API Key**, **Model** and **Base URL** when chat fails or times out, and raise **Response timeout (seconds)** for slow models.

## Data Handling and Security

!!! warning "Prompts and Data Leave the Instance Boundary"
    Sending a message through Profinity AI sends the conversation, and any Profinity data the assistant retrieves through MCP to answer it, to the configured provider outside this instance. If web search is enabled, search queries are also sent to the provider's web-search capability, and documentation queries are sent to docs.prohelion.com. Review this data flow against your organisation's security requirements before enabling Profinity AI for a regulated or air-gapped deployment.

The API key is stored encrypted and is never sent to the browser.

Live-data access through MCP is scoped to the permissions of the user asking the question, using a short-lived token minted for that user. Profinity AI cannot see data the asking user could not otherwise see through the API.

## Permissions

A user needs the **Profinity AI** permission to see and use the **Profinity AI** menu item; this permission also turns on the **MCP integration** permission, since the assistant needs it to query live data on the user's behalf. The **Profinity AI** permission is included in the default Administrators role and in the Desktop role, and can be added to or removed from any role like any other permission (see [Roles and Permissions](../Users_and_Access/Roles_and_Permissions.md)).

Changing the Profinity AI configuration itself requires the **System administration** permission. External MCP clients also need the **AI** licensed feature, because the MCP server is part of it.

### REST API

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Ai/Chat` | Streams a chat response for the calling user, using the instance's Profinity AI configuration. |

## Related Documentation

- [MCP Server](../../Integrating_to_Profinity/MCP_Server.md) : the live-data connection Profinity AI uses, and how to connect an external MCP client.
- [AI Chat](../../Profinity_AI/AI_Chat.md) : the operator-facing guide to using the chat window.
- [Roles and Permissions](../Users_and_Access/Roles_and_Permissions.md): assigning the **Profinity AI** permission to roles.
