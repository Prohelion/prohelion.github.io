---
title: DBC File
---

# Prohelion Driver Control DBC File

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

BU_: DriverControl


BO_ 1280 IDInfo: 8 DriverControl
 SG_ TritiumID : 0|32@1+ (1,0) [0|0] "" Vector__XXX
 SG_ SerialNumber : 32|32@1+ (1,0) [0|0] "" Vector__XXX

BO_ 1281 Drive: 8 DriverControl
 SG_ SetpointMotorVelocity : 0|32@1- (1,0) [0|0] "rpm" Vector__XXX
 SG_ SetpointMotorCurrent : 32|32@1- (100,0) [0|0] "%" Vector__XXX

BO_ 1282 Power: 8 DriverControl
 SG_ Reserved : 0|32@1- (1,0) [0|0] "" Vector__XXX
 SG_ SetpointBusCurrent : 32|32@1- (100,0) [0|0] "%" Vector__XXX

BO_ 1283 Reset: 8 DriverControl
 SG_ Unused : 0|32@1- (1,0) [0|0] "" Vector__XXX
 SG_ Unused : 32|32@1- (1,0) [0|0] "" Vector__XXX

BO_ 1285 Switch: 8 DriverControl
 SG_ IgnitionRun : 5|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ Flags : 48|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ State : 56|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ Brake : 7|1@1+ (1,0) [0|0] "On / Off" Vector__XXX
 SG_ ModeRegen : 2|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ ChargePort : 8|1@1+ (1,0) [0|0] "Connected / Disconnected" Vector__XXX
 SG_ IgnitionStart : 6|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ IgnitionAccesories : 4|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ ModeDrive : 3|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ ModeNetural : 1|1@1+ (1,0) [0|0] "Selected" Vector__XXX
 SG_ ModeReverse : 0|1@1+ (1,0) [0|0] "Selected" Vector__XXX



CM_ SG_ 1280 TritiumID "Device identifier. 0x00004003";
CM_ SG_ 1280 SerialNumber "Device serial number, allocated at manufacture.";
CM_ SG_ 1281 SetpointMotorVelocity "Desired motor velocity set point in rpm";
CM_ SG_ 1281 SetpointMotorCurrent "Desired motor current set point as a percentage of maximum current setting.";
CM_ SG_ 1282 SetpointBusCurrent "Desired set point of current drawn from the bus by the controller  as a percentage of absolute bus current limit.";
CM_ SG_ 1285 IgnitionRun "Ignition key is in the run position";
CM_ SG_ 1285 Flags "Flags currently being reported by the Driver Controller, check the code for more details.";
CM_ SG_ 1285 State "Latest state as being reported by the Driver Controller, check the code for more detail on valid states";
CM_ SG_ 1285 Brake "Brake pedal is currently being pressed if flag is set (1 set / 0 unset)";
CM_ SG_ 1285 ModeRegen "Car is regerating power from the motor if set (1 set / 0 unset)";
CM_ SG_ 1285 ChargePort "Charge point is currently open if set (1 set / 0 unset), port must be closed for car to drive.";
CM_ SG_ 1285 IgnitionStart "Ignition key is in the start position";
CM_ SG_ 1285 IgnitionAccesories "Ignition key is in the accesories position";
CM_ SG_ 1285 ModeDrive "Car is in drive mode if set (1 set / 0 unset)";
CM_ SG_ 1285 ModeNetural "Car is in netural if set (1 set / 0 unset)";
CM_ SG_ 1285 ModeReverse "Car is in reverse if set (1 set / 0 unset)";
BA_DEF_ BO_  "GenMsgCycleTime" INT 2 50000;
BA_DEF_ BU_  "GenNodAutoGenSnd" ENUM  "No","Yes";
BA_DEF_ BU_  "GenNodAutoGenDsp" ENUM  "No","Yes";
BA_DEF_  "GenEnvVarEndingDsp" STRING ;
BA_DEF_  "GenEnvVarEndingSnd" STRING ;
BA_DEF_  "GenEnvVarPrefix" STRING ;
BA_DEF_DEF_  "GenMsgCycleTime" 100;
BA_DEF_DEF_  "GenNodAutoGenSnd" "Yes";
BA_DEF_DEF_  "GenNodAutoGenDsp" "Yes";
BA_DEF_DEF_  "GenEnvVarEndingDsp" "Dsp";
BA_DEF_DEF_  "GenEnvVarEndingSnd" "Snd";
BA_DEF_DEF_  "GenEnvVarPrefix" "Env";
BA_ "GenMsgCycleTime" BO_ 1280 1000;
BA_ "GenMsgCycleTime" BO_ 1281 200;
BA_ "GenMsgCycleTime" BO_ 1282 200;
BA_ "GenMsgCycleTime" BO_ 1283 200;
BA_ "GenMsgCycleTime" BO_ 1285 200;
SIG_VALTYPE_ 1281 SetpointMotorVelocity : 1;
SIG_VALTYPE_ 1281 SetpointMotorCurrent : 1;
SIG_VALTYPE_ 1282 Reserved : 1;
SIG_VALTYPE_ 1282 SetpointBusCurrent : 1;
SIG_VALTYPE_ 1283 Unused : 1;


```