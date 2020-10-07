---
title: Communications Protocol
keywords: [I.M.P.S., BMU Communications Protocol]
summary: ""
sidebar: imps_sidebar
permalink: BMU_Communications_Protocol.md
folder: I.M.P.S.
---

## 1. INTRODUCTION
This document describes the communications protocol used between the Battery Management Unit (BMU) and the vehicle in the Prohelion BMS. 

Internal communications between the BMS BMU and BMS Cell Management Units (CMUs) are described in another document (TRI67.009), but should not be needed for a typical end-user.

## 2. OVERVIEW
The BMS CMUs communicate with each other and with the BMU using a CAN bus that is separate from the vehicle CAN bus.

The BMU collates and summarises data from the CMUs, including minimum and maximum cell voltages and temperatures, and interfaces to the vehicle on a second CAN bus.  This is the communications link detailed in this document.

As a general overview, after power is applied to the system, the CMUs report their (factory programmed) serial numbers to the BMU.  The BMU allocates a CAN ID and number of cells to monitor for each CMU and builds a table of CMUs that can be used for fault detection (failed CMUs) and other diagnostics. 

Once running, each CMU reports its serial number, status, temperature and up to eight cell voltages at approximately 1Hz.  Support for high-speed minimum/maximum voltage updates (~100Hz) is currently being added, and is not detailed in this document.

The CMUs use two redundant measurement channels to take cell voltage readings, and also cross-check their supply voltage and A/D references for faults. One channel uses a high-accuracy (24-bit) slow speed (Hz) converter, and the other channel uses a high-speed (kHz) mid-accuracy (12-bit) converter.  Each CMU also measures one external 10k NTC temperature sensor and it's own microcontroller die temperature.

The BMU measures additional data itself: total pack voltage on either side of the precharge contactor, total pack current from a shunt, pack isolation from the vehicle, the status of the precharge control, and the presence of the 12V supply voltage for the contactors.  This data, along with the minimum and maximum cell voltage and temperature, is reported by the BMU onto the vehicle CAN bus.  The BMU can also echo the individual cell voltage and temperature data to the vehicle CAN bus, if configured to do so.

## 3. CAN ID ALLOCATIONS
By default, the BMS BMU ships with a CAN base ID set to 0x600.  This can be adjusted by the end user.  Assuming this base ID, the following CAN IDs are used on the vehicle bus by the BMS BMU:

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="546" style="width:409.6pt;margin-left:71.7pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 2.9pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CAN ID (hex)</span></i></b></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Description</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x600</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">BMU heartbeat &amp; serial number</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x601 - 0x6EF</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">CMU status, temperature and voltage telemetry, if set to
  relay to vehicle</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F0</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Reserved for factory configuration &amp; calibration
  commands</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F1 - 0x6F3</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Reserved for future configuration system update</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F4</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Pack SOC</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F5</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Balance SOC</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:7;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F6</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Charger Control information</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:8;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F7</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Precharge</span></span><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%"> status, 12V status</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:9;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F8</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Minimum / Maximum cell voltage</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:10;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F9</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Minimum / Maximum cell temperature</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:11;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FA</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Battery pack voltage &amp; current</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:12;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FB</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Battery pack status</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:13;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FC</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Fan &amp; 12V supply status</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:14;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FD</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Extended battery pack status</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:15;height:14.9pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FE - 0x6FF</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Reserved, currently unused</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:16;mso-yfti-lastrow:yes;height:24.3pt">
  <td width="114" valign="top" style="width:85.7pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.9pt 0cm 5.6pt;height:24.3pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x7F0 - 0x7F4</span></p>
  </td>
  <td width="432" valign="top" style="width:323.9pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.9pt 0cm 5.6pt;height:24.3pt">
  <p class="MsoNormal" style="margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
  margin-left:.1pt;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Reserved
  for bootloader triggering and data transfer (these IDs do <u style="text-underline:black">not</u> move with a change in BMU CAN base ID)</span></p>
  </td>
 </tr>
</tbody></table>

## 4. DATA FORMAT
The 8-byte data on the CAN bus is formatted using a 'union' overlay structure in the BMS CMU microcontroller firmware.  NOTE: this depends on the byte ordering and word size of the CPU, and is not portable across architectures – however the byte order is correct for both the MSP430 microcontroller in the CMUs and BMU and the x86 CPU in a PC.

The structure is defined on the (16-bit) MSP430 as follows:


~~~ c++
typedef union _group_64 { 
    float data_fp[2]; 
    unsigned char data_u8[8]; 
    char data_8[8]; 
    unsigned int data_u16[4]; 
    int data_16[4]; 
    unsigned long data_u32[2]; 
    long data_32[2];
} group_64;
~~~

Data values data_u8[0] through to data_u8[7] are the bytes transmitted on the CAN bus.

## 5. CAN PACKET FORMATS
### 5.1 BMU HEARTBEAT AND SERIAL NUMBER
This packet is transmitted by the BMU and allows it to be located and identified on the CAN bus.  It contains an identifying string, and the serial number of the BMU device.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x600</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1 Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:30.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u32[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">v5 and
  later: Device ID: 0x00001000</span></p>
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">v4 and earlier: ASCII ID string:<span style="mso-spacerun:yes">&nbsp; </span>'T', '0', '6', '7'</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u32[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Device serial number as programmed at the factory</span></p>
  </td>
 </tr>
</tbody></table>

### 5.2 CMU STATUS, TEMPERATURE AND VOLTAGE TELEMETRY
These packets are transmitted by the CMUs and contain the telemetry values from the cells.  The BMU will relay these packets through to the vehicle CAN bus if configured to do so – this is enabled by default.

Each CMU transmits a group of three packets, with the ID of the first packet being granted by the BMU during the ID request/grant phase at startup. 

CMU 1 will be assigned an ID of 0x601, and will therefore transmit telemetry on 0x601, 0x602, and 0x603.  CMU 2 will be assigned an ID of 0x604, CMU 3 will be assigned to 0x607, and so on.

Reported cell voltages also indicate measurement status.  Measurements with a high confidence (both redundant measurement channels agree closely) will be reported as a reading in mV.  Readings where the redundant channels disagree ('trust' error) will be reported as negative mV, with the reported number coming from the high-accuracy / slow-speed converter channel. 

Note that with the current CMU firmware, during very rapid voltage changes (high charge/discharge current pulses), the channels may report as a trust error for a few update cycles due to the sampling timing for the two measurement channels not being simultaneous.

Readings with all cell voltages reported as negative indicate that either the 3.3V power supply voltage or one of the A/D reference voltages is out of specification.

A CMU reporting any of these conditions (-ve mV) will potentially be reporting erroneous readings.  A cell reporting a -ve mV reading will not balance that cell, to avoid balancing at a potentially incorrect voltage.  Any cell reporting as a -ve mV reading should be flagged in the higher-level system and dealt with appropriately.  It should not necessarily trigger an immediate system shutdown, but should probably be latched and indicated to the user to seek servicing promptly.

Readings from cells above the number defined by the BMU to each CMU during startup are sent as -32768mV (maximum negative) to indicate a 'cell not present / not monitored'.  A cell that is read by the CMU as having voltage present, when that cell has been configured as 'not present', will report as -32767mV to indicate a possible 'extra cell' fault.  These cells should not be included in any min / max / average cell voltage calculations.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x601, 0x604, 0x607, etc</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:24.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:24.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:24.2pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span class="SpellE"><b style="mso-bidi-font-weight:
  normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%">Approx</span></i></b></span><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> 1 Hz (CMU
  <span class="SpellE">timebases</span> are not synchronised and will drift
  relative to each other, and to actual time)</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u32[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CMU serial number (allocated at factory)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">PCB temperature <span class="GramE">( 1</span>/10</span><sup><span style="font-size:7.0pt;mso-bidi-font-size:11.0pt;line-height:107%">th</span></sup><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> °C)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell temperature <span class="GramE">( 1</span>/10</span><sup><span style="font-size:7.0pt;mso-bidi-font-size:11.0pt;line-height:107%">th</span></sup><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> °C)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x602, 0x605, 0x608, etc</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span class="SpellE"><b style="mso-bidi-font-weight:
  normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%">Approx</span></i></b></span><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> 1 Hz </span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:7;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 0 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:8;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 1 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:9;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 2 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:10;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 3 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:11;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x603, 0x606, 0x609, etc</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:12;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span class="SpellE"><b style="mso-bidi-font-weight:
  normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%">Approx</span></i></b></span><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> 1 Hz </span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:13;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 4 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:14;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 5 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:15;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 6 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:16;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell 7 voltage (mV).<span style="mso-spacerun:yes">&nbsp;
  </span>+<span class="SpellE">ve</span> = OK, -<span class="SpellE">ve</span> =
  channel mismatch</span></p>
  </td>
 </tr>
</tbody></table>

### 5.3 PACK STATE OF CHARGE (SOC)
This packet is transmitted by the BMU to show the current state of charge during normal pack operation

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 3.05pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F4</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1 Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:33.6pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:33.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">data_<span class="GramE">fp</span></span></span><span class="GramE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">[</span></span><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:33.6pt">
  <p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">SOC
  (Ah).<span style="mso-spacerun:yes">&nbsp; </span>Shows Ah consumed from the
  pack.<span style="mso-spacerun:yes">&nbsp; </span>0 = <span class="GramE">Full, and</span>
  counts upwards towards the user-set pack capacity number as Ah are used.<span style="mso-spacerun:yes">&nbsp; </span>Resets to 0 when max cell reaches balance
  threshold.</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">data_<span class="GramE">fp</span></span></span><span class="GramE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">[</span></span><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Shows the SOC as a percentage.<span style="mso-spacerun:yes">&nbsp; </span>100% = full, 0% = empty</span></p>
  </td>
 </tr>
</tbody></table>

### 5.4 PACK BALANCE STATE OF CHARGE (SOC)
This packet is transmitted by the BMU to show the current state of cell mismatch during balancing at top of charge.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 2.95pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.95pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.95pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F5</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.95pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.95pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1 Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:43.0pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.95pt 0cm 5.6pt;height:43.0pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">data_<span class="GramE">fp</span></span></span><span class="GramE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">[</span></span><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.95pt 0cm 5.6pt;height:43.0pt">
  <p class="MsoNormal" style="margin-top:0cm;margin-right:.35pt;margin-bottom:
  0cm;margin-left:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Balance
  SOC (Ah).<span style="mso-spacerun:yes">&nbsp; </span>Shows Ah supplied to the
  pack since the first cell began balancing.<span style="mso-spacerun:yes">&nbsp;
  </span>This number will continue to <span class="GramE">count up</span> until
  all cells in the pack are balancing, therefore showing the Ah mismatch that
  has been corrected during this balancing session.</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;mso-yfti-lastrow:yes;height:24.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 2.95pt 0cm 5.6pt;height:24.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">data_<span class="GramE">fp</span></span></span><span class="GramE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">[</span></span><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 2.95pt 0cm 5.6pt;height:24.2pt">
  <p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Shows the
  balancing SOC as a percentage, in other words, the percentage mismatch
  between cells this session.</span></p>
  </td>
 </tr>
</tbody></table>

### 5.5 CHARGER CONTROL INFORMATION
This packet is transmitted by the BMU to allow an external charger to control itself based in detailed cell information from the BMS, without having to know about the various user-configured cell setup parameters.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 2.8pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F6</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">10 Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:58.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:58.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:58.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Charging
  cell voltage error (mV).<span style="mso-spacerun:yes">&nbsp; </span></span></p>
  <p class="MsoNormal" style="margin-top:0cm;margin-right:.25pt;margin-bottom:
  0cm;margin-left:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">This value
  is the user-configured “Balance Threshold” voltage minus the maximum cell
  voltage.<span style="mso-spacerun:yes">&nbsp; </span>The charger should run a
  charge current control loop to try and bring this value to 0mV.<span style="mso-spacerun:yes">&nbsp; </span>An Integral type control loop is suggested.</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:67.6pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:67.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:67.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:5.9pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Cell
  temperature margin <span class="GramE">( 1</span> /10</span><sup><span style="font-size:7.0pt;mso-bidi-font-size:11.0pt;line-height:107%">th</span></sup><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> °C)</span></p>
  <p class="MsoNormal" style="margin-top:0cm;margin-right:.45pt;margin-bottom:
  0cm;margin-left:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">This value
  is the maximum cell temperature minus the <span class="SpellE">userconfigured</span>
  “Maximum Cell Temperature” limit.<span style="mso-spacerun:yes">&nbsp; </span>The
  charger should reduce charge current such that this value will never reach 0,
  as the BMS will disconnect the pack if the maximum cell temperature is
  exceeded.<span style="mso-spacerun:yes">&nbsp; </span>A Proportional type control
  loop is suggested.</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:67.6pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:67.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:67.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Discharging
  cell voltage error (mV)</span></p>
  <p class="MsoNormal" style="margin-top:0cm;margin-right:.2pt;margin-bottom:
  0cm;margin-left:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">This value
  is the user-configured “Zero SOC Threshold” voltage minus the minimum cell
  voltage.<span style="mso-spacerun:yes">&nbsp; </span>This value can be used by
  devices that are discharging the battery (<span class="SpellE">eg</span> motor
  controllers in vehicles) to gradually limit their consumption as the minimum
  cell approaches being fully discharged.</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;mso-yfti-lastrow:yes;height:48.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 2.8pt 0cm 5.6pt;height:48.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 2.8pt 0cm 5.6pt;height:48.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Total pack
  capacity (Ah)</span></p>
  <p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">This value
  can be used by the charger / discharger to calculate control loop gain
  constants for the installation.<span style="mso-spacerun:yes">&nbsp; </span>It is
  simply the <span class="SpellE">userset</span> configuration value rounded to
  the nearest Ah.</span></p>
  </td>
 </tr>
</tbody></table>

### 5.6 PRECHARGE STATUS
This packet is transmitted by the BMU to indicate the current state of the precharge system.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F7</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1 Hz, and on each <span class="SpellE">precharge</span>
  state change</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:137.3pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:137.3pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:137.3pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Precharge</span></span><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%"> contactor driver status</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x01 =
  Error status of contactor 1 driver (0 = OK, 1 = <span class="GramE">error )</span></span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x02 =
  Error status of contactor 2 driver</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x04 =
  Output status of contactor 1 driver (0 = Off, 1 = On)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x08 =
  Output status of contactor 2 driver</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x10 = 12V
  contactor supply voltage OK (0 = Fault, 1 = OK)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x20 =
  Error status of contactor 3 driver</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x40 =
  Output status of contactor 3 driver</span></p>
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x80 = Unused</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:106.6pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-left-alt:solid black .25pt;mso-border-bottom-alt:
  solid black .25pt;mso-border-right-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;
  height:106.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-left-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-bottom-alt:solid black .25pt;mso-border-right-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:106.6pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span class="SpellE"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">Precharge</span></span><span style="font-size:8.0pt;
  mso-bidi-font-size:11.0pt;line-height:107%"> state (in order of normal
  appearance when starting)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:7.7pt;text-align:left;text-indent:-7.7pt;
  mso-list:l1 level1 lfo1"><!--[if !supportLists]--><span style="font-size:8.0pt;
  line-height:107%"><span style="mso-list:Ignore">0<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;
  </span></span></span><!--[endif]--><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">= Error</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:7.7pt;text-align:left;text-indent:-7.7pt;
  mso-list:l1 level1 lfo1"><!--[if !supportLists]--><span style="font-size:8.0pt;
  line-height:107%"><span style="mso-list:Ignore">1<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;
  </span></span></span><!--[endif]--><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">= Idle</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">5 = Enable
  Pack</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:7.7pt;text-align:left;text-indent:-7.7pt;
  mso-list:l2 level1 lfo2"><!--[if !supportLists]--><span style="font-size:8.0pt;
  line-height:107%"><span style="mso-list:Ignore">2<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;
  </span></span></span><!--[endif]--><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">= Measure</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:7.7pt;text-align:left;text-indent:-7.7pt;
  mso-list:l2 level1 lfo2"><!--[if !supportLists]--><span style="font-size:8.0pt;
  line-height:107%"><span style="mso-list:Ignore">3<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp;
  </span></span></span><!--[endif]--><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">= <span class="SpellE">Precharge</span></span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:7.7pt;margin-bottom:.0001pt;text-align:left;
  text-indent:-7.7pt;mso-list:l2 level1 lfo2"><!--[if !supportLists]--><span style="font-size:8.0pt;line-height:107%"><span style="mso-list:Ignore">4<span style="font:7.0pt &quot;Times New Roman&quot;">&nbsp;&nbsp; </span></span></span><!--[endif]--><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">= Run</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:30.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:12.1pt;
  margin-bottom:0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">12V contactor supply voltage, <span class="GramE">mV<span style="mso-spacerun:yes">&nbsp; </span>(</span>only on v4 or earlier BMU) for v5
  or later BMU, refer to binary bit 0x10 in data_u8[0]</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused, reports as 0x0000</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;height:30.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[6]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x01 = <span class="SpellE">Precharge</span> timer elapsed<span class="GramE"><span style="mso-spacerun:yes">&nbsp;&nbsp; </span>(</span>Don't care if timeout disabled)</span></p>
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x00 = <span class="SpellE">Precharge</span> timer not
  elapsed</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:7;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[7]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span class="SpellE"><span style="font-size:
  8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Precharge</span></span><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> timer
  counter (10ms per count)</span></p>
  </td>
 </tr>
</tbody></table>

### 5.7 MINIMUM / MAXIMUM CELL VOLTAGE
This packet is transmitted by the BMU to show the highest and lowest voltage cells in the pack.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F8</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">10Hz, will likely move to higher frequency in future
  version</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Minimum cell voltage (mV)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Maximum cell voltage (mV)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[4]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CMU number that has the minimum cell voltage</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[5]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell number in CMU that is the minimum cell voltage</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[6]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CMU number that has the maximum cell voltage</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:7;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[7]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Cell number in CMU that is the maximum cell voltage</span></p>
  </td>
 </tr>
</tbody></table>

### 5.8 MINIMUM / MAXIMUM CELL TEMPERATURE
This packet is transmitted by the BMU to show the highest and lowest temperature cells in the pack.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6F9</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Minimum cell temperature <span class="GramE">( 1</span>/10</span><sup><span style="font-size:7.0pt;mso-bidi-font-size:11.0pt;line-height:107%">th</span></sup><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> °C)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Maximum cell temperature <span class="GramE">( 1</span>/10</span><sup><span style="font-size:7.0pt;mso-bidi-font-size:11.0pt;line-height:107%">th</span></sup><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%"> °C)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[4]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CMU number that has the minimum cell temperature</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[5]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused, reads as 0x00</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[6]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">CMU number that has the maximum cell temperature</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:7;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[7]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused, reads as 0x00</span></p>
  </td>
 </tr>
</tbody></table>

### 5.9 BATTERY PACK VOLTAGE / CURRENT
This packet is transmitted by the BMU to show the total pack voltage and current

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FA</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">10Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u32[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Battery Voltage (mV)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_32[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Battery Current (mA)</span></p>
  </td>
 </tr>
</tbody></table>

### 5.10 BATTERY PACK STATUS
This packet is transmitted by the BMU to show the status of the overall pack.Battery Pack Status

This packet is transmitted by the BMU to show the status of the overall pack.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 3.05pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FB</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Balance voltage threshold – rising (balance resistor
  turns on)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Balance voltage threshold – falling (balance
  resistor turns off)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:177.3pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:177.3pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[4]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:177.3pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Status
  Flags</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x01 =
  Cell Over Voltage</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x02 =
  Cell Under Voltage</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x04 =
  Cell Over Temperature</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x08 =
  Measurement Untrusted (redundant channel mismatch)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x10 = CMU
  Communications Timeout (lost CMU)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x20 =
  Vehicle Communications Timeout (lost EVDC)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x40 = BMU
  is in Setup mode</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x80 = CMU
  CAN bus power status</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Present
  for backwards <span class="SpellE">compatability</span> with older software</span></p>
  <p class="MsoNormal" style="margin:0cm;margin-bottom:.0001pt;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">For newer
  software, please view the flags in the extended battery pack status ID packet</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[5]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">BMS CMU count</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:6;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 3.05pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">BMS BMU Firmware Build Number</span></p>
  </td>
 </tr>
</tbody></table>

### 5.11 BATTERY PACK FAN STATUS
This packet is transmitted by the BMU to show fan speeds and 12V power consumption.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FC</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Fan speed 0 (rpm)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Fan speed 1 (rpm)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">12V current consumption of fans + contactors (mA)</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">12V current consumption of CMUs (mA)</span></p>
  </td>
 </tr>
</tbody></table>

### 5.12 EXTENDED BATTERY PACK STATUS
This packet is transmitted by the BMU to show extended pack status data.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.75pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.8pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x6FD</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">1Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:213.8pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:213.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u32[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:213.8pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">Status
  Flags</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000001
  = Cell Over Voltage</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000002
  = Cell Under Voltage</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000004
  = Cell Over Temperature</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000008
  = Measurement <span class="GramE">Untrusted<span style="mso-spacerun:yes">&nbsp;
  </span>(</span>channel mismatch)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000010
  = CMU Communications Timeout (lost CMU)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000020
  = Vehicle Communications Timeout (lost EVDC)</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000040
  = BMU is in Setup mode</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000080
  = CMU CAN bus power status</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000100
  = Pack Isolation test failure</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000200
  = SOC measurement is not valid</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000400
  = CAN 12V supply is <span class="GramE">low<span style="mso-spacerun:yes">&nbsp;
  </span>-</span> about to shut down</span></p>
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x00000800
  = A contactor is stuck / not engaged </span></p>
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x00001000 = A CMU has detected an extra cell
  present</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[4]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">BMU Hardware version</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u8[5]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">BMU Model ID</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.75pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused </span></p>
  </td>
 </tr>
</tbody></table>

### 5.13 RESERVED IDS
Do not transmit data on reserved IDs, as this may trigger configuration or bootload events and mode changes.

## 6. INCOMING CAN PACKETS
The BMU is expecting regular (>5Hz) CAN packets from EV Driver Controls, with the current state of the switches.  Specifically, it is looking for the current state of the IGNITION RUN and IGNITION START switches, to use in controlling the precharge state machine. 

The base ID of the EVDC can be set in the BMS configuration software, with the switch position packet being sent at +5 above the base ID.  By default the EVDC base ID is expected to be 0x500, making the switch position ID at 0x505.

### 6.1 EV DRIVER CONTROLS SWITCH POSITION
This packet is transmitted by the EVDC to show switch status.

<table class="TableGrid" border="0" cellspacing="0" cellpadding="0" width="548" style="width:411.2pt;margin-left:70.1pt;border-collapse:collapse;mso-yfti-tbllook:
 1184;mso-padding-alt:2.65pt 5.75pt 0cm 5.6pt">
 <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.7pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">CAN ID</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border:solid black 1.0pt;
  border-left:none;mso-border-left-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.7pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x505</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:1;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:
  normal"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:
  107%">Interval</span></i></b></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><b style="mso-bidi-font-weight:normal"><i style="mso-bidi-font-style:normal"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">10Hz</span></i></b></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:2;height:30.2pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[0]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:30.2pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:4.75pt;margin-left:0cm;text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;line-height:107%">0x0020 =
  Ignition Run</span></p>
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">0x0040 = Ignition Start</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:3;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[1]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:4;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[2]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused</span></p>
  </td>
 </tr>
 <tr style="mso-yfti-irow:5;mso-yfti-lastrow:yes;height:14.9pt">
  <td width="169" valign="top" style="width:126.8pt;border:solid black 1.0pt;
  border-top:none;mso-border-top-alt:solid black .25pt;mso-border-alt:solid black .25pt;
  padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin-top:0cm;margin-right:0cm;
  margin-bottom:0cm;margin-left:.1pt;margin-bottom:.0001pt;text-align:left;
  text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:11.0pt;
  line-height:107%">data_u16[3]</span></p>
  </td>
  <td width="379" valign="top" style="width:284.4pt;border-top:none;border-left:
  none;border-bottom:solid black 1.0pt;border-right:solid black 1.0pt;
  mso-border-top-alt:solid black .25pt;mso-border-left-alt:solid black .25pt;
  mso-border-alt:solid black .25pt;padding:2.65pt 5.75pt 0cm 5.6pt;height:14.9pt">
  <p class="MsoNormal" align="left" style="margin:0cm;margin-bottom:.0001pt;
  text-align:left;text-indent:0cm"><span style="font-size:8.0pt;mso-bidi-font-size:
  11.0pt;line-height:107%">Unused </span></p>
  </td>
 </tr>
</tbody></table>