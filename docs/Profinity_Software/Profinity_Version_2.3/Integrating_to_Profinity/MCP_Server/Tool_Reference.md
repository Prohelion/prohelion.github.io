---
title: MCP tool reference
description: "Find out which read-only tools the Profinity MCP server provides, what each one answers, and the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-10-29
---

# MCP tool reference

The Profinity Model Context Protocol (MCP) server provides ten read-only tools for components, tags, tag history, and alerts.
Your AI tool chooses and calls them when you ask it a question, so you do not call them yourself.
The table shows what each tool answers and the permission it needs, so you can tell which question a missing permission blocks.
Every tool also needs **MCP integration**.

| Tool | What it answers | Permission |
|------|-----------------|------------|
| `get_all_components` | Which components are in the active profile | View tags |
| `search_tags` | Which tags match a name, unit, or component, up to 50 at a time | View tags |
| `get_tag_catalog` | Which tags a component or tag path holds | View tags |
| `get_tag_sample_by_canonical_id` | The current value of one tag | View tags |
| `get_tag_samples` | The current values of up to 50 tags | View tags |
| `get_tag_series` | The values of one tag over a time range, summarised by minimum, maximum, average, or another function | View tags |
| `get_tag_series_batch` | The values of up to 20 tags over the same time range | View tags |
| `get_alert_rules` | Which alert rules are defined, and whether each is enabled | View alerts |
| `get_active_alerts` | Which alerts are active now, and whether each is acknowledged or silenced | View alerts |
| `get_alert_history` | When alerts were raised, cleared, acknowledged, or silenced | View alerts |

None of the tools acknowledge, silence, or otherwise change an alert or a tag.
Make those changes in the Profinity UI or through the REST API.

Ask about one component, or a narrow time range, when you can.
A tool refuses a whole-profile tag list that is too large to return in one answer, and the AI tool then has to ask again with a narrower scope.

A tag or alert that the account cannot view is left out of the answer, without an error.
When a question returns less than you expect, refer to [Fewer results than expected](Connection_Errors.md#fewer-results-than-expected).
To connect a tool, refer to [Prepare Profinity for an MCP client](Prepare_Profinity.md).
