---
title: DBC File
---

# Prohelion D1000 Gen 1 DBC

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

BU_: ProhelionBMU


BO_ 1536 HeartbeatSerialNumber: 8 ProhelionBMU
 SG_ SerialNumber : 32|32@1- (1,0) [0|0] "" Vector__XXX
 SG_ DeviceId : 0|32@1+ (1,0) [0|0] "" Vector__XXX

BO_ 1789 ExtendedPackStatus: 8 ProhelionBMU
 SG_ StatusCmuExtraCell : 12|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusContactorStuck : 11|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ Status12vSupplyLow : 10|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusSOCMeasurementInvalid : 9|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusPackIsolationTestFail : 8|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCmuCanBusPower : 7|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusBMUSetupMode : 6|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusVehicleCommsTimeout : 5|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCmuCommsTimeout : 4|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusMeasurementUntrusted : 3|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellOverTemp : 2|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellUnderVolt : 1|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellOverVolt : 0|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ Unused16 : 48|16@1+ (1,0) [0|0] "" Vector__XXX
 SG_ BmuModelId : 40|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ BmuHardwareVersion : 32|8@1+ (1,0) [0|0] "" Vector__XXX

BO_ 1788 FanStatus: 8 ProhelionBMU
 SG_ CmuCurrent : 48|16@1+ (1,0) [0|0] "mA" Vector__XXX
 SG_ FanAndContactorsCurrent : 32|16@1+ (1,0) [0|0] "mA" Vector__XXX
 SG_ FanSpeed1 : 16|16@1+ (1,0) [0|0] "rpm" Vector__XXX
 SG_ FanSpeed0 : 0|16@1+ (1,0) [0|0] "rpm" Vector__XXX

BO_ 1787 BatteryPackStatus: 8 ProhelionBMU
 SG_ StatusCmuCanBusPower : 39|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusBMUSetupMode : 38|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusVehicleCommsTimeout : 37|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCmuCommsTimeout : 36|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusMeasurementUntrusted : 35|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellOverTemp : 34|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellUnderVolt : 33|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ StatusCellOverVolt : 32|1@1+ (1,0) [0|1] "On / Off" Vector__XXX
 SG_ BmsBmuFirmwareBuildNo : 48|16@1+ (1,0) [0|0] "" Vector__XXX
 SG_ BmsCmuCount : 40|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ VoltageThresholdFalling : 16|16@1+ (1,0) [0|0] "mV" Vector__XXX
 SG_ VoltageThresholdRising : 0|16@1+ (1,0) [0|0] "mV" Vector__XXX

BO_ 1786 PackVoltageCurrent: 8 ProhelionBMU
 SG_ Current : 32|32@1- (1,0) [0|0] "mA" Vector__XXX
 SG_ Voltage : 0|32@1+ (1,0) [0|0] "mV" Vector__XXX

BO_ 1785 MinMaxCellTemp: 8 ProhelionBMU
 SG_ Unused8_2 : 56|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ Unused8 : 40|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MaxCellTempCMU : 48|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MinCellTempCMU : 32|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MaxCellTemp : 16|16@1+ (0.1,0) [0|0] "C" Vector__XXX
 SG_ MinCellTemp : 0|16@1+ (0.1,0) [0|0] "C" Vector__XXX

BO_ 1784 MinMaxCellVoltage: 8 ProhelionBMU
 SG_ MaximumCellVoltageCellNo : 56|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MaximumCellVoltageCMU : 48|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MinimumCellVoltageCellNo : 40|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MinimumCellVoltageCMU : 32|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ MaximumCellVoltage : 16|16@1+ (1,0) [0|0] "mV" Vector__XXX
 SG_ MinimumCellVoltage : 0|16@1+ (1,0) [0|0] "mV" Vector__XXX

BO_ 1783 PrechargeStatus: 8 ProhelionBMU
 SG_ Unused16 : 40|16@1+ (1,0) [0|0] "" Vector__XXX
 SG_ PrechargeTimerCounter : 56|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ PrechargeTimerElapsed : 32|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ Contactor12VSupply_v4_BMU : 16|16@1+ (1,0) [0|0] "" Vector__XXX
 SG_ PrechargeState : 8|8@1+ (1,0) [0|0] "" Vector__XXX
 SG_ PrechargeContactorDriverStatus : 0|8@1+ (1,0) [0|0] "" Vector__XXX

BO_ 1782 ChargerControlInformation: 8 ProhelionBMU
 SG_ TotalPackCapacity : 48|16@1- (1,0) [0|0] "Ah" Vector__XXX
 SG_ DischargingCellVoltageError : 32|16@1- (1,0) [0|0] "mV" Vector__XXX
 SG_ CellTemperatureMargin : 16|16@1- (0.1,0) [0|0] "C" Vector__XXX
 SG_ ChargingCellVoltageError : 0|16@1- (1,0) [0|0] "mV" Vector__XXX

BO_ 1781 BalanceStateOfCharge: 8 ProhelionBMU
 SG_ BalanceSOCPercent : 32|32@1- (1,0) [0|0] "%" Vector__XXX
 SG_ BalanceSOCAh : 0|32@1- (1,0) [0|0] "Ah" Vector__XXX

BO_ 1780 PackStateOfCharge: 8 ProhelionBMU
 SG_ SOCPercent : 32|32@1- (1,0) [0|0] "%" Vector__XXX
 SG_ SOCAh : 0|32@1- (1,0) [0|0] "Ah" Vector__XXX


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
SIG_VALTYPE_ 1781 BalanceSOCPercent : 1;
SIG_VALTYPE_ 1781 BalanceSOCAh : 1;
SIG_VALTYPE_ 1780 SOCPercent : 1;
SIG_VALTYPE_ 1780 SOCAh : 1;


```