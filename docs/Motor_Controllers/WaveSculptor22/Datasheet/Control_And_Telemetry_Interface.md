---
title: Control and Telemetry Interface
---

# Control and Telemetry Interface

The WaveSculptor receives commands, and transmits telemetry values, using a CAN bus connection.  No other interface is provided.  Low-voltage DC power must be provided along the CAN bus cable to operate the control electronics of the WaveSculptor.

| Supply                            |      | Units | Notes:     |
|-----------------------------------|------|-------|------------|
| `CAN bus supply voltage minimum:` | 9    | V     | Note [^20] |
| `CAN bus supply voltage maximum:` | 15   | V     | Note [^20] |
| `CAN bus supply voltage nominal:` | 13.8 | V     | Note [^20] |
| `CAN bus supply power maximum:`   | 4.5  | W     |            |
| `CAN bus data rate maximum:`      | 1000 | kbps  | Note [^21] |
| `CAN bus isolation:`              | 1000 | V     | Note [^22] |

__NOTES:__

[^20]:
    Prohelion recommends providing the CAN bus supply with 13.8V, using a DC/DC converter and a backup lead-acid battery.  This arrangement, when properly implemented, gives a supply that can tolerate failures and still operate the controller successfully for a short period of time.

[^21]:
    The data rate used for CAN bus activity is set during configuration and setup of the controller.  Factory default for all Prohelion devices is 500 kbits per second.

[^22]:
    The CAN bus data connection and power supply are isolated from the high-power DC bus to this continuous voltage rating.  Please refer to the [isolation](../User_Manual/High_Power_Connections.md) section in the User Manual (under High Power Connections) regarding recommended earthing and connection practices.
