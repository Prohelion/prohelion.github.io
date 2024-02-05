---
title: Overview
description: Documentation for the Prohelion Vehicle Communications protocol
order: 0
---

# BMS BMU Vehicle Communications Protocol

This document describes the communications protocol used between the [Battery Management Unit](http://localhost:4000/Battery_Management_System/User_Manual/index.md) (BMU) and the vehicle in the Prohelion Battery Management System (BMS).  

Internal communications between the BMS BMU and BMS CMUs are described in another [document]??? (TRI67.009) but should not be needed for a typical end-user.

---

The BMS CMUs communicate with each other and with the BMU using a CAN bus that is separate from the vehicle CAN bus.

The BMU collates and summarises data from the CMUs, including minimum and maximum cell voltages and temperatures, and interfaces to the vehicle on a second CAN bus.  This is the communications link detailed in this document.

As a general overview, after power is applied to the system, the CMUs report their (factory programmed) serial numbers to the BMU.  The BMU allocates a CAN ID and number of cells to monitor for each CMU and builds a table of CMUs that can be used for fault detection (failed CMUs) and other diagnostics.  

Once running, each CMU reports its serial number, status, temperature and up to eight cell voltages at approximately 1Hz.  Support for high-speed minimum/maximum voltage updates (~100Hz) is currently being added and is not detailed in this document.

The CMUs use two redundant measurement channels to take cell voltage readings and cross-check their supply voltage and A/D references for faults.  One channel uses a high-accuracy (24-bit) slow speed (Hz) converter, and the other channel uses a high-speed (kHz) mid-accuracy (12-bit) converter.  Each CMU also measures one external 10k NTC temperature sensor and its own microcontroller die temperature.

The BMU measures additional data itself: total pack voltage on either side of the pre-charge contactor, total pack current from a shunt, pack isolation from the vehicle, the status of the pre-charge control, and the presence of the 12V supply voltage for the contactors.  

This data, along with the minimum and maximum cell voltage and temperature, is reported by the BMU onto the vehicle CAN bus.  The BMU can also echo the individual cell voltage and temperature data to the vehicle CAN bus, if configured to do so.
