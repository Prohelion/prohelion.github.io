---
title: BMS Telemetry Viewing Software
keywords: BMS, Telemetry
summary: ""
sidebar: bmu_sidebar
permalink: Battery_Management_System_HTML/BMS_Telemetry_Viewing_Software.html
folder: Battery_Management_System_HTML
order: 5
---
## TELEMETRY VIEWING SOFTWARE
The screenshot below shows the BMS Viewing software.  Please note that this functionality is now included as part of the Profinity software suite provided by Prohelion.

![BMU Telemetry]({{site.dox.baseurl}}/images/IMPS_BMU_Telemetry.jpg)

The top section shows data from the BMU, while the lower section shows CMU data – one row per CMU.

### BMU DATA
The top row of BMU data presents the following information (left to right):

*         Minimum voltage cell in the pack, and its voltage.  The example shows Node (CMU) 8, Cell 6 is minimum, at 3293mV

*         Maximum voltage cell in the pack, and its voltage.  The example shows Node (CMU) 12, Cell 4 is maximum, at 3316mV

*         Minimum temperature cell in the pack, and it's temperature

*         Maximum temperature cell in the pack, and it's temperature

*         Total pack voltage

*         Total pack current

*         Balance threshold voltage

*         Balance threshold minimum voltage (balance voltage – hysteresis)

*         CMU count in system

The next row shows Precharge status information on the left:

*         Current state (Idle, Precharge, Run, etc)

*         Contactor 12V supply voltage presence (mV on v4 or older BMUs)

The bottom row in the BMU section shows the various status flags:

*         CMU Power supply OK

*         Any cell OverVoltage

*         Any cell UnderVoltage

*         Any cell OverTemperature

*         Any cell untrusted

*         CMU and vehicle timeout errors The right-hand side shows

*         Fan speed for both fans

*         SOC and Balance SOC in Ah

*         SOC and Balance SOC in %

### CMU DATA
The lower section of the program shows telemetry data from the CMUs, one row per CMU.  The information shown is:

*         CMU Serial number

*         CMU circuit board (PCB) temperature

*         CMU external (cell) temperature

*         1–8 cell voltage measurements

The data is highlighted in various ways to quickly understand the system status

*         CMU serial number alternates between a white and light blue background each time a packet is received from that CMU

*         Trust errors for a cell voltage have a yellow background

*         Cells outside the min and max voltage limits have a red background

*         Cells currently balancing have a blue background

*         The minimum and maximum cells have bold text

*         Cells not present (where the CMU has been programmed to monitor less than 8 cells) have no text, and a mid-gray background





