---
title: Profinity AI settings
description: "Set the provider, model, API key, web search and timeout for the instance-wide Profinity AI assistant, and see what data leaves the instance."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Profinity AI settings

The **AI** tab of [System Configuration](index.md) holds the settings for Profinity AI and for the Model Context Protocol (MCP) server.
Profinity AI is an instance-wide chat assistant, configured once by an administrator and then made available to any permitted user from the side menu.
A single configuration applies to the whole instance.
Profinity 2.3 does not support per-user API keys or per-user provider selection.

Saving changes on any System Configuration tab restarts Profinity.
Refer to [System Configuration](index.md) for what to expect.

!!! info "Licence required"
    Profinity AI requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions.
    Without it the feature is unavailable.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

Once enabled, the assistant can do three things:

- Query live data from this Profinity instance through the built-in Model Context Protocol (MCP) server.
- Search docs.prohelion.com for how-to and reference material.
- Search the web, if the administrator enables it.

An external AI provider (Claude, OpenAI, or OpenRouter) or a local, self-hosted model answers the requests.

## Enable Profinity AI

Select **ADMIN** in the side menu, then **System Configuration**.
Find the **Profinity AI** category and set the fields in the following table. **Enable MCP server** sits in its own **MCP server** group on this page.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| **Enable Profinity AI** | On or off | Off | Turns the feature on for the instance. Enabling it also turns on the MCP server, since Profinity AI depends on it. |
| **Provider** | Choice | Claude | **Claude**, **OpenAI**, **OpenRouter**, or **Local / self-hosted**. |
| **Base URL** | Text | None | Absolute `http(s)` URL of a local or self-hosted OpenAI-compatible endpoint, for example Ollama. Shown and required only when Provider is **Local**. |
| **Model** | Text | None | The model identifier to send to the provider. |
| **API key** | Secret | None | The provider's API key, stored encrypted and masked in the UI. Not shown or required when Provider is **Local**. |
| **Enable web search** | On or off | Off | Lets the assistant search the web as part of answering a question. Available for **Claude**, **OpenAI**, and **OpenRouter**; not available for **Local**. |
| **Reasoning** | Choice | Medium | **Low**, **Medium**, or **High**. Higher settings can produce better answers at the cost of a longer response time. |
| **Response timeout (seconds)** | Time | 300 | 30 to 3600. Local and reasoning-heavy models often need several minutes to respond. |
| **Enable MCP server** | On or off | Off | Shown as its own "MCP server" field group on this page. Enabling Profinity AI turns this on automatically. It can also be turned on by itself, with Profinity AI left off, for external MCP clients that can send a bearer token. Refer to [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md). |

Profinity rejects a save that leaves the configuration in an inconsistent state, according to these rules:

- The response timeout must fall within 30 to 3600 seconds.
- A model must be set before Profinity AI can be enabled.
- Every provider except **Local** requires an API key.
- **Local** requires a well-formed absolute `http(s)` base URL in place of an API key.
- The MCP server must stay enabled while Profinity AI is enabled.

Profinity treats a configuration that passes these checks as ready to use.

| What you see | Cause | What to do |
|---|---|---|
| The chat returns an error after you save a configuration that looks valid | The configuration has, for example, a revoked API key. Profinity does not make a live test call to the provider when you save the configuration, so the fault appears only once a user sends a chat message. | Check the **API key**, **Model**, and **Base URL**. |
| Chat fails or times out | The provider could not be reached or the stream failed, so Profinity shows an error in the chat instead of a reply. | Check the **API key**, **Model**, and **Base URL**. |
| Chat times out | Local and reasoning-heavy models often need several minutes to respond. | Raise **Response timeout (seconds)** for slow models. |


## Data handling and security

!!! warning "Prompts and data can leave the instance boundary"
    Sending a message through Profinity AI sends the conversation, and any Profinity data the assistant retrieves through MCP to answer it, to the configured provider. When Provider is Claude, OpenAI, or OpenRouter, prompts and data leave this instance. For Local / self-hosted, data leaves the instance only if the Base URL is outside your own infrastructure.
    If web search is enabled, search queries are also sent to the provider's web-search capability, and documentation queries are sent to docs.prohelion.com.
    Review this data flow against your organisation's security requirements before enabling Profinity AI for a regulated or air-gapped deployment.

The API key is stored encrypted and is never sent to the browser.

Live-data access through MCP is scoped to the permissions of the user asking the question, using a short-lived token minted for that user.
Profinity AI sees only the data that the asking user can already see in Profinity with their security settings.

[AI Technician](../../Profinity_AI/AI_Technicians/index.md) uses the same provider settings.
They send device data to the provider on a schedule or after an alert, with nobody at the screen, so review the provider before you schedule them.
Each round signs in as the technician's [service account](../Users_and_Access/Service_Accounts.md#run-an-ai-technician) and sees only what that account can see.

## Permissions

A user needs the **Profinity AI** permission to see and use the **Profinity AI** menu item.
This permission also turns on the **MCP integration** permission, since the assistant needs it to query live data on the user's behalf.
The **Profinity AI** permission is included in the default Administrators role.
You can add it to or remove it from any role like any other permission, as described in [Roles and permissions](../Users_and_Access/Roles_and_Permissions.md).

Changing the Profinity AI configuration itself requires the **System administration** permission.
External MCP clients also need the **AI** licensed feature, because the MCP server is part of it.

## Related documentation

- [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md): the live-data connection Profinity AI uses, and the guides for connecting Cursor, Claude Code, Codex, and ChatGPT.
- [AI Chat](../../Profinity_AI/AI_Chat.md): the guide to using the chat window.
- [Endpoint Reference](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md#profinity-ai): the chat route, for integrators.
