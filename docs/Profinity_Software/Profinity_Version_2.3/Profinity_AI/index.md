---
title: Profinity AI
description: "How Profinity AI uses the context of your whole Profile, through AI Chat inside Profinity and AI Skills in your own AI tool."
---

# Profinity AI

Profinity AI gives AI the context of a running Profinity system, so it can work across devices rather than one signal at a time. It comes in two parts: **AI Chat**, an assistant built into Profinity, and **AI Skills**, a toolkit for your own AI coding assistant.

!!! info "Licence Required"
    AI Chat and the built-in Model Context Protocol (MCP) server require the **AI** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../Administration/Licensing.md) for what each edition includes.

<figure markdown>
![Profinity AI gathers context from the whole Profile (devices, alerts, documentation and history), correlates signals across devices, matches alerts to documentation, and proposes a likely root cause with supporting evidence](../images/2.3-diagram-ai-diagnostics.png)
<figcaption>Context in, cross-system diagnosis out</figcaption>
</figure>

## What Profinity AI Can See

Profinity AI is connected to your running system and draws on four kinds of context:

| Context | What it covers |
|---------|----------------|
| **Live data** | Every component in the [Profile](../Administration/Profiles.md) and its tags, with current values and data quality |
| **Rules and alerts** | The alert rules you have defined, the alerts that are active, and the alert history |
| **History and trends** | Long-term values from the historian, not just the latest reading |
| **Documentation** | Manuals, procedures, and how-to material from docs.prohelion.com |

Live data, rules, alerts, and history reach the assistant through the [MCP Server](../Integrating_to_Profinity/MCP_Server.md), which is read-only. Profinity AI cannot change tags, alerts, or configuration through it.

## From Context to Diagnosis

With that context in one place, Profinity AI gathers context from the whole Profile, correlates signals across devices, matches alerts to the relevant documentation, compares current readings against history and trends, and proposes a likely root cause and next steps with the evidence it used. A question such as "Why is Cell 12 overheating?" can be is therefore answered from the alert, the neighbouring cells, the cooling system, and the service manual together.

!!! info "Permissions Still Apply"
    Profinity AI sees only what the signed-in user could already see in Profinity. Tags and alerts you do not have permission to view are left out of its answers.

## Choose How to Use It

| | Where it runs | Use it to |
|---|---|---|
| **[AI Chat](./AI_Chat.md)** | Inside Profinity, from the side menu | Ask questions about this instance: system health, alert investigation, and how-to questions |
| **[AI Skills](./AI_Skills.md)** | In your own AI tool (Claude Code, Cursor, Codex, ChatGPT), outside Profinity | Build dashboards, rules, collections, scripts, plugins, derived tags, and example apps from your live schema, and develop with Profinity |

AI Chat answers questions and AI Skills helps you build things, and power users can pair AI Skills with the MCP Server to use their own AI tool instead of AI Chat. Users need the **Profinity AI** permission to open AI Chat, and the built-in **Administrators** role has it by default; see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

## Related Documentation

- [Profinity AI settings](../Administration/System_Configuration/AI_Settings.md): administrator configuration, permissions, and data-handling notes.
- [MCP Server](../Integrating_to_Profinity/MCP_Server.md): the live-data connection behind both parts.
- [Licensing](../Administration/Licensing.md): the editions that include the **AI** feature.
- [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md): the **Profinity AI** and **MCP integration** permissions.
