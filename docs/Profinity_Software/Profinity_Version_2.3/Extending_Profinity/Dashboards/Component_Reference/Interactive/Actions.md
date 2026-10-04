---
title: Actions Component
description: "Interactive buttons for triggering component actions, system actions, navigation or HTTP requests."
---

# Actions

Interactive buttons. Actions provide clickable buttons that can run an action on a component, run a system action, navigate to another location, or send an HTTP request.

<figure markdown>
![Actions component showing interactive buttons for system controls and navigation](../../images/actions.png)
<figcaption>Actions component showing interactive buttons for system controls and navigation</figcaption>
</figure>

**Best for:** System controls, navigation buttons, data refresh actions, user interactions, command execution

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS classes applied to the button or icon |
| `label` | string | No | None | Caption of the button, also used as the title of the confirmation dialog and as the caption of the progress bar. In `auto` mode the label decides the display, so an action with a label is displayed as a button and an action without a label is displayed as an icon |
| `image` | string | No | None | Carbon icon name, for example `Renew` or `Settings`, shown on `icon` and `button` actions. A legacy icon filename such as `nav_battery_active.svg` resolves to a Carbon icon, and a name that matches no known icon is loaded as an image file from the `/Profile/Images` directory |
| `imageAlt` | string | No | None | Accessible label for the icon |
| `mode` | string | Yes | None | Display mode, one of `icon`, `button` or `auto`. `auto` displays a button when `label` is set and an icon otherwise |
| `invoke` | string | No | `Component` | How a click is carried out, one of `Component`, `System`, `Endpoint` or `Navigate`. See [Invoke Types](#invoke-types) |
| `actionId` | string | Conditional | None | Name of the action to run. Required when `invoke` is `Component` or `System` |
| `target` | string | Conditional | None | Location to navigate to. Required when `invoke` is `Navigate` |
| `endpointAction` | object | Conditional | None | Details of the HTTP request. Required when `invoke` is `Endpoint`. See [Endpoint Action Parameters](#endpoint-action-parameters) |
| `value` | object | No | None | Payload posted with the action request |
| `trackProgress` | boolean | No | `false` | Shows a progress bar and polls the progress of the action while it runs |
| `confirmMessage` | string | No | None | Message of a confirmation dialog that the operator must accept before the action runs |
| `restartingOnSuccess` | boolean | No | `false` | After the action succeeds, shows a wait dialog and polls until the Profinity engine is running again. Use the parameter for actions that restart the engine |
| `hyperlink` | string | No | None | Not used by the web interface. Use `invoke: Navigate` with `target` to navigate |
| `openHyperLinkInNewWindow` | boolean | No | None | Not used by the web interface |
| `enabled` | boolean | No | `true` | Whether the button can be clicked. The state can be bound with the `enabled` target |
| `visible` | boolean | No | `true` | Not used by the web interface. Use a binding on the component that contains the action to control visibility |
| `bind` | array | No | None | Data binding. The `enabled`, `tooltip` and `classes` targets are handled |

## Invoke Types

| Invoke | Behaviour |
|--------|-----------|
| `Component` | Runs the action named by `actionId` on the component that owns the dashboard, and posts `value` with the request. This is the default |
| `System` | Runs the system-level action named by `actionId` on the Profinity engine. The available system actions are `UPDATE PROFINITY`, `INSTALL PROFINITY` and `RESTART PROFINITY` |
| `Navigate` | Navigates the web interface to `target`, without a request to the server |
| `Endpoint` | Describes an HTTP request in `endpointAction`. The Actions API of the engine rejects `Endpoint` requests, so an `Endpoint` invocation on an action button fails. Use `Endpoint` on a region, icon or button of an [Image](Image.md) or [Model](Model.md) component, where the web interface sends the request itself |

## Endpoint Action Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `method` | string | Yes | None | HTTP method of the request |
| `url` | string | Yes | None | Relative or absolute address that the request is sent to |
| `label` | string | No | None | Caption of the button for the request |
| `description` | string | No | None | Supporting text beside the button |
| `image` | string | No | None | Carbon icon name shown on the button |
| `imageAlt` | string | No | None | Accessible label for the icon |
| `confirmMessage` | string | No | None | Message of a confirmation dialog shown before the request is sent |
| `successKinds` | array of string | No | None | What the interface does after the request succeeds, using the values `Toast`, `ReloadSettings`, `ShowServiceAccountTokenDialog` and `RefreshOnClose` |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              label: "Refresh Data"
              mode: "button"
              invoke: Component
              actionId: "Refresh"
              class: "btn-primary"
              image: "Renew"
              imageAlt: "Refresh"
```

**Icon-Only Action Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              mode: "icon"
              invoke: Component
              actionId: "Settings"
              image: "Settings"
              imageAlt: "Settings"
```

**Confirmation and Restart Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              label: "Restart Profinity"
              mode: "button"
              invoke: System
              actionId: "RESTART PROFINITY"
              confirmMessage: "Restart Profinity now?"
              restartingOnSuccess: true
```

**Long-Running Action Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              label: "Update Firmware"
              mode: "button"
              invoke: Component
              actionId: "Update Firmware"
              trackProgress: true
              confirmMessage: "Update the firmware now?"
```

**Navigation Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - action:
              label: "View Battery Pack"
              mode: "button"
              invoke: Navigate
              target: "/component?componentId=Battery%20Pack"
```
