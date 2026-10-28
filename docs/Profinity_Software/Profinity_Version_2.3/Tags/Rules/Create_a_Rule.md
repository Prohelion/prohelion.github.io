---
title: Create a rule
description: Create a threshold rule in the rules visual editor that raises a Warning and then a Fatal alert as the maximum cell temperature of a battery rises.
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Create a rule

This procedure creates a threshold rule that raises a Warning alert when the maximum cell temperature goes above 33 °C and a Fatal alert above 35 °C.
It uses the Example Profile and the example CAN log from the [Quick start guide](../../Getting_Started/Quick_Start.md), so the tag it watches has live data.
Opening the rules editor needs the **View tag rules** permission.
Saving needs **Modify tag rules**, as listed under [Rule settings](Rule_Settings.md#permissions).

1. In the side menu, select **RULES & ACTIONS** under **TAG UTILITIES**. The **Editing Rules & Actions** editor opens.
2. In the **Rule Set** list, select the profile's rule set.
3. Select **+ RULE**. A new rule is added to the selected group, or to the rule set when no group is selected. Its settings open in the inspector.
4. Set **Rule id** to `max_cell_temperature` and **Display name** to `Max cell temperature`.
5. In **Item Scope**, enter `/Prohelion BMU/DBC/MinMaxCellTemp/MaxCellTemp`. The leading `/` starts the path at the root of the tag tree, so the rule watches that tag whatever scope the rule set has.
6. Set **Rule type** to **Threshold rule**, and leave **Expression** as `tag.HasValue`.
7. Under **Thresholds**, select **+ Add step**, and set the step as follows:
    1. Set **Operator** to `>` and **Value** to `33`.
    2. Set **Clear value (deadband)** to `32.5`.
    3. Leave **Level** as **Warning**, and set **Enter message** to `Max cell temperature above 33 C`.
8. Select **+ Add step** again, and set the second step:
    1. Set **Operator** to `>` and **Value** to `35`.
    2. Set **Clear value (deadband)** to `34.5`.
    3. Set **Level** to **Fatal**, and set **Enter message** to `Max cell temperature above 35 C`.
9. Optional: Set **Dwell seconds** to `10`. The temperature then has to stay above a limit for 10 seconds before the alert is raised.
10. Select **SAVE**. The editor shows "Rules saved". A failed save shows "Save failed:" followed by the validation error.

To check the rule, [replay the example CAN log](../../Getting_Started/Quick_Start.md#step-3-replay-the-example-can-log).
The maximum cell temperature in the log rises from about 32.6 °C to 35.6 °C over its 44 minutes.
A Warning alert for **Max cell temperature** appears in the [Alerts Log](../Alerts.md) after about 4 minutes of replay, and the Fatal alert appears after about 36 minutes.
To reach the Fatal alert sooner, move the playback to a later position in the log.
An alert clears when the temperature falls below its clear value, which the example log does not do.
[Complete rules.yaml example](Rules_YAML_Example.md) shows a full rules file that uses most of the settings.

A new rule records its alert and runs only the actions it inherits from its rule set and groups, until you attach actions to it.
Refer to [Rule actions](Actions/index.md) for how to attach them.
You can also start a rule from a collection.
In the collections editor, right-click the collection and choose **Create rule from collection…** to use the collection as the rule's scope.
Refer to [Create a collection](../Collections/Create_a_Collection.md) for the collections editor.
