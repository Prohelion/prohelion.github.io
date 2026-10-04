---
title: Charge Component
description: "Charge controller panel for starting and stopping a charge session on a charger and battery."
---

# Charge

A charge controller. The component lets the operator select a battery, set the charge current and the target state of charge, and start and stop a charge session on a charger component. The component shows the live charging state and the current state of charge.

**Best for:** Charging dashboards for a battery that a charger component controls

**When not to use:** For monitoring only (use [Readouts](../Data/Readouts.md) and [Lamps](../Data/Lamps.md))

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `chargerId` | string | Yes | None | Identifier of the charger component, used for the set-up and start calls of the charge API |
| `defaultBatteryId` | string | No | None | Battery that is selected when the component loads |
| `availableBatteryIds` | array of string | Yes | None | Batteries that the operator can choose between. A charge cannot start when the list is empty |
| `maxCurrent` | number | Yes | None | Maximum charge current in amps that the current control allows |
| `systemCharging` | boolean | Yes | None | Initial charging state, shown until the live status from the charge API replaces it |
| `chargerActive` | boolean | Yes | None | Not used by the web interface, although the schema requires the parameter |
| `activeCurrent` | number | Yes | None | Starting charge current in amps |
| `chargeToPercentage` | number | Yes | None | Target state of charge in percent for the charge session |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - charge:
              chargerId: "Charger"
              defaultBatteryId: "Prohelion BMU"
              availableBatteryIds:
                - "Prohelion BMU"
              maxCurrent: 20
              systemCharging: false
              chargerActive: false
              activeCurrent: 10
              chargeToPercentage: 90
```
