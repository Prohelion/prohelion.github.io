---
title: Elmar Solar MPPT
description: "Monitor Elmar Solar maximum power point tracker efficiency, input/output voltage, and status events."
---

# Elmar Solar MPPT

Elmar Solar produces Maximum Power Point Trackers (MPPTs), which are used to optimise the power output of solar arrays, and the Elmar range distributed by Prohelion consists of the Elmar 3A MPPT, the Elmar Race MPPT and the Elmar Best MPPT, which are described in the [Solar Charge Controllers by Elmar](../../../../Solar_Charge_Controllers/index.md) documentation. Elmar Solar MPPT devices can be purchased through the [Prohelion](https://www.prohelion.com) website, and the Profinity component is documented for the Elmar Solar MPPT Series A and B described by the [Elmar MPPT DBC](../../../../Solar_Charge_Controllers/DBC.md).

You can manage an Elmar Solar MPPT using Profinity by adding a new Elmar Solar MPPT tracker to your [Profile](../../Getting_Started/Profiles.md). When an Elmar Solar MPPT is added to your Profile, Profinity prompts for the following information about the device, and these details can be changed later from the MPPT dashboard.

| Parameter            | Description                                                                           |
|----------------------|---------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                            |
| `Milliseconds Valid` | The timeout of the device. If the network has not received any traffic from this device after this many milliseconds, the connection is assumed to have been lost. |
| `Base Address`       | The CAN address of the MPPT (See the [Elmar MPPT DBC](../../../../Solar_Charge_Controllers/DBC.md)) |

Once the MPPT has been added to your profile, the Elmar Solar MPPT dashboard will be available in the sidebar. The dashboard displays several types of information, including input/output voltage graphs, error status indicators and temperature readings.

<figure markdown>
![Elmar Solar MPPT](../../images/elmar_mppt.png)
<figcaption>Elmar Solar MPPT</figcaption>
</figure>

The raw CAN data from an Elmar Solar MPPT can also be viewed in the [DBC view](../../CAN_Utilities/CAN_Bus_DBC.md), which is opened with the `Messages and Signals` button in the top right corner of the dashboard.

## MPPT Data

The top row of the MPPT dashboard presents a summary of the following information (left to right):

| Cell              | Meaning                                                      |
|-------------------|--------------------------------------------------------------|
| `INPUT VOLTAGE`   | The voltage produced by the connected solar array, in volts. |
| `INPUT CURRENT`   | The current delivered by the connected solar array, in amps. |
| `OUTPUT VOLTAGE`  | The output voltage of the MPPT, in volts.                    |
| `OUTPUT CURRENT`  | The output current of the MPPT, in amps.                     |

Below the summary are two time-series graphs depicting the input voltage and output power of the MPPT. Hovering the cursor over a graph shows the data in greater resolution.

The lower left side of the window shows status indicators for MPPT events, which include (but are not limited to):

- Low array power, hardware overvoltage and hardware overcurrent errors
- MOSFET overheat errors
- 12V undervoltage
- Battery low and battery full flags
- Reaching the input current limits (minimum and maximum)
- Reaching the MPPT limits (maximum output voltage, minimum and maximum duty cycle, MOSFET temperature, and the local and global MPPT limits)

The events correspond to the `Status` message of the [Elmar MPPT DBC](../../../../Solar_Charge_Controllers/DBC.md), which carries the error and limit flags, the mode, and the CAN receive and transmit error counters, and the datasheets of each product are linked from the [Solar Charge Controllers by Elmar](../../../../Solar_Charge_Controllers/index.md) documentation.

The right-hand side depicts a simplified flowchart of the MPPT state, which is either Standby or On according to the `Mode` signal of the `Status` message, and the current state is indicated by the grey box. Expanding the `MORE DETAILS` banner shows the input, output and power readings, the MOSFET, controller and power connector temperatures, and the auxiliary 12 V and 3 V supply and battery-side output voltages. The state of a connected battery is described in the [BMU section](../Battery_Management_Systems/index.md).
