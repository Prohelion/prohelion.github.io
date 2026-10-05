---
title: Profinity AI
description: "How Profinity AI uses the context of your whole Profile, through AI Chat inside Profinity and AI Skills in your own AI tool."
---

# Profinity AI

Profinity AI gives AI the context of a running Profinity system, so it can work across devices rather than one signal at a time. It comes in two parts: **AI Chat**, an assistant built into Profinity, and **AI Skills**, a toolkit for your own AI coding assistant.

<figure markdown>
![Profinity AI gathers context from the whole Profile — devices, alerts, documentation, and history — correlates signals across devices, matches alerts to documentation, and proposes a likely root cause with supporting evidence](../images/2.3-diagram-ai-diagnostics.png)
<figcaption>Context in, cross-system diagnosis out</figcaption>
</figure>

## What Profinity AI can see

A general-purpose AI assistant knows nothing about your system. Profinity AI is connected to it, and draws on four kinds of context:

| Context | What it covers |
|---------|----------------|
| **Live data** | Every component in the Profile and its tags, with current values and data quality |
| **Rules and alerts** | The alert rules you have defined, the alerts that are active, and the alert history |
| **History and trends** | Long-term values from the historian, not just the latest reading |
| **Documentation** | Manuals, procedures, and how-to material from docs.prohelion.com |

Live data, rules, alerts, and history reach the assistant through the [MCP Server](../Integrating_to_Profinity/MCP_Server.md), which is read-only. Profinity AI cannot change tags, alerts, or configuration through it.

## From context to diagnosis

With that context in one place, Profinity AI can:

1. Gather context from the whole Profile.
2. Correlate signals across devices.
3. Match alerts to the relevant documentation.
4. Compare current readings against history and trends.
5. Propose a likely root cause and next steps, with the evidence it used.

So a question such as "Why is Cell 12 overheating?" can be answered from the alert, the neighbouring cells, the cooling system, and the service manual together.

!!! info "Permissions Still Apply"
    Profinity AI sees only what the signed-in user could already see in Profinity. Tags and alerts you do not have permission to view are left out of its answers.

## Choose how to use it

| | Where it runs | Use it to |
|---|---|---|
| **[AI Chat](./AI_Chat.md)** | Inside Profinity, from the side menu | Ask questions about this instance: system health, alert investigation, and how-to questions |
| **[AI Skills](./AI_Skills.md)** | In your own AI tool (Claude Code, Cursor, Codex, ChatGPT), outside Profinity | Build dashboards, rules, collections, scripts, plugins, derived tags, and example apps from your live schema, and develop with Profinity |

They are separate: AI Chat answers questions, and AI Skills helps you build things. Power users can also pair AI Skills with the MCP Server to use their own AI tool instead of AI Chat.

## Related documentation

- [Profinity AI settings](../Administration/System_Configuration/AI_Settings.md) — administrator configuration, permissions, and data-handling notes.
- [MCP Server](../Integrating_to_Profinity/MCP_Server.md) — the live-data connection behind both parts.
