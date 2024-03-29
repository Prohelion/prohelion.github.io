---
title: Software Programming 
---

# Software Programming 

The driver controls are based around a Texas Instruments (TI) MSP430 16-bit embedded low-power microcontroller, operating from a 16 MHz clock as default.  CAN bus support is provided via a Microchip MCP2515 CAN controller and TI SN65HVD234 CAN transceiver.  The driver controls are not isolated from the CAN bus.

## Basic Software Connection Diagram 

The following schematic shows the simplest possible connection, when using the default software.

<figure markdown>
![Basic Connection Diagram](images/Basic_Connection_Diagram.png)
<figcaption>Basic Connection Diagram</figcaption>
</figure>

## Schematics & Source Code

Schematics and PCB component position overlays in PDF format are available for download on the Prohelion website.  A zip file is also provided containing the default source code for the microcontroller, written in 'C' and available under a BSD open-source license.

Please refer to these references if developing custom firmware for the driver controls.

## Toolchain

The example default code provided is configured to work with the freely-available open-source MSP430 GCC toolchain, which provides a command-line driven compiler, binutils, download, and real-time debug capability through a JTAG header present on the driver controls PCB.  The debug functionality requires purchase of a USB programmer from Texas Instruments.  Please refer to the [README](https://github.com/Prohelion/EV-Driver-Controls) file with the source code for download and installation instructions.

## Code Download

The EV Driver Controls contains a facility to load new software into the device via the CAN bus.  This works in conjunction with our CAN-Ethernet bridge.  The bootloader utility is available on the Prohelion website.  Using this method of programming means that a debugger is not possible, but it works immediately and does not require the purchase of additional hardware.
