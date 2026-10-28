---
title: Redirect component
description: "Immediately navigates to another page or address when the dashboard displays the component."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Redirect component

A redirect navigates to another location as soon as the dashboard displays the component.
The component draws nothing, so it is used in a dashboard that exists only to send the user elsewhere.

Use a redirect in a dashboard that forwards the user to another page or to an external address.
Do not use a redirect to provide a link that the user clicks, because the redirect cannot wait for a click.
Use an [Action](../Interactive/Actions.md) with `invoke: Navigate`, or an `a` element in an [HTML](HTML.md) component, for a link.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string | Yes | None | Location to navigate to. A path that starts with a single `/` is opened inside the web interface, and any other address replaces the current page in the browser |

`id` and `class` are accepted but have no effect.

## Example

``` yaml
dashboard:
  items:
    - row:
        items:
          - redirect:
              url: /component?componentId=Battery%20Pack
```
