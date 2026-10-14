---
title: Log component
description: "Scrolling log of engine messages, optionally filtered to the output of a single script."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Log component

A log is a scrolling list of engine log messages that shows each message with its level and time, updates as new messages arrive, and can be limited to the messages of one script.

Use a log to show the output of a script on a dashboard and to monitor script activity beside the components that the script controls.
Use the [Logs](../../../../Administration/Logs_Config.md) page of the web interface for the complete engine log.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `script` | string | No | None | Name of a script. When set, the log shows only the messages of that script |
| `showClear` | boolean | No | `false` | When `true` and `script` is set, shows a button that clears the log of the script |

## Example

``` yaml
dashboard:
  items:
    - row:
        items:
          - log:
              script: Charger Control
              showClear: true
```
