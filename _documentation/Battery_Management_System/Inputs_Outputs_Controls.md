---
title: Inputs, Outputs and Controls
keywords: BMS, 
summary: ""
sidebar: bmu_sidebar
permalink: Battery_Management_System/Inputs_Outputs_Controls.html
folder: Battery_Management_System
order: 4
---

## FAN/PUMP CONTROL
The BMU provides two 12V switched outputs to drive pack fans and pumps. These are provided on a standard 3-pin KK connector as used in PCs and other IT equipment.  Both outputs are switched together, ie both on or both off.

The 12V to power these outputs is sourced from the contactor supply input connection.Refer to the datasheet for current and voltage ratings for these outputs.

Both connections provide a speed sensor input pin, and this is measured by the BMU and reported as an rpm number for each connection on the CAN bus telemetry.  It assumes a 2 pulse per revolution sensor output, as is commonly used for most PC cooling fans.

The BMS firmware switches both outputs on when the BMS is in Run mode (once precharge has completed and the system is fully operational).

### FAN/PUMP CONNECTORS
The connector used for the pump/fan outputs is a 3-way 2.54mm pitch Molex KK connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps. 

![BMU Fan Connectors]({{site.dox.baseurl}}/images/IMPS_BMU_Fan_Connectors.gif)

The pinout follows the standard used for PC cooling fans and pumps, as found on

any computer motherboard or peripheral.  Please note that the wire colours used on fans and pumps varies with each manufacturer.

## RELAY OUTPUT
The BMU provides a voltage-free relay output to use for signalling devices in the vehicle that are not capable of receiving CAN bus data.  This can be used, for example, to control the 'enable' input of a DC/DC converter or drive a relay or HV contactor.   A coil suppression diode must be used if driving this type of load.

Refer to the datasheet for current and voltage ratings of the relay.

The relay is active when the BMS is in Run mode. 

The connector also provides 12V and GND pins, which are sourced from the 12V contactor supply power.  These can be conveniently used in conjunction with the relay to switch 12V out to a load that requires power, for instance to drive another relay, fan or contactor.

### RELAY OUTPUT CONNECTOR
The connector used for the Relay output is a 6-way 4.2mm pitch Molex MiniFit Jr connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps. 

![BMU Relay Output Connector]({{site.dox.baseurl}}/images/IMPS_BMU_Relay_Output_Connector.gif)

The +12V and Ground pins in this connector are wired (on the BMU PCB) to the Contactor 12V supply connector, and can be jumpered across to the relay pins to provide 12V output on relay active or inactive, switch loads to ground, etc, depending on the jumper arrangement.

The Relay pins in this connector are wired directly to a small relay on the BMU PCB.  Refer to the datasheet for the ratings on this relay.

## VEHICLE CAN BUS
### CAN NETWORK TOPOLOGY
The CAN bus is structured as a linear network, with short stubs branching from 'T' connectors on the main bus backbone to each device.  The CAN bus data lines must be terminated at each end of the main bus with 120 ohm resistors between the CAN-H and CAN-L signals.

In the range of Tritium EV products, including the WaveSculptor 200, EV Driver

Controls, and BMU, the CAN connections are implemented with an 'in' and an 'out' connector, therefore placing the 'T' on the device, resulting in a very short fixed-length stub on the circuit board of each device.  This is ideal from a signal integrity and network performance point of view.

![BMU Vechicle CAN BUS Topology]({{site.dox.baseurl}}/images/IMPS_BMU_Vechicle_CAN_BUS_Topology.jpg)

The BMU uses the vehicle CAN bus to receive operating and configuration commands and transmit telemetry, as well as a source of low-voltage DC power to operate the electronics.

### CAN WIRING
The CAN data lines (CAN-H and CAN-L) must be implemented with twisted-pair wire for proper data integrity.  The wire should have a characteristic impedance of 120 ohms. 

Power should also be provided along the CAN cable, ideally with another twisted pair to minimise noise pickup.  An overall shield can also be advantageous. 

The optimal choice of cable is 7mm Devicenet CAN Bus 'thin' cable, with 24AWG (data) + 22AWG (power) twisted pairs and a braided shield.  Using this cable will result in a robust installation, with high immunity to noise, low voltage drop in the power cable, and reliable CAN communications.  Using alternative cabling will usually result in problems during operation.

### VEHICLE CAN BUS CONNECTORS
The connector used on the BMU and other Tritium devices for the CAN connection is a 6-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  The colours shown match those in the standard DeviceNet CAN cabling pairs.

![BMU Vehicle CAN Bus Connectors]({{site.dox.baseurl}}/images/IMPS_BMU_Vehicle_CAN_BUS_Connectors.gif)

### CAN SHIELDING
If the recommended braided shield is used in the cable, then terminate it to the SHIELD pin (lower-left corner on the connector) on both CAN IN and CAN OUT connectors on each device. 

On one device only in the network, instead of using the SHIELD pin, terminate the shield to the SHIELD GROUND pin (upper-left corner on the connector) on both CAN IN and CAN OUT connectors, to ground the shield for the entire network at this single point.  The usual place to do this is where power is fed into the network, typically at Tritium's EV Driver Controls product.

### CAN TERMINATION
To implement the required 120 Ohm termination resistor at each end of the CAN bus, plug a connector into the unused CAN connector on the last device at each end of the network with a resistor crimped into the appropriate locations.

### COMMUNICATIONS
The CAN standard does not specify high-level message protocols. Tritium devices use a custom protocol, outlined in the communication specification document for each device.

By default, each device operates at 500 kbits/second and comes programmed from the factory with a CAN base address that will allow it to work in unison with other Tritium devices. The CAN bit rate and base address can be set with the Windows BMS configuration software.

### POWER SUPPLY
The BMS electronics operate from 12V supplied on the CAN bus connector, which is switched on by the Tritium EV Driver Controls when it is in accessories or run key switch positions. 

A second high-current 12V supply connection is present for contactor and fan operating power, refer to the precharge section of this document for more details.  The CAN Ground and Contactor Supply Ground must be both tied to the vehicle chassis at some point in the system.

The allowable voltage range for both supplies is 10-15V.
