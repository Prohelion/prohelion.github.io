---
title: Charge Component
description: "Charger and power supply controller that selects a battery, sets the charge current and target charge, and starts and stops charging."
---

# Charge

A charge component is a controller for a charger or power supply that lets the operator choose a battery, set the charge current and the target charge level, and start and stop a charge session. The component is headed **Charger / Power Supply Controller**, and it displays a status message that explains why a charge can or cannot start.

## When to Use

Use a charge component on a dashboard from which an operator charges a battery pack through a charger that Profinity controls. The [Chargers and Power Supplies](../../../../Components/Chargers_and_Power/index.md) page describes the supported chargers, their settings and the charging screen.

## Parameters

The `id` and `class` parameters are not used by the web interface, and the component has no `bind` parameter.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `chargerId` | string | Yes | None | Identifier of the charger component in the profile that the controller sets up and starts |
| `defaultBatteryId` | string | No | None | Battery that is selected when the component loads. When it is not set, Profinity selects the first battery it can find. If the profile has no battery, the Start button is disabled and the component shows "No Battery"; if batteries exist but none is selected when Start is pressed, no charge starts and the component shows "No Battery Selected" |
| `availableBatteryIds` | array of string | Yes | None | Batteries that the operator can step through with the battery selector. When the list is empty, the component shows the **No Battery** message and a charge cannot start |
| `maxCurrent` | number | Yes | None | Maximum charge current in amps that the current control allows |
| `systemCharging` | boolean | Yes | None | Whether the component starts in the charging state. The component reads the charger status once a second after it loads, so the status from the charger replaces this value |
| `chargerActive` | boolean | Yes | None | Required and ignored: the web interface does not use the value, so set either `true` or `false` |
| `activeCurrent` | number | Yes | None | Charge current in amps that the current control starts at |
| `chargeToPercentage` | number | Yes | None | Target state of charge in percent that the charge session runs to. The operator changes the target in steps of 5, from `0` to `100` |

## Example

``` yaml
dashboard:
  items:
    - row:
        items:
          - charge:
              chargerId: Charger
              defaultBatteryId: Prohelion BMU
              availableBatteryIds:
                - Prohelion BMU
              maxCurrent: 10
              systemCharging: false
              chargerActive: false
              activeCurrent: 5
              chargeToPercentage: 80
```

## Notes

### Controls

The component shows four controls. The battery selector steps through `availableBatteryIds` with the left and right arrows, and the arrows are disabled while a charge runs. The current control raises and lowers the charge current in steps of 0.5 A between 0 and `maxCurrent`, and the **Charge To** control raises and lowers the target in steps of 5 percent. The **START** button becomes the **STOP** button while a charge runs, and the **STOP** button is always available during a charge.

The **START** button is disabled until the charger is available, a battery is in the list, the battery can be controlled by Profinity, the charger reports that it can start, and the **Charge To** target is not below the current state of charge of the battery. A change to the current while a charge runs is sent to the charger straight away.

### Status Messages

The status message above the controls explains the state of the charger and the battery.

| Message | Meaning |
|---------|---------|
| **No Battery** | The `availableBatteryIds` list is empty, so no battery can be found in the profile |
| **Battery Control Limited** | Profinity cannot control the battery by software. The component monitors the charger and disables the current and **Charge To** controls |
| **Charger Not Available** | The charger is not connected or not available, and a charge cannot start until it is connected |
| **Charger Issue** | The charger reports an error in its state, hardware or communications. Check the logs, because a charge cannot start until the error is resolved |
| **SOC Warning** | The **Charge To** target is below the current state of charge, so the battery has already reached that charge level |
| **Charger Error** and **Charger Warning** | The charger or the battery reports an error or a warning, and the message gives the text that the charger or battery supplied |
| **Charging Status** | A charge is running, and the message shows the present charge current and voltage |
| **Ready** | The charger is ready, and the operator can start charging |
