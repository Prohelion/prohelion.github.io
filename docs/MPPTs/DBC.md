---
title: DBC File
---

# Elmar Solar DBC File

The following DBC file can be used to decode the CAN Packets transmitted by this device.

``` dbc

VERSION ""


NS_ : 
	NS_DESC_
	CM_
	BA_DEF_
	BA_
	VAL_
	CAT_DEF_
	CAT_
	FILTER
	BA_DEF_DEF_
	EV_DATA_
	ENVVAR_DATA_
	SGTYPE_
	SGTYPE_VAL_
	BA_DEF_SGTYPE_
	BA_SGTYPE_
	SIG_TYPE_REF_
	VAL_TABLE_
	SIG_GROUP_
	SIG_VALTYPE_
	SIGTYPE_VALTYPE_
	BO_TX_BU_
	BA_DEF_REL_
	BA_REL_
	BA_DEF_DEF_REL_
	BU_SG_REL_
	BU_EV_REL_
	BU_BO_REL_
	SG_MUL_VAL_

BS_:

BU_: ElmarSolarMPPT


BO_ 1536 PowerInput: 8 ElmarSolarMPPT
 SG_ InputVoltage : 0|32@1- (1,0) [0|0] "V" Vector__XXX
 SG_ InputCurrent : 32|32@1- (1,0) [0|0] "A" Vector__XXX

BO_ 1537 PowerOutput: 8 ElmarSolarMPPT
 SG_ OutputVoltage : 0|32@1- (1,0) [0|0] "V" Vector__XXX
 SG_ OutputCurrent : 32|32@1- (1,0) [0|0] "A" Vector__XXX

BO_ 1538 Temperature: 8 ElmarSolarMPPT
 SG_ MosfetTemperature : 0|32@1- (1,0) [0|0] "C" Vector__XXX
 SG_ ControllerTemperature : 32|32@1- (1,0) [0|0] "C" Vector__XXX

BO_ 1539 AuxillaryPowerSupply: 8 ElmarSolarMPPT
 SG_ TwelveVolt : 0|32@1- (1,0) [0|0] "V" Vector__XXX
 SG_ ThreeVolt : 32|32@1- (1,0) [0|0] "V" Vector__XXX

BO_ 1540 Limits: 8 ElmarSolarMPPT
 SG_ MaxOutputVoltage : 0|32@1- (1,0) [0|0] "V" Vector__XXX
 SG_ MaxInputCurrent : 32|32@1- (1,0) [0|0] "A" Vector__XXX

BO_ 1541 Status: 8 ElmarSolarMPPT
 SG_ ErrorReserved : 29|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorMosfetOverheat : 25|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorLowArrowPower : 24|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorHwOverVoltage : 31|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorHwOverCurrent : 30|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorBatteryLow : 26|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ ErrorBatteryFull : 27|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ Error12vUndervoltage : 28|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitOutputVoltageMax : 34|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitMosfetTemperature : 35|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitLocalMPPT : 38|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitInputCurrentMin : 32|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitInputCurrentMax : 33|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitGlobalMPPT : 39|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitDutyCycleMax : 37|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ LimitDuryCycleMin : 36|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ CanRXErrorCounter : 0|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ CanTXErrorCounter : 8|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ CanTXOverflowCounter : 16|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ Mode : 40|8@1+ (1,0) [0|1] "" Vector__XXX
 SG_ Reserved : 48|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ TestCounter : 56|8@1+ (1,0) [0|0] "" Vector__XXX

BO_ 1542 PowerConnector: 8 ElmarSolarMPPT
 SG_ OutputVoltageBatterySide : 0|32@1- (1,0) [0|0] "V" Vector__XXX
 SG_ PowerConnectorTemp : 32|32@1- (1,0) [0|0] "C" Vector__XXX



CM_ BU_ ElmarSolarMPPT "MPPT created by Elmar solar, either Series A or B";
CM_ SG_ 1536 InputVoltage "Input Voltage on the MPPT";
CM_ SG_ 1536 InputCurrent "Input Current on the MPPT";
CM_ SG_ 1537 OutputVoltage "Output Voltage from the MPPT";
CM_ SG_ 1537 OutputCurrent "Output Current from the MPPT";
CM_ SG_ 1538 MosfetTemperature "Temperature as measured at the Mosfet";
CM_ SG_ 1538 ControllerTemperature "Temperature as measured at the controller";
CM_ SG_ 1539 TwelveVolt "Voltage as measured at the 12v power auxillary supply";
CM_ SG_ 1539 ThreeVolt "Voltage as measured at the 3v power supply";
CM_ SG_ 1540 MaxOutputVoltage "Maximim Output voltage configured for the device";
CM_ SG_ 1540 MaxInputCurrent "Maximum Input current configured for the device";
CM_ SG_ 1542 OutputVoltageBatterySide "Output Voltage (Battery side of fuse)";
CM_ SG_ 1542 PowerConnectorTemp "Power connector temperature";
SIG_VALTYPE_ 1536 InputVoltage : 1;
SIG_VALTYPE_ 1536 InputCurrent : 1;
SIG_VALTYPE_ 1537 OutputVoltage : 1;
SIG_VALTYPE_ 1537 OutputCurrent : 1;
SIG_VALTYPE_ 1538 MosfetTemperature : 1;
SIG_VALTYPE_ 1538 ControllerTemperature : 1;
SIG_VALTYPE_ 1539 TwelveVolt : 1;
SIG_VALTYPE_ 1539 ThreeVolt : 1;
SIG_VALTYPE_ 1540 MaxOutputVoltage : 1;
SIG_VALTYPE_ 1540 MaxInputCurrent : 1;
SIG_VALTYPE_ 1542 OutputVoltageBatterySide : 1;
SIG_VALTYPE_ 1542 PowerConnectorTemp : 1;



```