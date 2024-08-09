---
title: Trusted Cell Voltages
---

# Trusted Cell Voltages

The CMUs measure their cell voltages using two separate front-end circuits, A/D converters, and voltage references.  One channel records with a high resolution 24-bit converter at a slow 2 Hz rate.  The other channel uses a mid resolution 12-bit converter running at several kHz.  These are cross-checked against each other to verify that the CMU is functioning correctly and that the cell voltage measurement can be trusted. 

Measurements reported on the CAN bus telemetry come from the high resolution channel.   

Measurements where the two channels do not agree are flagged as untrusted.  If any cells report an untrusted measurement, the BMU will report a TRUST error on the CAN bus.  This is not treated as a fatal error, and will not result in a pack shutdown. 

The threshold where a trust error is generated is set in the BMU config, and is currently factory set to 100mV. 

Please note that due to the different response rates of the two A/D converters, it is possible to get a trust error briefly during sharp voltage transients on the cells, for instance during rapid acceleration or regen braking events.  Whatever higher-level vehicle system is handling BMS telemetry and user interface should be programmed to ignore trust errors that are present for less than some period (eg 500ms) of time. 